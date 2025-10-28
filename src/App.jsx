import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Repairs from './pages/Repairs';
import Contact from './pages/Contact';
// Removed internal booking pages - using PocketSuite instead
// import BookingPage from './pages/BookingPage';
// import BookingConfirmationPage from './pages/BookingConfirmationPage';
// import DashboardPage from './pages/DashboardPage';
// import BookingDetailsPage from './pages/BookingDetailsPage';
import './App.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem',
          textAlign: 'center',
          color: '#D70015',
          background: '#FFE5E5',
          borderRadius: '8px',
          margin: '2rem'
        }}>
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#007AFF',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  console.log('App component rendering');
  
  return (
    <ErrorBoundary>
      <div className="App">
        <ErrorBoundary>
          <Navbar />
        </ErrorBoundary>
        <main className="main-content">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/repairs" element={<Repairs />} />
              <Route path="/contact" element={<Contact />} />
              {/* Removed internal booking routes - using PocketSuite instead */}
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;