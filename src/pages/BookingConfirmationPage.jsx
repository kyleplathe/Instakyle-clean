import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use booking data passed from booking page if available
    if (location.state?.bookingData) {
      setBooking(location.state.bookingData);
      setLoading(false);
    } else {
      // Fallback to fetching from API
      const fetchBooking = async () => {
        try {
          const bookingId = location.state?.bookingId;
          if (!bookingId) {
            throw new Error('No booking ID provided');
          }

          const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch booking details');
          }

          const data = await response.json();
          setBooking(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchBooking();
    }
  }, [location.state]);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#f7f8fa', 
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Loading booking details...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#f7f8fa', 
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ 
          textAlign: 'center',
          background: '#FFE5E5',
          color: '#D70015',
          padding: '2rem',
          borderRadius: '12px',
          maxWidth: '500px'
        }}>
          <h2>Error</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate('/')}
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
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#f7f8fa', 
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Booking not found</h2>
          <button
            onClick={() => navigate('/')}
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
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
          background: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: '#E8F5E9',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto 1rem'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#4CAF50"/>
              </svg>
            </div>
            <h1 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>Booking Confirmed!</h1>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              Your repair appointment has been successfully scheduled.
            </p>
          </div>

          <div style={{ 
            background: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>Booking Details</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <strong>Booking ID:</strong> {booking.id}
              </div>
              <div>
                <strong>Customer:</strong> {booking.firstName} {booking.lastName}
              </div>
              <div>
                <strong>Email:</strong> {booking.email}
              </div>
              <div>
                <strong>Phone:</strong> {booking.phone}
              </div>
              <div>
                <strong>Device:</strong> {booking.brand} {booking.deviceType} - {booking.deviceModel}
              </div>
              <div>
                <strong>Repair Type:</strong> {booking.repairType}
              </div>
              <div>
                <strong>Appointment Date:</strong> {new Date(booking.preferredDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Time Block:</strong> {booking.preferredTime === 'flexible' ? 'Flexible' : booking.preferredTime}
              </div>
              <div>
                <strong>Location:</strong>
                <p style={{ margin: '0.5rem 0 0' }}>
                  {booking.address}<br />
                  {booking.city}, {booking.zipCode}
                </p>
              </div>
              {booking.total && (
                <div>
                  <strong>Total Cost:</strong> ${booking.total}
                  {booking.travelFee > 0 && (
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>
                      (includes ${booking.travelFee} travel fee)
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Calendar Sync Section */}
          {location.state?.calendarUrl && (
            <div style={{ 
              background: '#e8f4fd',
              border: '1px solid #bee5eb',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#0c5460', marginBottom: '1rem' }}>📅 Add to Calendar</h3>
              <p style={{ color: '#0c5460', marginBottom: '1rem' }}>
                Add this appointment to your iOS Calendar or Google Calendar
              </p>
              <a
                href={location.state.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#007AFF',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  display: 'inline-block',
                  fontWeight: '500'
                }}
              >
                📱 Add to Calendar
              </a>
            </div>
          )}

          {/* Email Confirmation Notice */}
          <div style={{ 
            background: '#e8f5e9',
            border: '1px solid #a5d6a7',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <p style={{ color: '#2e7d32', margin: 0 }}>
              ✅ A confirmation email has been sent to <strong>{booking.email}</strong>
            </p>
          </div>

          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                background: '#007AFF',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer'
              }}
            >
              View in Dashboard
            </button>
            <button
              onClick={() => navigate('/')}
              style={{
                background: '#fff',
                color: '#007AFF',
                border: '1px solid #007AFF',
                borderRadius: '6px',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer'
              }}
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage; 