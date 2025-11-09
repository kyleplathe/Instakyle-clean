import React, { useState } from 'react';
import '../styles/Repairs.css';

const deviceTypes = {
  'Apple': ['iPhone', 'iPad', 'MacBook', 'iMac', ' Watch'],
  'Samsung': ['Galaxy S', 'Galaxy Note', 'Galaxy Tab'],
  'Google': ['Pixel'],
  'Microsoft': ['Surface', 'Xbox'],
  'Motorola': ['Moto G', 'Moto Edge', 'Razr'],
  'Nintendo': ['Switch'],
  'Sony': ['PlayStation'],
  'Other': ['Other']
};

// Models that are coming soon and should be disabled
const comingSoonModels = [
  'iPhone 17 Pro Max',
  'iPhone 17 Pro',
  'iPhone Air',
  'iPhone 17'
];

// iPhone generations organized by Apple's hierarchy
const iPhoneGenerations = {
  'iPhone': [
    { generation: 'iPhone Air', models: ['iPhone Air'] },
    { generation: '17 Series', models: ['iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17'] },
    { generation: '16 Series', models: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16', 'iPhone 16e'] },
    { generation: '15 Series', models: ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15'] },
    { generation: '14 Series', models: ['iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14'] },
    { generation: '13 Series', models: ['iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13 mini', 'iPhone 13'] },
    { generation: '12 Series', models: ['iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12 mini', 'iPhone 12'] },
    { generation: '11 Series', models: ['iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11'] },
    { generation: 'X Series', models: ['iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X'] },
    { generation: '8 Series', models: ['iPhone 8 Plus', 'iPhone 8'] },
    { generation: 'SE Series', models: ['iPhone SE (3rd gen)', 'iPhone SE (2nd gen)'] }
  ]
};

const deviceModels = {
  'iPhone': [
    'iPhone Air',
    'iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17',
    'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16', 'iPhone 16e',
    'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
    'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
    'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13 mini', 'iPhone 13',
    'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12 mini', 'iPhone 12',
    'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
    'iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X',
    'iPhone 8 Plus', 'iPhone 8',
    'iPhone SE (3rd gen)', 'iPhone SE (2nd gen)',
    'Other'
  ],
  'iPad': ['iPad Pro 12.9"', 'iPad Pro 11"', 'iPad Air', 'iPad Mini', 'iPad (10th gen)', 'iPad (9th gen)', 'Other'],
  'MacBook': ['MacBook Pro 16"', 'MacBook Pro 14"', 'MacBook Pro 13"', 'MacBook Air 15"', 'MacBook Air 13"', 'Other'],
  'iMac': ['iMac 24"', 'iMac 27"', 'Other'],
  ' Watch': [' Watch Ultra 2', ' Watch Ultra', ' Watch Series 10', ' Watch Series 9', ' Watch Series 8', ' Watch Series 7', ' Watch Series 6', ' Watch SE (3rd gen)', ' Watch SE (2nd gen)', ' Watch SE (1st gen)', 'Other'],
  'Galaxy S': ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22', 'Other'],
  'Galaxy Note': ['Galaxy Note 20 Ultra', 'Galaxy Note 20', 'Galaxy Note 10+', 'Galaxy Note 10', 'Other'],
  'Galaxy Tab': ['Galaxy Tab S9 Ultra', 'Galaxy Tab S9+', 'Galaxy Tab S9', 'Galaxy Tab S8 Ultra', 'Galaxy Tab S8+', 'Galaxy Tab S8', 'Other'],
  'Pixel': ['Pixel 8 Pro', 'Pixel 8', 'Pixel 7 Pro', 'Pixel 7', 'Pixel 6 Pro', 'Pixel 6', 'Other'],
  'Moto G': ['Moto G84', 'Moto G73', 'Moto G53', 'Moto G23', 'Moto G13', 'Other'],
  'Moto Edge': ['Moto Edge 50 Pro', 'Moto Edge 40', 'Moto Edge 30', 'Other'],
  'Razr': ['Moto Razr 50 Ultra', 'Moto Razr 40 Ultra', 'Moto Razr 40', 'Other'],
  'Surface': ['Surface Pro 9', 'Surface Pro 8', 'Surface Laptop 5', 'Surface Laptop 4', 'Surface Book 3', 'Other'],
  'PlayStation': ['PlayStation 5', 'PlayStation 5 Digital Edition', 'PlayStation 4 Pro', 'PlayStation 4', 'Other'],
  'Switch': ['Nintendo Switch OLED', 'Nintendo Switch (2021)', 'Nintendo Switch Lite', 'Other'],
  'Xbox': ['Xbox Series X', 'Xbox Series S', 'Xbox One X', 'Other'],
  'Other': ['Other']
};

// Pricing tiers for repairs
const pricingTiers = {
  oem: {
    name: 'OEM / Genuine Apple',
    description: 'Official Apple parts with warranty',
    badge: '🍎 Official',
    color: '#007AFF'
  },
  premium: {
    name: 'High Quality Aftermarket',
    description: 'Premium aftermarket parts',
    badge: '⭐ Most Popular',
    color: '#34C759',
    recommended: true
  },
  economy: {
    name: 'Economy',
    description: 'Great for data recovery & trade-ins',
    badge: '💰 Budget',
    color: '#FF9500'
  }
};

// Apple's official out-of-warranty pricing by model and repair type
// Updated with current Apple pricing (2024) - includes all repair types from pricing guide
const appleOfficialPricing = {
  'iPhone Air': {
    'Screen Repair': 329,
    'Battery Replacement': 119,
    'Back Glass': 159,
    'Screen & Back Glass': 429,
    'Rear Camera Module': 169,
    'Rear Camera Glass': 149,
    'Charger Port Repair': 179,
    'Charger Port Cleaning': 49
  },
  'iPhone 17 Pro Max': {
    'Screen Repair': 379,
    'Battery Replacement': 119,
    'Back Glass': 159,
    'Screen & Back Glass': 479,
    'Rear Camera Module': 249,
    'Rear Camera Glass': 149,
    'Charger Port Repair': 179,
    'Charger Port Cleaning': 49
  },
  'iPhone 17 Pro': {
    'Screen Repair': 329,
    'Battery Replacement': 119,
    'Back Glass': 159,
    'Screen & Back Glass': 429,
    'Rear Camera Module': 249,
    'Rear Camera Glass': 149,
    'Charger Port Repair': 179,
    'Charger Port Cleaning': 49
  },
  'iPhone 17': {
    'Screen Repair': 329,
    'Battery Replacement': 99,
    'Back Glass': 159,
    'Screen & Back Glass': 429,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 149,
    'Charger Port Repair': 179,
    'Charger Port Cleaning': 49
  },
  'iPhone 16 Pro Max': {
    'Screen Repair': 379,
    'Battery Replacement': 119,
    'Back Glass': 159,
    'Screen & Back Glass': 479,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 149,
    'Charger Port Repair': 179,
    'Charger Port Cleaning': 49
  },
  'iPhone 16 Pro': {
    'Screen Repair': 329,
    'Battery Replacement': 119,
    'Back Glass': 159,
    'Screen & Back Glass': 429,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 149,
    'Charger Port Repair': 179,
    'Charger Port Cleaning': 49
  },
  'iPhone 16 Plus': {
    'Screen Repair': 329,
    'Battery Replacement': 99,
    'Back Glass': 159,
    'Screen & Back Glass': 429,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 149,
    'Charger Port Repair': 179,
    'Charger Port Cleaning': 49  },
  'iPhone 16': {
    'Screen Repair': 279,
    'Battery Replacement': 99,
    'Back Glass': 159,
    'Screen & Back Glass': 379,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 149,
    'Charger Port Repair': 179,
    'Charger Port Cleaning': 49  },
  'iPhone 16e': {
    'Screen Repair': 229,
    'Battery Replacement': 99,
    'Back Glass': 159,
    'Screen & Back Glass': 329,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 149,
    'Charger Port Repair': 179,
    'Charger Port Cleaning': 49
  },
  'iPhone 15 Pro Max': {
    'Screen Repair': 379,
    'Battery Replacement': 99,
    'Back Glass': 159,
    'Screen & Back Glass': 479,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 149,
    'Charger Port Repair': 179,
    'Charger Port Cleaning': 49  },
  'iPhone 15 Pro': {
    'Screen Repair': 329,
    'Battery Replacement': 99,
    'Back Glass': 159,
    'Screen & Back Glass': 429,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 149,
    'Charger Port Repair': 179,
    'Charger Port Cleaning': 49  },
  'iPhone 15 Plus': {
    'Screen Repair': 329,
    'Battery Replacement': 99,
    'Back Glass': 159,
    'Screen & Back Glass': 429,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 149,
    'Charger Port Repair': 179,
    'Charger Port Cleaning': 49  },
  'iPhone 15': {
    'Screen Repair': 279,
    'Battery Replacement': 99,
    'Back Glass': 159,
    'Screen & Back Glass': 379,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 129,
    'Charger Port Repair': 179,
    'Charger Port Cleaning': 49
  },
  'iPhone 14 Pro Max': {
    'Screen Repair': 379,
    'Battery Replacement': 99,
    'Back Glass': 179,
    'Screen & Back Glass': 499,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 129,
    'Charger Port Repair': 159,
    'Charger Port Cleaning': 49
  },
  'iPhone 14 Pro': {
    'Screen Repair': 329,
    'Battery Replacement': 99,
    'Back Glass': 159,
    'Screen & Back Glass': 429,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 129,
    'Charger Port Repair': 159,
    'Charger Port Cleaning': 49  },
  'iPhone 14 Plus': {
    'Screen Repair': 329,
    'Battery Replacement': 99,
    'Back Glass': 159,
    'Screen & Back Glass': 429,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 129,
    'Charger Port Repair': 159,
    'Charger Port Cleaning': 49  },
  'iPhone 14': {
    'Screen Repair': 279,
    'Battery Replacement': 99,
    'Back Glass': 159,
    'Screen & Back Glass': 379,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 129,
    'Charger Port Repair': 159,
    'Charger Port Cleaning': 49  },
  'iPhone 13 Pro Max': {
    'Screen Repair': 329,
    'Battery Replacement': 89,
    'Back Glass': 159,
    'Screen & Back Glass': 429,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 129,
    'Charger Port Repair': 159,
    'Charger Port Cleaning': 49
  },
  'iPhone 13 Pro': {
    'Screen Repair': 279,
    'Battery Replacement': 89,
    'Back Glass': 159,
    'Screen & Back Glass': 379,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 129,
    'Charger Port Repair': 159,
    'Charger Port Cleaning': 49  },
  'iPhone 13 mini': {
    'Screen Repair': 229,
    'Battery Replacement': 89,
    'Back Glass': 159,
    'Screen & Back Glass': 329,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 129,
    'Charger Port Repair': 159,
    'Charger Port Cleaning': 49  },
  'iPhone 13': {
    'Screen Repair': 279,
    'Battery Replacement': 89,
    'Back Glass': 159,
    'Screen & Back Glass': 379,
    'Rear Camera Module': 229,
    'Rear Camera Glass': 129,
    'Charger Port Repair': 159,
    'Charger Port Cleaning': 49  },
  'iPhone 12 Pro Max': {
    'Screen Repair': 329,
    'Battery Replacement': 89,
    'Back Glass': 159,
    'Screen & Back Glass': 429,
    'Rear Camera Module': 209,
    'Rear Camera Glass': 129,
    'Charger Port Repair': 149,
    'Charger Port Cleaning': 49  },
  'iPhone 12 Pro': {
    'Screen Repair': 279,
    'Battery Replacement': 89,
    'Back Glass': 159,
    'Screen & Back Glass': 379,
    'Rear Camera Module': 209,
    'Rear Camera Glass': 129,
    'Charger Port Repair': 149,
    'Charger Port Cleaning': 49
  },
  'iPhone 12 mini': {
    'Screen Repair': 229,
    'Battery Replacement': 89,
    'Back Glass': 159,
    'Screen & Back Glass': 329,
    'Rear Camera Module': 209,
    'Rear Camera Glass': 129,
    'Charger Port Repair': 149,
    'Charger Port Cleaning': 49  },
  'iPhone 12': {
    'Screen Repair': 279,
    'Battery Replacement': 89,
    'Back Glass': 159,
    'Screen & Back Glass': 379,
    'Rear Camera Module': 209,
    'Rear Camera Glass': 129,
    'Charger Port Repair': 149,
    'Charger Port Cleaning': 49
  },
  'iPhone 11 Pro Max': {
    'Screen Repair': 199,
    'Battery Replacement': 79,
    'Back Glass': 139,
    'Screen & Back Glass': 299,
    'Rear Camera Module': 209,
    'Rear Camera Glass': 99,
    'Charger Port Repair': 149,
    'Charger Port Cleaning': 49
  },
  'iPhone 11 Pro': {
    'Screen Repair': 149,
    'Battery Replacement': 79,
    'Back Glass': 139,
    'Screen & Back Glass': 249,
    'Rear Camera Module': 209,
    'Rear Camera Glass': 99,
    'Charger Port Repair': 149,
    'Charger Port Cleaning': 49
  },
  'iPhone 11': {
    'Screen Repair': 129,
    'Battery Replacement': 79,
    'Back Glass': 139,
    'Screen & Back Glass': 229,
    'Rear Camera Module': 209,
    'Rear Camera Glass': 99,
    'Charger Port Repair': 149,
    'Charger Port Cleaning': 49
  },
  // Older Models (using "Older Models" pricing from CSV)
  'iPhone XS Max': {
    'Screen Repair': 129,
    'Battery Replacement': 79,
    'Back Glass': 139,
    'Screen & Back Glass': 229,
    'Rear Camera Module': 169,
    'Rear Camera Glass': 89,
    'Charger Port Repair': 129,
    'Charger Port Cleaning': 39
  },
  'iPhone XS': {
    'Screen Repair': 129,
    'Battery Replacement': 79,
    'Back Glass': 139,
    'Screen & Back Glass': 229,
    'Rear Camera Module': 169,
    'Rear Camera Glass': 89,
    'Charger Port Repair': 129,
    'Charger Port Cleaning': 39
  },
  'iPhone XR': {
    'Screen Repair': 129,
    'Battery Replacement': 79,
    'Back Glass': 139,
    'Screen & Back Glass': 229,
    'Rear Camera Module': 169,
    'Rear Camera Glass': 89,
    'Charger Port Repair': 129,
    'Charger Port Cleaning': 39
  },
  'iPhone X': {
    'Screen Repair': 129,
    'Battery Replacement': 79,
    'Back Glass': 139,
    'Screen & Back Glass': 229,
    'Rear Camera Module': 169,
    'Rear Camera Glass': 89,
    'Charger Port Repair': 129,
    'Charger Port Cleaning': 39
  },
  'iPhone 8 Plus': {
    'Screen Repair': 129,
    'Battery Replacement': 79,
    'Back Glass': 139,
    'Screen & Back Glass': 229,
    'Rear Camera Module': 169,
    'Rear Camera Glass': 89,
    'Charger Port Repair': 129,
    'Charger Port Cleaning': 39
  },
  'iPhone 8': {
    'Screen Repair': 129,
    'Battery Replacement': 79,
    'Back Glass': 139,
    'Screen & Back Glass': 229,
    'Rear Camera Module': 169,
    'Rear Camera Glass': 89,
    'Charger Port Repair': 129,
    'Charger Port Cleaning': 39
  },
  'iPhone SE (3rd gen)': {
    'Screen Repair': 129,
    'Battery Replacement': 79,
    'Back Glass': 139,
    'Screen & Back Glass': 229,
    'Rear Camera Module': 169,
    'Rear Camera Glass': 89,
    'Charger Port Repair': 129,
    'Charger Port Cleaning': 39
  },
  'iPhone SE (2nd gen)': {
    'Screen Repair': 129,
    'Battery Replacement': 79,
    'Back Glass': 139,
    'Screen & Back Glass': 229,
    'Rear Camera Module': 169,
    'Rear Camera Glass': 89,
    'Charger Port Repair': 129,
    'Charger Port Cleaning': 39
  }
};

const repairTypes = {
  'iPhone': {
    'Screen Repair': {
      oem: 379,    // Apple out-of-warranty pricing (example - will use model-specific pricing)
      premium: 284, // 75% of Apple price (25% reduction)
      economy: 254  // 67% of Apple price (33% reduction)
    },
    'Battery Replacement': {
      oem: 119,    // Apple out-of-warranty pricing (example - will use model-specific pricing)
      premium: 89, // 75% of Apple price (25% reduction)
      economy: 80  // 67% of Apple price (33% reduction)
    },
    'Back Glass': 159,    // Single pricing
    'Screen & Back Glass': 429,    // Single pricing
    'Rear Camera Module': 229,    // Single pricing
    'Rear Camera Glass': 149,    // Single pricing
    'Charger Port Repair': 179,    // Single pricing
    'Charger Port Cleaning': 49     // Single pricing
  },
  'iPad': {
    'Screen Repair': 199.99,
    'Battery Replacement': 99.99,
    'Camera Repair': 149.99,
    'Charging Port': 89.99,
    'Other': 119.99
  },
  'MacBook': {
    'Screen Repair': 399.99,
    'Battery Replacement': 149.99,
    'Keyboard Repair': 199.99,
    'Charging Port': 129.99,
    'Other': 199.99
  },
  ' Watch': {
    'Screen Repair': 249.99,
    'Battery Replacement': 99.99,
    'Band Replacement': 79.99,
    'Digital Crown': 89.99,
    'Heart Sensor': 119.99,
    'Other': 129.99
  },
  'Galaxy S': {
    'Screen Repair': 149.99,
    'Battery Replacement': 89.99,
    'Camera Repair': 169.99,
    'Charging Port': 99.99,
    'Other': 109.99
  },
  'Galaxy Note': {
    'Screen Repair': 169.99,
    'Battery Replacement': 89.99,
    'Camera Repair': 169.99,
    'Charging Port': 99.99,
    'Other': 109.99
  },
  'Galaxy Tab': {
    'Screen Repair': 199.99,
    'Battery Replacement': 99.99,
    'Camera Repair': 149.99,
    'Charging Port': 89.99,
    'Other': 119.99
  },
  'Pixel': {
    'Screen Repair': 149.99,
    'Battery Replacement': 89.99,
    'Camera Repair': 169.99,
    'Charging Port': 99.99,
    'Other': 109.99
  },
  'Moto G': {
    'Screen Repair': 129.99,
    'Battery Replacement': 79.99,
    'Camera Repair': 139.99,
    'Charging Port': 89.99,
    'Other': 99.99
  },
  'Moto Edge': {
    'Screen Repair': 169.99,
    'Battery Replacement': 89.99,
    'Camera Repair': 149.99,
    'Charging Port': 99.99,
    'Other': 109.99
  },
  'Razr': {
    'Screen Repair': 199.99,
    'Battery Replacement': 99.99,
    'Camera Repair': 179.99,
    'Charging Port': 119.99,
    'Hinge Repair': 149.99,
    'Other': 129.99
  },
  'Surface': {
    'Screen Repair': 299.99,
    'Battery Replacement': 149.99,
    'Keyboard Repair': 199.99,
    'Charging Port': 129.99,
    'Other': 199.99
  },
  'PlayStation': {
    'HDMI Port Repair': 149.99,
    'Power Supply': 79.99,
    'Disc Drive': 99.99,
    'Other': 89.99
  },
  'Switch': {
    'Screen Repair': 129.99,
    'Joy-Con Repair': 79.99,
    'Battery Replacement': 99.99,
    'Charging Port': 89.99,
    'Other': 89.99
  },
  'Xbox': {
    'HDMI Port Repair': 149.99,
    'Power Supply': 79.99,
    'Disc Drive': 99.99,
    'Fan Repair': 89.99,
    'Other': 89.99
  },
  'Other': {
    'Screen Repair': 149.99,
    'Battery Replacement': 89.99,
    'Other': 99.99
  }
};


// Utility function to determine UI pattern based on number of options
const getUIPattern = (optionsCount) => {
  if (optionsCount <= 6) return 'cards';
  return 'dropdown';
};

// Get available device models for current selection
const getAvailableDeviceModels = (deviceType, generation = null) => {
  if (deviceType === 'iPhone' && generation) {
    const generationData = iPhoneGenerations['iPhone']?.find(gen => gen.generation === generation);
    return generationData ? generationData.models : [];
  }
  return deviceModels[deviceType] || [];
};

const Repairs = () => {


  // Helper function to check if iPhone model supports 3-tier pricing (iPhone 12 and newer)
  const supportsTieredPricing = (deviceModel) => {
    const olderModels = [
      'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
      'iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X',
      'iPhone 8 Plus', 'iPhone 8',
      'iPhone SE (3rd gen)', 'iPhone SE (2nd gen)'
    ];
    return !olderModels.includes(deviceModel);
  };

  // Helper function to get travel fee for zipCode
  // Travel fee removed - no longer needed
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedDeviceType, setSelectedDeviceType] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState('');
  const [selectedDeviceModel, setSelectedDeviceModel] = useState('');
  const [selectedRepairType, setSelectedRepairType] = useState('');
  const [selectedQualityTier, setSelectedQualityTier] = useState('premium'); // default to most popular
  const [price, setPrice] = useState(0);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedDeviceType('');
    setSelectedGeneration('');
    setSelectedDeviceModel('');
    setSelectedRepairType('');
    setSelectedQualityTier('premium');
    setPrice(0);
  };

  const handleDeviceTypeSelect = (deviceType) => {
    setSelectedDeviceType(deviceType);
    setSelectedGeneration('');
    setSelectedDeviceModel('');
    setSelectedRepairType('');
    setSelectedQualityTier('premium');
    setPrice(0);
  };

  const handleGenerationSelect = (generation) => {
    setSelectedGeneration(generation);
    setSelectedDeviceModel('');
    setSelectedRepairType('');
    setSelectedQualityTier('premium');
    setPrice(0);
  };

  const handleDeviceModelSelect = (model) => {
    setSelectedDeviceModel(model);
  };

  const handleRepairTypeSelect = (repairType) => {
    setSelectedRepairType(repairType);
    
    // For iPhone 12 and newer, automatically select 'premium' tier for Screen Repair and Battery Replacement
    // For iPhone 11 and older, or other repair types, use the current selectedQualityTier
    let tierToUse = selectedQualityTier;
    if (selectedDeviceType === 'iPhone' && 
        (repairType === 'Screen Repair' || repairType === 'Battery Replacement') && 
        supportsTieredPricing(selectedDeviceModel) && 
        !selectedQualityTier) {
      tierToUse = 'premium'; // Default to premium for iPhone 12 and newer
      setSelectedQualityTier('premium');
    }
    
    calculatePrice(repairType, tierToUse);
  };

  const handleQualityTierSelect = (tier) => {
    setSelectedQualityTier(tier);
    if (selectedRepairType) {
      calculatePrice(selectedRepairType, tier);
    }
  };

  const calculatePrice = (repairType, qualityTier, model = null) => {
    const deviceModel = model || selectedDeviceModel;
    const repairData = repairTypes[selectedDeviceType]?.[repairType];
    let repairPrice = 0;
    
    // Check if this repair type supports tiered pricing (Screen Repair and Battery Replacement only)
    // AND if the device model supports tiered pricing (iPhone 12 and newer)
    if (repairData && typeof repairData === 'object' && repairData.oem && supportsTieredPricing(deviceModel)) {
      // Tiered pricing for Screen Repair and Battery Replacement on iPhone 12 and newer
      if (qualityTier === 'oem' && appleOfficialPricing[deviceModel]?.[repairType]) {
        // Use model-specific Apple pricing
        repairPrice = appleOfficialPricing[deviceModel][repairType];
      } else {
        // Use default tiered pricing
        repairPrice = repairData[qualityTier] || 0;
        
        // Calculate dynamic pricing based on Apple OEM price
        if (qualityTier !== 'oem' && appleOfficialPricing[deviceModel]?.[repairType]) {
          const applePrice = appleOfficialPricing[deviceModel][repairType];
          if (qualityTier === 'premium') {
            repairPrice = Math.round(applePrice * 0.75); // 75% of Apple price (25% reduction)
          } else if (qualityTier === 'economy') {
            repairPrice = Math.round(applePrice * 0.67); // 67% of Apple price (33% reduction)
          }
        }
      }
    } else {
      // Simple pricing for all other repair types OR iPhone 11 and older models
      if (appleOfficialPricing[deviceModel]?.[repairType]) {
        // Use model-specific Apple pricing
        repairPrice = appleOfficialPricing[deviceModel][repairType];
      } else {
        // Use default pricing
        repairPrice = repairData || 0;
      }
    }
    
    setPrice(repairPrice);
  };


  // Recalculate price when device model changes (for dynamic Apple pricing)
  React.useEffect(() => {
    if (selectedRepairType && selectedDeviceType === 'iPhone') {
      calculatePrice(selectedRepairType, selectedQualityTier);
    }
  }, [selectedDeviceModel]);

  // Helper function to generate PocketSuite URL based on selections
  const generatePocketSuiteUrl = (qualityTier = null) => {
    if (!selectedDeviceModel || !selectedRepairType) {
      return 'https://pocketsuite.io/book/instakyle';
    }

    // Create URL-friendly strings
    const modelSlug = selectedDeviceModel.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[()]/g, '')
      .replace(/iphone-/g, 'iphone-');
    
    const repairSlug = selectedRepairType.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/&/g, 'and');

    // Generate the PocketSuite URL with quality tier suffix
    const baseUrl = 'https://pocketsuite.io/book/instakyle/item';
    let serviceSlug = `${modelSlug}-${repairSlug}`;
    
    // Add quality tier suffix if provided
    if (qualityTier) {
      serviceSlug += `--${qualityTier}`;
    }
    
    return `${baseUrl}/${serviceSlug}`;
  };

  const handleBookNow = () => {
    const pocketSuiteUrl = generatePocketSuiteUrl();
    
    // Open PocketSuite in a new tab
    if (pocketSuiteUrl) {
      window.open(pocketSuiteUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="repairs-page">
      <section className="page-section page-section--muted">
        <div className="page-section-inner repairs-form-wrapper">
          <div className="repairs-header">
            <h1>Device Repair Services</h1>
            <p>Select your brand, device details, and repair type to see pricing.</p>
          </div>

          <div className="repair-form">
        <div className="selection-section brands-section">
          <h2>Select Brand</h2>
          <div className="card-grid">
            {Object.keys(deviceTypes).map(brand => (
              <div
                key={brand}
                className={`selection-card ${selectedBrand === brand ? 'selected' : ''}`}
                onClick={() => handleBrandSelect(brand)}
              >
                <div className="card-content">
                  <h3>{brand}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedBrand && (
          <div className={`selection-section ${selectedBrand ? 'active' : ''}`}>
            <h2>Select Device Type</h2>
            {(() => {
              const availableDeviceTypes = deviceTypes[selectedBrand] || [];
              const deviceTypeCount = availableDeviceTypes.length;
              const uiPattern = getUIPattern(deviceTypeCount);

              if (uiPattern === 'dropdown') {
                return (
                  <div className="dropdown-container">
                    <select
                      value={selectedDeviceType}
                      onChange={(e) => handleDeviceTypeSelect(e.target.value)}
                      className="device-type-select"
                    >
                      <option value="">Select Device Type</option>
                      {availableDeviceTypes.map(type => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              } else {
                return (
                  <div className="card-grid">
                    {availableDeviceTypes.map(type => (
                      <div
                        key={type}
                        className={`selection-card ${selectedDeviceType === type ? 'selected' : ''}`}
                        onClick={() => handleDeviceTypeSelect(type)}
                      >
                        <div className="card-content">
                          <h3>{type}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
            })()}
          </div>
        )}

        {/* iPhone Generation Selection */}
        {selectedDeviceType === 'iPhone' && (
          <div className={`selection-section ${selectedDeviceType === 'iPhone' ? 'active' : ''}`}>
            <h2>Select iPhone</h2>
            <div className="dropdown-container">
              <select
                value={selectedGeneration}
                onChange={(e) => handleGenerationSelect(e.target.value)}
                className="generation-select"
              >
                <option value="">Select iPhone</option>
                {iPhoneGenerations['iPhone']?.map((gen, index) => (
                  <option key={index} value={gen.generation}>
                    {gen.generation}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Unified Device Model Selection */}
        {selectedDeviceType && (selectedDeviceType !== 'iPhone' || selectedGeneration) && (
          <div
            className={`selection-section ${
              selectedDeviceType && (selectedDeviceType !== 'iPhone' || selectedGeneration) ? 'active' : ''
            }`}
          >
            <h2>Select Model</h2>
            {(() => {
              const availableModels = getAvailableDeviceModels(selectedDeviceType, selectedGeneration);
              const modelCount = availableModels.length;
              const uiPattern = getUIPattern(modelCount);

              if (uiPattern === 'dropdown') {
                return (
                  <div className="dropdown-container">
                    <select
                      value={selectedDeviceModel}
                      onChange={(e) => handleDeviceModelSelect(e.target.value)}
                      className="model-select"
                    >
                      <option value="">Select Model</option>
                      {availableModels.map(model => {
                        const isComingSoon = comingSoonModels.includes(model);
                        return (
                          <option key={model} value={model} disabled={isComingSoon}>
                            {model} {isComingSoon ? '(Coming Soon)' : ''}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              } else {
                return (
                  <div className="card-grid">
                    {availableModels.map(model => {
                      const isComingSoon = comingSoonModels.includes(model);
                      return (
                        <div
                          key={model}
                          className={`selection-card ${selectedDeviceModel === model ? 'selected' : ''} ${isComingSoon ? 'coming-soon' : ''}`}
                          onClick={() => !isComingSoon && handleDeviceModelSelect(model)}
                          style={{ cursor: isComingSoon ? 'not-allowed' : 'pointer' }}
                        >
                          <div className="card-content">
                            <h3>{model}</h3>
                            {isComingSoon && <span className="coming-soon-badge">Coming Soon</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }
            })()}
          </div>
        )}

        {selectedDeviceType && (
          <div className={`selection-section ${selectedDeviceType ? 'active' : ''}`}>
            <h2>Select Repair Type</h2>
            {(() => {
              const availableRepairTypes = Object.keys(repairTypes[selectedDeviceType] || {});
              const repairTypeCount = availableRepairTypes.length;
              const uiPattern = getUIPattern(repairTypeCount);

              if (uiPattern === 'dropdown') {
                return (
                  <div className="dropdown-container">
                    <select
                      value={selectedRepairType}
                      onChange={(e) => handleRepairTypeSelect(e.target.value)}
                      className="repair-type-select"
                    >
                      <option value="">Select Repair Type</option>
                      {availableRepairTypes.map(type => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              } else {
                return (
                  <div className="card-grid">
                    {availableRepairTypes.map((type) => (
                      <div
                        key={type}
                        className={`selection-card ${selectedRepairType === type ? 'selected' : ''}`}
                        onClick={() => handleRepairTypeSelect(type)}
                      >
                        <div className="card-content">
                          <h3>{type}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
            })()}
          </div>
        )}

        {selectedRepairType &&
          selectedDeviceType === 'iPhone' &&
          (selectedRepairType === 'Screen Repair' || selectedRepairType === 'Battery Replacement') &&
          supportsTieredPricing(selectedDeviceModel) && (
          <div
            className={`selection-section quality-tier-section ${
              selectedRepairType &&
              selectedDeviceType === 'iPhone' &&
              (selectedRepairType === 'Screen Repair' || selectedRepairType === 'Battery Replacement') &&
              supportsTieredPricing(selectedDeviceModel)
                ? 'active'
                : ''
            }`}
          >
            <h2>Select Quality Tier</h2>
            <div className="tier-cards">
              {Object.entries(pricingTiers).map(([tierKey, tierInfo]) => {
                // Calculate dynamic pricing based on Apple OEM price and selected model
                const tierPricing = repairTypes[selectedDeviceType]?.[selectedRepairType] || {};
                let tierPrice = tierPricing[tierKey] ?? 0;
                
                if (tierKey === 'oem' && appleOfficialPricing[selectedDeviceModel]?.[selectedRepairType]) {
                  // Use model-specific Apple pricing for OEM
                  tierPrice = appleOfficialPricing[selectedDeviceModel][selectedRepairType];
                } else if (appleOfficialPricing[selectedDeviceModel]?.[selectedRepairType]) {
                  // Calculate premium and economy prices based on Apple OEM price
                  const applePrice = appleOfficialPricing[selectedDeviceModel][selectedRepairType];
                  if (tierKey === 'premium') {
                    tierPrice = Math.round(applePrice * 0.75); // 75% of Apple price (25% reduction)
                  } else if (tierKey === 'economy') {
                    tierPrice = Math.round(applePrice * 0.67); // 67% of Apple price (33% reduction)
                  }
                }
                
                return (
                  <div
                    key={tierKey}
                    className={`tier-card ${selectedQualityTier === tierKey ? 'selected' : ''} ${tierInfo.recommended ? 'recommended' : ''}`}
                    style={{ borderColor: selectedQualityTier === tierKey ? tierInfo.color : '#e0e0e0' }}
                  >
                    <div className="tier-badge" style={{ backgroundColor: tierInfo.color }}>
                      {tierInfo.badge}
                    </div>
                    <h3>{tierInfo.name}</h3>
                    <p className="tier-description">{tierInfo.description}</p>
                    <p className="tier-price">${tierPrice}</p>
                    <button
                      className="tier-book-button"
                      onClick={() => {
                        setSelectedQualityTier(tierKey);
                        const pocketSuiteUrl = generatePocketSuiteUrl(tierKey);
                        window.open(pocketSuiteUrl, '_blank');
                      }}
                      style={{ backgroundColor: tierInfo.color }}
                    >
                      Book Appointment
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pricing and Booking Section for Non-Tiered Repair Types */}
        {selectedRepairType &&
          selectedDeviceType === 'iPhone' &&
          selectedDeviceModel &&
          (!(selectedRepairType === 'Screen Repair' || selectedRepairType === 'Battery Replacement') ||
            !supportsTieredPricing(selectedDeviceModel)) && (
          <div
            className={`selection-section pricing-section ${
              selectedRepairType &&
              selectedDeviceType === 'iPhone' &&
              selectedDeviceModel &&
              (!(selectedRepairType === 'Screen Repair' || selectedRepairType === 'Battery Replacement') ||
                !supportsTieredPricing(selectedDeviceModel))
                ? 'active'
                : ''
            }`}
          >
          <h2>Pricing &amp; Booking</h2>
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>{selectedRepairType}</h3>
              <p className="device-model">{selectedDeviceModel}</p>
            </div>
            <div className="pricing-display">
              <p className="price-label">Price</p>
              <p className="price-amount">${price}</p>
            </div>
            <button
              className="book-now-button"
              onClick={handleBookNow}
            >
              Book Appointment
            </button>
          </div>
        </div>
        )}

      </div>
        </div>
      </section>
    </div>
  );
};

export default Repairs;