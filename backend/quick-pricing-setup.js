#!/usr/bin/env node

/**
 * Quick Pricing Setup Script
 * 
 * This will guide you through the setup process step by step
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🎯 MobileSentrix Pricing Setup\n');

// Check if .env exists
const envPath = join(__dirname, '../.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ No .env file found. Let\'s create one...\n');
  
  const envContent = `# MobileSentrix Credentials
MOBILESENTRIX_USERNAME=your_email@example.com
MOBILESENTRIX_PASSWORD=your_password_here

# Other settings
NODE_ENV=development
`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file. Please update it with your MobileSentrix credentials.');
  console.log('   Edit: .env');
  console.log('   Add your username and password\n');
}

// Check dependencies
console.log('📦 Checking dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync(join(__dirname, 'package.json'), 'utf8'));
  const hasPuppeteer = packageJson.dependencies?.puppeteer || packageJson.devDependencies?.puppeteer;
  
  if (!hasPuppeteer) {
    console.log('⚠️  Puppeteer not found. Installing...');
    console.log('   Run: npm install puppeteer dotenv');
  } else {
    console.log('✅ Dependencies look good');
  }
} catch (e) {
  console.log('⚠️  Could not check package.json');
}

console.log('\n🚀 SETUP OPTIONS:\n');

console.log('Option 1 - Manual Cookie Setup (Recommended):');
console.log('  1. Run: node login-and-save-cookies.js');
console.log('  2. Login manually in the browser window');
console.log('  3. Press Enter to save session');
console.log('  4. Run: node get-iphone-pricing.js');
console.log('');

console.log('Option 2 - Quick Test:');
console.log('  1. Make sure .env has your credentials');
console.log('  2. Run: node test-mobilesentrix.js');
console.log('');

console.log('📋 What you need:');
console.log('✅ MobileSentrix account with login credentials');
console.log('✅ Node.js with puppeteer installed');
console.log('✅ 10-15 minutes for first setup');
console.log('');

console.log('🎯 Expected Results:');
console.log('• Accurate pricing for iPhone 14-16 series');
console.log('• OEM, Premium, and Economy tiers');
console.log('• JSON file with all pricing data');
console.log('• Ready to update your Repair page');
