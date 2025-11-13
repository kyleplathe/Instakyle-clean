import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Services Section */}
          <div className="footer-section">
            <h3>Services</h3>
            <ul className="footer-links">
              <li><Link to="/repairs">Repairs</Link></li>
              <li><Link to="/coming-soon">Buy / Sell / Trade</Link></li>
              <li><a href="https://instakyle.tech" target="_blank" rel="noopener noreferrer">Store</a></li>
              <li><Link to="/contact#mail-in-service">Mail-In Service</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/insurance">Insurance</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/bitcoin">Bitcoin</Link></li>
            </ul>
          </div>

          {/* Socials Section */}
          <div className="footer-section">
            <h3>Socials</h3>
            <ul className="footer-links">
              <li><a href="https://www.instagram.com/instakyleiphonerepair?igsh=MWJvN2U2YTd4bm1nbA==" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.facebook.com/share/19qrLzcMKs/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://youtube.com/@instakyleiphonerepair?si=ZC-UjKYYOLwDy9T4" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3>Contact</h3>
            <ul className="footer-info">
              <li>Text: <a href="tel:+19525223029">(952) 522-3029</a></li>
              <li>Email: <a href="mailto:hello@instakyleiphonerepair.com">hello@instakyleiphonerepair.com</a></li>
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
              <li>
                <a 
                  href="https://www.google.com/maps/place/Instakyle+iPhone+Repair/@44.9705185,-93.2616025,12z/data=!3m1!4b1!4m6!3m5!1s0x52b33304d2d22665:0xe9d0b047b7cc0d6c!8m2!3d44.9705185!4d-93.2616025!16s%2Fg%2F11cmggstbq?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="google-review-link"
                >
                  ⭐ 5.0 Stars • 170 Google Reviews
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

