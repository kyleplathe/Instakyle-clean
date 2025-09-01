import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  Fade,
  Grow
} from '@mui/material';
import {
  Build as BuildIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Payment as PaymentIcon,
  Phone as PhoneIcon,
  ArrowBack as ArrowBackIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import bookingService from '../services/bookingService';
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

const BookingDetailsPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    loadBookingDetails();
  }, [id]);

  const loadBookingDetails = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getBookingDetails(id);
      setBooking(data);
    } catch (error) {
      setError('Failed to load booking details');
      console.error('Error loading booking details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    try {
      await bookingService.cancelBooking(id, cancelReason);
      setCancelDialogOpen(false);
      loadBookingDetails();
    } catch (error) {
      setError('Failed to cancel booking');
      console.error('Error cancelling booking:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!booking) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Booking not found</Alert>
      </Container>
    );
  }

  const device = devices.find(d => d.model === booking.deviceModel);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grow in={true} timeout={800}>
        <Box>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/dashboard')}
            sx={{ mb: 3 }}
          >
            Back to Dashboard
          </Button>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" component="h1">
                Booking Details
              </Typography>
              <Chip
                label={statusLabels[booking.status]}
                color={statusColors[booking.status]}
              />
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Device Information
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <BuildIcon color="action" sx={{ mr: 1 }} />
                    <Typography>
                      {device?.name} - {booking.repairType}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Location
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationIcon color="action" sx={{ mr: 1 }} />
                    <Typography>
                      {booking.location.formattedAddress}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Repair Location: {booking.repairLocation}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Appointment Details
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TimeIcon color="action" sx={{ mr: 1 }} />
                    <Typography>
                      {format(new Date(booking.appointmentDate), 'PPpp')}
                    </Typography>
                  </Box>
                  {booking.estimatedArrivalTime && (
                    <Typography variant="body2" color="text.secondary">
                      Estimated Arrival: {format(new Date(booking.estimatedArrivalTime), 'p')}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Pricing
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PaymentIcon color="action" sx={{ mr: 1 }} />
                    <Typography>
                      Total: ${booking.total.toFixed(2)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Base Price: ${booking.basePrice.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Travel Fee: ${booking.travelFee.toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              {booking.status === 'scheduled' && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => setCancelDialogOpen(true)}
                >
                  Cancel Booking
                </Button>
              )}
            </Box>
          </Paper>
        </Box>
      </Grow>

      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Reason for Cancellation"
            fullWidth
            multiline
            rows={4}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>Back</Button>
          <Button onClick={handleCancelBooking} color="error">
            Confirm Cancellation
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookingDetailsPage; 