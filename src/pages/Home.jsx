import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import applePart6 from '../assets/images/apple-part-6.webp';

const Home = () => {
  useEffect(() => {
    console.log('Home component mounted');
  }, []);

  console.log('Home component rendering');

  return (
    <div className="home" style={{ minHeight: '100vh', background: '#fff' }}>
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
            <Link to="/book" className="hero-card-link">Learn More</Link>
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
            <Link to="/book" className="service-link">Book Repair</Link>
          </div>
          <div className="service-card">
            <h3>Battery Replacement</h3>
            <p>Extend your device's life with a new battery</p>
            <Link to="/book" className="service-link">Book Repair</Link>
          </div>
          <div className="service-card">
            <h3>HDMI Port Repair</h3>
            <p>Fix your gaming console's HDMI port issues</p>
            <Link to="/book" className="service-link">Book Repair</Link>
          </div>
          <div className="service-card">
            <h3>Data Recovery</h3>
            <p>Recover your important data safely</p>
            <Link to="/book" className="service-link">Book Repair</Link>
          </div>
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

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Fix Your Device?</h2>
        <p>Book an appointment today</p>
        <div className="cta-buttons">
          <Link to="/book" className="cta-button primary">Book Repair</Link>
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