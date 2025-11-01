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
              <button type="submit" className="submit-button gradient-button">Send Message</button>
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
                    style={{ color: '#007bff', textDecoration: 'none' }}
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

        {/* Mail-In Service Section */}
        <section className="mail-in-section">
          <div className="mail-in-container">
            <div className="mail-in-header">
              <h2>📦 Mail-In Repair Service</h2>
              <p>Send us your device for professional repair service</p>
            </div>
            
            <div className="mail-in-content">
              {/* Mail-In Form */}
              <div className="mail-in-form-container">
                <h3>Mail-In Repair Request Form</h3>
                <form className="mail-in-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="mail-name">Full Name</label>
                      <input 
                        type="text" 
                        id="mail-name" 
                        name="mail-name" 
                        placeholder="Your full name"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="mail-email">Email</label>
                      <input 
                        type="email" 
                        id="mail-email" 
                        name="mail-email" 
                        placeholder="Your email"
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="mail-phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="mail-phone" 
                        name="mail-phone" 
                        placeholder="(952) 555-1234"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="mail-device">Device Type</label>
                      <select id="mail-device" name="mail-device" required>
                        <option value="">Select device</option>
                        <option value="iphone">iPhone</option>
                        <option value="ipad">iPad</option>
                        <option value="mac">Mac</option>
                        <option value="samsung">Samsung</option>
                        <option value="google">Google Pixel</option>
                        <option value="gaming">Gaming Console</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="mail-model">Device Model</label>
                    <input 
                      type="text" 
                      id="mail-model" 
                      name="mail-model" 
                      placeholder="e.g., iPhone 15 Pro Max"
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="mail-issue">Issue Description</label>
                    <textarea 
                      id="mail-issue" 
                      name="mail-issue" 
                      placeholder="Describe the problem with your device in detail..."
                      rows="4"
                      required 
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="mail-return">Return Shipping Address</label>
                    <textarea 
                      id="mail-return" 
                      name="mail-return" 
                      placeholder="Your complete address for device return..."
                      rows="3"
                      required 
                    ></textarea>
                  </div>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        name="packaging-read" 
                        required 
                      />
                      <span>I have read and will follow the packaging instructions below</span>
                    </label>
                  </div>

                  <button type="submit" className="submit-button gradient-button">
                    Submit Mail-In Request
                  </button>
                </form>
              </div>

              {/* Packaging Instructions */}
              <div className="packaging-instructions">
                <h3>📋 Packaging Instructions</h3>
                <div className="instructions-content">
                  <div className="instruction-section">
                    <h4>Step 1: Backup Your Data</h4>
                    <p>Before sending your device, make sure to backup all important data. We recommend using iCloud, Google Drive, or your preferred backup method.</p>
                  </div>

                  <div className="instruction-section">
                    <h4>Step 2: Prepare Your Device</h4>
                    <ul>
                      <li>Turn off your device completely</li>
                      <li>Remove SIM card (for phones) if possible</li>
                      <li>Remove any cases, screen protectors, or accessories</li>
                      <li>Note your passcode or lock screen code (we'll need it for testing)</li>
                    </ul>
                  </div>

                  <div className="instruction-section">
                    <h4>Step 3: Secure Packaging</h4>
                    <ul>
                      <li>Wrap your device in bubble wrap or soft cloth</li>
                      <li>Place in a sturdy box with adequate padding</li>
                      <li>Use packing peanuts or crumpled paper to fill empty spaces</li>
                      <li>Include a note with your contact information and repair request</li>
                    </ul>
                  </div>

                  <div className="instruction-section">
                    <h4>Step 4: Shipping</h4>
                    <ul>
                      <li>Use a shipping service with tracking (USPS, UPS, FedEx)</li>
                      <li>Consider adding insurance for valuable devices</li>
                      <li>Pack the box securely and seal with packing tape</li>
                      <li>Address the package to:</li>
                    </ul>
                    <div className="shipping-address">
                      <p><strong>Instakyle</strong></p>
                      <p>2727 W 43rd St, Unit 213</p>
                      <p>Minneapolis, MN 55410</p>
                      <p>Phone: (952) 522-3029</p>
                    </div>
                  </div>

                  <div className="instruction-section">
                    <h4>Step 5: What Happens Next</h4>
                    <ul>
                      <li>We'll contact you within 24 hours of receiving your device</li>
                      <li>We'll provide a repair estimate and timeline</li>
                      <li>Once approved, repairs typically take 3-5 business days</li>
                      <li>We'll ship your device back using your return address</li>
                      <li>You'll receive tracking information via email</li>
                    </ul>
                  </div>

                  <div className="instruction-note">
                    <p><strong>Important:</strong> Please fill out the mail-in form above before shipping your device. This helps us prepare for your repair and ensures faster processing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;