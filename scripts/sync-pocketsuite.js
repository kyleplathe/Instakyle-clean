import PocketSuiteScraper from '../backend/src/services/PocketSuiteScraper.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function main() {
  try {
    console.log('Starting PocketSuite price sync...');
    const prices = await PocketSuiteScraper.scrapePrices();
    console.log('Successfully synced prices:', prices);
  } catch (error) {
    console.error('Failed to sync prices:', error);
    process.exit(1);
  }
}

main(); 