import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ComingSoon.css';

const SupportComingSoon = () => {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-container">
        <div className="coming-soon-content">
          <div className="icon-wrapper">
            <span className="coming-soon-icon">💡</span>
          </div>
          <h1>Support</h1>
          <h2>Coming Soon</h2>
          <p className="description">
            We're building an amazing support center to help you with DIY troubleshooting, 
            tips & tricks, app recommendations, and tech reviews. Everything you need to get 
            the most out of your devices!
          </p>
          <div className="features-preview">
            <div className="feature-item">
              <span className="feature-icon">🔧</span>
              <p>DIY troubleshooting guides</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💡</span>
              <p>Tips & tricks</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <p>App recommendations</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⭐</span>
              <p>Tech reviews</p>
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
            Need help right now?
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

export default SupportComingSoon;

