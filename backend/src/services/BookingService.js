import Booking from '../models/Booking.js';
import Customer from '../models/Customer.js';
import { sendSMS } from './SMSService.js';
import { getPartsPrice } from './PartsService.js';

class BookingService {
  async createBooking(bookingData) {
    try {
      // Calculate estimated cost based on parts
      const partsCost = await this.calculatePartsCost(bookingData.partsRequired);
      const laborCost = this.calculateLaborCost(bookingData.estimatedDuration);
      const totalCost = partsCost + laborCost;
      const depositAmount = totalCost * 0.3; // 30% deposit

      const booking = await Booking.create({
        ...bookingData,
        totalCost,
        depositAmount
      });

      // Send confirmation message
      const customer = await Customer.findByPk(bookingData.customerId);
      await this.sendBookingConfirmation(customer, booking);

      return booking;
    } catch (error) {
      throw new Error(`Failed to create booking: ${error.message}`);
    }
  }

  async calculatePartsCost(partsList) {
    let totalCost = 0;
    for (const part of partsList) {
      const price = await getPartsPrice(part.partNumber);
      totalCost += price * part.quantity;
    }
    return totalCost;
  }

  calculateLaborCost(durationMinutes) {
    const hourlyRate = 75; // $75 per hour
    return (durationMinutes / 60) * hourlyRate;
  }

  async sendBookingConfirmation(customer, booking) {
    const message = `
      Hi ${customer.firstName},
      Your repair appointment has been scheduled for ${new Date(booking.appointmentDate).toLocaleString()}.
      Device: ${booking.deviceModel}
      Repair: ${booking.repairType}
      Estimated Cost: $${booking.totalCost}
      Required Deposit: $${booking.depositAmount}
      
      Please reply YES to confirm or NO to cancel.
    `;

    await sendSMS(customer.phone, message);
  }

  async updateBookingStatus(bookingId, status) {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    booking.status = status;
    await booking.save();

    // Send status update to customer
    const customer = await Customer.findByPk(booking.customerId);
    await this.sendStatusUpdate(customer, booking);

    return booking;
  }

  async sendStatusUpdate(customer, booking) {
    const statusMessages = {
      confirmed: 'Your appointment has been confirmed.',
      in_progress: 'We have started working on your device.',
      completed: 'Your repair is complete and ready for pickup!',
      cancelled: 'Your appointment has been cancelled.'
    };

    const message = `
      Hi ${customer.firstName},
      ${statusMessages[booking.status]}
      Device: ${booking.deviceModel}
      Repair: ${booking.repairType}
      ${booking.status === 'completed' ? `Final Cost: $${booking.totalCost}` : ''}
    `;

    await sendSMS(customer.phone, message);
  }

  async getAvailableSlots(date) {
    // Implement business hours and existing bookings check
    const businessHours = {
      start: 9, // 9 AM
      end: 17,  // 5 PM
      interval: 30 // 30-minute slots
    };

    const slots = [];
    const existingBookings = await Booking.findAll({
      where: {
        appointmentDate: {
          [Op.between]: [
            new Date(date.setHours(0, 0, 0)),
            new Date(date.setHours(23, 59, 59))
          ]
        }
      }
    });

    // Generate available time slots
    for (let hour = businessHours.start; hour < businessHours.end; hour++) {
      for (let minute = 0; minute < 60; minute += businessHours.interval) {
        const slotTime = new Date(date);
        slotTime.setHours(hour, minute, 0);

        const isAvailable = !existingBookings.some(booking => {
          const bookingTime = new Date(booking.appointmentDate);
          return bookingTime.getTime() === slotTime.getTime();
        });

        if (isAvailable) {
          slots.push(slotTime);
        }
      }
    }

    return slots;
  }
}

export default new BookingService(); 