import puppeteer from 'puppeteer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COOKIES_PATH = join(__dirname, 'mobilesentrix-cookies.json');

(async () => {
  console.log('=== MobileSentrix Manual Login - Cookie Saver ===\n');
  console.log('Instructions:');
  console.log('1. A browser window will open');
  console.log('2. Login to MobileSentrix manually');
  console.log('3. After successful login, come back here and press Enter');
  console.log('4. Your session will be saved for future use\n');

  const browser = await puppeteer.launch({
    headless: false, // Show browser
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized'],
    defaultViewport: null
  });

  const page = await browser.newPage();
  
  try {
    console.log('Opening MobileSentrix login page...\n');
    await page.goto('https://www.mobilesentrix.com/customer/account/login', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    console.log('✓ Page loaded!');
    console.log('\n👉 Please login manually in the browser window...');
    console.log('👉 After login, press Enter here to save your session...\n');

    // Wait for user to press Enter
    await new Promise(resolve => {
      process.stdin.once('data', () => {
        resolve();
      });
    });

    console.log('\nSaving cookies...');
    
    // Get all cookies
    const cookies = await page.cookies();
    
    // Save cookies to file
    fs.writeFileSync(COOKIES_PATH, JSON.stringify(cookies, null, 2));
    
    console.log(`✅ Cookies saved to: ${COOKIES_PATH}`);
    console.log(`📦 Saved ${cookies.length} cookies`);
    
    // Verify login by checking current URL
    const currentUrl = page.url();
    console.log(`\nCurrent URL: ${currentUrl}`);
    
    if (currentUrl.includes('customer/account') && !currentUrl.includes('login')) {
      console.log('✅ Login successful! You are logged in.');
    } else {
      console.log('⚠️  Warning: You might not be logged in yet. Please verify.');
    }
    
    console.log('\nYou can now close this window or press Ctrl+C');
    console.log('Your session is saved and will be used for future scraping!\n');
    
    // Keep browser open for a bit so user can verify
    await new Promise(resolve => setTimeout(resolve, 5000));
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
    console.log('Browser closed. Session saved!');
    process.exit(0);
  }
})();

