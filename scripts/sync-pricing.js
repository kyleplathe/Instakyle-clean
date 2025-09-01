import PricingSyncService from '../backend/src/services/PricingSyncService.js';

async function main() {
  try {
    console.log('Starting pricing sync...');
    const pricing = await PricingSyncService.syncPricing();
    console.log('Successfully synced pricing across all categories');
    console.log(`Updated prices for ${Object.keys(pricing).length} devices`);
  } catch (error) {
    console.error('Failed to sync pricing:', error);
    process.exit(1);
  }
}

main(); 