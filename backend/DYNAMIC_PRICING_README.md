# Dynamic AI-Powered Pricing System

## Overview

This system provides intelligent, market-driven pricing for device repairs with three quality tiers:

1. **OEM / Genuine Apple** - Matches Apple's official out-of-warranty prices
2. **High Quality Aftermarket** (Most Popular) - Premium aftermarket parts at competitive prices
3. **Economy** - Budget-friendly options great for data recovery and trade-ins

## Architecture

### Components

1. **DynamicPricingService.js** - Core pricing engine
2. **ApplePriceScraper.js** - Fetches official Apple pricing
3. **MarketAnalyzer.js** - Analyzes competitor and supplier pricing
4. **PricingOptimizer.js** - ML-based price optimization

### Data Sources

#### For OEM Tier (Apple Parts)
- **Primary**: Apple Support website (https://support.apple.com/iphone/repair/service)
- **Secondary**: Apple GSX API (requires authorized service provider credentials)
- **Update Frequency**: Daily
- **Method**: Web scraping + API integration

#### For Premium & Economy Tiers
- **MobileSentrix API** - Parts supplier pricing
- **Injured Gadgets** - Parts supplier pricing (web scraping)
- **iFixit** - Repair cost estimates and parts pricing
- **uBreakiFix** - Competitor service pricing
- **Local Competitors** - Regional pricing data
- **Historical Database** - Internal pricing history and trends

## Implementation Roadmap

### Phase 1: Basic Dynamic Pricing ✅ (Current)
- [x] 3-tier pricing structure implemented
- [x] Static pricing based on Apple's published rates
- [x] UI for tier selection
- [x] Price calculation with quality tiers

### Phase 2: Apple OEM Price Sync
**Timeline**: 1-2 weeks

**Tasks**:
1. Build Apple pricing scraper using Puppeteer
   - Target: https://support.apple.com/iphone/repair/service
   - Extract pricing for all current iPhone models
   - Store in database with timestamps

2. Create automated daily sync job
   ```javascript
   // Run daily at 2 AM
   cron.schedule('0 2 * * *', async () => {
     await DynamicPricingService.updateApplePrices();
   });
   ```

3. Add price change notifications
   - Alert when Apple changes prices
   - Update frontend pricing automatically

**Expected Outcome**: OEM tier always matches Apple's current pricing

### Phase 3: Market Data Integration
**Timeline**: 2-3 weeks

**Tasks**:
1. Integrate MobileSentrix API
   ```javascript
   // Example API call
   const partPrice = await mobileSentrixAPI.getPartPrice({
     device: 'iPhone 17 Pro Max',
     part: 'LCD Screen Assembly'
   });
   ```

2. Build Injured Gadgets scraper
   - Scrape parts catalog
   - Extract pricing and availability
   - Update database

3. Scrape competitor pricing
   - iFixit repair guides and parts
   - uBreakiFix service pricing
   - Local competitors (3-5 businesses)

4. Create price aggregation algorithm
   ```javascript
   const marketPrice = calculateMedianPrice([
     mobileSentrixPrice,
     injuredGadgetsPrice,
     competitorPrices,
     historicalAverage
   ]);
   ```

**Expected Outcome**: Premium tier pricing based on real market data

### Phase 4: AI-Powered Optimization
**Timeline**: 3-4 weeks

**Tasks**:
1. Collect historical data
   - Booking conversion rates
   - Price points and customer choices
   - Seasonal trends
   - Part availability impacts

2. Build ML model for price optimization
   - Train on historical conversion data
   - Consider factors:
     * Device popularity
     * Season/time of year
     * Local market conditions
     * Customer price sensitivity
     * Competitor positioning

3. Implement A/B testing framework
   - Test different price points
   - Measure conversion rates
   - Auto-adjust based on results

4. Integration with OpenAI API (optional)
   ```javascript
   const priceRecommendation = await openai.chat.completions.create({
     model: "gpt-4",
     messages: [{
       role: "user",
       content: `Analyze repair pricing for ${device} ${repairType}. 
                 Current market data: ${JSON.stringify(marketData)}.
                 Recommend optimal pricing for premium and economy tiers.`
     }]
   });
   ```

**Expected Outcome**: Prices automatically optimize for conversion and profitability

### Phase 5: Advanced Features
**Timeline**: 4-6 weeks

**Features**:
1. Dynamic surge pricing
   - Higher prices during peak demand
   - Lower prices during slow periods

2. Personalized pricing
   - Repeat customer discounts
   - Referral pricing
   - Location-based adjustments

3. Predictive analytics
   - Forecast price trends
   - Anticipate supply chain issues
   - Proactive price adjustments

4. Real-time competitor monitoring
   - Continuous competitor price tracking
   - Automatic competitive adjustments
   - Price match capabilities

## API Endpoints

### Get Current Pricing
```javascript
GET /api/pricing/:device/:repair
Response: {
  oem: 329.00,
  premium: 149.99,
  economy: 89.99,
  lastUpdated: "2025-01-15T10:00:00Z",
  confidence: 0.95
}
```

### Update Pricing (Admin)
```javascript
POST /api/pricing/update
Response: {
  success: true,
  timestamp: "2025-01-15T10:00:00Z",
  pricesUpdated: 156
}
```

### Get Pricing Analytics
```javascript
GET /api/pricing/analytics
Response: {
  averagePrices: {...},
  priceChanges: [...],
  marketTrends: {...}
}
```

## Database Schema

### Pricing Table
```sql
CREATE TABLE repair_pricing (
  id SERIAL PRIMARY KEY,
  device_type VARCHAR(50),
  device_model VARCHAR(100),
  repair_type VARCHAR(100),
  quality_tier VARCHAR(20),
  price DECIMAL(10, 2),
  source VARCHAR(50),
  confidence DECIMAL(3, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pricing_lookup ON repair_pricing(device_model, repair_type, quality_tier);
```

### Price History Table
```sql
CREATE TABLE price_history (
  id SERIAL PRIMARY KEY,
  pricing_id INTEGER REFERENCES repair_pricing(id),
  old_price DECIMAL(10, 2),
  new_price DECIMAL(10, 2),
  change_reason VARCHAR(255),
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Market Data Table
```sql
CREATE TABLE market_data (
  id SERIAL PRIMARY KEY,
  source VARCHAR(50),
  device_model VARCHAR(100),
  repair_type VARCHAR(100),
  price DECIMAL(10, 2),
  availability BOOLEAN,
  scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables

```env
# Apple Pricing
APPLE_GSX_USERNAME=your_username
APPLE_GSX_PASSWORD=your_password
APPLE_GSX_SOLD_TO=your_sold_to_number

# MobileSentrix API
MOBILESENTRIX_API_KEY=your_api_key
MOBILESENTRIX_API_URL=https://api.mobilesentrix.com

# OpenAI (for AI optimization)
OPENAI_API_KEY=your_openai_key

# Database
PRICING_DB_URL=postgresql://user:pass@localhost/instakyle_pricing

# Cron Settings
PRICING_UPDATE_SCHEDULE=0 2 * * *  # Daily at 2 AM
```

## Monitoring & Alerts

### Metrics to Track
1. Price update success rate
2. API response times
3. Scraper success rates
4. Price change frequency
5. Booking conversion rates by price tier

### Alerts
- Apple price changes detected
- Scraper failures
- Pricing significantly different from market
- Database sync issues

## Testing

```bash
# Run pricing service tests
npm test -- backend/src/services/DynamicPricingService.test.js

# Test Apple scraper
npm run test:scraper:apple

# Test market analysis
npm run test:market-analysis

# Test full pricing update
npm run pricing:update:test
```

## Security Considerations

1. **API Keys**: Store all API keys in environment variables, never in code
2. **Rate Limiting**: Implement rate limiting on scrapers to avoid IP bans
3. **Data Validation**: Validate all scraped data before storing
4. **Price Bounds**: Set min/max price boundaries to prevent errors
5. **Audit Trail**: Log all price changes with reasons

## Cost Estimates

### Monthly Operating Costs
- **MobileSentrix API**: $50-100/month
- **OpenAI API** (optional): $20-50/month for price analysis
- **Scraping Infrastructure**: $10-20/month (proxies/servers)
- **Database Storage**: $10/month
- **Total**: ~$90-180/month

### ROI Potential
- Better price competitiveness
- Higher conversion rates (estimated +15-25%)
- Reduced manual price management time (save 10-15 hours/month)
- Always-current pricing reduces customer service inquiries

## Next Steps

1. ✅ Set up basic 3-tier pricing structure (COMPLETED)
2. ⏭️ Build Apple pricing scraper
3. ⏭️ Integrate MobileSentrix API
4. ⏭️ Set up automated daily sync
5. ⏭️ Build analytics dashboard
6. ⏭️ Implement A/B testing
7. ⏭️ Deploy ML-based optimization

## Support & Maintenance

- **Owner**: Development Team
- **Documentation**: This file + inline code comments
- **Updates**: Review pricing strategy quarterly
- **Compliance**: Ensure pricing transparency and fair pricing practices

---

**Last Updated**: October 18, 2025
**Version**: 1.0
**Status**: Phase 1 Complete, Phase 2 Planning

