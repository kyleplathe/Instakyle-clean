import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

class PocketSuiteScraper {
  constructor() {
    this.__filename = fileURLToPath(import.meta.url);
    this.__dirname = path.dirname(this.__filename);
    this.pricingFilePath = path.join(this.__dirname, '../../../pricing.csv');
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async promptForCode() {
    return new Promise((resolve) => {
      this.rl.question('Enter the verification code sent to your phone: ', (code) => {
        resolve(code);
      });
    });
  }

  async waitForSelectorWithTimeout(page, selector, timeout = 30000) {
    try {
      await page.waitForSelector(selector, { timeout });
      return true;
    } catch (error) {
      console.error(`Timeout waiting for selector: ${selector}`);
      return false;
    }
  }

  async scrapePrices() {
    let browser;
    let page;
    
    try {
      browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: null
      });

      page = await browser.newPage();
      
      // Set a longer timeout for navigation
      page.setDefaultNavigationTimeout(60000);
      
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

      // Go to PocketSuite
      console.log('Navigating to PocketSuite...');
      await page.goto('https://app.pocketsuite.io', { 
        waitUntil: 'networkidle0',
        timeout: 60000 
      });
      
      // Take screenshot for debugging
      await page.screenshot({ path: 'home-page.png' });

      // Wait for phone number input
      console.log('Waiting for phone number input...');
      const phoneInputFound = await this.waitForSelectorWithTimeout(page, 'input[type="tel"]');
      if (!phoneInputFound) {
        throw new Error('Could not find phone number input field');
      }

      // Enter phone number
      console.log('Entering phone number...');
      await page.type('input[type="tel"]', process.env.POCKETSUITE_PHONE);
      
      // Take screenshot before clicking continue
      await page.screenshot({ path: 'before-continue.png' });
      
      // Click continue button
      console.log('Clicking continue...');
      await page.click('button:has-text("Continue")');
      
      // Wait for verification code input
      console.log('Waiting for verification code input...');
      const codeInputFound = await this.waitForSelectorWithTimeout(page, 'input[type="text"]');
      if (!codeInputFound) {
        throw new Error('Could not find verification code input field');
      }

      // Prompt for verification code
      const code = await this.promptForCode();
      
      // Enter verification code
      console.log('Entering verification code...');
      await page.type('input[type="text"]', code);
      
      // Take screenshot before submitting code
      await page.screenshot({ path: 'before-submit-code.png' });
      
      // Submit verification code
      console.log('Submitting verification code...');
      await page.click('button:has-text("Verify")');
      
      // Wait for login to complete
      console.log('Waiting for login to complete...');
      await page.waitForNavigation({ 
        waitUntil: 'networkidle0',
        timeout: 60000 
      });
      
      // Take screenshot after login
      await page.screenshot({ path: 'after-login.png' });
      
      // Navigate to services/pricing page
      console.log('Navigating to services page...');
      await page.goto('https://app.pocketsuite.io/services', { 
        waitUntil: 'networkidle0',
        timeout: 60000 
      });
      
      // Take screenshot of services page
      await page.screenshot({ path: 'services-page.png' });
      
      // Extract pricing data
      console.log('Extracting pricing data...');
      const prices = await page.evaluate(() => {
        const services = Array.from(document.querySelectorAll('.service-item'));
        return services.map(service => {
          const name = service.querySelector('.service-name')?.textContent.trim() || 'Unknown';
          const price = service.querySelector('.service-price')?.textContent.trim() || '0';
          return {
            device: name,
            price: price.replace(/[^0-9.]/g, '') // Remove currency symbols and other non-numeric characters
          };
        });
      });
      
      if (prices.length === 0) {
        throw new Error('No prices found on services page');
      }
      
      // Convert to CSV format
      const csvContent = this.convertToCSV(prices);
      
      // Write to pricing.csv
      console.log(`Writing ${prices.length} prices to CSV...`);
      fs.writeFileSync(this.pricingFilePath, csvContent);
      
      console.log('Successfully synced prices from PocketSuite');
      return prices;
    } catch (error) {
      console.error('Error scraping PocketSuite:', error);
      // Take error screenshot if page is available
      if (page) {
        try {
          await page.screenshot({ path: 'error-state.png' });
        } catch (e) {
          console.error('Could not take error screenshot:', e);
        }
      }
      throw error;
    } finally {
      if (browser) {
        await browser.close();
      }
      this.rl.close();
    }
  }

  convertToCSV(prices) {
    const headers = 'device,price\n';
    const rows = prices.map(p => `${p.device},${p.price}`).join('\n');
    return headers + rows;
  }
}

export default new PocketSuiteScraper(); 