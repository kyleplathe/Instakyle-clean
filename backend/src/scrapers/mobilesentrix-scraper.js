/**
 * MobileSentrix Scraper
 * 
 * Scrapes pricing and availability data from MobileSentrix
 * Requires valid account credentials
 */

import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from project root
dotenv.config({ path: join(__dirname, '../../../.env') });

const COOKIES_PATH = join(__dirname, '../../mobilesentrix-cookies.json');

class MobileSentrixScraper {
  constructor() {
    this.baseUrl = 'https://www.mobilesentrix.com';
    this.loginUrl = 'https://www.mobilesentrix.com/customer/account/login';
    this.credentials = {
      username: process.env.MOBILESENTRIX_USERNAME,
      password: process.env.MOBILESENTRIX_PASSWORD
    };
    this.browser = null;
    this.page = null;
    this.isLoggedIn = false;
    this.cookiesPath = COOKIES_PATH;
  }

  /**
   * Initialize browser and login
   */
  async initialize() {
    console.log('Initializing MobileSentrix scraper...');

    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    this.page = await this.browser.newPage();
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    // Try to load cookies first
    await this.loadCookies();
    
    // Navigate to account page to verify login
    await this.verifyLogin();
  }

  /**
   * Load saved cookies
   */
  async loadCookies() {
    try {
      if (fs.existsSync(this.cookiesPath)) {
        console.log('Loading saved cookies...');
        const cookiesString = fs.readFileSync(this.cookiesPath, 'utf8');
        const cookies = JSON.parse(cookiesString);
        
        if (cookies.length > 0) {
          await this.page.setCookie(...cookies);
          console.log(`✓ Loaded ${cookies.length} cookies`);
          return true;
        }
      } else {
        console.log('⚠️  No saved cookies found.');
        console.log('Please run: node login-and-save-cookies.js');
        throw new Error('No cookies found. Please login manually first.');
      }
    } catch (error) {
      console.error('Error loading cookies:', error.message);
      throw error;
    }
  }

