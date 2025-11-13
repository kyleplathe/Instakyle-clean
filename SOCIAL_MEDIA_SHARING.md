# Social Media Sharing Best Practices

## ✅ What's Already Implemented

I've added comprehensive Open Graph and Twitter Card meta tags to your `index.html` file. These tags control how your website appears when shared on:
- **Facebook**
- **Twitter/X**
- **LinkedIn**
- **WhatsApp**
- **iMessage**
- **Slack**
- **Discord**
- And other social platforms

## 📋 Current Meta Tags Added

- **Open Graph tags** - For Facebook, LinkedIn, WhatsApp
- **Twitter Card tags** - For X (Twitter)
- **SEO meta tags** - Description, keywords, canonical URL
- **Theme color** - Matches your brand gradient

## 🎨 Next Steps: Create a Social Sharing Image

### Recommended Image Specifications:
- **Dimensions**: 1200px × 630px (1.91:1 aspect ratio)
- **Format**: PNG or JPG
- **File size**: Under 1MB (preferably 200-300KB)
- **Content**: Your logo + compelling text/call-to-action

### What to Include in the Image:
1. **Instakyle Tech Pro Logo** (red logo)
2. **Tagline**: "Expert Device Repair Services" or "Professional Device Repairs"
3. **Key Services**: iPhone, iPad, Mac, Gaming Console Repairs
4. **Contact Info**: Phone number or "Text: (952) 522-3029"
5. **Brand colors**: Use your gradient colors (#667eea to #764ba2) or red from logo

### Design Tips:
- Use high contrast text that's readable
- Keep important text in the center (avoid edges where platforms may crop)
- Make it eye-catching but professional
- Include your logo prominently
- Use your brand colors for consistency

### Tools to Create the Image:
- **Canva** (free templates for social sharing images)
- **Adobe Photoshop/Illustrator**
- **Figma** (free design tool)
- **Online generators**: Social Image Resizer, Shareable Image Generator

## 📝 Important: Update Your Domain URL

In `index.html`, the URLs are set to `https://instakyleiphonerepair.com/` (your actual domain).

- Line 19: `<meta property="og:url" content="https://instakyleiphonerepair.com/" />`
- Line 40: `<link rel="canonical" href="https://instakyleiphonerepair.com/" />`

## 🖼️ After Creating Your Social Image

1. **Save the image** as `og-image.png` or `social-share.png` in your `public/` folder
2. **Update `index.html`** to reference the new image:
   - Change line 22: `<meta property="og:image" content="https://instakyleiphonerepair.com/og-image.png" />`
   - Change line 34: `<meta name="twitter:image" content="https://instakyleiphonerepair.com/og-image.png" />`

## 🧪 Testing Your Link Preview

### Test on Facebook:
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter your website URL
3. Click "Scrape Again" to clear cache
4. Preview how it looks

### Test on Twitter/X:
1. Go to: https://cards-dev.twitter.com/validator
2. Enter your website URL
3. See the preview

### Test on LinkedIn:
1. Go to: https://www.linkedin.com/post-inspector/
2. Enter your website URL
3. Preview the card

## 📱 Best Practices Summary

1. **Image Size**: 1200×630px is ideal (Facebook, Twitter, LinkedIn all support this)
2. **Image Format**: PNG (for transparency) or JPG (for smaller file size)
3. **Title**: Keep it under 60 characters to avoid truncation
4. **Description**: 150-160 characters is optimal
5. **Alt Text**: Always include descriptive alt text for accessibility
6. **Update Regularly**: Refresh your image and description periodically
7. **Test Before Publishing**: Always test link previews before major launches

## 🔄 Refreshing Cache

If you update your meta tags or image but social platforms show the old version:

1. **Facebook**: Use the Sharing Debugger to "Scrape Again"
2. **Twitter**: Wait 24 hours or tweet a direct link to clear cache
3. **LinkedIn**: Use the Post Inspector tool

## 📞 Current Meta Tag Values

- **Title**: "Instakyle Tech Pro - Expert Device Repair Services"
- **Description**: "Professional repair services for iPhones, iPads, Macs, Samsung devices, gaming consoles, and more. Mobile repairs, mail-in service, and local pickup available in Minneapolis metro area."
- **Image**: Currently using `/logo.png` (should be replaced with custom 1200×630px image)

## 🎯 Example Image Ideas

### Option 1: Logo + Services
- Logo at top
- "iPhone • iPad • Mac • Gaming Console Repairs" in the middle
- "Text: (952) 522-3029" at bottom

### Option 2: Logo + Tagline
- Large logo centered
- "Expert Device Repair Services" below
- Gradient background matching your site

### Option 3: Split Layout
- Logo on left
- Services list on right
- Contact info at bottom

Choose what best represents your brand!

