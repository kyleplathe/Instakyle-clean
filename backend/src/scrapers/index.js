import { InjuredGadgetsScraper } from './injured-gadgets-scraper.js';
import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

class ScraperOrchestrator {
  constructor() {
    this.scrapers = [
      new InjuredGadgetsScraper(),
      // Add other scrapers here as they are implemented
    ];
  }

  async initialize() {
    for (const scraper of this.scrapers) {
      await scraper.initialize();
    }
  }

  async loginAll() {
    for (const scraper of this.scrapers) {
      const vendorName = scraper.vendorName.toUpperCase();
      const username = process.env[`${vendorName}_USERNAME`];
      const password = process.env[`${vendorName}_PASSWORD`];
      
      if (!username || !password) {
        logger.error(`Missing credentials for ${vendorName}`);
        continue;
      }

      try {
        await scraper.login(username, password);
        logger.info(`Successfully logged into ${vendorName}`);
      } catch (error) {
        logger.error(`Failed to login to ${vendorName}: ${error.message}`);
      }
    }
  }

  async searchPartAcrossVendors(partNumber) {
    const results = [];
    
    for (const scraper of this.scrapers) {
      try {
        const details = await scraper.getPartDetails(partNumber);
        if (details) {
          results.push(details);
        }
      } catch (error) {
        logger.error(`Error searching part ${partNumber} on ${scraper.vendorName}: ${error.message}`);
      }
    }

    return results;
  }

  async cleanup() {
    for (const scraper of this.scrapers) {
      await scraper.cleanup();
    }
  }
}

// Example usage
async function main() {
  const orchestrator = new ScraperOrchestrator();
  
  try {
    await orchestrator.initialize();
    await orchestrator.loginAll();
    
    // Example part search
    const partNumber = 'IPHONE12-SCREEN';
    const results = await orchestrator.searchPartAcrossVendors(partNumber);
    
    console.log('Search results:', JSON.stringify(results, null, 2));
  } catch (error) {
    logger.error('Main execution error:', error);
  } finally {
    await orchestrator.cleanup();
  }
}

// Run if this file is executed directly
if (process.argv[1] === import.meta.url) {
  main();
}

export { ScraperOrchestrator }; 