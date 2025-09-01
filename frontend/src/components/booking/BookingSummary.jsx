import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  CircularProgress,
  Alert,
  useTheme
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Build as BuildIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { devices } from '../../data/devices';
import { getRepairPrice } from '../../services/pricingService';
import { calculateTravelFee } from '../../services/locationService';

const BookingSummary = ({ bookingData, onSubmit }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pricing, setPricing] = useState({
    repairPrice: 0,
    travelFee: 0,
    total: 0
  });

  useEffect(() => {
    const calculatePricing = async () => {
      try {
        const repairPrice = await getRepairPrice(
          bookingData.deviceModel,
          bookingData.repairType
        );

        const travelFee = await calculateTravelFee(bookingData.location);

        setPricing({
          repairPrice,
          travelFee,
          total: repairPrice + travelFee
        });
      } catch (error) {
        console.error('Error calculating pricing:', error);
        setError('Failed to calculate pricing');
      }
    };

    calculatePricing();
  }, [bookingData]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      await onSubmit();
    } catch (error) {
      setError('Failed to create booking');
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  const device = devices.find(d => d.model === bookingData.deviceModel);
  const repairTypes = {
    screen: 'Screen Repair',
    battery: 'Battery Replacement',
    camera: 'Camera Repair',
    charging_port: 'Charging Port Repair'
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Booking Summary
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <PhoneIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Device"
              secondary={`${device?.name} (${device?.brand})`}
            />
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemIcon>
              <BuildIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Repair Type"
              secondary={repairTypes[bookingData.repairType]}
            />
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemIcon>
              <LocationIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Location"
              secondary={bookingData.location.formattedAddress}
            />
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemIcon>
              <TimeIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Appointment"
              secondary={format(bookingData.appointmentDate, 'PPpp')}
            />
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemIcon>
              <PaymentIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Pricing"
              secondary={
                <Box>
                  <Typography variant="body2">
                    Repair: ${pricing.repairPrice.toFixed(2)}
                  </Typography>
                  <Typography variant="body2">
                    Travel Fee: ${pricing.travelFee.toFixed(2)}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
                    Total: ${pricing.total.toFixed(2)}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        </List>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleSubmit}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Confirm Booking'
        )}
      </Button>

      <Alert severity="info" sx={{ mt: 2 }}>
        You'll receive a confirmation email and SMS with your booking details.
      </Alert>
    </Box>
  );
};

export default BookingSummary; 