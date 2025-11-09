import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="page-hero page-hero--subtle page-hero--centered">
        <div className="page-hero-inner">
          <span className="page-hero-eyebrow">Purpose Driven Repair</span>
          <h1>Repair-first tech care since 2016</h1>
          <p className="page-hero-subtitle">
            Instakyle is a repair studio built on sustainability, craftsmanship, and community.
            We keep devices in circulation, empower our neighbors, and prove there&apos;s a better way to own technology.
          </p>
          <div className="page-hero-meta">
            <span className="meta-pill">🌎 Sustainability</span>
            <span className="meta-pill">🔧 Certified Micro-Soldering</span>
            <span className="meta-pill">📍 Twin Cities Local</span>
          </div>
        </div>
      </section>

      <section className="page-section page-section--muted">
        <div className="page-section-inner">
          <div className="section-heading">
            <span className="section-eyebrow">Our Journey</span>
            <h2>From curbside fixes to a full-service studio</h2>
            <p>
              Instakyle started with a single backpack of tools and a philosophy: repair should be simple,
              honest, and better for the planet. Today we deliver certified repairs for Apple, Samsung,
              Google, and gaming consoles — all while keeping e-waste out of landfills.
            </p>
          </div>

          <div className="about-story-grid">
            <article className="about-story-panel">
              <p>
                Founder Kyle Plathe launched Instakyle in 2016 with mobile iPhone repairs and a deep love
                for tinkering on Apple hardware. Word-of-mouth travels fast, and soon the studio expanded
                into tablets, Macs, gaming consoles, and micro-soldering for those “impossible” USB-C jobs.
              </p>
              <p>
                We took the brand on the road to California with a mobile e-bike repair station, partnered
                with neighborhood shops, accepted the occasional Bitcoin payment, and ultimately returned to
                Minnesota in 2025 with a renewed focus: build a repair lab that cares for people and the planet.
              </p>
            </article>

            <aside className="about-highlight-card">
              <h3>What drives our bench work</h3>
              <ul>
                <li>
                  <span>🧰</span>
                  <div>
                    <strong>Certified specialists</strong>
                    <p>Micro-soldering, component repair, and board-level diagnostics handled in-house.</p>
                  </div>
                </li>
                <li>
                  <span>♻️</span>
                  <div>
                    <strong>Repair over replace</strong>
                    <p>Every fix keeps devices circulating and diverts e-waste from Minnesota landfills.</p>
                  </div>
                </li>
                <li>
                  <span>🤝</span>
                  <div>
                    <strong>Community roots</strong>
                    <p>
                      Serving Linden Hills and the greater Twin Cities with honest pricing and a 90-day warranty.
                    </p>
                  </div>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-section-inner">
          <div className="section-heading">
            <span className="section-eyebrow">What We Stand For</span>
            <h2>Values that show up in every repair ticket</h2>
          </div>

          <div className="about-values-grid">
            <div className="about-value-card">
              <span className="about-value-icon">🌱</span>
              <h3>Sustainability</h3>
              <p>Repair first. Reduce e-waste. Keep devices in circulation for as long as possible.</p>
            </div>
            <div className="about-value-card">
              <span className="about-value-icon">🛠️</span>
              <h3>Craftsmanship</h3>
              <p>We invest in premium parts, proper tooling, and processes you can trust every time.</p>
            </div>
            <div className="about-value-card">
              <span className="about-value-icon">🏡</span>
              <h3>Community</h3>
              <p>We&apos;re your local repair partner — from quick walk-ins to business device fleets.</p>
            </div>
            <div className="about-value-card">
              <span className="about-value-icon">🚀</span>
              <h3>Innovation</h3>
              <p>
                From Bitcoin payments to custom automations, we experiment so repairs stay fast and modern.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section page-section--contrast">
        <div className="page-section-inner about-cta-card">
          <div className="about-cta-content">
            <span className="section-eyebrow">What&apos;s next</span>
            <h2>Let&apos;s fix the planet — one device at a time</h2>
            <p>
              Whether you&apos;re booking a repair, shipping a device, or DMing us for advice, we&apos;re
              here to help you repair your world. Reach out anytime — we&apos;ll bring the tools.
            </p>
          </div>
          <div className="about-cta-actions">
            <Link className="about-cta-link primary" to="/repairs">
              Start a repair
            </Link>
            <Link className="about-cta-link secondary" to="/contact">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
