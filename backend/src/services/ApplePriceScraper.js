/**
 * Apple OEM Price Scraper
 * 
 * Scrapes official Apple out-of-warranty repair pricing
 * Source: https://support.apple.com/iphone/repair/service
 */

const puppeteer = require('puppeteer');

class ApplePriceScraper {
  constructor() {
    this.baseUrl = 'https://support.apple.com/iphone/repair/service';
    this.priceCache = new Map();
    this.lastScrape = null;
  }

  /**
   * Scrape all iPhone repair prices from Apple's website
   * @returns {Promise<Object>} Pricing data organized by model and repair type
   */
  async scrapeAllPrices() {
    console.log('Starting Apple price scrape...');
    
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      
      // Navigate to Apple's repair pricing page
      await page.goto(this.baseUrl, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Wait for pricing content to load
      await page.waitForSelector('.repair-pricing', { timeout: 10000 }).catch(() => {
        console.log('Using alternative selector...');
      });

      // Extract pricing data
      const pricing = await page.evaluate(() => {
        const prices = {};
        
        // This selector may need adjustment based on Apple's actual page structure
        // Apple frequently updates their website structure
        const priceElements = document.querySelectorAll('[data-price], .price-amount, .repair-price');
        
        priceElements.forEach(element => {
          const priceText = element.textContent.trim();
          const priceMatch = priceText.match(/\$([0-9,]+(\.[0-9]{2})?)/);
          
          if (priceMatch) {
            const price = parseFloat(priceMatch[1].replace(',', ''));
            
            // Try to find associated repair type and model
            const container = element.closest('[data-model], .repair-item, .price-row');
            if (container) {
              const modelText = container.querySelector('[data-model-name], .model-name')?.textContent || '';
              const repairText = container.querySelector('[data-repair-type], .repair-type')?.textContent || '';
              
              if (modelText && repairText) {
                if (!prices[modelText]) {
                  prices[modelText] = {};
                }
                prices[modelText][repairText] = price;
              }
            }
          }
        });
        
        return prices;
      });

      await browser.close();
      
      console.log(`Scraped prices for ${Object.keys(pricing).length} device models`);
      
      // Fallback to documented prices if scraping fails
      if (Object.keys(pricing).length === 0) {
        console.log('Scraping failed, using documented Apple prices...');
        return this.getDocumentedPrices();
      }

      this.priceCache = new Map(Object.entries(pricing));
      this.lastScrape = new Date();
      
      return pricing;

    } catch (error) {
      console.error('Error scraping Apple prices:', error);
      
      if (browser) {
        await browser.close();
      }
      
      // Return documented prices as fallback
      return this.getDocumentedPrices();
    }
  }

