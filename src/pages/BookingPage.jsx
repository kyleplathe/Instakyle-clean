import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import '../styles/BookingPage.css';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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
  ' Watch': [' Watch Series 10', ' Watch Series 9', ' Watch Series 8', ' Watch SE (3rd gen)', ' Watch SE (2nd gen)', ' Watch Ultra 2', ' Watch Ultra', ' Watch Series 7', ' Watch Series 6', ' Watch SE (1st gen)', 'Other'],
  'Galaxy S': ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22', 'Other'],
  'Galaxy Note': ['Galaxy Note 20 Ultra', 'Galaxy Note 20', 'Galaxy Note 10+', 'Galaxy Note 10', 'Other'],
  'Galaxy Tab': ['Galaxy Tab S9 Ultra', 'Galaxy Tab S9+', 'Galaxy Tab S9', 'Galaxy Tab S8 Ultra', 'Galaxy Tab S8+', 'Galaxy Tab S8', 'Other'],
  'Pixel': ['Pixel 8 Pro', 'Pixel 8', 'Pixel 7 Pro', 'Pixel 7', 'Pixel 6 Pro', 'Pixel 6', 'Other'],
  'Moto G': ['Moto G84', 'Moto G73', 'Moto G53', 'Moto G23', 'Moto G13', 'Other'],
  'Moto Edge': ['Moto Edge 50 Pro', 'Moto Edge 40', 'Moto Edge 30', 'Other'],
  'Razr': ['Moto Razr 50 Ultra', 'Moto Razr 40 Ultra', 'Moto Razr 40', 'Other'],
  'Surface': ['Surface Pro 9', 'Surface Pro 8', 'Surface Laptop 5', 'Surface Laptop 4', 'Surface Book 3', 'Other'],
  'Switch': ['Nintendo Switch OLED', 'Nintendo Switch (2021)', 'Nintendo Switch Lite', 'Other'],
  'Xbox': ['Xbox Series X', 'Xbox Series S', 'Xbox One X', 'Other'],
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

