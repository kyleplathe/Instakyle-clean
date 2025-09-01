import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  Grow
} from '@mui/material';
import DeviceSelection from '../components/booking/DeviceSelection';
import RepairTypeSelection from '../components/booking/RepairTypeSelection';
import LocationInput from '../components/booking/LocationInput';
import TimeSlotSelection from '../components/booking/TimeSlotSelection';
import BookingSummary from '../components/booking/BookingSummary';
import { createBooking } from '../services/bookingService';

const steps = [
  'Select Device',
  'Choose Repair',
  'Enter Location',
  'Pick Time',
  'Review & Book'
];

const BookingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState('right');
  const [bookingData, setBookingData] = useState({
    deviceModel: '',
    repairType: '',
    location: null,
    appointmentDate: null,
    repairLocation: 'customer_location',
    pricingTier: 'standard'
  });

  const handleNext = () => {
    setDirection('right');
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setDirection('left');
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStepComplete = (stepData) => {
    setBookingData((prev) => ({
      ...prev,
      ...stepData
    }));
    handleNext();
  };

  const handleSubmit = async () => {
    try {
      const response = await createBooking(bookingData);
      navigate(`/booking-confirmation/${response.id}`);
    } catch (error) {
      console.error('Booking failed:', error);
      // Handle error (show error message to user)
    }
  };

  const renderStepContent = (step) => {
    const content = (() => {
      switch (step) {
        case 0:
          return (
            <DeviceSelection
              onComplete={handleStepComplete}
              initialValue={bookingData.deviceModel}
            />
          );
        case 1:
          return (
            <RepairTypeSelection
              onComplete={handleStepComplete}
              deviceModel={bookingData.deviceModel}
              initialValue={bookingData.repairType}
            />
          );
        case 2:
          return (
            <LocationInput
              onComplete={handleStepComplete}
              initialValue={bookingData.location}
            />
          );
        case 3:
          return (
            <TimeSlotSelection
              onComplete={handleStepComplete}
              initialValue={bookingData.appointmentDate}
            />
          );
        case 4:
          return (
            <BookingSummary
              bookingData={bookingData}
              onSubmit={handleSubmit}
            />
          );
        default:
          return null;
      }
    })();

    return (
      <Slide
        direction={direction}
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={400}
      >
        <Box>
          <Fade in={true} timeout={400} style={{ transitionDelay: '200ms' }}>
            {content}
          </Fade>
        </Box>
      </Slide>
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Grow in={true} timeout={800}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Book Your Repair
          </Typography>
          
          <Stepper
            activeStep={activeStep}
            alternativeLabel={!isMobile}
            orientation={isMobile ? 'vertical' : 'horizontal'}
            sx={{ mb: 4 }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 4, minHeight: 400 }}>
            {renderStepContent(activeStep)}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Confirm Booking
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!bookingData[Object.keys(bookingData)[activeStep]]}
              >
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </Grow>
    </Container>
  );
};

export default BookingPage; 