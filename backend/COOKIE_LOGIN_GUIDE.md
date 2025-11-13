# MobileSentrix Cookie-Based Login Guide

## Quick Start

### Step 1: Manual Login (One Time Only)

Run this command to save your session:

```bash
cd backend
node login-and-save-cookies.js
```

**What happens:**
1. A browser window opens
2. Login to MobileSentrix manually with your credentials
3. After successful login, press Enter in the terminal
4. Your session cookies are saved

**You only need to do this once!** (or when your session expires)

### Step 2: Run the Scraper

Now you can run the scraper normally:

```bash
node test-mobilesentrix.js
```

The scraper will:
- Load your saved cookies automatically
- Verify you're logged in
- Start scraping prices

## How It Works

1. **First Time Setup**
   - You login manually in a real browser
   - Cookies are saved to `mobilesentrix-cookies.json`
   - This file is gitignored (never committed)

2. **Future Runs**
   - Scraper loads saved cookies
   - No manual login needed
   - Continues until session expires

3. **Session Expiration**
   - When cookies expire, you'll see an error
   - Just run `login-and-save-cookies.js` again
   - Gets a fresh session

## Files Created

- `mobilesentrix-cookies.json` - Your saved session (DO NOT COMMIT!)
- Already added to `.gitignore`

## Troubleshooting

### "No cookies found" Error
**Solution:** Run `node login-and-save-cookies.js` first

### "Session expired" Error
**Solution:** Your session timed out. Run `node login-and-save-cookies.js` again

### Still Can't Login
**Solution:** 
1. Check that you can login normally on mobilesentrix.com
2. Try clearing browser cache
3. Check for any 2FA requirements

## Security

✅ Cookies are stored locally only  
✅ Never committed to git  
✅ Only you have access to them  
✅ Expires after MobileSentrix session timeout  

## Benefits vs Traditional Login

| Method | Reliability | Setup |
|--------|-------------|-------|
| Cookie-based | ✅ Very High | One-time manual |
| Auto-login script | ❌ Low (site changes break it) | Complex selectors |
| API | ✅ Best | Requires API access |

## Next Steps

After successful login, you can:

1. **Test a single product search:**
   ```bash
   node test-mobilesentrix.js
   ```

2. **Get all iPhone pricing:**
   ```javascript
   // Edit test-mobilesentrix.js and uncomment:
   const allPricing = await scraper.getAlliPhonePricing();
   ```

3. **Integrate with your pricing system:**
   ```javascript
   import MobileSentrixScraper from './src/scrapers/mobilesentrix-scraper.js';
   
   const scraper = new MobileSentrixScraper();
   await scraper.initialize();
   const pricing = await scraper.getRepairPricing('iPhone 15 Pro Max', 'Screen Repair');
   ```

## Maintenance

- **Monthly**: Relogin if you notice errors
- **After password change**: Run login script again
- **Site updates**: May need to update scraper selectors

---

**Created**: October 18, 2025  
**Method**: Cookie-based authentication  
**Reliability**: ⭐⭐⭐⭐⭐

