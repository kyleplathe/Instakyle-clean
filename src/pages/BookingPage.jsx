import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import '../styles/BookingPage.css';

const deviceTypes = {
  'Apple': ['iPhone', 'iPad', 'MacBook', 'iMac'],
  'Samsung': ['Galaxy S', 'Galaxy Note', 'Galaxy Tab'],
  'Google': ['Pixel'],
  'Microsoft': ['Surface'],
  'Sony': ['PlayStation'],
  'Other': ['Other']
};

const deviceModels = {
  'iPhone': ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15', 'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14', 'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11', 'iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X', 'iPhone 8 Plus', 'iPhone 8', 'iPhone SE (2nd/3rd gen)', 'Other'],
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

const repairTypes = {
  'iPhone': {
    'Screen Repair': 129.99,
    'Battery Replacement': 79.99,
    'Camera Repair': 149.99,
    'Charging Port': 89.99,
    'Other': 99.99
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

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    brand: '',
    deviceType: '',
    deviceModel: '',
    repairType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    notes: ''
  });

  const [availableModels, setAvailableModels] = useState([]);
  const [availableDeviceModels, setAvailableDeviceModels] = useState([]);
  const [availableRepairTypes, setAvailableRepairTypes] = useState({});
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [travelFee, setTravelFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  // Google Places API key - you should add this to your environment variables
  // Get your API key from: https://developers.google.com/maps/documentation/javascript/get-api-key
  // Enable the following APIs: Places API and Geocoding API
  // Add to .env file: REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const handleAddressSelect = async (selectedAddress) => {
    if (selectedAddress && selectedAddress.value) {
      try {
        const results = await geocodeByAddress(selectedAddress.value);
        const latLng = await getLatLng(results[0]);
        
        // Parse address components
        const addressComponents = results[0].address_components;
        let streetNumber = '';
        let streetName = '';
        let city = '';
        let zipCode = '';
        
        addressComponents.forEach(component => {
          if (component.types.includes('street_number')) {
            streetNumber = component.long_name;
          }
          if (component.types.includes('route')) {
            streetName = component.long_name;
          }
          if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
            city = component.long_name;
          }
          if (component.types.includes('postal_code')) {
            zipCode = component.long_name;
          }
        });
        
        const fullAddress = `${streetNumber} ${streetName}`.trim() || selectedAddress.value;
        
        setFormData(prev => ({
          ...prev,
          address: fullAddress,
          city: city,
          zipCode: zipCode
        }));
        
        // Update travel fee and tax
        if (zipCode) {
          const fee = travelFees[zipCode] ?? travelFees.default;
          setTravelFee(fee);
          
          // Update tax based on new zip code
          const taxRate = salesTaxRates[zipCode] ?? salesTaxRates.default;
          const newTax = price * taxRate;
          setTax(newTax);
          setTotal(price + newTax + fee);
        }
      } catch (error) {
        console.error('Error geocoding address:', error);
        // Fallback: just set the address text
        setFormData(prev => ({
          ...prev,
          address: selectedAddress.value
        }));
      }
    }
  };

  useEffect(() => {
    // Pre-fill form data if coming from repairs page
    if (location.state?.bookingData) {
      const { brand, deviceType, deviceModel, repairType, zipCode } = location.state.bookingData;
      setFormData(prev => ({
        ...prev,
        brand,
        deviceType,
        deviceModel,
        repairType,
        zipCode
      }));
      
      // Set available options
      setAvailableModels(deviceTypes[brand] || []);
      setAvailableDeviceModels(deviceModels[deviceType] || []);
      setAvailableRepairTypes(repairTypes[deviceType] || {});
      
      // Set initial price and fees
      if (repairType) {
        const repairPrice = repairTypes[deviceType]?.[repairType] || 0;
        setPrice(repairPrice);
      }
      if (zipCode) {
        const fee = travelFees[zipCode] ?? travelFees.default;
        setTravelFee(fee);
      }
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'brand') {
      setAvailableModels(deviceTypes[value] || []);
      setFormData(prev => ({
        ...prev,
        deviceType: '',
        deviceModel: '',
        repairType: ''
      }));
    } else if (name === 'deviceType') {
      setAvailableDeviceModels(deviceModels[value] || []);
      setAvailableRepairTypes(repairTypes[value] || {});
      setFormData(prev => ({
        ...prev,
        deviceModel: '',
        repairType: ''
      }));
    } else if (name === 'repairType') {
      const repairPrice = repairTypes[formData.deviceType]?.[value] || 0;
      setPrice(repairPrice);
    } else if (name === 'zipCode') {
      const fee = travelFees[value] ?? travelFees.default;
      setTravelFee(fee);
    }
  };

  const handleZipCodeChange = (e) => {
    const zip = e.target.value;
    setFormData(prev => ({ ...prev, zipCode: zip }));
    const fee = travelFees[zip] ?? travelFees.default;
    setTravelFee(fee);
    
    // Update tax rate based on ZIP code
    const taxRate = salesTaxRates[zip] ?? salesTaxRates.default;
    const newTax = price * taxRate;
    setTax(newTax);
    setTotal(price + newTax + fee);
  };

  React.useEffect(() => {
    const taxRate = salesTaxRates[formData.zipCode] ?? salesTaxRates.default;
    const newTax = price * taxRate;
    setTax(newTax);
    setTotal(price + newTax + travelFee);
  }, [price, travelFee, formData.zipCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    const requiredFields = ['brand', 'deviceType', 'repairType', 'firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zipCode'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          name: `${formData.firstName} ${formData.lastName}`,
          price,
          tax,
          travelFee,
          total,
          status: 'pending'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const data = await response.json();
      navigate('/booking-confirmation', { state: { bookingId: data.id } });
    } catch (error) {
      console.error('Error creating booking:', error);
      setError('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="booking-page">
      <h1>Book Your Repair</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        {error && (
          <div className="error-message" style={{ 
            background: '#FFE5E5', 
            color: '#D70015', 
            padding: '1rem', 
            borderRadius: '4px', 
            marginBottom: '1rem' 
          }}>
            {error}
          </div>
        )}

        <div className="form-section">
          <h2>Device Information</h2>
          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <select
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Brand</option>
              {Object.keys(deviceTypes).map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="deviceType">Device Type</label>
            <select
              id="deviceType"
              name="deviceType"
              value={formData.deviceType}
              onChange={handleInputChange}
              required
              disabled={!formData.brand}
            >
              <option value="">Select Device Type</option>
              {availableModels.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="deviceModel">Device Model</label>
            <select
              id="deviceModel"
              name="deviceModel"
              value={formData.deviceModel}
              onChange={handleInputChange}
              required
              disabled={!formData.deviceType}
            >
              <option value="">Select Device Model</option>
              {availableDeviceModels.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="repairType">Repair Type</label>
            <select
              id="repairType"
              name="repairType"
              value={formData.repairType}
              onChange={handleInputChange}
              required
              disabled={!formData.deviceType}
            >
              <option value="">Select Repair Type</option>
              {Object.keys(availableRepairTypes).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>Contact Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                autoComplete="given-name"
                placeholder="First"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                autoComplete="family-name"
                placeholder="Last"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              autoComplete="tel"
              placeholder="Phone"
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Location</h2>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            {GOOGLE_MAPS_API_KEY ? (
              <GooglePlacesAutocomplete
                apiKey={GOOGLE_MAPS_API_KEY}
                selectProps={{
                  value: formData.address ? { label: formData.address, value: formData.address } : null,
                  onChange: handleAddressSelect,
                  placeholder: 'Start typing your address...',
                  isClearable: true,
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      minHeight: '48px',
                      borderRadius: '4px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px'
                    }),
                    input: (provided) => ({
                      ...provided,
                      padding: '8px 12px'
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: '#6b7280'
                    })
                  }
                }}
                autocompletionRequest={{
                  componentRestrictions: { country: 'us' }
                }}
                onLoadFailed={(error) => {
                  console.error('Google Places API failed to load:', error);
                }}
              />
            ) : (
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                autoComplete="street-address"
                placeholder="Address"
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              autoComplete="address-level2"
              placeholder="City"
            />
          </div>

          <div className="form-group">
            <label htmlFor="zipCode">ZIP Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleZipCodeChange}
              required
              pattern="[0-9]{5}"
              title="Please enter a valid 5-digit ZIP code"
              autoComplete="postal-code"
              placeholder="ZIP Code"
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Additional Information</h2>
          <div className="form-group">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="4"
              placeholder="Any additional information about your repair"
            />
          </div>
        </div>

        <div className="price-summary">
          <h2>Price Summary</h2>
          <div className="price-details">
            <div className="price-row">
              <span>Repair Cost:</span>
              <span>${price.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Sales Tax ({(salesTaxRates[formData.zipCode] ?? salesTaxRates.default) * 100}%):</span>
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

        <button type="submit" className="submit-button">
          Book Repair
        </button>
      </form>
    </div>
  );
};

export default BookingPage; 