  /**
   * Verify login status
   */
  async verifyLogin() {
    try {
      console.log('Verifying login status...');
      
      await this.page.goto('https://www.mobilesentrix.com/customer/account', {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      const currentUrl = this.page.url();
      
      // If we're redirected to login page, cookies expired
      if (currentUrl.includes('login')) {
        console.log('❌ Session expired. Please login again.');
        throw new Error('Session expired. Run: node login-and-save-cookies.js');
      }
      
      // Check if we can find account elements
      const isLoggedIn = await this.page.evaluate(() => {
        // Look for account-specific elements
        const accountElements = document.querySelector('.account, .customer-name, .welcome-msg, .my-account');
        return !!accountElements;
      });

      if (isLoggedIn || currentUrl.includes('customer/account')) {
        console.log('✅ Successfully logged into MobileSentrix');
        this.isLoggedIn = true;
      } else {
        throw new Error('Login verification failed');
      }

    } catch (error) {
      console.error('Error verifying login:', error.message);
      throw error;
    }
  }

  /**
   * Search for iPhone parts
   * @param {string} model - iPhone model (e.g., "iPhone 15 Pro Max")
   * @param {string} partType - Type of part (e.g., "LCD Screen", "Battery")
   */
  async searchPart(model, partType) {
    if (!this.isLoggedIn) {
      await this.initialize();
    }

    try {
      console.log(`Searching for ${model} ${partType}...`);

      // First try direct search
      const searchQuery = `${model} ${partType}`;
      const searchUrl = `${this.baseUrl}/search?q=${encodeURIComponent(searchQuery)}`;
      
      await this.page.goto(searchUrl, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Wait a bit for dynamic content to load
      await this.delay(2000);

      // Try multiple selectors for product results
      const selectors = [
        '.product-item',
        '.product-card', 
        '.search-result-item',
        '.item-info',
        '.product',
        '.product-item-info',
        '[data-testid="product-item"]',
        '.item.product'
      ];

      let productElements = null;
      for (const selector of selectors) {
        try {
          await this.page.waitForSelector(selector, { timeout: 3000 });
          productElements = await this.page.$$(selector);
          if (productElements.length > 0) {
            console.log(`Found products using selector: ${selector}`);
            break;
          }
        } catch (e) {
          continue;
        }
      }

      if (!productElements || productElements.length === 0) {
        console.log('No products found. Taking screenshot for debugging...');
        await this.screenshot(`search-no-results-${Date.now()}.png`);
        return [];
      }

      // Extract product data with improved selectors
      const products = await this.page.evaluate((model, partType) => {
        const results = [];
        
        // Try multiple possible selectors for products
        const productSelectors = [
          '.product-item',
          '.product-card', 
          '.search-result-item',
          '.item-info',
          '.product',
          '.product-item-info',
          '[data-testid="product-item"]',
          '.item.product'
        ];
        
        let productElements = [];
        for (const selector of productSelectors) {
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            productElements = Array.from(elements);
            break;
          }
        }
        
        productElements.forEach((element, index) => {
          try {
            // Try multiple title selectors
            const titleSelectors = [
              '.product-title', 
              '.product-name', 
              '.product-title-link',
              'h2', 'h3', 'h4', 'h5',
              '.name',
              '.title',
              'a[title]'
            ];
            
            let title = '';
            for (const selector of titleSelectors) {
              const titleEl = element.querySelector(selector);
              if (titleEl) {
                title = titleEl.textContent?.trim() || titleEl.getAttribute('title') || '';
                if (title) break;
              }
            }
            
            // Try multiple price selectors
            const priceSelectors = [
              '.price', 
              '.product-price', 
              '.cost',
              '.price-box .price',
              '.price-current',
              '.special-price',
              '[data-testid="price"]',
              '.price-now'
            ];
            
            let priceText = '';
            let price = 0;
            for (const selector of priceSelectors) {
              const priceEl = element.querySelector(selector);
              if (priceEl) {
                priceText = priceEl.textContent?.trim() || '';
                if (priceText) {
                  // Extract price number
                  const match = priceText.match(/[\d,]+\.?\d*/);
                  if (match) {
                    price = parseFloat(match[0].replace(/,/g, ''));
                    break;
                  }
                }
              }
            }
            
            // Skip if no title or price
            if (!title || !price || price <= 0) {
              return;
            }
            
            // Determine quality tier based on title/description
            const text = (title + ' ' + element.textContent).toLowerCase();
            let quality = 'premium'; // default
            if (text.includes('oem') || text.includes('genuine') || text.includes('original')) {
              quality = 'oem';
            } else if (text.includes('economy') || text.includes('cheap') || text.includes('aftermarket')) {
              quality = 'economy';
            }
            
            // Check stock status
            const stockText = element.textContent.toLowerCase();
            const inStock = !stockText.includes('out of stock') && !stockText.includes('discontinued');
            
            // Get SKU
            const skuSelectors = ['.sku', '.product-sku', '.item-number'];
            let sku = '';
            for (const selector of skuSelectors) {
              const skuEl = element.querySelector(selector);
              if (skuEl) {
                sku = skuEl.textContent?.trim() || '';
                break;
              }
            }
            
            // Get URL
            const linkEl = element.querySelector('a[href]');
            const url = linkEl ? new URL(linkEl.href, window.location.origin).href : '';
            
            results.push({
              title: title,
              price: price,
              sku: sku || `SKU-${index}`,
              inStock: inStock,
              quality: quality,
              url: url,
              rawText: element.textContent?.substring(0, 200) // For debugging
            });
            
          } catch (err) {
            console.error('Error parsing product element:', err);
          }
        });
        
        return results;
      }, model, partType);

      console.log(`Found ${products.length} products for ${model} ${partType}`);
      
      if (products.length === 0) {
        console.log('Taking screenshot for debugging...');
        await this.screenshot(`search-no-products-${Date.now()}.png`);
        
        // Log page HTML for debugging
        const html = await this.page.content();
        fs.writeFileSync(`search-page-${Date.now()}.html`, html);
        console.log('Page HTML saved for debugging');
      }
      
      return products;

    } catch (error) {
      console.error('Error searching for part:', error);
      await this.screenshot(`search-error-${Date.now()}.png`);
      return [];
    }
  }

  /**
   * Get pricing for all iPhone models
   */
  async getAlliPhonePricing() {
    const models = [
      'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16',
      'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
      'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
      'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 mini',
      'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 12 mini'
    ];

    const partTypes = [
      'LCD Screen',
      'OLED Display',
      'Battery',
      'Camera',
      'Charging Port',
      'Back Glass'
    ];

    const allPricing = {};

    for (const model of models) {
      console.log(`\nProcessing ${model}...`);
      allPricing[model] = {};

      for (const partType of partTypes) {
        const products = await this.searchPart(model, partType);
        
        if (products.length > 0) {
          // Get the best price for each quality tier
          const oemParts = products.filter(p => p.quality === 'oem');
          const premiumParts = products.filter(p => p.quality === 'premium');
          const economyParts = products.filter(p => p.quality === 'economy');

          allPricing[model][partType] = {
            oem: oemParts.length > 0 ? Math.min(...oemParts.map(p => p.price)) : null,
            premium: premiumParts.length > 0 ? Math.min(...premiumParts.map(p => p.price)) : null,
            economy: economyParts.length > 0 ? Math.min(...economyParts.map(p => p.price)) : null,
            products: products
          };
        }

        // Add delay to avoid rate limiting
        await this.delay(1000);
      }
    }

    return allPricing;
  }

  /**
   * Get best pricing for a specific repair
   * @param {string} model - Device model
   * @param {string} repairType - Type of repair
   * @returns {Object} Pricing tiers
   */
  async getRepairPricing(model, repairType) {
    // Map repair types to part types
    const partTypeMap = {
      'Screen Repair': 'LCD Screen',
      'Battery Replacement': 'Battery',
      'Camera Repair': 'Camera',
      'Charging Port': 'Charging Port',
      'Back Glass': 'Back Glass'
    };

    const partType = partTypeMap[repairType] || repairType;
    const products = await this.searchPart(model, partType);

    if (products.length === 0) {
      return null;
    }

    // Calculate pricing tiers based on found products
    const prices = products.map(p => p.price).sort((a, b) => a - b);
    
    return {
      oem: products.find(p => p.quality === 'oem')?.price || prices[prices.length - 1],
      premium: products.find(p => p.quality === 'premium')?.price || prices[Math.floor(prices.length / 2)],
      economy: prices[0],
      lastUpdated: new Date().toISOString(),
      source: 'mobilesentrix'
    };
  }

  /**
   * Close browser
   */
  async close() {
    if (this.browser) {
      await this.browser.close();
      this.isLoggedIn = false;
      console.log('Browser closed');
    }
  }

  /**
   * Delay helper
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Take screenshot for debugging
   */
  async screenshot(filename = 'mobilesentrix-debug.png') {
    if (this.page) {
      await this.page.screenshot({ path: filename, fullPage: true });
      console.log(`Screenshot saved: ${filename}`);
    }
  }
}

export default MobileSentrixScraper;

// Example usage:
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    const scraper = new MobileSentrixScraper();
    
    try {
      console.log('=== MobileSentrix Scraper Test ===\n');
      
      await scraper.initialize();
      
      // Test search for iPhone 15 Pro Max screen
      console.log('\n--- Testing Part Search ---');
      const products = await scraper.searchPart('iPhone 15 Pro Max', 'LCD Screen');
      console.log('\nFound products:', JSON.stringify(products, null, 2));
      
      // Get pricing for repair
      console.log('\n--- Testing Repair Pricing ---');
      const pricing = await scraper.getRepairPricing('iPhone 15 Pro Max', 'Screen Repair');
      console.log('\nPricing:', JSON.stringify(pricing, null, 2));
      
      // Optionally test full pricing (commented out as it takes long)
      // console.log('\n--- Getting All iPhone Pricing (This will take 10-15 minutes) ---');
      // const allPricing = await scraper.getAlliPhonePricing();
      // console.log('\nAll Pricing:', JSON.stringify(allPricing, null, 2));
      
    } catch (error) {
      console.error('\n❌ Error:', error.message);
      console.error('Stack:', error.stack);
      await scraper.screenshot('error-screenshot.png');
    } finally {
      await scraper.close();
    }
  })();
}

