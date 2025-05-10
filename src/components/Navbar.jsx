import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/Instakyle-Logo-Vector-Red_opt.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src={logo} alt="Instakyle Logo" style={{ height: '40px', width: '40px', objectFit: 'contain' }} />
          <span>
            <span className="brand-insta">Insta</span>
            <span className="brand-kyle">kyle</span>
          </span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/repairs" className="nav-link">Repairs</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;