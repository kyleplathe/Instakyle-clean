import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Chip,
  useTheme,
  Fade,
  Grow
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Build as BuildIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Payment as PaymentIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { getCustomerBookings } from '../services/bookingService';
import { devices } from '../data/devices';

const statusColors = {
  scheduled: 'info',
  confirmed: 'primary',
  in_progress: 'warning',
  completed: 'success',
  cancelled: 'error',
  en_route: 'secondary',
  arrived: 'secondary'
};

const statusLabels = {
  scheduled: 'Scheduled',
  confirmed: 'Confirmed',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  en_route: 'En Route',
  arrived: 'Arrived'
};

const DashboardPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await getCustomerBookings();
      setBookings(data);
    } catch (error) {
      setError('Failed to load bookings');
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 0) return true; // All bookings
    if (activeTab === 1) return ['scheduled', 'confirmed'].includes(booking.status);
    if (activeTab === 2) return ['in_progress', 'en_route', 'arrived'].includes(booking.status);
    if (activeTab === 3) return ['completed', 'cancelled'].includes(booking.status);
    return true;
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grow in={true} timeout={800}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1">
              My Bookings
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/book')}
            >
              New Booking
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Paper sx={{ mb: 4 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="All" />
              <Tab label="Upcoming" />
              <Tab label="In Progress" />
              <Tab label="Past" />
            </Tabs>
          </Paper>

          <Grid container spacing={3}>
            {filteredBookings.map((booking) => {
              const device = devices.find(d => d.model === booking.deviceModel);
              return (
                <Grid item xs={12} md={6} key={booking.id}>
                  <Fade in={true} timeout={400}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography variant="h6" component="div">
                            {device?.name}
                          </Typography>
                          <Chip
                            label={statusLabels[booking.status]}
                            color={statusColors[booking.status]}
                            size="small"
                          />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <BuildIcon color="action" sx={{ mr: 1, fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            {booking.repairType}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationIcon color="action" sx={{ mr: 1, fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            {booking.location.formattedAddress}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <TimeIcon color="action" sx={{ mr: 1, fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            {format(new Date(booking.appointmentDate), 'PPpp')}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <PaymentIcon color="action" sx={{ mr: 1, fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            ${booking.total.toFixed(2)}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => navigate(`/booking/${booking.id}`)}
                          >
                            View Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              );
            })}
          </Grid>

          {filteredBookings.length === 0 && (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No bookings found
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/book')}
                sx={{ mt: 2 }}
              >
                Book a Repair
              </Button>
            </Paper>
          )}
        </Box>
      </Grow>
    </Container>
  );
};

export default DashboardPage; 