/**
 * Generate Social Sharing Image using Puppeteer
 * 
 * Run:
 * node generate-social-image.js
 */

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            margin: 0;
            padding: 0;
        }
        
        .social-image {
            width: 1200px;
            height: 630px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 80px 100px;
            font-family: 'Raleway', sans-serif;
            overflow: hidden;
        }
        
        .social-image::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
            border-radius: 50%;
        }
        
        .social-image::after {
            content: '';
            position: absolute;
            bottom: -30%;
            left: -10%;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
            border-radius: 50%;
        }
        
        .content {
            position: relative;
            z-index: 1;
            text-align: center;
            color: white;
            width: 100%;
        }
        
        .logo-symbol {
            font-size: 100px;
            margin-bottom: 30px;
            filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
        }
        
        .brand-name {
            font-size: 80px;
            font-weight: 700;
            margin-bottom: 25px;
            text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
            letter-spacing: -2px;
            line-height: 1.1;
        }
        
        .tagline {
            font-size: 36px;
            font-weight: 400;
            margin-bottom: 45px;
            opacity: 0.95;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            letter-spacing: 0.5px;
        }
        
        .services {
            font-size: 26px;
            font-weight: 500;
            margin-bottom: 35px;
            opacity: 0.92;
            line-height: 1.8;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        .contact-info {
            font-size: 24px;
            font-weight: 500;
            opacity: 0.9;
            padding-top: 25px;
            border-top: 2px solid rgba(255, 255, 255, 0.35);
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
    </style>
</head>
<body>
    <div class="social-image">
        <div class="content">
            <div class="logo-symbol">🔧</div>
            <div class="brand-name">Instakyle Tech Pro</div>
            <div class="tagline">Expert Device Repair Services</div>
            <div class="services">
                iPhone • iPad • Mac • Samsung<br>
                Gaming Console Repairs
            </div>
            <div class="contact-info">
                Text: (952) 522-3029<br>
                Minneapolis Metro Area
            </div>
        </div>
    </div>
</body>
</html>`;

async function generateImage() {
    console.log('🚀 Starting social image generation...');
    
    try {

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 630 });
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        // Wait for fonts to load
        await page.waitForTimeout(1000);
        
        const outputPath = join(__dirname, 'public', 'og-image.png');
        await page.screenshot({
            path: outputPath,
            width: 1200,
            height: 630,
            clip: { x: 0, y: 0, width: 1200, height: 630 }
        });
        
        await browser.close();
        
        console.log('✅ Social sharing image generated successfully!');
        console.log(`📁 Saved to: ${outputPath}`);
        console.log('');
        console.log('📝 Next steps:');
        console.log('   1. The image is already in your public/ folder');
        console.log('   2. Update index.html lines 22 and 34 to use og-image.png');
        console.log('   3. The image will be available at: https://instakyleiphonerepair.com/og-image.png');
        
    } catch (error) {
        console.error('❌ Error generating image:', error.message);
        console.log('');
        console.log('📸 Alternative method:');
        console.log('   1. Open public/og-image-generator.html in your browser');
        console.log('   2. Take a screenshot of the 1200x630px purple card');
        console.log('   3. Save as og-image.png in the public/ folder');
    }
}

generateImage();

