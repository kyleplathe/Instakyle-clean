import React from 'react';
import { Link } from 'react-router-dom';
import applePart6 from '../assets/images/apple-part-6.webp';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Expert Device Repair Services</h1>
          <p>Fast, reliable repairs for all your devices</p>
          <Link to="/contact" className="cta-button">Get Started</Link>
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
            <h3>HDMI Port Repair</h3>
            <p>Fix your gaming console's HDMI port issues</p>
          </div>
          <div className="service-card">
            <h3>Data Recovery</h3>
            <p>Recover your important data safely</p>
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
        <p>Book an appointment or check prices today</p>
        <div className="cta-buttons">
          <Link to="/contact" className="cta-button primary">Contact Us</Link>
          <Link to="/repairs" className="cta-button secondary">Learn More</Link>
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