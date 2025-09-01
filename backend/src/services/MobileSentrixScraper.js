import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

class MobileSentrixScraper {
  constructor() {
    this.__filename = fileURLToPath(import.meta.url);
    this.__dirname = path.dirname(this.__filename);
    this.partsFilePath = path.join(this.__dirname, '../../../data/parts.json');
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async promptForCredentials() {
    return new Promise((resolve) => {
      this.rl.question('Enter MobileSentrix verification code: ', (code) => {
        resolve(code);
      });
    });
  }

  async waitForSelectorWithTimeout(page, selector, timeout = 10000) {
    try {
      await page.waitForSelector(selector, { timeout });
      return true;
    } catch (error) {
      console.error(`Timeout waiting for selector: ${selector}`);
      return false;
    }
  }

  async scrapeParts() {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      
      // Enable request interception for debugging
      await page.setRequestInterception(true);
      page.on('request', request => {
        console.log(`Request: ${request.method()} ${request.url()}`);
        request.continue();
      });
      
      page.on('response', response => {
        if (response.status() >= 400) {
          console.error(`Error response: ${response.status()} ${response.url()}`);
        }
      });

      // Go directly to MobileSentrix
      console.log('Navigating to MobileSentrix...');
      await page.goto('https://www.mobilesentrix.com', { waitUntil: 'networkidle0' });
      
      // Take screenshot for debugging
      await page.screenshot({ path: 'home-page.png' });

      // Wait for and click the login button
      console.log('Waiting for login button...');
      const loginButtonFound = await this.waitForSelectorWithTimeout(page, 'a:has-text("Login")');
      if (!loginButtonFound) {
        throw new Error('Could not find login button');
      }

      // Click login button and wait for popup
      console.log('Clicking login button...');
      const [popup] = await Promise.all([
        new Promise(resolve => page.once('popup', resolve)),
        page.click('a:has-text("Login")')
      ]);

      // Switch to popup window
      await popup.waitForLoadState('networkidle');
      console.log('Switched to login popup');
      
      // Take screenshot of popup
      await popup.screenshot({ path: 'login-popup.png' });
      
      // Wait for username input in popup
      console.log('Waiting for login form in popup...');
      const usernameInputFound = await this.waitForSelectorWithTimeout(popup, '#username');
      if (!usernameInputFound) {
        throw new Error('Could not find username input field in popup');
      }

      console.log('Entering credentials in popup...');
      await popup.type('#username', process.env.MOBILESENTRIX_USERNAME);
      await popup.type('#password', process.env.MOBILESENTRIX_PASSWORD);
      
      // Take screenshot before clicking submit
      await popup.screenshot({ path: 'before-submit.png' });
      
      console.log('Submitting login form...');
      await popup.click('button[type="submit"]');
      
      // Wait for popup to close or 2FA
      console.log('Waiting for login response...');
      try {
        await Promise.race([
          popup.waitForNavigation({ waitUntil: 'networkidle0' }),
          this.waitForSelectorWithTimeout(popup, 'input[type="text"]', 5000)
        ]);
      } catch (e) {
        console.log('No 2FA required or navigation failed');
      }
      
      // Take screenshot after login attempt
      await popup.screenshot({ path: 'after-login.png' });
      
      // Check if we're still on the login page
      const currentUrl = popup.url();
      if (currentUrl.includes('/login')) {
        throw new Error('Login failed - still on login page');
      }

      // Close popup and switch back to main window
      await popup.close();
      await page.waitForLoadState('networkidle');
      
      // Navigate to parts catalog
      console.log('Navigating to parts catalog...');
      await page.goto('https://www.mobilesentrix.com/parts-catalog', { waitUntil: 'networkidle0' });
      
      // Take screenshot of parts catalog
      await page.screenshot({ path: 'parts-catalog.png' });
      
      // Get all device categories
      console.log('Scraping categories...');
      const categories = await page.evaluate(() => {
        const categoryElements = document.querySelectorAll('.category-item');
        return Array.from(categoryElements).map(el => ({
          name: el.textContent.trim(),
          url: el.href
        }));
      });
      
      if (categories.length === 0) {
        throw new Error('No categories found on parts catalog page');
      }
      
      console.log(`Found ${categories.length} categories`);
      
      const allParts = [];
      
      // Scrape each category
      for (const category of categories) {
        console.log(`Scraping category: ${category.name}`);
        await page.goto(category.url, { waitUntil: 'networkidle0' });
        
        const productsFound = await this.waitForSelectorWithTimeout(page, '.product-item');
        if (!productsFound) {
          console.warn(`No products found in category: ${category.name}`);
          continue;
        }
        
        const parts = await page.evaluate((categoryName) => {
          const products = document.querySelectorAll('.product-item');
          return Array.from(products).map(product => {
            try {
              const name = product.querySelector('.product-name')?.textContent.trim() || 'Unknown';
              const price = product.querySelector('.product-price')?.textContent.trim() || '0';
              const sku = product.querySelector('.product-sku')?.textContent.trim() || 'Unknown';
              const stock = product.querySelector('.product-stock')?.textContent.trim() || 'Unknown';
              
              return {
                category: categoryName,
                name,
                price: parseFloat(price.replace(/[^0-9.]/g, '')) || 0,
                sku,
                inStock: stock.toLowerCase().includes('in stock'),
                url: product.querySelector('a')?.href || ''
              };
            } catch (error) {
              console.error(`Error parsing product: ${error.message}`);
              return null;
            }
          }).filter(Boolean);
        }, category.name);
        
        console.log(`Found ${parts.length} parts in ${category.name}`);
        allParts.push(...parts);
      }
      
      if (allParts.length === 0) {
        throw new Error('No parts found in any category');
      }
      
      // Save parts data
      console.log(`Saving ${allParts.length} parts to file...`);
      fs.writeFileSync(this.partsFilePath, JSON.stringify(allParts, null, 2));
      
      // Generate repair services
      console.log('Generating repair services...');
      await this.generateRepairServices(allParts);
      
      return allParts;
    } catch (error) {
      console.error('Error scraping MobileSentrix:', error);
      // Take error screenshot
      try {
        await page.screenshot({ path: 'error-state.png' });
      } catch (e) {
        console.error('Could not take error screenshot:', e);
      }
      throw error;
    } finally {
      await browser.close();
      this.rl.close();
    }
  }

