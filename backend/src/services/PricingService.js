import { getPartsPrice } from './PartsService.js';

class PricingService {
  constructor() {
    this.baseRates = {
      screen: {
        iPhone: {
          'iPhone 12': { base: 199, premium: 249, competitive: 179 },
          'iPhone 13': { base: 229, premium: 279, competitive: 199 },
          'iPhone 14': { base: 249, premium: 299, competitive: 219 },
          // Add more models
        },
        Samsung: {
          'Galaxy S21': { base: 179, premium: 229, competitive: 159 },
          'Galaxy S22': { base: 199, premium: 249, competitive: 179 },
          // Add more models
        }
      },
      battery: {
        iPhone: {
          'iPhone 12': { base: 79, premium: 99, competitive: 69 },
          'iPhone 13': { base: 89, premium: 109, competitive: 79 },
          'iPhone 14': { base: 99, premium: 119, competitive: 89 },
          // Add more models
        },
        Samsung: {
          'Galaxy S21': { base: 69, premium: 89, competitive: 59 },
          'Galaxy S22': { base: 79, premium: 99, competitive: 69 },
          // Add more models
        }
      }
    };

    this.travelRates = {
      baseFee: 25,
      perMileRate: 2.5,
      minimumDistance: 5, // miles
      maximumDistance: 30 // miles
    };
  }

  async calculateRepairPrice(deviceModel, repairType, pricingTier = 'premium') {
    const deviceBrand = this.getDeviceBrand(deviceModel);
    const basePrice = this.baseRates[repairType]?.[deviceBrand]?.[deviceModel]?.[pricingTier];

    if (!basePrice) {
      throw new Error(`No pricing data available for ${deviceModel} ${repairType}`);
    }

    // Get parts cost
    const partsCost = await this.getPartsCost(deviceModel, repairType);
    
    // Calculate labor cost (30% of base price)
    const laborCost = basePrice * 0.3;
    
    // Apply brand experience multiplier
    const brandMultiplier = 1.25; // 25% premium for brand experience
    
    // Calculate total price
    const totalPrice = (basePrice + partsCost + laborCost) * brandMultiplier;
    
    return {
      basePrice,
      partsCost,
      laborCost,
      brandMultiplier,
      totalPrice,
      pricingTier
    };
  }

  calculateTravelFee(distance) {
    if (distance < this.travelRates.minimumDistance) {
      return this.travelRates.baseFee;
    }

    if (distance > this.travelRates.maximumDistance) {
      throw new Error(`Distance exceeds maximum travel range of ${this.travelRates.maximumDistance} miles`);
    }

    return this.travelRates.baseFee + (distance * this.travelRates.perMileRate);
  }

  getDeviceBrand(deviceModel) {
    if (deviceModel.toLowerCase().includes('iphone')) return 'iPhone';
    if (deviceModel.toLowerCase().includes('galaxy')) return 'Samsung';
    // Add more brand detection logic
    return 'Other';
  }

  async getPartsCost(deviceModel, repairType) {
    // This would integrate with your parts scraping system
    const partsList = await this.getRequiredParts(deviceModel, repairType);
    let totalCost = 0;

    for (const part of partsList) {
      const price = await getPartsPrice(part.partNumber);
      totalCost += price * part.quantity;
    }

    return totalCost;
  }

  async getRequiredParts(deviceModel, repairType) {
    // This would be populated from your parts database
    // Example structure:
    return [
      {
        partNumber: `${deviceModel}-${repairType}-main`,
        quantity: 1,
        description: `Main ${repairType} component for ${deviceModel}`
      }
      // Add more parts as needed
    ];
  }

  getCompetitivePrice(deviceModel, repairType) {
    const deviceBrand = this.getDeviceBrand(deviceModel);
    return this.baseRates[repairType]?.[deviceBrand]?.[deviceModel]?.competitive || 0;
  }

  getPremiumPrice(deviceModel, repairType) {
    const deviceBrand = this.getDeviceBrand(deviceModel);
    return this.baseRates[repairType]?.[deviceBrand]?.[deviceModel]?.premium || 0;
  }
}

export default new PricingService(); 