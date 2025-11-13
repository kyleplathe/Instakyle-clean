# Manual Price Update Checklist

## When to Update
- **Every 3 months** (January, April, July, October)
- Or when you notice significant market price changes
- Or when new iPhone models are released

---

## Quick Update Process (15 minutes)

### 1. Research Prices (10 min)

Login to MobileSentrix in Safari and check prices for popular models.

**Priority Models:**
- [ ] iPhone 16 Pro Max
- [ ] iPhone 16 Pro  
- [ ] iPhone 15 Pro Max
- [ ] iPhone 15 Pro
- [ ] iPhone 14 Pro Max

**Parts to Check:**
- [ ] Screen/Display
- [ ] Battery
- [ ] Camera
- [ ] Charging Port
- [ ] Back Glass

**Note Format:**
```
iPhone 15 Pro Max Screen: 
  MobileSentrix Premium: $___
  (OEM = Apple price, Economy = 65% of Premium)
```

---

### 2. Check Apple Official Prices (2 min)

Go to: https://support.apple.com/iphone/repair/service

Note Apple's out-of-warranty prices (these become your OEM tier).

---

### 3. Update Code (3 min)

Open: `src/pages/Repairs.jsx`

Find the `repairTypes` section (around line 63) and update:

```javascript
'iPhone': {
  'Screen Repair': {
    oem: 329.00,      // Apple's official price
    premium: 149.99,  // MobileSentrix price
    economy: 97.49    // 65% of premium
  },
  'Battery Replacement': {
    oem: 99.00,
    premium: 79.99,
    economy: 51.99
  },
  // ... update other repairs
}
```

**Formula for Economy:**
```
Economy = Premium × 0.65
```

---

### 4. Test Locally

```bash
cd /Volumes/Extreme\ Pro/Work/Dev\ Project/Instakyle\ Website/instakyle-clean
npm run dev
```

Visit: http://localhost:5173/repairs

Check:
- [ ] Prices display correctly
- [ ] All 3 tiers show
- [ ] Calculations work with tax/fees

---

### 5. Commit & Push

```bash
git add src/pages/Repairs.jsx
git commit -m "chore: Q[X] 2025 pricing update - Updated iPhone repair prices"
git push origin main
```

---

## Price Update Template

Copy this and fill in as you research:

```
DATE: ___________
SOURCE: MobileSentrix

=== iPhone 16 Pro Max ===
Screen: Premium: $___ → Economy: $___
Battery: Premium: $___ → Economy: $___
Camera: Premium: $___ → Economy: $___
Charging Port: Premium: $___ → Economy: $___
Back Glass: Premium: $___ → Economy: $___

=== iPhone 16 Pro ===
Screen: Premium: $___ → Economy: $___
Battery: Premium: $___ → Economy: $___
Camera: Premium: $___ → Economy: $___

=== iPhone 15 Pro Max ===
Screen: Premium: $___ → Economy: $___
Battery: Premium: $___ → Economy: $___
Camera: Premium: $___ → Economy: $___

APPLE OEM PRICES (from Apple.com):
iPhone 16/15 Screen: $___
iPhone 16/15 Battery: $___
```

---

## Pricing Strategy

### OEM Tier (Apple Official)
- Get from: https://support.apple.com/iphone/repair/service
- Same for all Pro models usually
- Examples: Screen $329, Battery $99

### Premium Tier (Your Main Business)
- Get from: MobileSentrix, Mobile Defenders, etc.
- This is your profit center
- Aim for 50-60% of Apple's price

### Economy Tier (Budget Option)
- Calculate: Premium × 0.65
- Or check actual economy parts on MobileSentrix
- Good for old devices, trade-ins

---

## Next Update Schedule

- **Last Updated:** ___________
- **Next Update:** ___________ (3 months from now)
- **Updated By:** ___________

---

## Notes Section

### Q4 2025 (Oct 2025)
- Initial pricing setup
- iPhone 17 series marked as "Coming Soon"
- Current prices are estimates

### Q1 2026 (Jan 2026)
- [ ] TODO: First quarterly update
- [ ] Check if iPhone 17 released
- [ ] Update actual prices

### Q2 2026 (Apr 2026)
- [ ] TODO

### Q3 2026 (Jul 2026)
- [ ] TODO

### Q4 2026 (Oct 2026)
- [ ] TODO

---

## Tips

✅ **Do:**
- Update top 5 most popular models
- Check competitor pricing occasionally
- Keep economy = 65% of premium (simple math)
- Note any major market changes

❌ **Don't:**
- Spend hours on every single model
- Update daily (waste of time)
- Stress about perfection
- Forget to test before pushing

---

**Remember:** Customers choose based on quality tier, not exact prices. Being within $10-20 of market rate is fine!