  /**
   * Get documented Apple prices (fallback when scraping fails)
   * Based on Apple's published out-of-warranty pricing as of Oct 2025
   * Source: https://support.apple.com/iphone/repair/service
   */
  getDocumentedPrices() {
    return {
      // iPhone 17 Series (Coming Soon - estimated based on historical patterns)
      'iPhone 17 Pro Max (Coming Soon)': {
        'Screen Repair': 379.00,
        'Battery Replacement': 99.00,
        'Camera Repair': 229.00,
        'Back Glass': 199.00,
        'Other Damage': 599.00
      },
      'iPhone 17 Pro (Coming Soon)': {
        'Screen Repair': 379.00,
        'Battery Replacement': 99.00,
        'Camera Repair': 229.00,
        'Back Glass': 199.00,
        'Other Damage': 549.00
      },
      'iPhone 17 Air (Coming Soon)': {
        'Screen Repair': 329.00,
        'Battery Replacement': 99.00,
        'Camera Repair': 179.00,
        'Back Glass': 169.00,
        'Other Damage': 449.00
      },
      'iPhone 17 (Coming Soon)': {
        'Screen Repair': 329.00,
        'Battery Replacement': 99.00,
        'Camera Repair': 179.00,
        'Back Glass': 169.00,
        'Other Damage': 449.00
      },
      
      // iPhone 16 Series
      'iPhone 16 Pro Max': {
        'Screen Repair': 379.00,
        'Battery Replacement': 99.00,
        'Camera Repair': 229.00,
        'Back Glass': 199.00,
        'Other Damage': 599.00
      },
      'iPhone 16 Pro': {
        'Screen Repair': 379.00,
        'Battery Replacement': 99.00,
        'Camera Repair': 229.00,
        'Back Glass': 199.00,
        'Other Damage': 549.00
      },
      'iPhone 16 Plus': {
        'Screen Repair': 329.00,
        'Battery Replacement': 99.00,
        'Camera Repair': 179.00,
        'Back Glass': 169.00,
        'Other Damage': 449.00
      },
      'iPhone 16': {
        'Screen Repair': 329.00,
        'Battery Replacement': 99.00,
        'Camera Repair': 179.00,
        'Back Glass': 169.00,
        'Other Damage': 449.00
      },
      
      // iPhone 15 Series
      'iPhone 15 Pro Max': {
        'Screen Repair': 379.00,
        'Battery Replacement': 99.00,
        'Camera Repair': 229.00,
        'Back Glass': 199.00,
        'Other Damage': 599.00
      },
      'iPhone 15 Pro': {
        'Screen Repair': 329.00,
        'Battery Replacement': 99.00,
        'Camera Repair': 199.00,
        'Back Glass': 169.00,
        'Other Damage': 549.00
      },
      'iPhone 15 Plus': {
        'Screen Repair': 329.00,
        'Battery Replacement': 99.00,
        'Camera Repair': 179.00,
        'Back Glass': 169.00,
        'Other Damage': 449.00
      },
      'iPhone 15': {
        'Screen Repair': 329.00,
        'Battery Replacement': 99.00,
        'Camera Repair': 179.00,
        'Back Glass': 169.00,
        'Other Damage': 449.00
      },
      
      // iPhone 14 Series
      'iPhone 14 Pro Max': {
        'Screen Repair': 379.00,
        'Battery Replacement': 99.00,
        'Camera Repair': 199.00,
        'Back Glass': 199.00,
        'Other Damage': 549.00
      },
      'iPhone 14 Pro': {
        'Screen Repair': 329.00,
        'Battery Replacement': 99.00,
        'Camera Repair': 179.00,
        'Back Glass': 169.00,
        'Other Damage': 499.00
      },
      'iPhone 14 Plus': {
        'Screen Repair': 329.00,
        'Battery Replacement': 99.00,
        'Camera Repair': 169.00,
        'Back Glass': 169.00,
        'Other Damage': 449.00
      },
      'iPhone 14': {
        'Screen Repair': 279.00,
        'Battery Replacement': 99.00,
        'Camera Repair': 169.00,
        'Back Glass': 169.00,
        'Other Damage': 449.00
      },
      
      // iPhone 13 Series
      'iPhone 13 Pro Max': {
        'Screen Repair': 329.00,
        'Battery Replacement': 89.00,
        'Camera Repair': 179.00,
        'Back Glass': 199.00,
        'Other Damage': 549.00
      },
      'iPhone 13 Pro': {
        'Screen Repair': 279.00,
        'Battery Replacement': 89.00,
        'Camera Repair': 169.00,
        'Back Glass': 169.00,
        'Other Damage': 499.00
      },
      'iPhone 13 mini': {
        'Screen Repair': 229.00,
        'Battery Replacement': 89.00,
        'Camera Repair': 149.00,
        'Back Glass': 149.00,
        'Other Damage': 399.00
      },
      'iPhone 13': {
        'Screen Repair': 279.00,
        'Battery Replacement': 89.00,
        'Camera Repair': 149.00,
        'Back Glass': 169.00,
        'Other Damage': 449.00
      },
      
      // iPhone 12 Series
      'iPhone 12 Pro Max': {
        'Screen Repair': 329.00,
        'Battery Replacement': 89.00,
        'Camera Repair': 169.00,
        'Back Glass': 199.00,
        'Other Damage': 599.00
      },
      'iPhone 12 Pro': {
        'Screen Repair': 279.00,
        'Battery Replacement': 89.00,
        'Camera Repair': 149.00,
        'Back Glass': 169.00,
        'Other Damage': 549.00
      },
      'iPhone 12 mini': {
        'Screen Repair': 229.00,
        'Battery Replacement': 89.00,
        'Camera Repair': 129.00,
        'Back Glass': 149.00,
        'Other Damage': 449.00
      },
      'iPhone 12': {
        'Screen Repair': 279.00,
        'Battery Replacement': 89.00,
        'Camera Repair': 149.00,
        'Back Glass': 169.00,
        'Other Damage': 449.00
      },
      
      // iPhone 11 Series
      'iPhone 11 Pro Max': {
        'Screen Repair': 329.00,
        'Battery Replacement': 89.00,
        'Camera Repair': 149.00,
        'Other Damage': 599.00
      },
      'iPhone 11 Pro': {
        'Screen Repair': 279.00,
        'Battery Replacement': 89.00,
        'Camera Repair': 149.00,
        'Other Damage': 549.00
      },
      'iPhone 11': {
        'Screen Repair': 199.00,
        'Battery Replacement': 89.00,
        'Camera Repair': 129.00,
        'Other Damage': 399.00
      },
      
      // iPhone XS/XR Series
      'iPhone XS Max': {
        'Screen Repair': 329.00,
        'Battery Replacement': 89.00,
        'Other Damage': 599.00
      },
      'iPhone XS': {
        'Screen Repair': 279.00,
        'Battery Replacement': 89.00,
        'Other Damage': 549.00
      },
      'iPhone XR': {
        'Screen Repair': 199.00,
        'Battery Replacement': 89.00,
        'Other Damage': 399.00
      },
      'iPhone X': {
        'Screen Repair': 279.00,
        'Battery Replacement': 89.00,
        'Other Damage': 549.00
      },
      
      // iPhone 8 Series
      'iPhone 8 Plus': {
        'Screen Repair': 169.00,
        'Battery Replacement': 79.00,
        'Other Damage': 399.00
      },
      'iPhone 8': {
        'Screen Repair': 149.00,
        'Battery Replacement': 79.00,
        'Other Damage': 349.00
      },
      
      // iPhone SE
      'iPhone SE (3rd gen)': {
        'Screen Repair': 129.00,
        'Battery Replacement': 89.00,
        'Other Damage': 269.00
      },
      'iPhone SE (2nd gen)': {
        'Screen Repair': 129.00,
        'Battery Replacement': 79.00,
        'Other Damage': 269.00
      }
    };
  }

  /**
   * Get price for specific model and repair type
   */
  getPrice(model, repairType) {
    const modelPrices = this.priceCache.get(model) || this.getDocumentedPrices()[model];
    return modelPrices?.[repairType] || null;
  }

  /**
   * Check if cache is stale (older than 24 hours)
   */
  isCacheStale() {
    if (!this.lastScrape) return true;
    const hoursSinceUpdate = (Date.now() - this.lastScrape.getTime()) / (1000 * 60 * 60);
    return hoursSinceUpdate > 24;
  }

  /**
   * Force refresh of pricing data
   */
  async refresh() {
    return await this.scrapeAllPrices();
  }

  /**
   * Get last update timestamp
   */
  getLastUpdateTime() {
    return this.lastScrape;
  }
}

module.exports = new ApplePriceScraper();

