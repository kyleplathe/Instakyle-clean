# Quarterly Pricing Update Workflow

## Overview

Instead of automated scraping (which has CAPTCHA issues), we'll do manual quarterly price updates. This is:
- ✅ More reliable
- ✅ Less maintenance
- ✅ Avoids CAPTCHA problems
- ✅ Good enough for pricing that doesn't change daily

## Quarterly Schedule

- **Q1**: January - Review and update
- **Q2**: April - Review and update
- **Q3**: July - Review and update
- **Q4**: October - Review and update

## Update Process

### Step 1: Login and Export Data (10-15 minutes)

1. Login to MobileSentrix.com
2. Browse to each iPhone model's repair parts
3. Note prices for:
   - **OEM/Genuine** parts
   - **Premium/High Quality** aftermarket parts
   - **Economy/Budget** parts

### Step 2: Update Pricing File

Open `src/pages/Repairs.jsx` and update the `repairTypes` object:

```javascript
const repairTypes = {
  'iPhone': {
    'Screen Repair': {
      oem: 329.00,      // ← Update these
      premium: 149.99,  // ← Update these
      economy: 89.99    // ← Update these
    },
    'Battery Replacement': {
      oem: 99.00,
      premium: 79.99,
      economy: 49.99
    },
    // ... etc
  }
};
```

### Step 3: Update Apple OEM Prices

Check Apple's official out-of-warranty prices:
https://support.apple.com/iphone/repair/service

Update in `backend/src/services/ApplePriceScraper.js`

### Step 4: Test Locally

```bash
npm run dev
```

Go to `/repairs` and verify:
- Prices display correctly
- All 3 tiers show
- Calculations work

### Step 5: Deploy

```bash
git add .
git commit -m "chore: Q[X] 2025 pricing update"
git push origin main
```

---

## Quick Reference: Where to Get Prices

### OEM/Genuine Apple Parts
- **Source**: Apple.com official pricing
- **URL**: https://support.apple.com/iphone/repair/service
- **Use for**: OEM tier pricing

### Premium Aftermarket Parts
- **Source**: MobileSentrix, Mobile Defenders, Injured Gadgets
- **Strategy**: Average of 2-3 suppliers
- **Use for**: Premium tier pricing

### Economy Parts
- **Strategy**: 60-70% of Premium pricing
- **Rule of thumb**: Premium price × 0.65
- **Use for**: Economy tier pricing

---

## Pricing Template (Copy & Fill Out)

```
iPhone 16 Pro Max:
- Screen Repair: OEM: $___ | Premium: $___ | Economy: $___
- Battery: OEM: $___ | Premium: $___ | Economy: $___
- Camera: OEM: $___ | Premium: $___ | Economy: $___
- Charging Port: OEM: $___ | Premium: $___ | Economy: $___
- Back Glass: OEM: $___ | Premium: $___ | Economy: $___

iPhone 16 Pro:
- Screen Repair: OEM: $___ | Premium: $___ | Economy: $___
- Battery: OEM: $___ | Premium: $___ | Economy: $___
...
```

---

## Competitive Analysis (Optional)

Check local competitors:
- uBreakiFix
- CPR Cell Phone Repair
- Local repair shops

Make sure your pricing is competitive but profitable.

---

## Pricing Strategy Guide

### OEM Tier
- Match or slightly beat Apple's official prices
- Target: Apple Store customers who want genuine parts
- Margin: Lower, but builds trust

### Premium Tier (Most Popular)
- Your main profit center
- Price: 50-60% of Apple OEM pricing
- Target: Most customers (best value)
- Margin: Healthy profit margin

### Economy Tier
- Budget option
- Price: 60-70% of Premium
- Target: Older devices, trade-ins, data recovery
- Margin: Lower, but captures price-sensitive customers

---

## Time Commitment

- **Initial Setup**: 30 minutes
- **Quarterly Update**: 15-20 minutes
- **Annual Total**: ~1-2 hours

Much better than maintaining a scraper that breaks every time the website changes!

---

## Future: API Integration

If MobileSentrix offers API access in the future:
- Contact their sales team
- Request API documentation
- We can automate with their official API
- Much more reliable than scraping

---

## Notes Section

Use this space to track pricing trends:

**Q4 2025 Notes:**
- iPhone 16 series prices stable
- Battery prices increased 5%
- Screen prices competitive

**Q1 2026 Notes:**
- [Add your notes here]

---

**Last Updated**: October 2025  
**Next Review**: January 2026  
**Method**: Manual quarterly updates


