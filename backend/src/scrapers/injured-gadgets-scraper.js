import { BaseScraper } from './base-scraper.js';

export class InjuredGadgetsScraper extends BaseScraper {
  constructor() {
    super('InjuredGadgets');
    this.baseUrl = 'https://www.injuredgadgets.com';
  }

  async login(username, password) {
    try {
      await this.page.goto(`${this.baseUrl}/login`);
      
      // Wait for login form
      await this.page.waitForSelector('#username');
      await this.page.waitForSelector('#password');
      
      // Fill in credentials
      await this.page.type('#username', username);
      await this.page.type('#password', password);
      
      // Submit form
      await this.page.click('button[type="submit"]');
      
      // Wait for navigation
      await this.page.waitForNavigation();
      
      // Verify login success
      const isLoggedIn = await this.page.evaluate(() => {
        return !document.querySelector('.login-form');
      });
      
      if (!isLoggedIn) {
        throw new Error('Login failed');
      }
    } catch (error) {
      await this.handleError(error, 'login');
      throw error;
    }
  }

  async searchPart(partNumber) {
    try {
      await this.page.goto(`${this.baseUrl}/search?q=${encodeURIComponent(partNumber)}`);
      
      // Wait for search results
      await this.page.waitForSelector('.product-grid', { timeout: 5000 });
      
      // Extract product information
      const products = await this.page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.product-item'));
        return items.map(item => ({
          name: item.querySelector('.product-name')?.textContent.trim(),
          price: item.querySelector('.price')?.textContent.trim(),
          sku: item.querySelector('.sku')?.textContent.trim(),
          url: item.querySelector('a')?.href
        }));
      });
      
      return products;
    } catch (error) {
      await this.handleError(error, 'searchPart');
      return [];
    }
  }

  async getPartDetails(partNumber) {
    try {
      const products = await this.searchPart(partNumber);
      if (products.length === 0) {
        return null;
      }

      // Get the first matching product
      const product = products[0];
      await this.page.goto(product.url);
      
      // Wait for product details to load
      await this.page.waitForSelector('.product-details');
      
      // Extract detailed information
      const details = await this.page.evaluate(() => {
        return {
          name: document.querySelector('.product-name')?.textContent.trim(),
          price: document.querySelector('.price')?.textContent.trim(),
          sku: document.querySelector('.sku')?.textContent.trim(),
          description: document.querySelector('.description')?.textContent.trim(),
          stock: document.querySelector('.stock')?.textContent.trim(),
          specifications: Array.from(document.querySelectorAll('.specifications li')).map(li => li.textContent.trim())
        };
      });
      
      return {
        ...details,
        vendor: this.vendorName,
        scrapedAt: new Date().toISOString()
      };
    } catch (error) {
      await this.handleError(error, 'getPartDetails');
      return null;
    }
  }
} 