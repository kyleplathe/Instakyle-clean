import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import applePart6 from '../assets/images/apple-part-6.webp';

const rotatingPhrases = [
  { text: 'Repair Your World', emoji: '🌎' },
  { text: 'Reduce eWaste' },
  { text: 'Conscious Consumption' },
  { text: 'Sustainability' },
  { text: 'Ethical Capitalism' },
  { text: 'Repair First Mindset' },
];

const ROTATION_INTERVAL = 4000;

const Home = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    console.log('Home component mounted');
  }, []);

  console.log('Home component rendering');

  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % rotatingPhrases.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(rotationTimer);
  }, []);

  const currentPhrase = rotatingPhrases[currentPhraseIndex];

  return (
    <div className="home" style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Hero Title Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 aria-live="polite" aria-atomic="true">
            <span key={currentPhrase.text} className="hero-rotating-text">
              <span className="hero-rotating-text-label">{currentPhrase.text}</span>
              {currentPhrase.emoji ? (
                <span className="hero-rotating-emoji" role="img" aria-hidden="true">
                  {currentPhrase.emoji}
                </span>
              ) : null}
            </span>
          </h1>
          <p className="hero-subtitle">
            Purpose-driven tech repair that keeps devices in service longer and cuts down on waste.
          </p>
        </div>
      </section>

      {/* Hero Cards Section */}
      <section className="hero-cards">
        <div className="hero-cards-container">
          <div className="hero-card">
            <div className="hero-card-icon">🔧</div>
            <h3>Repair</h3>
            <p>Professional repair services for phones, tablets, watches, computers, and gaming consoles</p>
            <Link to="/repairs" className="hero-card-link">Get Started</Link>
          </div>
          
          <div className="hero-card">
            <div className="hero-card-icon">💰</div>
            <h3>Buy / Sell / Trade</h3>
            <p>Upgrade your device, sell your old device, or trade for store credit</p>
            <Link to="/coming-soon" className="hero-card-link">Learn More</Link>
          </div>
          
                    <div className="hero-card">
            <div className="hero-card-icon">🛒</div>
            <h3>Shop</h3>
            <p>New and used devices plus high-quality tech accessories</p>
            <a href="https://instakyle.tech" target="_blank" rel="noopener noreferrer" className="hero-card-link">Shop Now</a>
            </div>
          
          <div className="hero-card">
            <div className="hero-card-icon">💡</div>
            <h3>Support</h3>
            <p>DIY troubleshooting, tips & tricks, app recommendations, and tech reviews</p>
            <Link to="/support" className="hero-card-link">Get Help</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Screen Repair</h3>
            <p>Professional screen replacement for all devices</p>
          </div>
          <div className="service-card">
            <h3>Battery Replacement</h3>
            <p>Extend your device's life with a new battery</p>
          </div>
          <div className="service-card">
            <h3>Back Glass Repair</h3>
            <p>Restore your device's back glass to perfect condition</p>
          </div>
          <div className="service-card">
            <h3>Screen & Back Glass</h3>
            <p>Complete exterior restoration service</p>
          </div>
          <div className="service-card">
            <h3>Rear Camera Module</h3>
            <p>Fix camera issues and restore photo quality</p>
          </div>
          <div className="service-card">
            <h3>Rear Camera Glass</h3>
            <p>Repair cracked or damaged camera glass</p>
          </div>
          <div className="service-card">
            <h3>Charger Port Repair</h3>
            <p>Fix charging and connectivity issues</p>
          </div>
          <div className="service-card">
            <h3>Charger Port Cleaning</h3>
            <p>Remove debris and restore charging functionality</p>
          </div>
          <div className="service-card">
            <h3>HDMI Port Repair</h3>
            <p>Fix gaming console HDMI port issues</p>
          </div>
          <div className="service-card">
            <h3>Keyboard Repair</h3>
            <p>Repair laptop and tablet keyboard issues</p>
          </div>
          <div className="service-card coming-soon">
            <h3>Data Recovery</h3>
            <p>Recover your important data safely</p>
            <span className="coming-soon-badge">Coming Soon</span>
          </div>
          <div className="service-card coming-soon">
            <h3>Water Damage</h3>
            <p>Professional water damage repair and recovery</p>
            <span className="coming-soon-badge">Coming Soon</span>
          </div>
        </div>
        {/* Mobile Services List */}
        <div className="services-list-mobile">
          <ul className="services-bullet-list">
            <li>Screen Repair</li>
            <li>Battery Replacement</li>
            <li>Back Glass Repair</li>
            <li>Screen & Back Glass</li>
            <li>Rear Camera Module</li>
            <li>Rear Camera Glass</li>
            <li>Charger Port Repair</li>
            <li>Charger Port Cleaning</li>
            <li>HDMI Port Repair</li>
            <li>Gaming Console Repair</li>
            <li>Data Recovery <span className="coming-soon-badge-small">Coming Soon</span></li>
            <li>Water Damage <span className="coming-soon-badge-small">Coming Soon</span></li>
          </ul>
        </div>
        <div className="services-cta">
          <Link to="/repairs" className="service-cta-button">
            View All Repair Services
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us</h2>
        <div className="features">
          <div className="feature">
            <h3>Expert Technicians</h3>
            <p>Certified professionals with years of experience</p>
          </div>
          <div className="feature">
            <h3>Quick Turnaround</h3>
            <p>Most repairs completed within 24 hours, soldering jobs within 3-5 days</p>
          </div>
          <div className="feature">
            <h3>Warranty Included</h3>
            <p>90-day warranty on all repairs</p>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="reviews-section">
        <h2>What Our Customers Say</h2>
        <div className="reviews-content">
          <div className="google-review-card">
            <div className="google-logo">Google</div>
            <div className="review-stars">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="rating-text">5.0</span>
            </div>
            <div className="review-count">170 Reviews</div>
            <a 
              href="https://www.google.com/maps/place/Instakyle+iPhone+Repair/@44.9705185,-93.2616025,12z/data=!3m1!4b1!4m6!3m5!1s0x52b33304d2d22665:0xe9d0b047b7cc0d6c!8m2!3d44.9705185!4d-93.2616025!16s%2Fg%2F11cmggstbq?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="review-link"
            >
              Read Reviews on Google
            </a>
          </div>
        </div>
        {/* Elfsight Google Reviews Carousel */}
        <div className="elfsight-reviews-widget">
          <div 
            className="elfsight-app-d74e1640-810e-40be-9c97-32f432651494" 
            data-elfsight-app-lazy
          ></div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Fix Your Device?</h2>
        <p>Book an appointment today</p>
        <div className="cta-buttons">
          <Link to="/repairs" className="cta-button primary">Book Repair</Link>
        </div>
      </section>

      {/* Image Section */}
      <section className="image-section">
        <div className="image-container">
          <img 
            src={applePart6} 
            alt="Apple Genuine Parts" 
            className="bottom-image"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;