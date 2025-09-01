import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

class SMSService {
  async sendSMS(to, message) {
    try {
      const response = await client.messages.create({
        body: message,
        to: to,
        from: process.env.TWILIO_PHONE_NUMBER
      });

      return response;
    } catch (error) {
      console.error('Failed to send SMS:', error);
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
  }

  async sendAppointmentReminder(booking) {
    const message = `
      Reminder: Your repair appointment is tomorrow at ${new Date(booking.appointmentDate).toLocaleTimeString()}.
      Device: ${booking.deviceModel}
      Repair: ${booking.repairType}
      Location: ${booking.location.address}
      
      Please ensure you're available at the specified location.
      We'll send you an ETA update when we're on the way.
    `;

    return this.sendSMS(booking.customer.phone, message);
  }

  async sendETAUpdate(booking, etaMinutes) {
    const message = `
      ETA Update:
      We're on our way to your location!
      Estimated arrival: ${etaMinutes} minutes
      Device: ${booking.deviceModel}
      Repair: ${booking.repairType}
      
      We'll send another message when we arrive.
    `;

    return this.sendSMS(booking.customer.phone, message);
  }

  async sendArrivalNotification(booking) {
    const message = `
      We've arrived at your location!
      Device: ${booking.deviceModel}
      Repair: ${booking.repairType}
      
      Please meet us at the specified address.
      Estimated repair time: ${booking.estimatedDuration} minutes
    `;

    return this.sendSMS(booking.customer.phone, message);
  }

  async sendRepairUpdate(booking, update) {
    const message = `
      Update on your repair:
      Device: ${booking.deviceModel}
      Status: ${update.status}
      ${update.message}
      
      We'll notify you when it's complete.
    `;

    return this.sendSMS(booking.customer.phone, message);
  }

  async sendPaymentReminder(booking) {
    const message = `
      Payment Reminder:
      Device: ${booking.deviceModel}
      Amount Due: $${booking.totalCost - booking.depositAmount}
      
      Please complete the payment before we begin the repair.
      You can pay via cash, card, or digital payment.
    `;

    return this.sendSMS(booking.customer.phone, message);
  }

  async sendTravelDelay(booking, delayMinutes, reason) {
    const message = `
      Travel Delay Update:
      We're running ${delayMinutes} minutes behind schedule.
      Reason: ${reason}
      
      We'll keep you updated with our new ETA.
      Thank you for your patience.
    `;

    return this.sendSMS(booking.customer.phone, message);
  }

  async sendRepairComplete(booking) {
    const message = `
      Great news! Your repair is complete!
      Device: ${booking.deviceModel}
      Repair: ${booking.repairType}
      
      Please come to collect your device.
      Final amount due: $${booking.totalCost - booking.depositAmount}
      
      Thank you for choosing our service!
    `;

    return this.sendSMS(booking.customer.phone, message);
  }
}

export default new SMSService(); 