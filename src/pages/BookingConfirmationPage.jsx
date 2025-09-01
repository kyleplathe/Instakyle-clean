import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingId = location.state?.bookingId;
        if (!bookingId) {
          throw new Error('No booking ID provided');
        }

        const response = await fetch(`/api/bookings/${bookingId}`);
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
                <strong>Device:</strong> {booking.deviceModel}
              </div>
              <div>
                <strong>Repair Type:</strong> {booking.repairType}
              </div>
              <div>
                <strong>Appointment Date:</strong> {new Date(booking.appointmentDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Appointment Time:</strong> {booking.appointmentTime}
              </div>
              <div>
                <strong>Location:</strong>
                <p style={{ margin: '0.5rem 0 0' }}>
                  {booking.location.address}<br />
                  {booking.location.city}, {booking.location.state} {booking.location.zipCode}
                </p>
              </div>
            </div>
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