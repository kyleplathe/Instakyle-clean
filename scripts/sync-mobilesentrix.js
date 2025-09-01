import MobileSentrixScraper from '../backend/src/services/MobileSentrixScraper.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function main() {
  try {
    console.log('Starting MobileSentrix parts sync...');
    const parts = await MobileSentrixScraper.scrapeParts();
    console.log('Successfully synced parts and generated repair services');
    console.log(`Found ${parts.length} parts across all categories`);
  } catch (error) {
    console.error('Failed to sync parts:', error);
    process.exit(1);
  }
}

main(); 