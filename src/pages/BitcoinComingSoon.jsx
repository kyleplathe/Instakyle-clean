import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ComingSoon.css';

const BitcoinComingSoon = () => {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-container">
        <div className="coming-soon-content">
          <div className="icon-wrapper">
            <span className="coming-soon-icon">₿</span>
          </div>
          <h1>Bitcoin Payments</h1>
          <h2>Coming Soon</h2>
          <p className="description">
            We&apos;re gearing up to support Bitcoin payments for repairs, devices, and accessories.
            Soon, you&apos;ll be able to check out with lightning-fast transactions and keep your
            spending on-chain.
          </p>
          <div className="features-preview">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <p>Lightning Network support</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔐</span>
              <p>Secure invoices & receipts</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🌍</span>
              <p>Global-friendly payment option</p>
            </div>
          </div>
          <div className="cta-buttons">
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get Notified
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitcoinComingSoon;


