import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/Instakyle-Logo-Vector-Red_opt.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src={logo} alt="Instakyle Logo" style={{ height: '40px', width: '40px', objectFit: 'contain' }} />
          <span>
            <span className="brand-insta">Insta</span>
            <span className="brand-kyle">kyle</span>
            <span className="brand-tech"> Tech Pro</span>
          </span>
        </Link>
        <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? '✕' : '☰'}
        </button>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/repairs" className="nav-link" onClick={() => setIsMenuOpen(false)}>Repairs</Link>
          <Link to="/coming-soon" className="nav-link" onClick={() => setIsMenuOpen(false)}>Buy / Sell / Trade</Link>
          <a href="https://instakyle.tech" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={() => setIsMenuOpen(false)}>Store</a>
          <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Mail-In Service</Link>
          <Link to="/support" className="nav-link" onClick={() => setIsMenuOpen(false)}>Support</Link>
          <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;