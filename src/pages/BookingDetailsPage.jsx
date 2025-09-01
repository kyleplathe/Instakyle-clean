import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/bookings/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch booking details');
        }
        const data = await response.json();
        setBooking(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }

      const updatedBooking = await response.json();
      setBooking(updatedBooking);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: '#f7f8fa'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: '#f7f8fa'
      }}>
        <div style={{ color: 'red' }}>Error: {error}</div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: '#f7f8fa'
      }}>
        <div>Booking not found</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1>Booking Details</h1>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '6px',
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}
          >
            Back to Dashboard
          </button>
        </div>

        <div style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          marginBottom: '2rem'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Status</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['pending', 'confirmed', 'en_route', 'arrived', 'in_progress', 'completed', 'cancelled'].map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status)}
                  style={{
                    background: booking.status === status ? '#007AFF' : '#fff',
                    color: booking.status === status ? '#fff' : '#000',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {status.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Customer Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div>
                <p style={{ color: '#666', marginBottom: '0.25rem' }}>Name</p>
                <p style={{ fontWeight: 500 }}>{booking.customerName}</p>
              </div>
              <div>
                <p style={{ color: '#666', marginBottom: '0.25rem' }}>Phone</p>
                <p style={{ fontWeight: 500 }}>{booking.customerPhone}</p>
              </div>
              <div>
                <p style={{ color: '#666', marginBottom: '0.25rem' }}>Email</p>
                <p style={{ fontWeight: 500 }}>{booking.customerEmail}</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Repair Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div>
                <p style={{ color: '#666', marginBottom: '0.25rem' }}>Device</p>
                <p style={{ fontWeight: 500 }}>{booking.deviceModel}</p>
              </div>
              <div>
                <p style={{ color: '#666', marginBottom: '0.25rem' }}>Repair Type</p>
                <p style={{ fontWeight: 500 }}>{booking.repairType}</p>
              </div>
              <div>
                <p style={{ color: '#666', marginBottom: '0.25rem' }}>Appointment Date</p>
                <p style={{ fontWeight: 500 }}>
                  {new Date(booking.appointmentDate).toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ color: '#666', marginBottom: '0.25rem' }}>Location</p>
                <p style={{ fontWeight: 500 }}>{booking.location.address}</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Pricing</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div>
                <p style={{ color: '#666', marginBottom: '0.25rem' }}>Base Price</p>
                <p style={{ fontWeight: 500 }}>${booking.basePrice}</p>
              </div>
              <div>
                <p style={{ color: '#666', marginBottom: '0.25rem' }}>Travel Fee</p>
                <p style={{ fontWeight: 500 }}>${booking.travelFee}</p>
              </div>
              <div>
                <p style={{ color: '#666', marginBottom: '0.25rem' }}>Total</p>
                <p style={{ fontWeight: 500, color: '#007AFF' }}>
                  ${(parseFloat(booking.basePrice) + parseFloat(booking.travelFee)).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 style={{ marginBottom: '1rem' }}>Notes</h2>
            <div style={{
              background: '#f7f8fa',
              padding: '1rem',
              borderRadius: '6px',
              minHeight: '100px'
            }}>
              {booking.notes || 'No notes available'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage; 