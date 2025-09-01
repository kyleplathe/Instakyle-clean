import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const bookingService = {
  async getCustomerBookings() {
    try {
      const response = await axios.get(`${API_URL}/bookings/customer/me`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer bookings:', error);
      throw error;
    }
  },

  async getBookingDetails(bookingId) {
    try {
      const response = await axios.get(`${API_URL}/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking details:', error);
      throw error;
    }
  },

  async createBooking(bookingData) {
    try {
      const response = await axios.post(`${API_URL}/bookings`, bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  async updateBookingStatus(bookingId, status) {
    try {
      const response = await axios.patch(`${API_URL}/bookings/${bookingId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  },

  async cancelBooking(bookingId, reason) {
    try {
      const response = await axios.post(`${API_URL}/bookings/${bookingId}/cancel`, { reason });
      return response.data;
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
  },

  async getAvailableTimeSlots(date) {
    try {
      const response = await axios.get(`${API_URL}/bookings/slots`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching available time slots:', error);
      throw error;
    }
  },

  async updateBookingLocation(bookingId, location) {
    try {
      const response = await axios.put(`${API_URL}/bookings/${bookingId}/location`, location);
      return response.data;
    } catch (error) {
      console.error('Error updating booking location:', error);
      throw error;
    }
  }
};

export default bookingService; 