import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  useTheme,
  Fade,
  Zoom
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Phone as PhoneIcon,
  Build as BuildIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { getBookingDetails } from '../services/bookingService';
import { devices } from '../data/devices';

const BookingConfirmationPage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBooking = async () => {
      try {
        const data = await getBookingDetails(id);
        setBooking(data);
      } catch (error) {
        setError('Failed to load booking details');
        console.error('Error loading booking:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Return Home
        </Button>
      </Container>
    );
  }

  const device = devices.find(d => d.model === booking.deviceModel);
  const repairTypes = {
    screen: 'Screen Repair',
    battery: 'Battery Replacement',
    camera: 'Camera Repair',
    charging_port: 'Charging Port Repair'
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in={true} timeout={1000}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
          <Zoom in={true} timeout={1000} style={{ transitionDelay: '500ms' }}>
            <CheckCircleIcon
              sx={{
                fontSize: 80,
                color: theme.palette.success.main,
                mb: 2
              }}
            />
          </Zoom>

          <Typography variant="h4" component="h1" gutterBottom>
            Booking Confirmed!
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Your repair appointment has been scheduled successfully.
          </Typography>

          <Box sx={{ mt: 4, textAlign: 'left' }}>
            <Typography variant="h6" gutterBottom>
              Booking Details
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon color="primary" sx={{ mr: 2 }} />
              <Box>
                <Typography variant="subtitle2">Device</Typography>
                <Typography variant="body1">
                  {device?.name} ({device?.brand})
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BuildIcon color="primary" sx={{ mr: 2 }} />
              <Box>
                <Typography variant="subtitle2">Repair Type</Typography>
                <Typography variant="body1">
                  {repairTypes[booking.repairType]}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationIcon color="primary" sx={{ mr: 2 }} />
              <Box>
                <Typography variant="subtitle2">Location</Typography>
                <Typography variant="body1">
                  {booking.location.formattedAddress}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TimeIcon color="primary" sx={{ mr: 2 }} />
              <Box>
                <Typography variant="subtitle2">Appointment</Typography>
                <Typography variant="body1">
                  {format(new Date(booking.appointmentDate), 'PPpp')}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PaymentIcon color="primary" sx={{ mr: 2 }} />
              <Box>
                <Typography variant="subtitle2">Total Amount</Typography>
                <Typography variant="body1">
                  ${booking.total.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              You'll receive a confirmation email and SMS with these details.
            </Alert>

            <Button
              variant="contained"
              onClick={() => navigate('/dashboard')}
              sx={{ mr: 2 }}
            >
              View in Dashboard
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Return Home
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default BookingConfirmationPage; 