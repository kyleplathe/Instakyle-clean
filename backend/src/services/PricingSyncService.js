import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

class PricingSyncService {
  constructor() {
    this.__filename = fileURLToPath(import.meta.url);
    this.__dirname = path.dirname(this.__filename);
    this.pricingFilePath = path.join(this.__dirname, '../../../pricing.csv');
    this.configPath = path.join(this.__dirname, '../../../src/config/pricing.js');
  }

  async syncPricing() {
    try {
      // Read current pricing from CSV
      const csvContent = fs.readFileSync(this.pricingFilePath, 'utf-8');
      const lines = csvContent.split('\n').slice(1); // Skip header
      
      // Parse CSV into pricing object
      const pricing = {};
      lines.forEach(line => {
        if (!line.trim()) return;
        const [device, price] = line.split(',');
        if (device && price) {
          pricing[device.trim()] = parseFloat(price.trim());
        }
      });

      // Generate pricing configuration
      const configContent = `// This file is auto-generated from pricing.csv
// Last updated: ${new Date().toISOString()}

// Core repair prices from PocketSuite
export const repairPrices = ${JSON.stringify(pricing, null, 2)};

// Device categories for AI training
export const deviceCategories = {
  iPhone: Object.keys(pricing).filter(device => device.toLowerCase().includes('iphone')),
  Samsung: Object.keys(pricing).filter(device => device.toLowerCase().includes('samsung')),
  Google: Object.keys(pricing).filter(device => device.toLowerCase().includes('pixel')),
  Other: Object.keys(pricing).filter(device => 
    !device.toLowerCase().includes('iphone') && 
    !device.toLowerCase().includes('samsung') && 
    !device.toLowerCase().includes('pixel')
  )
};

// Price calculation function
export function getRepairPrice(device) {
  return repairPrices[device] || null;
}

// Get all available devices
export function getAvailableDevices() {
  return Object.keys(repairPrices);
}

// Get devices by category
export function getDevicesByCategory(category) {
  return deviceCategories[category] || [];
}
`;

      // Write updated pricing configuration
      fs.writeFileSync(this.configPath, configContent);
      
      console.log('Successfully synced pricing from PocketSuite');
      return pricing;
    } catch (error) {
      console.error('Error syncing pricing:', error);
      throw error;
    }
  }
}

export default new PricingSyncService(); 