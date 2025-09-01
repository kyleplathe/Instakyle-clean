import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  useTheme
} from '@mui/material';
import { format, addDays, isSameDay, parseISO } from 'date-fns';
import { getAvailableSlots } from '../../services/bookingService';

const TimeSlotSelection = ({ onComplete, initialValue }) => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(initialValue ? parseISO(initialValue) : new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAvailableSlots(selectedDate);
  }, [selectedDate]);

  const loadAvailableSlots = async (date) => {
    try {
      setLoading(true);
      setError('');
      const slots = await getAvailableSlots(date);
      setAvailableSlots(slots);
    } catch (error) {
      setError('Failed to load available time slots');
      console.error('Error loading slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(time.getHours(), time.getMinutes());
    onComplete({ appointmentDate });
  };

  const generateDateButtons = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(new Date(), i);
      dates.push(date);
    }
    return dates;
  };

  const formatTime = (date) => {
    return format(date, 'h:mm a');
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Appointment Time
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Available Dates
        </Typography>
        <Grid container spacing={1}>
          {generateDateButtons().map((date) => (
            <Grid item key={date.toISOString()}>
              <Button
                variant={isSameDay(date, selectedDate) ? 'contained' : 'outlined'}
                onClick={() => handleDateSelect(date)}
                sx={{ minWidth: 100 }}
              >
                {format(date, 'EEE, MMM d')}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Available Times
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : availableSlots.length === 0 ? (
          <Alert severity="info">No available slots for this date</Alert>
        ) : (
          <Grid container spacing={1}>
            {availableSlots.map((slot) => (
              <Grid item key={slot.toISOString()}>
                <Button
                  variant={selectedTime && isSameDay(slot, selectedTime) ? 'contained' : 'outlined'}
                  onClick={() => handleTimeSelect(slot)}
                  sx={{ minWidth: 100 }}
                >
                  {formatTime(slot)}
                </Button>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Alert severity="info" sx={{ mt: 2 }}>
        Appointments typically take 30-60 minutes. Please arrive on time.
      </Alert>
    </Box>
  );
};

export default TimeSlotSelection; 