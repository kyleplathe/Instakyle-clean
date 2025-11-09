import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ComingSoon.css';

const InsuranceComingSoon = () => {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-container">
        <div className="coming-soon-content">
          <div className="icon-wrapper">
            <span className="coming-soon-icon">🛡️</span>
          </div>
          <h1>Insurance with AKKO</h1>
          <h2>Partnership Coming Soon</h2>
          <p className="description">
            We&apos;re partnering with AKKO to bring you flexible device protection plans.
            Cover repairs, replacements, and everyday mishaps with a customer-first insurance partner.
          </p>
          <div className="features-preview">
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <p>Protection for phones, tablets & laptops</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💼</span>
              <p>Plans tailored for individuals & small business</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🤝</span>
              <p>Hassle-free claims through Instakyle</p>
            </div>
          </div>
          <div className="cta-buttons">
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Ask About Coverage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceComingSoon;


