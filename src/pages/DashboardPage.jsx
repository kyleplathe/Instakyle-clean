import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleViewBooking = (bookingId) => {
    navigate(`/bookings/${bookingId}`);
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

  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>Dashboard</h1>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
          }}>
            <h3>Total Bookings</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007AFF' }}>
              {bookings.length}
            </p>
          </div>

          <div style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
          }}>
            <h3>Pending Repairs</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF9500' }}>
              {bookings.filter(b => b.status === 'pending').length}
            </p>
          </div>

          <div style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
          }}>
            <h3>Completed Today</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#34C759' }}>
              {bookings.filter(b => 
                b.status === 'completed' && 
                new Date(b.completedAt).toDateString() === new Date().toDateString()
              ).length}
            </p>
          </div>
        </div>

        <div style={{
          background: '#fff',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>Recent Bookings</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <th style={{ textAlign: 'left', padding: '1rem' }}>ID</th>
                  <th style={{ textAlign: 'left', padding: '1rem' }}>Device</th>
                  <th style={{ textAlign: 'left', padding: '1rem' }}>Repair Type</th>
                  <th style={{ textAlign: 'left', padding: '1rem' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '1rem' }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '1rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 10).map(booking => (
                  <tr key={booking.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>{booking.id}</td>
                    <td style={{ padding: '1rem' }}>{booking.deviceModel}</td>
                    <td style={{ padding: '1rem' }}>{booking.repairType}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        background: 
                          booking.status === 'completed' ? '#34C759' :
                          booking.status === 'pending' ? '#FF9500' :
                          booking.status === 'cancelled' ? '#FF3B30' :
                          '#007AFF',
                        color: '#fff'
                      }}>
                        {booking.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {new Date(booking.appointmentDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button
                        onClick={() => handleViewBooking(booking.id)}
                        style={{
                          background: '#007AFF',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.5rem 1rem',
                          cursor: 'pointer'
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 