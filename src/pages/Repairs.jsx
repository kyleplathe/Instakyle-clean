import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Repairs.css';

const deviceTypes = {
  'Apple': ['iPhone', 'iPad', 'MacBook', 'iMac'],
  'Samsung': ['Galaxy S', 'Galaxy Note', 'Galaxy Tab'],
  'Google': ['Pixel'],
  'Microsoft': ['Surface'],
  'Sony': ['PlayStation'],
  'Other': ['Other']
};

const deviceModels = {
  'iPhone': [
    'iPhone 17 Pro Max (Coming Soon)', 'iPhone 17 Pro (Coming Soon)', 'iPhone Air (Coming Soon)', 'iPhone 17 (Coming Soon)',
    'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16',
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
  'Galaxy S': ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22', 'Other'],
  'Galaxy Note': ['Galaxy Note 20 Ultra', 'Galaxy Note 20', 'Galaxy Note 10+', 'Galaxy Note 10', 'Other'],
  'Galaxy Tab': ['Galaxy Tab S9 Ultra', 'Galaxy Tab S9+', 'Galaxy Tab S9', 'Galaxy Tab S8 Ultra', 'Galaxy Tab S8+', 'Galaxy Tab S8', 'Other'],
  'Pixel': ['Pixel 8 Pro', 'Pixel 8', 'Pixel 7 Pro', 'Pixel 7', 'Pixel 6 Pro', 'Pixel 6', 'Other'],
  'Surface': ['Surface Pro 9', 'Surface Pro 8', 'Surface Laptop 5', 'Surface Laptop 4', 'Surface Book 3', 'Other'],
  'PlayStation': ['PlayStation 5', 'PlayStation 5 Digital Edition', 'PlayStation 4 Pro', 'PlayStation 4', 'Other'],
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

const repairTypes = {
  'iPhone': {
    'Screen Repair': {
      oem: 329.00,  // Apple out-of-warranty pricing
      premium: 149.99,
      economy: 89.99
    },
    'Battery Replacement': {
      oem: 99.00,   // Apple out-of-warranty pricing
      premium: 79.99,
      economy: 49.99
    },
    'Camera Repair': {
      oem: 229.00,
      premium: 149.99,
      economy: 99.99
    },
    'Charging Port': {
      oem: 149.00,
      premium: 89.99,
      economy: 59.99
    },
    'Back Glass': {
      oem: 199.00,
      premium: 129.99,
      economy: 79.99
    },
    'Other': {
      oem: 149.00,
      premium: 99.99,
      economy: 69.99
    }
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
  'Surface': {
    'Screen Repair': 299.99,
    'Battery Replacement': 149.99,
    'Keyboard Repair': 199.99,
    'Charging Port': 129.99,
    'Other': 199.99
  },
  'PlayStation': {
    'HDMI Port Repair': 89.99,
    'Power Supply': 79.99,
    'Disc Drive': 99.99,
    'Other': 89.99
  },
  'Other': {
    'Screen Repair': 149.99,
    'Battery Replacement': 89.99,
    'Other': 99.99
  }
};

const travelFees = {
  '55101': 0, // St. Paul
  '55102': 0, // St. Paul
  '55103': 0, // St. Paul
  '55104': 0, // St. Paul
  '55105': 0, // St. Paul
  '55106': 0, // St. Paul
  '55107': 0, // St. Paul
  '55108': 0, // St. Paul
  '55109': 0, // St. Paul
  '55110': 0, // St. Paul
  '55111': 0, // St. Paul
  '55112': 0, // St. Paul
  '55113': 0, // St. Paul
  '55114': 0, // St. Paul
  '55115': 0, // St. Paul
  '55116': 0, // St. Paul
  '55117': 0, // St. Paul
  '55118': 0, // St. Paul
  '55119': 0, // St. Paul
  '55120': 0, // St. Paul
  '55121': 0, // St. Paul
  '55122': 0, // St. Paul
  '55123': 0, // St. Paul
  '55124': 0, // St. Paul
  '55125': 0, // St. Paul
  '55126': 0, // St. Paul
  '55127': 0, // St. Paul
  '55128': 0, // St. Paul
  '55129': 0, // St. Paul
  '55130': 0, // St. Paul
  '55133': 0, // St. Paul
  '55144': 0, // St. Paul
  '55145': 0, // St. Paul
  '55146': 0, // St. Paul
  '55155': 0, // St. Paul
  '55164': 0, // St. Paul
  '55170': 0, // St. Paul
  '55175': 0, // St. Paul
  '55401': 0, // Minneapolis
  '55402': 0, // Minneapolis
  '55403': 0, // Minneapolis
  '55404': 0, // Minneapolis
  '55405': 0, // Minneapolis
  '55406': 0, // Minneapolis
  '55407': 0, // Minneapolis
  '55408': 0, // Minneapolis
  '55409': 0, // Minneapolis
  '55410': 0, // Minneapolis
  '55411': 0, // Minneapolis
  '55412': 0, // Minneapolis
  '55413': 0, // Minneapolis
  '55414': 0, // Minneapolis
  '55415': 0, // Minneapolis
  '55416': 0, // Minneapolis
  '55417': 0, // Minneapolis
  '55418': 0, // Minneapolis
  '55419': 0, // Minneapolis
  '55420': 0, // Minneapolis
  '55421': 0, // Minneapolis
  '55422': 0, // Minneapolis
  '55423': 0, // Minneapolis
  '55424': 0, // Minneapolis
  '55425': 0, // Minneapolis
  '55426': 0, // Minneapolis
  '55427': 0, // Minneapolis
  '55428': 0, // Minneapolis
  '55429': 0, // Minneapolis
  '55430': 0, // Minneapolis
  '55431': 0, // Minneapolis
  '55432': 0, // Minneapolis
  '55433': 0, // Minneapolis
  '55434': 0, // Minneapolis
  '55435': 0, // Minneapolis
  '55436': 0, // Minneapolis
  '55437': 0, // Minneapolis
  '55438': 0, // Minneapolis
  '55439': 0, // Minneapolis
  '55440': 0, // Minneapolis
  '55441': 0, // Minneapolis
  '55442': 0, // Minneapolis
  '55443': 0, // Minneapolis
  '55444': 0, // Minneapolis
  '55445': 0, // Minneapolis
  '55446': 0, // Minneapolis
  '55447': 0, // Minneapolis
  '55448': 0, // Minneapolis
  '55449': 0, // Minneapolis
  '55450': 0, // Minneapolis
  '55454': 0, // Minneapolis
  '55455': 0, // Minneapolis
  '55458': 0, // Minneapolis
  '55459': 0, // Minneapolis
  '55460': 0, // Minneapolis
  '55467': 0, // Minneapolis
  '55470': 0, // Minneapolis
  '55472': 0, // Minneapolis
  '55473': 0, // Minneapolis
  '55474': 0, // Minneapolis
  '55478': 0, // Minneapolis
  '55479': 0, // Minneapolis
  '55480': 0, // Minneapolis
  '55483': 0, // Minneapolis
  '55484': 0, // Minneapolis
  '55485': 0, // Minneapolis
  '55486': 0, // Minneapolis
  '55487': 0, // Minneapolis
  '55488': 0, // Minneapolis
  'default': 25 // Default travel fee for other zip codes
};

const salesTaxRates = {
  '55101': 0.07875, // St. Paul (7.875%)
  '55102': 0.07875, // St. Paul
  '55103': 0.07875, // St. Paul
  '55104': 0.07875, // St. Paul
  '55105': 0.07875, // St. Paul
  '55106': 0.07875, // St. Paul
  '55107': 0.07875, // St. Paul
  '55108': 0.07875, // St. Paul
  '55109': 0.07875, // St. Paul
  '55110': 0.07875, // St. Paul
  '55111': 0.07875, // St. Paul
  '55112': 0.07875, // St. Paul
  '55113': 0.07875, // St. Paul
  '55114': 0.07875, // St. Paul
  '55115': 0.07875, // St. Paul
  '55116': 0.07875, // St. Paul
  '55117': 0.07875, // St. Paul
  '55118': 0.07875, // St. Paul
  '55119': 0.07875, // St. Paul
  '55120': 0.07875, // St. Paul
  '55121': 0.07875, // St. Paul
  '55122': 0.07875, // St. Paul
  '55123': 0.07875, // St. Paul
  '55124': 0.07875, // St. Paul
  '55125': 0.07875, // St. Paul
  '55126': 0.07875, // St. Paul
  '55127': 0.07875, // St. Paul
  '55128': 0.07875, // St. Paul
  '55129': 0.07875, // St. Paul
  '55130': 0.07875, // St. Paul
  '55133': 0.07875, // St. Paul
  '55144': 0.07875, // St. Paul
  '55145': 0.07875, // St. Paul
  '55146': 0.07875, // St. Paul
  '55155': 0.07875, // St. Paul
  '55164': 0.07875, // St. Paul
  '55170': 0.07875, // St. Paul
  '55175': 0.07875, // St. Paul
  '55401': 0.08875, // Minneapolis (8.875%)
  '55402': 0.08875, // Minneapolis
  '55403': 0.08875, // Minneapolis
  '55404': 0.08875, // Minneapolis
  '55405': 0.08875, // Minneapolis
  '55406': 0.08875, // Minneapolis
  '55407': 0.08875, // Minneapolis
  '55408': 0.08875, // Minneapolis
  '55409': 0.08875, // Minneapolis
  '55410': 0.08875, // Minneapolis
  '55411': 0.08875, // Minneapolis
  '55412': 0.08875, // Minneapolis
  '55413': 0.08875, // Minneapolis
  '55414': 0.08875, // Minneapolis
  '55415': 0.08875, // Minneapolis
  '55416': 0.08875, // Minneapolis
  '55417': 0.08875, // Minneapolis
  '55418': 0.08875, // Minneapolis
  '55419': 0.08875, // Minneapolis
  '55420': 0.08875, // Minneapolis
  '55421': 0.08875, // Minneapolis
  '55422': 0.08875, // Minneapolis
  '55423': 0.08875, // Minneapolis
  '55424': 0.08875, // Minneapolis
  '55425': 0.08875, // Minneapolis
  '55426': 0.08875, // Minneapolis
  '55427': 0.08875, // Minneapolis
  '55428': 0.08875, // Minneapolis
  '55429': 0.08875, // Minneapolis
  '55430': 0.08875, // Minneapolis
  '55431': 0.08875, // Minneapolis
  '55432': 0.08875, // Minneapolis
  '55433': 0.08875, // Minneapolis
  '55434': 0.08875, // Minneapolis
  '55435': 0.08875, // Minneapolis
  '55436': 0.08875, // Minneapolis
  '55437': 0.08875, // Minneapolis
  '55438': 0.08875, // Minneapolis
  '55439': 0.08875, // Minneapolis
  '55440': 0.08875, // Minneapolis
  '55441': 0.08875, // Minneapolis
  '55442': 0.08875, // Minneapolis
  '55443': 0.08875, // Minneapolis
  '55444': 0.08875, // Minneapolis
  '55445': 0.08875, // Minneapolis
  '55446': 0.08875, // Minneapolis
  '55447': 0.08875, // Minneapolis
  '55448': 0.08875, // Minneapolis
  '55449': 0.08875, // Minneapolis
  '55450': 0.08875, // Minneapolis
  '55454': 0.08875, // Minneapolis
  '55455': 0.08875, // Minneapolis
  '55458': 0.08875, // Minneapolis
  '55459': 0.08875, // Minneapolis
  '55460': 0.08875, // Minneapolis
  '55467': 0.08875, // Minneapolis
  '55470': 0.08875, // Minneapolis
  '55472': 0.08875, // Minneapolis
  '55473': 0.08875, // Minneapolis
  '55474': 0.08875, // Minneapolis
  '55478': 0.08875, // Minneapolis
  '55479': 0.08875, // Minneapolis
  '55480': 0.08875, // Minneapolis
  '55483': 0.08875, // Minneapolis
  '55484': 0.08875, // Minneapolis
  '55485': 0.08875, // Minneapolis
  '55486': 0.08875, // Minneapolis
  '55487': 0.08875, // Minneapolis
  '55488': 0.08875, // Minneapolis
  'default': 0.06875 // Default tax rate for other Minnesota zip codes (6.875%)
};

const Repairs = () => {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedDeviceType, setSelectedDeviceType] = useState('');
  const [selectedDeviceModel, setSelectedDeviceModel] = useState('');
  const [selectedRepairType, setSelectedRepairType] = useState('');
  const [selectedQualityTier, setSelectedQualityTier] = useState('premium'); // default to most popular
  const [zipCode, setZipCode] = useState('');
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [travelFee, setTravelFee] = useState(0);
  const [total, setTotal] = useState(0);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedDeviceType('');
    setSelectedDeviceModel('');
    setSelectedRepairType('');
    setSelectedQualityTier('premium');
    setPrice(0);
  };

  const handleDeviceTypeSelect = (deviceType) => {
    setSelectedDeviceType(deviceType);
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
    calculatePrice(repairType, selectedQualityTier);
  };

  const handleQualityTierSelect = (tier) => {
    setSelectedQualityTier(tier);
    if (selectedRepairType) {
      calculatePrice(selectedRepairType, tier);
    }
  };

  const calculatePrice = (repairType, qualityTier) => {
    const repairData = repairTypes[selectedDeviceType]?.[repairType];
    let repairPrice = 0;
    
    // Check if device type supports tiered pricing (like iPhone)
    if (repairData && typeof repairData === 'object' && repairData.oem) {
      repairPrice = repairData[qualityTier] || 0;
    } else {
      // Fallback for simple pricing (other devices)
      repairPrice = repairData || 0;
    }
    
    setPrice(repairPrice);
  };

  const handleZipCodeChange = (e) => {
    const zip = e.target.value;
    setZipCode(zip);
    const fee = travelFees[zip] ?? travelFees.default;
    setTravelFee(fee);
    
    // Update tax rate based on ZIP code
    const taxRate = salesTaxRates[zip] ?? salesTaxRates.default;
    const newTax = price * taxRate;
    setTax(newTax);
    setTotal(price + newTax + fee);
  };

  React.useEffect(() => {
    const taxRate = salesTaxRates[zipCode] ?? salesTaxRates.default;
    const newTax = price * taxRate;
    setTax(newTax);
    setTotal(price + newTax + travelFee);
  }, [price, travelFee, zipCode]);

  const handleBookNow = () => {
    navigate('/book', {
      state: {
        bookingData: {
          brand: selectedBrand,
          deviceType: selectedDeviceType,
          deviceModel: selectedDeviceModel,
          repairType: selectedRepairType,
          qualityTier: selectedQualityTier,
          qualityTierName: pricingTiers[selectedQualityTier]?.name || '',
          price: price,
          zipCode: zipCode
        }
      }
    });
  };

  return (
    <div className="repairs-page">
      <h1>Device Repair Services</h1>
      <div className="repair-form">
        <div className="selection-section">
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
          <div className="selection-section">
            <h2>Select Device Type</h2>
            <div className="card-grid">
              {deviceTypes[selectedBrand].map(type => (
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
          </div>
        )}

        {selectedDeviceType && (
          <div className="selection-section">
            <h2>Select Device Model</h2>
            <div className="card-grid">
              {deviceModels[selectedDeviceType].map(model => (
                <div
                  key={model}
                  className={`selection-card ${selectedDeviceModel === model ? 'selected' : ''}`}
                  onClick={() => handleDeviceModelSelect(model)}
                >
                  <div className="card-content">
                    <h3>{model}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedDeviceType && (
          <div className="selection-section">
            <h2>Select Repair Type</h2>
            <div className="card-grid">
              {Object.keys(repairTypes[selectedDeviceType] || {}).map((type) => (
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
          </div>
        )}

        {selectedRepairType && selectedDeviceType === 'iPhone' && (
          <div className="selection-section quality-tier-section">
            <h2>Select Quality Tier</h2>
            <div className="tier-cards">
              {Object.entries(pricingTiers).map(([tierKey, tierInfo]) => {
                const tierPrice = repairTypes[selectedDeviceType][selectedRepairType][tierKey];
                return (
                  <div
                    key={tierKey}
                    className={`tier-card ${selectedQualityTier === tierKey ? 'selected' : ''} ${tierInfo.recommended ? 'recommended' : ''}`}
                    onClick={() => handleQualityTierSelect(tierKey)}
                    style={{ borderColor: selectedQualityTier === tierKey ? tierInfo.color : '#e0e0e0' }}
                  >
                    <div className="tier-badge" style={{ backgroundColor: tierInfo.color }}>
                      {tierInfo.badge}
                    </div>
                    <h3>{tierInfo.name}</h3>
                    <p className="tier-description">{tierInfo.description}</p>
                    <p className="tier-price">${tierPrice.toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="zipCode">Enter ZIP Code</label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={handleZipCodeChange}
            placeholder="Enter your ZIP code"
            pattern="[0-9]{5}"
            title="Please enter a valid 5-digit ZIP code"
            required
          />
        </div>

        {price > 0 && (
          <div className="price-summary">
            <h2>Price Summary</h2>
            <div className="price-details">
              <div className="price-row">
                <span>Repair Cost:</span>
                <span>${price.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Sales Tax ({(salesTaxRates[zipCode] ?? salesTaxRates.default) * 100}%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Travel Fee:</span>
                <span>${travelFee.toFixed(2)}</span>
              </div>
              <div className="price-row total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <button
          className="book-now-button"
          onClick={handleBookNow}
          disabled={!selectedBrand || !selectedDeviceType || !selectedDeviceModel || !selectedRepairType || !zipCode}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Repairs;