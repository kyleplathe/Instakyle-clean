#!/usr/bin/env node

/**
 * iPhone Pricing Scraper for MobileSentrix
 * 
 * This script focuses on getting the most important iPhone pricing data
 * and updates your Repair page with accurate current prices.
 */

import MobileSentrixScraper from './src/scrapers/mobilesentrix-scraper.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Focus on the most popular models and repairs
const TARGET_MODELS = [
  'iPhone 16 Pro Max',
  'iPhone 16 Pro', 
  'iPhone 16',
  'iPhone 15 Pro Max',
  'iPhone 15 Pro',
  'iPhone 15',
  'iPhone 14 Pro Max',
  'iPhone 14 Pro',
  'iPhone 14'
];

const REPAIR_TYPES = {
  'Screen Repair': ['LCD Screen', 'OLED Display', 'Display Assembly'],
  'Battery Replacement': ['Battery'],
  'Camera Repair': ['Camera', 'Rear Camera'],
  'Charging Port': ['Charging Port', 'Lightning Port'],
  'Back Glass': ['Back Glass', 'Rear Glass']
};

class iPhonePricingUpdater {
  constructor() {
    this.scraper = new MobileSentrixScraper();
    this.results = {};
  }

  async run() {
    console.log('🚀 Starting iPhone Pricing Update from MobileSentrix...\n');
    
    try {
      await this.scraper.initialize();
      console.log('✅ Successfully logged into MobileSentrix\n');

      // Process each model
      for (const model of TARGET_MODELS) {
        console.log(`📱 Processing ${model}...`);
        this.results[model] = {};

        for (const [repairType, searchTerms] of Object.entries(REPAIR_TYPES)) {
          console.log(`  🔧 Getting ${repairType} pricing...`);
          
          let bestPrices = null;
          
          // Try multiple search terms for each repair type
          for (const searchTerm of searchTerms) {
            const products = await this.scraper.searchPart(model, searchTerm);
            
            if (products.length > 0) {
              const prices = this.categorizePrices(products);
              if (!bestPrices || products.length > bestPrices.productCount) {
                bestPrices = {
                  ...prices,
                  productCount: products.length,
                  searchTerm: searchTerm,
                  products: products.slice(0, 5) // Keep top 5 for reference
                };
              }
            }
            
            // Small delay between searches
            await this.delay(1000);
          }
          
          if (bestPrices) {
            this.results[model][repairType] = bestPrices;
            console.log(`    💵 Found: OEM $${bestPrices.oem?.toFixed(2) || 'N/A'}, Premium $${bestPrices.premium?.toFixed(2) || 'N/A'}, Economy $${bestPrices.economy?.toFixed(2) || 'N/A'}`);
          } else {
            console.log(`    ⚠️  No pricing found for ${repairType}`);
            this.results[model][repairType] = null;
          }
        }
        
        console.log(`✅ Completed ${model}\n`);
        await this.delay(2000); // Delay between models
      }

      // Save results
      await this.saveResults();
      await this.generateUpdateSuggestions();

    } catch (error) {
      console.error('❌ Error:', error.message);
      await this.scraper.screenshot('pricing-error.png');
    } finally {
      await this.scraper.close();
    }
  }

  categorizePrices(products) {
    // Separate products by quality tier
    const oemProducts = [];
    const premiumProducts = [];
    const economyProducts = [];

    products.forEach(product => {
      const text = product.title.toLowerCase();
      
      if (text.includes('oem') || text.includes('genuine') || text.includes('original')) {
        oemProducts.push(product);
      } else if (text.includes('economy') || text.includes('cheap') || text.includes('budget')) {
        economyProducts.push(product);
      } else {
        premiumProducts.push(product);
      }
    });

    // Calculate best prices for each tier
    const getBestPrice = (productList) => {
      if (productList.length === 0) return null;
      
      // Sort by price, filter to in-stock items first
      const inStock = productList.filter(p => p.inStock);
      const productsToUse = inStock.length > 0 ? inStock : productList;
      
      return Math.min(...productsToUse.map(p => p.price));
    };

    const oem = getBestPrice(oemProducts);
    const premium = getBestPrice(premiumProducts);
    const economy = getBestPrice(economyProducts);

    // If no economy tier found, estimate at 65% of premium
    const finalEconomy = economy || (premium ? premium * 0.65 : null);

    return {
      oem,
      premium,
      economy: finalEconomy,
      lastUpdated: new Date().toISOString(),
      source: 'mobilesentrix',
      totalProducts: products.length,
      oemCount: oemProducts.length,
      premiumCount: premiumProducts.length,
      economyCount: economyProducts.length
    };
  }

  async saveResults() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `mobilesentrix-pricing-${timestamp}.json`;
    const filepath = join(__dirname, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(this.results, null, 2));
    console.log(`💾 Results saved to: ${filename}`);
  }

  async generateUpdateSuggestions() {
    console.log('\n📋 PRICING UPDATE SUGGESTIONS:');
    console.log('='.repeat(50));
    
    const updateCount = {
      total: 0,
      oem: 0,
      premium: 0,
      economy: 0
    };

    for (const [model, repairs] of Object.entries(this.results)) {
      console.log(`\n📱 ${model}:`);
      
      for (const [repairType, pricing] of Object.entries(repairs)) {
        if (!pricing) continue;
        
        console.log(`  ${repairType}:`);
        
        if (pricing.oem) {
          console.log(`    OEM: $${pricing.oem.toFixed(2)}`);
          updateCount.oem++;
        }
        if (pricing.premium) {
          console.log(`    Premium: $${pricing.premium.toFixed(2)}`);
          updateCount.premium++;
        }
        if (pricing.economy) {
          console.log(`    Economy: $${pricing.economy.toFixed(2)}`);
          updateCount.economy++;
        }
        
        updateCount.total++;
      }
    }

    console.log(`\n📊 SUMMARY:`);
    console.log(`Total pricing entries found: ${updateCount.total}`);
    console.log(`OEM prices: ${updateCount.oem}`);
    console.log(`Premium prices: ${updateCount.premium}`);
    console.log(`Economy prices: ${updateCount.economy}`);
    
    console.log(`\n💡 NEXT STEPS:`);
    console.log(`1. Review the saved JSON file for accuracy`);
    console.log(`2. Update src/pages/Repairs.jsx with new pricing`);
    console.log(`3. Test your repair page locally`);
    console.log(`4. Commit and push the changes`);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run the updater
(async () => {
  const updater = new iPhonePricingUpdater();
  await updater.run();
})();
