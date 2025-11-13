/**
 * MobileSentrix Price Scraper
 * Uses YOUR existing Chrome browser session (no login needed!)
 * 
 * SETUP:
 * 1. Close ALL Chrome windows
 * 2. Run this script
 * 3. It will open Chrome in debug mode
 * 4. Login to MobileSentrix manually
 * 5. Press Enter to start scraping
 */

import puppeteer from 'puppeteer';
import fs from 'fs';

const iPhoneModels = [
  'iPhone 16 Pro Max',
  'iPhone 16 Pro',
  'iPhone 16 Plus',
  'iPhone 16',
  'iPhone 15 Pro Max',
  'iPhone 15 Pro',
  'iPhone 15 Plus',
  'iPhone 15',
  'iPhone 14 Pro Max',
  'iPhone 14 Pro',
  'iPhone 14 Plus',
  'iPhone 14'
];

const partTypes = [
  { search: 'LCD Screen', repairType: 'Screen Repair' },
  { search: 'OLED Display', repairType: 'Screen Repair' },
  { search: 'Battery', repairType: 'Battery Replacement' },
  { search: 'Back Camera', repairType: 'Camera Repair' },
  { search: 'Charging Port', repairType: 'Charging Port' },
  { search: 'Back Glass', repairType: 'Back Glass' }
];

async function scrapeMobileSentrix() {
  console.log('=== MobileSentrix Price Scraper ===\n');
  console.log('📋 Instructions:');
  console.log('1. A Chrome window will open');
  console.log('2. Login to MobileSentrix if needed');
  console.log('3. Come back here and press Enter to start scraping\n');

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--start-maximized'
    ],
    defaultViewport: null
  });

  const page = await browser.newPage();
  
  try {
    // Go to MobileSentrix
    console.log('Opening MobileSentrix...');
    await page.goto('https://www.mobilesentrix.com', {
      waitUntil: 'networkidle2'
    });

    console.log('\n👉 Please login if needed, then press Enter to continue...\n');
    
    // Wait for user confirmation
    await new Promise(resolve => {
      process.stdin.once('data', () => resolve());
    });

    console.log('\n🔍 Starting price extraction...\n');

    const allPricing = {};
    let totalSearches = 0;
    let successfulSearches = 0;

    // Loop through each model
    for (const model of iPhoneModels) {
      console.log(`\n📱 Processing ${model}...`);
      allPricing[model] = {};

      for (const part of partTypes) {
        totalSearches++;
        const searchQuery = `${model} ${part.search}`;
        console.log(`  Searching: ${searchQuery}`);

        try {
          // Navigate to search
          await page.goto(`https://www.mobilesentrix.com/catalogsearch/result/?q=${encodeURIComponent(searchQuery)}`, {
            waitUntil: 'networkidle2',
            timeout: 15000
          });

          // Wait a bit for products to load
          await page.waitForTimeout(2000);

          // Extract product prices
          const products = await page.evaluate(() => {
            const results = [];
            
            // Try multiple selectors for product listings
            const productSelectors = [
              '.product-item',
              '.item.product',
              '.product-card',
              '.products .item',
              'li.product'
            ];

            let productElements = [];
            for (const selector of productSelectors) {
              productElements = document.querySelectorAll(selector);
              if (productElements.length > 0) break;
            }

            productElements.forEach(product => {
              try {
                // Try multiple selectors for product name
                const nameSelectors = [
                  '.product-item-name',
                  '.product-name',
                  'h2 a',
                  'h3 a',
                  '.product-item-link'
                ];
                
                let name = '';
                for (const selector of nameSelectors) {
                  const el = product.querySelector(selector);
                  if (el) {
                    name = el.textContent.trim();
                    break;
                  }
                }

                // Try multiple selectors for price
                const priceSelectors = [
                  '.price',
                  '.product-price',
                  '[data-price-amount]',
                  '.price-box .price',
                  'span.price'
                ];

                let priceText = '';
                for (const selector of priceSelectors) {
                  const el = product.querySelector(selector);
                  if (el) {
                    priceText = el.textContent.trim();
                    break;
                  }
                }

                if (name && priceText) {
                  const priceMatch = priceText.match(/\$?([0-9,]+\.?[0-9]{0,2})/);
                  if (priceMatch) {
                    const price = parseFloat(priceMatch[1].replace(',', ''));
                    
                    // Determine quality tier based on product name/description
                    let quality = 'premium';
                    const nameLower = name.toLowerCase();
                    
                    if (nameLower.includes('oem') || nameLower.includes('original') || nameLower.includes('genuine')) {
                      quality = 'oem';
                    } else if (nameLower.includes('economy') || nameLower.includes('budget') || nameLower.includes('value')) {
                      quality = 'economy';
                    } else if (nameLower.includes('premium') || nameLower.includes('high quality') || nameLower.includes('grade a')) {
                      quality = 'premium';
                    }

                    results.push({
                      name,
                      price,
                      quality
                    });
                  }
                }
              } catch (err) {
                // Skip this product
              }
            });

            return results;
          });

          if (products.length > 0) {
            console.log(`    ✓ Found ${products.length} products`);
            
            // Organize by quality tier
            const oem = products.filter(p => p.quality === 'oem').map(p => p.price);
            const premium = products.filter(p => p.quality === 'premium').map(p => p.price);
            const economy = products.filter(p => p.quality === 'economy').map(p => p.price);

            // Get lowest price for each tier (or calculate)
            const pricing = {
              oem: oem.length > 0 ? Math.min(...oem) : null,
              premium: premium.length > 0 ? Math.min(...premium) : (products.length > 0 ? Math.min(...products.map(p => p.price)) : null),
              economy: economy.length > 0 ? Math.min(...economy) : null
            };

            // If we found prices, save them
            if (pricing.oem || pricing.premium || pricing.economy) {
              allPricing[model][part.repairType] = pricing;
              console.log(`    💰 OEM: $${pricing.oem || 'N/A'} | Premium: $${pricing.premium || 'N/A'} | Economy: $${pricing.economy || 'N/A'}`);
              successfulSearches++;
            }
          } else {
            console.log(`    ⚠️  No products found`);
          }

          // Small delay between searches
          await page.waitForTimeout(1000);

        } catch (error) {
          console.log(`    ❌ Error: ${error.message}`);
        }
      }
    }

    // Save results
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `mobilesentrix-prices-${timestamp}.json`;
    fs.writeFileSync(filename, JSON.stringify(allPricing, null, 2));

    console.log('\n' + '='.repeat(50));
    console.log('✅ Scraping Complete!');
    console.log(`📊 Successful: ${successfulSearches}/${totalSearches} searches`);
    console.log(`💾 Results saved to: ${filename}`);
    console.log('='.repeat(50));

    // Show sample
    console.log('\n📋 Sample Results:');
    const firstModel = Object.keys(allPricing)[0];
    if (firstModel) {
      console.log(`\n${firstModel}:`);
      console.log(JSON.stringify(allPricing[firstModel], null, 2));
    }

    console.log('\n👉 Press Enter to close browser...');
    await new Promise(resolve => {
      process.stdin.once('data', () => resolve());
    });

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await page.screenshot({ path: 'scraper-error.png' });
    console.log('Screenshot saved to scraper-error.png');
  } finally {
    await browser.close();
    console.log('\nBrowser closed. Check the JSON file for results!');
    process.exit(0);
  }
}

// Run the scraper
scrapeMobileSentrix();


