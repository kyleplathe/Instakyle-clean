import express from 'express';
import BookingService from '../services/BookingService.js';
import LocationService from '../services/LocationService.js';
import PricingService from '../services/PricingService.js';
import { validateBooking } from '../middleware/validation.js';

const router = express.Router();

// Create a new booking
router.post('/', validateBooking, async (req, res) => {
  try {
    const {
      customerId,
      deviceModel,
      repairType,
      appointmentDate,
      location,
      repairLocation
    } = req.body;

    // Validate and get location details
    const validatedLocation = await LocationService.validateLocation(location);
    
    // Calculate travel fee
    const travelFee = await LocationService.calculateTravelFee(validatedLocation);
    
    // Calculate repair price
    const pricing = await PricingService.calculateRepairPrice(deviceModel, repairType);
    
    // Create booking with all calculated costs
    const booking = await BookingService.createBooking({
      customerId,
      deviceModel,
      repairType,
      appointmentDate,
      location: validatedLocation,
      repairLocation,
      travelFee,
      ...pricing
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get available time slots
router.get('/slots', async (req, res) => {
  try {
    const { date } = req.query;
    const slots = await BookingService.getAvailableSlots(new Date(date));
    res.json(slots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const booking = await BookingService.updateBookingStatus(id, status);
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update technician location and get ETAs
router.post('/location', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    await LocationService.updateTechnicianLocation(latitude, longitude);
    res.json({ message: 'Location updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get optimized route for multiple bookings
router.post('/route', async (req, res) => {
  try {
    const { bookingIds } = req.body;
    const bookings = await BookingService.getBookingsByIds(bookingIds);
    const optimizedRoute = await LocationService.optimizeRoute(bookings);
    res.json(optimizedRoute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get booking details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await BookingService.getBookingById(id);
    res.json(booking);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update booking details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const booking = await BookingService.updateBooking(id, updates);
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cancel booking
router.post('/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const booking = await BookingService.cancelBooking(id, reason);
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get customer's booking history
router.get('/customer/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const bookings = await BookingService.getCustomerBookings(customerId);
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router; 