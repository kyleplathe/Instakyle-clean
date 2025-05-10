import React from 'react';
import logo from '../assets/logo/Instakyle-Logo-Vector-Red_opt.png';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>Mobile repairs, mail-in service, drop-off, pickup, and local delivery available</p>
        </div>
      </section>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Contact Information Grid */}
        <section className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your name"
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Your email"
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="Your phone number"
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="service-type">Service Type</label>
                <select id="service-type" name="service-type" required>
                  <option value="">Select service type</option>
                  <option value="mobile">Mobile Repair (Screen/Battery)</option>
                  <option value="mail-in">Mail-in Repair (Complex Repairs)</option>
                  <option value="gaming">Gaming Console Repair</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="device">Device Type</label>
                <select id="device" name="device" required>
                  <option value="">Select your device</option>
                  <option value="iphone">iPhone</option>
                  <option value="ipad">iPad</option>
                  <option value="mac">Mac</option>
                  <option value="samsung">Samsung</option>
                  <option value="google">Google</option>
                  <option value="gaming">Gaming Console</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="Describe your repair needs"
                  required 
                ></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-info">
            <div className="info-card">
              <h2>Service Options</h2>
              <div className="info-item">
                <h3>Mobile Repairs</h3>
                <p>Screen and battery replacements at your location</p>
                <p>Available in Minneapolis metro area</p>
              </div>
              <div className="info-item">
                <h3>Repair Service Options</h3>
                <p>Complex repairs and gaming console services</p>
                <p>
                  <a 
                    href="https://maps.apple.com/?address=2727+W+43rd+St,+Minneapolis,+MN+55410" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#0066cc', textDecoration: 'none' }}
                  >
                    Mail to: 2727 W 43rd St, Unit 213
                    <br />
                    Minneapolis, MN 55410
                  </a>
                </p>
                <p>Drop-off and pickup available</p>
                <p>Local delivery service available</p>
              </div>
              <div className="info-item">
                <h3>Contact</h3>
                <p>Text: (952) 522-3029</p>
                <p>Email: kyleplathe@icloud.com</p>
              </div>
              <div className="info-item">
                <h3>Appointments</h3>
                <p>All services are by appointment only</p>
                <p>Text to schedule your repair</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;