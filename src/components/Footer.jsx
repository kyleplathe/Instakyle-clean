import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Sitemap Section */}
          <div className="footer-section">
            <h3>Sitemap</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/repairs">Repairs</Link></li>
              <li><Link to="/coming-soon">Buy / Sell / Trade</Link></li>
              <li><a href="https://instakyle.tech" target="_blank" rel="noopener noreferrer">Store</a></li>
              <li><Link to="/contact">Mail-In Service</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="footer-section">
            <h3>Services</h3>
            <ul className="footer-links">
              <li><Link to="/repairs">Screen Repair</Link></li>
              <li><Link to="/repairs">Battery Replacement</Link></li>
              <li><Link to="/repairs">Camera Repair</Link></li>
              <li><Link to="/repairs">Charger Port Repair</Link></li>
              <li><Link to="/repairs">HDMI Port Repair</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3>Contact</h3>
            <ul className="footer-info">
              <li>Text: <a href="tel:+19525223029">(952) 522-3029</a></li>
              <li>Email: <a href="mailto:kyleplathe@icloud.com">kyleplathe@icloud.com</a></li>
              <li>
                <a 
                  href="https://maps.apple.com/?address=2727+W+43rd+St,+Minneapolis,+MN+55410" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  2727 W 43rd St, Unit 213<br />
                  Minneapolis, MN 55410
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Trademark Notice */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; {currentYear} Instakyle Tech Pro. All rights reserved.</p>
          </div>
          <div className="trademark-notice">
            <p>
              All trademarks are properties of their respective holders. Instakyle does not own or make claim to those trademarks used on this website in which it is not the holder.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

