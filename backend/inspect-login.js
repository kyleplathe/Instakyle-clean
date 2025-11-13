import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

(async () => {
  console.log('=== Inspecting MobileSentrix Login Page ===\n');
  
  const browser = await puppeteer.launch({
    headless: false, // Show browser so we can see what's happening
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  
  try {
    console.log('Navigating to login page...');
    await page.goto('https://www.mobilesentrix.com/account/login', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    console.log('Page loaded! Taking screenshot...');
    await page.screenshot({ path: 'login-page.png', fullPage: true });
    console.log('Screenshot saved as login-page.png');
    
    // Get page HTML
    console.log('\nSaving page HTML...');
    const html = await page.content();
    fs.writeFileSync('login-page.html', html);
    console.log('HTML saved as login-page.html');
    
    // Try to find form elements
    console.log('\nLooking for form elements...');
    
    const formInfo = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input'));
      const buttons = Array.from(document.querySelectorAll('button'));
      const forms = Array.from(document.querySelectorAll('form'));
      
      return {
        inputs: inputs.map(input => ({
          type: input.type,
          name: input.name,
          id: input.id,
          placeholder: input.placeholder,
          class: input.className
        })),
        buttons: buttons.map(button => ({
          type: button.type,
          text: button.textContent.trim(),
          class: button.className
        })),
        forms: forms.map(form => ({
          action: form.action,
          method: form.method,
          class: form.className
        }))
      };
    });
    
    console.log('\nFound inputs:');
    formInfo.inputs.forEach((input, i) => {
      console.log(`  ${i + 1}. Type: ${input.type}, Name: ${input.name || '(none)'}, ID: ${input.id || '(none)'}, Placeholder: ${input.placeholder || '(none)'}`);
    });
    
    console.log('\nFound buttons:');
    formInfo.buttons.forEach((button, i) => {
      console.log(`  ${i + 1}. Type: ${button.type || 'button'}, Text: ${button.text}`);
    });
    
    console.log('\nFound forms:');
    formInfo.forms.forEach((form, i) => {
      console.log(`  ${i + 1}. Action: ${form.action || '(none)'}, Method: ${form.method}`);
    });
    
    console.log('\n✅ Inspection complete!');
    console.log('\nFiles created:');
    console.log('  - login-page.png (screenshot)');
    console.log('  - login-page.html (full HTML)');
    console.log('\nBrowser will stay open for 10 seconds so you can inspect manually...');
    
    await new Promise(resolve => setTimeout(resolve, 10000));
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
    console.log('\nBrowser closed');
  }
})();

