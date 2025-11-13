import MobileSentrixScraper from './src/scrapers/mobilesentrix-scraper.js';

(async () => {
  const scraper = new MobileSentrixScraper();
  
  try {
    console.log('=== MobileSentrix Scraper Test ===\n');
    console.log('Credentials loaded:');
    console.log('Username:', process.env.MOBILESENTRIX_USERNAME ? '✓ Found' : '✗ Not found');
    console.log('Password:', process.env.MOBILESENTRIX_PASSWORD ? '✓ Found' : '✗ Not found');
    console.log('');
    
    await scraper.initialize();
    
    // Test search for iPhone 15 Pro Max screen
    console.log('\n--- Testing Part Search ---');
    const products = await scraper.searchPart('iPhone 15 Pro Max', 'LCD Screen');
    console.log(`\nFound ${products.length} products`);
    if (products.length > 0) {
      console.log('Sample product:', JSON.stringify(products[0], null, 2));
    }
    
    // Get pricing for repair
    console.log('\n--- Testing Repair Pricing ---');
    const pricing = await scraper.getRepairPricing('iPhone 15 Pro Max', 'Screen Repair');
    console.log('\nPricing:', JSON.stringify(pricing, null, 2));
    
    console.log('\n✅ Test completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('Stack:', error.stack);
    console.log('\nTaking screenshot for debugging...');
    await scraper.screenshot('error-screenshot.png');
    console.log('Screenshot saved as error-screenshot.png');
  } finally {
    await scraper.close();
  }
})();

