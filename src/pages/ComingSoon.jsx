import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ComingSoon.css';

const ComingSoon = () => {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-container">
        <div className="coming-soon-content">
          <div className="icon-wrapper">
            <span className="coming-soon-icon">💰</span>
          </div>
          <h1>Buy / Sell / Trade</h1>
          <h2>Coming Soon</h2>
          <p className="description">
            We're working hard to bring you an amazing buy, sell, and trade experience. 
            You'll be able to upgrade your device, sell your old device, or trade for store credit.
          </p>
          <div className="features-preview">
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <p>Buy refurbished devices</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💵</span>
              <p>Sell your old devices</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔄</span>
              <p>Trade for store credit</p>
            </div>
          </div>
          <div className="cta-buttons">
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
            <Link to="/repairs" className="btn btn-secondary">
              View Repair Services
            </Link>
          </div>
          <p className="contact-info">
            Want to be notified when this launches?
          </p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;

