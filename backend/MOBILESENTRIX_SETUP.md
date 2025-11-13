# MobileSentrix Scraper Setup Guide

## Prerequisites

1. **Active MobileSentrix Account**
   - You need a valid account with login credentials
   - Website: https://www.mobilesentrix.com

2. **Node.js Dependencies**
   ```bash
   cd backend
   npm install puppeteer dotenv
   ```

## Configuration

### Step 1: Create `.env` File

Create a file called `.env` in the `backend` directory:

```bash
cd backend
touch .env
```

### Step 2: Add Your Credentials

Open `backend/.env` and add your MobileSentrix credentials:

```env
# MobileSentrix Credentials
MOBILESENTRIX_USERNAME=your_email@example.com
MOBILESENTRIX_PASSWORD=your_password_here

# Other optional settings
NODE_ENV=development
```

**⚠️ IMPORTANT**: Never commit the `.env` file to git! It's already in `.gitignore`.

### Step 3: Test the Scraper

Run the test script to verify it works:

```bash
cd backend
node src/scrapers/mobilesentrix-scraper.js
```

This will:
1. Login to MobileSentrix using your credentials
2. Search for iPhone 15 Pro Max LCD Screen
3. Display found products and pricing
4. Take screenshots if there are errors

## Usage

### Basic Usage

```javascript
const MobileSentrixScraper = require('./src/scrapers/mobilesentrix-scraper');

const scraper = new MobileSentrixScraper();

try {
  await scraper.initialize();
  
  // Search for a specific part
  const products = await scraper.searchPart('iPhone 15 Pro Max', 'LCD Screen');
  console.log(products);
  
  // Get pricing for a repair type
  const pricing = await scraper.getRepairPricing('iPhone 15 Pro Max', 'Screen Repair');
  console.log(pricing);
  
} finally {
  await scraper.close();
}
```

### Get All iPhone Pricing

```javascript
const scraper = new MobileSentrixScraper();

try {
  await scraper.initialize();
  
  // This will take 10-15 minutes to complete
  const allPricing = await scraper.getAlliPhonePricing();
  
  // Save to file
  const fs = require('fs');
  fs.writeFileSync(
    'mobilesentrix-pricing.json',
    JSON.stringify(allPricing, null, 2)
  );
  
} finally {
  await scraper.close();
}
```

### Integrate with Dynamic Pricing Service

```javascript
const DynamicPricingService = require('./src/services/DynamicPricingService');
const MobileSentrixScraper = require('./src/scrapers/mobilesentrix-scraper');

async function updatePricingFromMobileSentrix() {
  const scraper = new MobileSentrixScraper();
  
  try {
    await scraper.initialize();
    
    // Get pricing for specific model/repair
    const pricing = await scraper.getRepairPricing('iPhone 15 Pro Max', 'Screen Repair');
    
    if (pricing) {
      // Update DynamicPricingService with new market data
      // This would update your database/cache
      console.log('Updated pricing:', pricing);
    }
    
  } finally {
    await scraper.close();
  }
}
```

## Troubleshooting

### Login Issues

If login fails:

1. **Check Credentials**
   - Verify username/password in `.env` file
   - Try logging in manually on the website

2. **Check Selectors**
   - MobileSentrix may have updated their HTML structure
   - Take a screenshot: `await scraper.screenshot('login-debug.png')`
   - Update selectors in the `login()` method

3. **CAPTCHA Protection**
   - MobileSentrix may have CAPTCHA on login
   - May need to use their API instead (if available)
   - Or login once manually and export cookies

### No Products Found

If searches return empty:

1. **Check Search Terms**
   - Verify the model name format matches MobileSentrix
   - Try searching manually on the site first

2. **Update Selectors**
   - Product page structure may have changed
   - Update selectors in `searchPart()` method
   - Take screenshot: `await scraper.screenshot('search-debug.png')`

3. **Rate Limiting**
   - Add delays between requests
   - Already implemented: 1 second delay

### Debugging Tips

```javascript
// Enable debugging
const scraper = new MobileSentrixScraper();
await scraper.initialize();

// Take screenshot of current page
await scraper.screenshot('debug.png');

// Get page HTML
const html = await scraper.page.content();
console.log(html);

// Check current URL
console.log(scraper.page.url());
```

## Customization

### Adjusting Selectors

The scraper uses CSS selectors that may need updating. Main areas:

1. **Login Form** (in `login()` method):
   ```javascript
   await this.page.type('input[type="email"]', this.credentials.username);
   ```

2. **Product Cards** (in `searchPart()` method):
   ```javascript
   const productElements = document.querySelectorAll('.product-item');
   ```

3. **Price Elements**:
   ```javascript
   const priceText = element.querySelector('.price')?.textContent;
   ```

### Adding More Part Types

Edit the `getAlliPhonePricing()` method:

```javascript
const partTypes = [
  'LCD Screen',
  'OLED Display',
  'Battery',
  'Camera',
  'Charging Port',
  'Back Glass',
  'Face ID',        // Add new types here
  'Earpiece Speaker',
  'Vibrator Motor'
];
```

## API Alternative

If scraping becomes difficult, check if MobileSentrix offers an API:

1. Contact MobileSentrix support
2. Ask about API access for pricing data
3. API is usually more reliable than scraping

## Scheduled Updates

To run the scraper daily:

```javascript
// Add to your backend server
const cron = require('node-cron');
const MobileSentrixScraper = require('./src/scrapers/mobilesentrix-scraper');

// Run every day at 3 AM
cron.schedule('0 3 * * *', async () => {
  console.log('Starting MobileSentrix price update...');
  
  const scraper = new MobileSentrixScraper();
  try {
    await scraper.initialize();
    const pricing = await scraper.getAlliPhonePricing();
    
    // Save to database
    // await savePricingToDatabase(pricing);
    
    console.log('Price update complete');
  } catch (error) {
    console.error('Price update failed:', error);
  } finally {
    await scraper.close();
  }
});
```

## Security Best Practices

1. **Never Commit Credentials**
   - Keep `.env` in `.gitignore`
   - Never share screenshots with credentials visible

2. **Rotate Passwords**
   - Change password periodically
   - Use strong, unique passwords

3. **Monitor Usage**
   - Check for unusual activity
   - MobileSentrix may have usage limits

4. **Rate Limiting**
   - Don't scrape too frequently
   - Respect robots.txt
   - Add delays between requests

## Support

If you need help:

1. Check the error screenshots in your backend directory
2. Review MobileSentrix website structure
3. Update selectors as needed
4. Consider using their API if available

---

**Created**: October 18, 2025  
**Last Updated**: October 18, 2025  
**Status**: Ready for testing with your credentials