/* Travel fees removed
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
  // Twin Cities metro area zip codes (within 50 miles of 55410)
  '55014': 15, // Burnsville
  '55016': 15, // Dundas
  '55024': 15, // Farmington
  '55026': 15, // Hastings
  '55027': 15, // Hopkins
  '55031': 15, // Lakeville
  '55032': 15, // Lakeville
  '55038': 15, // Rogers
  '55040': 15, // Savage
  '55041': 15, // Shakopee
  '55042': 15, // South St Paul
  '55043': 15, // South St Paul
  '55044': 15, // Rosemount
  '55045': 15, // Rosemount
  '55046': 15, // Rosemount
  '55063': 15, // Stillwater
  '55064': 15, // Stillwater
  '55068': 15, // White Bear Lake
  '55069': 15, // White Bear Lake
  '55070': 15, // White Bear Lake
  '55071': 15, // White Bear Lake
  '55072': 15, // White Bear Lake
  '55073': 15, // White Bear Lake
  '55074': 15, // White Bear Lake
  '55075': 15, // White Bear Lake
  '55077': 15, // White Bear Lake
  '55078': 15, // White Bear Lake
  '55079': 15, // White Bear Lake
  '55080': 15, // White Bear Lake
  '55081': 15, // White Bear Lake
  '55082': 15, // White Bear Lake
  '55083': 15, // White Bear Lake
  '55090': 15, // Marine on St Croix
  '55304': 15, // Anoka
  '55305': 15, // Andover
  '55307': 15, // Buffalo
  '55309': 15, // Buffalo
  '55316': 15, // Buffalo
  '55329': 15, // Chanhassen
  '55330': 15, // Chaska
  '55341': 15, // Cologne
  '55362': 15 // Cologne
};
*/

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
  // Twin Cities metro area zip codes (within 50 miles of 55410)
  '55014': 0.0875, // Burnsville (8.75%)
  '55016': 0.0875, // Dundas
  '55024': 0.0875, // Farmington
  '55026': 0.0875, // Hastings
  '55027': 0.0875, // Hopkins
  '55031': 0.0875, // Lakeville
  '55032': 0.0875, // Lakeville
  '55038': 0.0875, // Rogers
  '55040': 0.0875, // Savage
  '55041': 0.0875, // Shakopee
  '55042': 0.07875, // South St Paul (St. Paul rate)
  '55043': 0.07875, // South St Paul
  '55044': 0.07875, // Rosemount
  '55045': 0.07875, // Rosemount
  '55046': 0.07875, // Rosemount
  '55063': 0.0875, // Stillwater
  '55064': 0.0875, // Stillwater
  '55068': 0.0875, // White Bear Lake
  '55069': 0.0875, // White Bear Lake
  '55070': 0.0875, // White Bear Lake
  '55071': 0.0875, // White Bear Lake
  '55072': 0.0875, // White Bear Lake
  '55073': 0.0875, // White Bear Lake
  '55074': 0.0875, // White Bear Lake
  '55075': 0.0875, // White Bear Lake
  '55077': 0.0875, // White Bear Lake
  '55078': 0.0875, // White Bear Lake
  '55079': 0.0875, // White Bear Lake
  '55080': 0.0875, // White Bear Lake
  '55081': 0.0875, // White Bear Lake
  '55082': 0.0875, // White Bear Lake
  '55083': 0.0875, // White Bear Lake
  '55090': 0.0875, // Marine on St Croix
  '55304': 0.0875, // Anoka
  '55305': 0.0875, // Andover
  '55307': 0.0875, // Buffalo
  '55309': 0.0875, // Buffalo
  '55316': 0.0875, // Buffalo
  '55329': 0.0875, // Chanhassen
  '55330': 0.0875, // Chaska
  '55341': 0.0875, // Cologne
  '55362': 0.0875 // Cologne
};

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to validate zipCode for tax calculation
  const isValidZipForTax = (zipCode) => {
    return zipCode && 
           typeof zipCode === 'string' &&
           zipCode.trim() !== '' && 
           zipCode !== 'default' && 
           salesTaxRates[zipCode] !== undefined;
  };
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
    latitude: null,
    longitude: null,
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  const [availableModels, setAvailableModels] = useState([]);
  const [availableDeviceModels, setAvailableDeviceModels] = useState([]);
  const [availableRepairTypes, setAvailableRepairTypes] = useState({});
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  // Travel fee removed
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Google Places API key - you should add this to your environment variables
  // Get your API key from: https://developers.google.com/maps/documentation/javascript/get-api-key
  // Enable the following APIs: Places API and Geocoding API
  // Add to .env file: VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  // Debug: Check if API key is loaded
  React.useEffect(() => {
    console.log('Google Maps API Key loaded:', GOOGLE_MAPS_API_KEY ? 'Yes' : 'No');
  }, [GOOGLE_MAPS_API_KEY]);

  const handleAddressSelect = async (address) => {
    console.log('Address selected:', address);
    
    if (address && address.value) {
      // Store the selected address for proper React state management
      setSelectedAddress(address);
      
      try {
        const results = await geocodeByAddress(address.value);
        const latLng = await getLatLng(results[0]);
        
        // Parse address components for more accurate data
        const addressComponents = results[0].address_components;
        let streetNumber = '';
        let streetName = '';
        let city = '';
        let zipCode = '';
        let state = '';
        
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
          if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name;
          }
        });
        
        console.log('Parsed address components:', { city, zipCode, streetNumber, streetName });
        
        // Update form data with parsed address information - ensure we always set city and zipCode
        setFormData(prev => {
          const updated = {
            ...prev,
            address: address.value, // Full formatted address from Google Places
            latitude: latLng.lat, // Store coordinates for travel planning
            longitude: latLng.lng
          };
          
          // Always update city and zipCode if we found them
          if (city) updated.city = city;
          if (zipCode) updated.zipCode = zipCode;
          
          console.log('Updated form data:', updated);
          return updated;
        });
        
        // Update pricing based on new zip code
        if (zipCode) {
          if (isValidZipForTax(zipCode)) {
            const taxRate = salesTaxRates[zipCode];
            const newTax = price * taxRate;
            setTax(newTax);
            setTotal(price + newTax);
          } else {
            setTax(0);
            setTotal(price);
          }
        }
      } catch (error) {
        console.error('Error geocoding address:', error);
        // Fallback: just set the address text without geocoding
        setFormData(prev => ({
          ...prev,
          address: address.value
        }));
      }
    } else if (address === null) {
      // Handle clearing the address
      setSelectedAddress(null);
      setFormData(prev => ({
        ...prev,
        address: '',
        latitude: null,
        longitude: null
      }));
    }
  };

  useEffect(() => {
    // Handle initial page load - set flag if no data transfer expected
    if (!location.state?.bookingData) {
      setIsInitialDataLoaded(true);
      // Ensure tax starts at 0 when no data is transferred
      setTax(0);
    }
  }, []);

  useEffect(() => {
    // Pre-fill form data if coming from repairs page
    if (location.state?.bookingData) {
      const { 
        brand, 
        deviceType, 
        deviceModel, 
        repairType, 
        zipCode, 
        price: repairPrice, 
        // Travel fee removed
        tax: transferredTax, 
        total: transferredTotal 
      } = location.state.bookingData;
      
      console.log('Transferring data from repairs page:', { 
        brand, 
        deviceType, 
        deviceModel, 
        repairType, 
        zipCode, 
        repairPrice, 
        transferredTravelFee, 
        transferredTax, 
        transferredTotal 
      });
      
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
      
      // Set prices from transferred data if available, otherwise calculate
      if (repairPrice !== undefined) {
        setPrice(repairPrice);
      } else {
        const calculatedPrice = repairTypes[deviceType]?.[repairType] || 0;
        setPrice(calculatedPrice);
      }
      
      // Travel fee removed
      
      if (transferredTax !== undefined) {
        setTax(transferredTax);
      } else {
        // Calculate tax if not transferred but we have zipCode and price
        const finalPrice = repairPrice !== undefined ? repairPrice : (repairTypes[deviceType]?.[repairType] || 0);
        if (zipCode && finalPrice > 0 && isValidZipForTax(zipCode)) {
          const taxRate = salesTaxRates[zipCode];
          const newTax = finalPrice * taxRate;
          setTax(newTax);
        } else {
          setTax(0);
        }
      }
      
      // Set total from transferred data if available, otherwise calculate
      if (transferredTotal !== undefined) {
        setTotal(transferredTotal);
      } else {
        const finalPrice = repairPrice !== undefined ? repairPrice : (repairTypes[deviceType]?.[repairType] || 0);
        // Travel fee removed
        const finalTax = transferredTax !== undefined ? transferredTax : (
          zipCode && finalPrice > 0 && isValidZipForTax(zipCode) ? finalPrice * salesTaxRates[zipCode] : 0
        );
        setTotal(finalPrice + finalTax);
      }
      
      // Mark that initial data has been loaded
      setIsInitialDataLoaded(true);
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
      // Travel fee removed
    }
  };

  const handleZipCodeChange = (e) => {
    const zip = e.target.value;
    setFormData(prev => ({ ...prev, zipCode: zip }));
    
    // Update tax rate based on ZIP code
    if (isValidZipForTax(zip)) {
      const taxRate = salesTaxRates[zip];
      const newTax = price * taxRate;
      setTax(newTax);
      setTotal(price + newTax);
    } else {
      // No ZIP code or no specific tax rate, remove tax
      setTax(0);
      setTotal(price);
    }
  };

  React.useEffect(() => {
    // Only run tax calculation after initial data has been loaded
    // This prevents default tax from being applied when data is transferred from repairs page
    if (isInitialDataLoaded && price > 0) {
      if (isValidZipForTax(formData.zipCode)) {
        const taxRate = salesTaxRates[formData.zipCode];
        const newTax = price * taxRate;
        setTax(newTax);
        setTotal(price + newTax);
      } else {
        // No ZIP code entered or no specific tax rate, explicitly set tax to 0
        setTax(0);
        setTotal(price);
      }
    } else if (isInitialDataLoaded && price === 0) {
      // Reset tax when price is 0
      setTax(0);
      setTotal(0);
    }
  }, [price, formData.zipCode, isInitialDataLoaded]);

  // Additional safety check to ensure tax is 0 when zipCode is invalid
  React.useEffect(() => {
    if (!isValidZipForTax(formData.zipCode)) {
      setTax(0);
    }
  }, [formData.zipCode]);

  // Helper function to generate calendar URL for iOS Calendar
  const generateCalendarEvent = () => {
    if (!formData.preferredDate || !formData.preferredTime || formData.preferredTime === 'flexible') {
      return null;
    }

    const [startTime, endTime] = formData.preferredTime.split('-');
    const appointmentDate = new Date(`${formData.preferredDate}T${startTime}:00`);
    const endDate = new Date(`${formData.preferredDate}T${endTime}:00`);
    
    const title = `iPhone Repair Appointment - ${formData.deviceModel}`;
    const description = `Repair Type: ${formData.repairType}\nLocation: ${formData.address}, ${formData.city}\nCustomer: ${formData.firstName} ${formData.lastName}\nPhone: ${formData.phone}\nTotal: $${total}`;
    const location = `${formData.address}, ${formData.city}, ${formData.zipCode}`;

    // Generate iOS Calendar URL
    const startISO = appointmentDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endISO = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startISO}/${endISO}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
    
    return calendarUrl;
  };

  // Helper function to send emails
  const sendBookingEmails = async (bookingData) => {
    try {
      // Send customer confirmation email
      const customerEmailResponse = await fetch(`${API_BASE_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: formData.email,
          type: 'customer_confirmation',
          bookingData: bookingData
        }),
      });

      // Send business notification email
      const businessEmailResponse = await fetch(`${API_BASE_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'hello@instakyleiphonerepair.com',
          type: 'business_notification',
          bookingData: bookingData
        }),
      });

      if (!customerEmailResponse.ok || !businessEmailResponse.ok) {
        console.warn('Email sending failed, but booking was successful');
      }
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate required fields - be flexible with address components if Google Places address is selected
    const requiredFields = ['brand', 'deviceType', 'deviceModel', 'repairType', 'firstName', 'lastName', 'email', 'phone', 'address', 'preferredDate', 'preferredTime'];
    
    // Only require city and zipCode if address wasn't selected from Google Places
    // (Google Places addresses contain all the necessary location info)
    const hasGooglePlacesAddress = formData.latitude && formData.longitude;
    if (!hasGooglePlacesAddress) {
      requiredFields.push('city', 'zipCode');
    }
    
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field].toString().trim() === '');
    
    console.log('Form validation - current formData:', formData);
    console.log('Has Google Places address:', hasGooglePlacesAddress);
    console.log('Missing fields:', missingFields);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          name: `${formData.firstName} ${formData.lastName}`,
          price,
          tax,
          // Travel fee removed
          total,
          coordinates: {
            latitude: formData.latitude,
            longitude: formData.longitude
          },
          status: 'pending'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const data = await response.json();
      
      // Prepare booking data for emails
      const bookingData = {
        id: data.id,
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`,
        price,
        tax,
        // Travel fee removed
        total,
        coordinates: {
          latitude: formData.latitude,
          longitude: formData.longitude
        }
      };

      // Send confirmation emails
      await sendBookingEmails(bookingData);

      // Navigate to confirmation page with calendar link
      const calendarUrl = generateCalendarEvent();
      navigate('/booking-confirmation', { 
        state: { 
          bookingId: data.id,
          calendarUrl: calendarUrl,
          bookingData: bookingData
        } 
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      setError('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="booking-page">
      <h1>Book Your Repair</h1>
      <form onSubmit={handleSubmit} className="booking-form" autoComplete="on">
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

        {/* Hidden field to help Safari recognize this as a contact form */}
        <input type="hidden" name="form-type" value="contact" />
        
        <fieldset>
          <legend>Contact Information</legend>
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
              onChange={(e) => {
                // Format phone number as user types
                const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
                let formatted = input;
                
                if (input.length >= 6) {
                  formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
                } else if (input.length >= 3) {
                  formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
                }
                
                setFormData(prev => ({
                  ...prev,
                  phone: formatted
                }));
              }}
              required
              autoComplete="tel-national"
              placeholder="(555) 123-4567"
              maxLength="14"
            />
          </div>
        </fieldset>

        <div className="form-section">
          <h2>Location</h2>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            {GOOGLE_MAPS_API_KEY ? (
              <GooglePlacesAutocomplete
                apiKey={GOOGLE_MAPS_API_KEY}
                selectProps={{
                  value: selectedAddress || (formData.address ? { label: formData.address, value: formData.address } : null),
                  onChange: handleAddressSelect,
                  placeholder: 'Start typing your address...',
                  isClearable: true,
                  isSearchable: true,
                  menuPortalTarget: document.body,
                  noOptionsMessage: () => 'Start typing to see address suggestions',
                  loadingMessage: () => 'Loading suggestions...',
                  onInputChange: (inputValue, { action }) => {
                    console.log('Input changed:', inputValue, action);
                    return inputValue;
                  },
                  styles: {
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: '48px',
                      borderRadius: '4px',
                      border: state.isFocused ? '1px solid #007bff' : '1px solid #d1d5db',
                      fontSize: '16px',
                      boxShadow: state.isFocused ? '0 0 0 2px rgba(0, 123, 255, 0.25)' : 'none'
                    }),
                    input: (provided) => ({
                      ...provided,
                      padding: '8px 12px'
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: '#6b7280'
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 9999
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      maxHeight: '200px'
                    })
                  }
                }}
                autocompletionRequest={{
                  componentRestrictions: { country: 'us' },
                  types: ['address'],
                  fields: ['formatted_address', 'address_components', 'geometry']
                }}
                onLoadFailed={(error) => {
                  console.error('Google Places API failed to load:', error);
                }}
                onLoadSuccess={() => {
                  console.log('Google Places API loaded successfully');
                }}
                googleMapsScriptLoadOptions={{
                  id: 'google-maps-script',
                  googleMapsApiKey: GOOGLE_MAPS_API_KEY,
                  libraries: ['places']
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
          <h2>Service Scheduling</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="preferredDate">Preferred Date</label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
                placeholder="Select preferred date"
              />
            </div>

            <div className="form-group">
              <label htmlFor="preferredTime">Preferred Time Block</label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                required
              >
                <option value="">Select time block</option>
                <option value="09:00-10:00">9:00 AM - 10:00 AM</option>
                <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                <option value="12:00-13:00">12:00 PM - 1:00 PM</option>
                <option value="13:00-14:00">1:00 PM - 2:00 PM</option>
                <option value="14:00-15:00">2:00 PM - 3:00 PM</option>
                <option value="15:00-16:00">3:00 PM - 4:00 PM</option>
                <option value="16:00-17:00">4:00 PM - 5:00 PM</option>
                <option value="17:00-18:00">5:00 PM - 6:00 PM</option>
                <option value="18:00-19:00">6:00 PM - 7:00 PM</option>
                <option value="19:00-20:00">7:00 PM - 8:00 PM</option>
                <option value="flexible">Flexible - I'll work with your schedule</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <div className="service-note">
              <p><strong>Mobile Service:</strong> We come to your location! Please ensure you'll be available during your selected time slot. We'll confirm the appointment via text/email before arrival.</p>
            </div>
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
              <span>${price}</span>
            </div>
            {isValidZipForTax(formData.zipCode) && tax > 0 && (
              <div className="price-row">
                <span>Sales Tax ({(salesTaxRates[formData.zipCode] * 100).toFixed(2)}%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            )}
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