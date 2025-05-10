import React from 'react';
import '../App.css';

const About = () => {
  return (
    <div className="about-page" style={{ background: '#f7f8fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>About Instakyle</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#444' }}>
          Instakyle was founded in 2016 by Kyle Plathe — a self-taught tech repair expert with a passion for sustainability, community, and all things Apple (and yes, even a little Android respect). 
          What started with mobile iPhone repairs and word-of-mouth in Minnesota has evolved into a full-service repair studio specializing in Apple, Samsung, Google Pixel, and gaming console repairs — including micro-soldering and USB-C port replacements.
        </p>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginTop: '1rem', color: '#444' }}>
          After a wild ride that included a California relaunch (powered by a mobile e-bike repair station), partnerships with local shops, and even a few Bitcoin payments at beachside cafés, Instakyle returned to Minnesota in 2025 — stronger than ever and rooted in purpose.
        </p>

        <h2 style={{ marginTop: '2rem' }}>What We Stand For</h2>
        <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '1rem' }}>
          <li style={{ marginBottom: '1rem' }}>
            <strong>Sustainability:</strong> Repair over replace. Keep devices out of landfills and e-waste out of the ecosystem.
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <strong>Trust:</strong> Every repair is backed by transparency, quality parts, and a 90-day warranty.
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <strong>Community:</strong> Born and rebuilt in the Twin Cities, we're proud to serve our local neighborhoods and greater Minnesota.
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <strong>Innovation:</strong> From Final Cut Pro content creation to Bitcoin-based payments, we're not just fixing tech — we're building the future.
          </li>
        </ul>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginTop: '2rem', color: '#444' }}>
          Whether you're mailing in your repair, stopping by the studio in Linden Hills, or just DM'ing us for advice — we're here to help you repair your world.
        </p>

        <h3 style={{ marginTop: '2rem' }}>Let's fix the planet — one port at a time.</h3>
      </div>
    </div>
  );
};

export default About;