  async generateRepairServices(parts) {
    // Group parts by device model
    const deviceParts = parts.reduce((acc, part) => {
      const deviceModel = this.extractDeviceModel(part.name);
      if (!acc[deviceModel]) {
        acc[deviceModel] = [];
      }
      acc[deviceModel].push(part);
      return acc;
    }, {});

    // Generate repair services
    const repairServices = Object.entries(deviceParts).map(([device, parts]) => {
      const screenParts = parts.filter(part => 
        part.name.toLowerCase().includes('screen') || 
        part.name.toLowerCase().includes('lcd') ||
        part.name.toLowerCase().includes('display')
      );

      const batteryParts = parts.filter(part => 
        part.name.toLowerCase().includes('battery')
      );

      const cameraParts = parts.filter(part => 
        part.name.toLowerCase().includes('camera')
      );

      return {
        device,
        repairs: [
          ...screenParts.map(part => ({
            type: 'screen',
            name: `${device} Screen Repair`,
            part: part.name,
            partSku: part.sku,
            partPrice: part.price,
            servicePrice: part.price * 1.5, // 50% markup
            inStock: part.inStock
          })),
          ...batteryParts.map(part => ({
            type: 'battery',
            name: `${device} Battery Replacement`,
            part: part.name,
            partSku: part.sku,
            partPrice: part.price,
            servicePrice: part.price * 1.5,
            inStock: part.inStock
          })),
          ...cameraParts.map(part => ({
            type: 'camera',
            name: `${device} Camera Repair`,
            part: part.name,
            partSku: part.sku,
            partPrice: part.price,
            servicePrice: part.price * 1.5,
            inStock: part.inStock
          }))
        ]
      };
    });

    // Save repair services
    const servicesPath = path.join(this.__dirname, '../../../src/config/repair-services.js');
    const servicesContent = `// This file is auto-generated from MobileSentrix parts data
// Last updated: ${new Date().toISOString()}

export const repairServices = ${JSON.stringify(repairServices, null, 2)};
`;

    fs.writeFileSync(servicesPath, servicesContent);
  }

  extractDeviceModel(partName) {
    // Extract device model from part name
    // This is a simple implementation - you might want to make it more robust
    const modelMatch = partName.match(/(iPhone|Samsung|Google Pixel) [A-Za-z0-9]+/);
    return modelMatch ? modelMatch[0] : 'Unknown Device';
  }
}

export default new MobileSentrixScraper(); 