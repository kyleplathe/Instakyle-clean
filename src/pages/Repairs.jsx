import React, { useState } from 'react';
import iphoneIcon from '../assets/icons/Apple/iphone.png';
import appleFamilyIcon from '../assets/icons/Apple/apple-family.png';
import samsungFamilyIcon from '../assets/icons/Samsung/samsung-family.png';
import googleFamilyIcon from '../assets/icons/Google/google-family.png';
import gamingFamilyIcon from '../assets/icons/Gaming/gaming-consoles.png';
import { screenRepairPrices } from '../config/pricing';

const brands = [
  { name: 'Apple', id: 'apple', gradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)' },
  { name: 'Samsung', id: 'samsung', gradient: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)' },
  { name: 'Google', id: 'google', gradient: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)' },
  { name: 'Gaming', id: 'gaming', gradient: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)' },
];

// Device and model data for the last 7 years (2017–2024)
const deviceData = {
  apple: {
    iPhone: [
      { series: 'iPhone 16', models: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16'] },
      { series: 'iPhone 15', models: ['iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max'] },
      { series: 'iPhone 14', models: ['iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max'] },
      { series: 'iPhone 13', models: ['iPhone 13', 'iPhone 13 Mini', 'iPhone 13 Pro', 'iPhone 13 Pro Max'] },
      { series: 'iPhone 12', models: ['iPhone 12', 'iPhone 12 Mini', 'iPhone 12 Pro', 'iPhone 12 Pro Max'] },
      { series: 'iPhone 11', models: ['iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max'] },
      { series: 'iPhone XS/XR', models: ['iPhone XS', 'iPhone XS Max', 'iPhone XR'] },
      { series: 'iPhone X/8', models: ['iPhone X', 'iPhone 8', 'iPhone 8 Plus'] },
      { series: 'iPhone SE', models: ['iPhone SE (2020)', 'iPhone SE (2022)'] },
    ],
    iPad: [
      { series: 'iPad Pro', models: ['iPad Pro 12.9" (2018-2022)', 'iPad Pro 11" (2018-2022)'] },
      { series: 'iPad Air', models: ['iPad Air (3rd-5th Gen)'] },
      { series: 'iPad', models: ['iPad (6th-10th Gen)'] },
      { series: 'iPad Mini', models: ['iPad Mini (5th-6th Gen)'] },
    ],
    Mac: [
      { series: 'MacBook Pro', models: ['MacBook Pro 13" (2017-2023)', 'MacBook Pro 14" (2021-2023)', 'MacBook Pro 16" (2019-2023)'] },
      { series: 'MacBook Air', models: ['MacBook Air (2018-2023)'] },
      { series: 'iMac', models: ['iMac (2017-2023)'] },
      { series: 'Mac Mini', models: ['Mac Mini (2018-2023)'] },
    ],
    'Apple Watch': [
      { series: 'Series 3-9', models: ['Series 3', 'Series 4', 'Series 5', 'Series 6', 'Series 7', 'Series 8', 'Series 9', 'SE', 'Ultra'] },
    ],
  },
  samsung: {
    'Galaxy Phone': [
      { series: 'Galaxy S24', models: ['S24', 'S24+', 'S24 Ultra'] },
      { series: 'Galaxy S23', models: ['S23', 'S23+', 'S23 Ultra'] },
      { series: 'Galaxy S22', models: ['S22', 'S22+', 'S22 Ultra'] },
      { series: 'Galaxy S21', models: ['S21', 'S21+', 'S21 Ultra'] },
      { series: 'Galaxy S20', models: ['S20', 'S20+', 'S20 Ultra'] },
      { series: 'Galaxy S10', models: ['S10', 'S10+', 'S10e'] },
      { series: 'Galaxy Note', models: ['Note 20', 'Note 20 Ultra', 'Note 10', 'Note 10+'] },
      { series: 'Galaxy Z', models: ['Z Fold5', 'Z Flip5', 'Z Fold4', 'Z Flip4'] },
    ],
    'Galaxy Tab': [
      { series: 'Tab S9', models: ['Tab S9', 'Tab S9+', 'Tab S9 Ultra'] },
      { series: 'Tab S8', models: ['Tab S8', 'Tab S8+', 'Tab S8 Ultra'] },
      { series: 'Tab S7', models: ['Tab S7', 'Tab S7+', 'Tab S7 FE'] },
    ],
    'Galaxy Watch': [
      { series: 'Watch 4-6', models: ['Watch 4', 'Watch 5', 'Watch 6', 'Watch 6 Classic'] },
    ],
  },
  google: {
    'Pixel Phone': [
      { series: 'Pixel 8', models: ['Pixel 8', 'Pixel 8 Pro'] },
      { series: 'Pixel 7', models: ['Pixel 7', 'Pixel 7 Pro', 'Pixel 7a'] },
      { series: 'Pixel 6', models: ['Pixel 6', 'Pixel 6 Pro', 'Pixel 6a'] },
      { series: 'Pixel 5', models: ['Pixel 5', 'Pixel 5a'] },
      { series: 'Pixel 4', models: ['Pixel 4', 'Pixel 4 XL', 'Pixel 4a', 'Pixel 4a 5G'] },
      { series: 'Pixel 3', models: ['Pixel 3', 'Pixel 3 XL', 'Pixel 3a', 'Pixel 3a XL'] },
    ],
    'Pixel Tablet': [
      { series: 'Pixel Tablet', models: ['Pixel Tablet (2023)'] },
    ],
    'Pixel Watch': [
      { series: 'Pixel Watch', models: ['Pixel Watch (2022)', 'Pixel Watch 2 (2023)'] },
    ],
  },
  gaming: {
    PlayStation: [
      { series: 'PS5', models: ['PlayStation 5 (Disc)', 'PlayStation 5 Digital'] },
      { series: 'PS4', models: ['PlayStation 4 Pro', 'PlayStation 4 Slim', 'PlayStation 4'] },
    ],
    Xbox: [
      { series: 'Series X/S', models: ['Xbox Series X', 'Xbox Series S'] },
      { series: 'Xbox One', models: ['Xbox One X', 'Xbox One S', 'Xbox One'] },
    ],
    Nintendo: [
      { series: 'Switch', models: ['Switch OLED', 'Switch', 'Switch Lite'] },
    ],
  },
};

const repairTypes = [
  { name: 'Screen Repair', id: 'screen-repair', price: screenRepairPrices },
  { name: 'Battery Replacement', id: 'battery' },
  { name: 'Charging Port Repair', id: 'charging-port' },
  { name: 'Camera Repair', id: 'camera' },
  { name: 'Speaker/Mic Repair', id: 'speaker-mic' },
  { name: 'Button Repair', id: 'button' },
  { name: 'Water Damage', id: 'water-damage' },
  { name: 'Data Recovery', id: 'data-recovery' },
  { name: 'Board/Soldering Repair', id: 'board-soldering' },
  { name: 'Face ID/Touch ID Repair', id: 'faceid-touchid' },
  { name: 'HDMI/USB-C Port Repair', id: 'hdmi-usbc' },
  { name: 'Power/No Power Repair', id: 'power' },
  { name: 'Fan/Overheating Repair', id: 'fan-overheat' },
  { name: 'Drive/Storage Repair', id: 'drive-storage' },
  { name: 'Controller Sync/Charging', id: 'controller' },
  { name: 'General Cleaning/Service', id: 'cleaning' },
];

const backButtonStyle = {
  background: '#fff',
  color: '#232526',
  border: '2px solid #232526',
  borderRadius: '6px',
  padding: '0.5rem 1.5rem',
  fontWeight: 600,
  fontSize: '1rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  cursor: 'pointer',
  marginTop: '2rem',
  marginRight: '0.5rem',
  transition: 'background 0.2s, color 0.2s',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem',
  background: 'transparent',
};
const aiWidgetStyle = {
  position: 'fixed',
  bottom: '32px',
  right: '32px',
  zIndex: 2000,
  background: '#fff',
  border: '1.5px solid #eee',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
  padding: '1.25rem 2rem',
  minWidth: '240px',
  textAlign: 'center',
};

const heroContainerStyle = {
  maxWidth: '100vw',
  padding: '2rem 0',
  background: 'linear-gradient(135deg, #f7f8fa 60%, #fff 100%)',
};
const brandRowStyle = {
  display: 'flex',
  gap: '2rem',
  overflowX: 'auto',
  padding: '2rem 2rem 2rem 2rem',
  maxWidth: '1200px',
  margin: '0 auto',
};

const brandCardStyle = brand => ({
  background: brand.gradient,
  borderRadius: '24px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '200px',
  minHeight: '200px',
  width: '200px',
  height: '200px',
  textAlign: 'center',
  cursor: 'pointer',
  flex: '0 0 200px',
  transition: 'transform 0.15s',
});

const Repairs = () => {
  const [step, setStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedDeviceType, setSelectedDeviceType] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedRepair, setSelectedRepair] = useState(null);

  let mainContent = null;

  const openMendBuddyChat = () => {
    // Wait for the widget to be fully loaded
    const waitForWidget = setInterval(() => {
      const widget = document.querySelector('.mendbuddy-chat-widget');
      if (widget) {
        clearInterval(waitForWidget);
        
        // Try multiple methods to open the chat
        if (window.MendBuddy && typeof window.MendBuddy.openChat === 'function') {
          window.MendBuddy.openChat();
        } else {
          // Try to find and click the chat button
          const chatButton = widget.querySelector('button[aria-label="Open chat"]') || 
                            widget.querySelector('.mendbuddy-chat-button') ||
                            widget;
          
          if (chatButton) {
            // Use a more reliable click method
            const clickEvent = new MouseEvent('click', {
              view: window,
              bubbles: true,
              cancelable: true
            });
            chatButton.dispatchEvent(clickEvent);
          }
        }
      }
    }, 100); // Check every 100ms

    // Clear interval after 5 seconds if widget doesn't load
    setTimeout(() => clearInterval(waitForWidget), 5000);
  };

  const getPocketSuiteUrl = () => {
    if (selectedBrand?.id === 'apple' && selectedDeviceType === 'iPhone' && selectedRepair?.name === 'Screen Repair') {
      // Format the model name to match PocketSuite URL format
      const modelName = selectedModel.toLowerCase()
        .replace(/\s+/g, '-')  // Replace spaces with hyphens
        .replace(/[()]/g, '')  // Remove parentheses
        .replace(/"/g, '')     // Remove quotes
        .replace(/\./g, '')    // Remove dots
        .replace(/\//g, '-');  // Replace slashes with hyphens
      
      return `https://pocketsuite.io/book/instakyle/item/${modelName}-screen-repair`;
    }
    return null;
  };

  // Step 1: Select Brand
  if (step === 1) {
    mainContent = (
      <>
        <section className="repairs-hero-grid">
          <h1>Choose Your Device Brand</h1>
          <p>Select your device family to get started</p>
        </section>
        <section className="brand-grid">
          {brands.map(brand => (
            <div
              key={brand.id}
              className="brand-card"
              style={{ background: brand.gradient }}
              onClick={() => { 
                setSelectedBrand(brand); 
                setStep(2); 
                setSelectedDeviceType(''); 
                setSelectedSeries(''); 
                setSelectedModel(''); 
                setSelectedRepair(null); 
              }}
            >
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 700, color: '#fff' }}>
                {brand.name}
              </h2>
              <span style={{ fontSize: '1.1rem', opacity: 0.85, color: '#fff' }}>
                {brand.id === 'apple' && 'iPhone, iPad, Mac, Apple Watch'}
                {brand.id === 'samsung' && 'Galaxy Phone, Galaxy Tab, Galaxy Watch'}
                {brand.id === 'google' && 'Pixel Phone, Pixel Tablet, Pixel Watch'}
                {brand.id === 'gaming' && 'PlayStation, Xbox, Nintendo Switch'}
              </span>
            </div>
          ))}
        </section>
      </>
    );
  }

  // Step 2: Device Type Dropdown
  const deviceTypes = selectedBrand ? Object.keys(deviceData[selectedBrand.id]) : [];
  if (step === 2 && selectedBrand) {
    mainContent = (
      <>
        <section className="repairs-hero-grid" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1>{selectedBrand.name} Device Type</h1>
          <p>Select your device type</p>
        </section>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <select
            value={selectedDeviceType}
            onChange={e => {
              setSelectedDeviceType(e.target.value);
              setSelectedSeries('');
              setSelectedModel('');
            }}
            style={{ fontSize: '1.1rem', padding: '0.5rem 1rem', borderRadius: '8px', minWidth: '220px' }}
          >
            <option value="">Select device type...</option>
            {deviceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        {/* Series Dropdown */}
        {selectedDeviceType && (
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <select
              value={selectedSeries}
              onChange={e => {
                setSelectedSeries(e.target.value);
                setSelectedModel('');
              }}
              style={{ fontSize: '1.1rem', padding: '0.5rem 1rem', borderRadius: '8px', minWidth: '220px' }}
            >
              <option value="">Select series...</option>
              {deviceData[selectedBrand.id][selectedDeviceType].map(series => (
                <option key={series.series} value={series.series}>{series.series}</option>
              ))}
            </select>
          </div>
        )}
        {/* Model Dropdown */}
        {selectedSeries && (
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <select
              value={selectedModel}
              onChange={e => setSelectedModel(e.target.value)}
              style={{ fontSize: '1.1rem', padding: '0.5rem 1rem', borderRadius: '8px', minWidth: '220px' }}
            >
              <option value="">Select specific model...</option>
              {deviceData[selectedBrand.id][selectedDeviceType].find(s => s.series === selectedSeries)?.models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>
        )}
        <div style={{ textAlign: 'center' }}>
          <button
            disabled={!selectedDeviceType || !selectedSeries || !selectedModel}
            style={{ background: '#0066cc', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.75rem 2rem', fontSize: '1.1rem', cursor: (!selectedDeviceType || !selectedSeries || !selectedModel) ? 'not-allowed' : 'pointer', opacity: (!selectedDeviceType || !selectedSeries || !selectedModel) ? 0.6 : 1, marginRight: '1rem' }}
            onClick={() => setStep(3)}
          >
            Next
          </button>
          <button style={backButtonStyle} onClick={() => { setStep(1); setSelectedBrand(null); setSelectedDeviceType(''); setSelectedSeries(''); setSelectedModel(''); setSelectedRepair(null); }}>Back</button>
        </div>
      </>
    );
  }

  // Step 3: Repair Type
  if (step === 3 && selectedBrand) {
    mainContent = (
      <>
        <section className="repairs-hero-grid" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1>{selectedModel}</h1>
          <p>Select a repair type</p>
        </section>
        <section className="repair-type-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          {repairTypes.map(repair => (
            <div key={repair.id} className="repair-type-card" style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem', textAlign: 'center', cursor: 'pointer', minWidth: '200px' }} onClick={() => { setSelectedRepair(repair); setStep(4); }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{repair.name}</h2>
            </div>
          ))}
        </section>
        <button style={backButtonStyle} onClick={() => setStep(2)}>Back</button>
      </>
    );
  }

  // Step 4: Get Quote / Book Now
  if (step === 4 && selectedBrand) {
    const pocketSuiteUrl = getPocketSuiteUrl();
    const price = selectedRepair.price?.[selectedModel];
    const isComingSoon = price === null;
    
    mainContent = (
      <>
        <section className="repairs-hero-grid" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1>{selectedModel} - {selectedRepair.name}</h1>
          {isComingSoon ? (
            <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#666', marginBottom: '1rem' }}>
              Coming Soon
            </p>
          ) : price && (
            <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0066cc', marginBottom: '1rem' }}>
              ${price.toFixed(2)} + tax
            </p>
          )}
          <p>For fastest service, book your repair today!</p>
        </section>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          {!isComingSoon && pocketSuiteUrl ? (
            <a 
              href={pocketSuiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                background: '#0066cc', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '6px', 
                padding: '0.75rem 2rem', 
                fontSize: '1.1rem', 
                textDecoration: 'none', 
                display: 'inline-block',
                transition: 'transform 0.2s ease'
              }} 
            >
              Book Now
            </a>
          ) : !isComingSoon && (
            <button
              style={{ 
                background: '#0066cc', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '6px', 
                padding: '0.75rem 2rem', 
                fontSize: '1.1rem', 
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onClick={openMendBuddyChat}
            >
              Get Quote
            </button>
          )}
        </div>
        <button style={backButtonStyle} onClick={() => setStep(3)}>Back</button>
      </>
    );
  }

  return (
    <div className="repairs-page" style={{ background: '#f7f8fa', minHeight: '100vh' }}>
      <div style={containerStyle}>{mainContent}</div>
    </div>
  );
};

export default Repairs;