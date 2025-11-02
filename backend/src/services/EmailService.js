import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {
  constructor() {
    // Create a transporter - you can configure this with your email service
    // For now, using a simple configuration
    this.transporter = nodemailer.createTransport({
      // You can configure this with Gmail, SendGrid, or your preferred email service
      service: 'gmail', // or configure with your SMTP settings
      auth: {
        user: process.env.EMAIL_USER || 'hello@instakyleiphonerepair.com',
        pass: process.env.EMAIL_PASS || process.env.APP_PASSWORD // Use app-specific password for Gmail
      }
    });
  }

  async sendCustomerConfirmation(bookingData) {
    const { firstName, lastName, email, preferredDate, preferredTime, deviceModel, repairType, address, city, zipCode, total, travelFee } = bookingData;
    
    const timeDisplay = preferredTime === 'flexible' ? 'We will contact you to confirm the exact time' : preferredTime;
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'hello@instakyleiphonerepair.com',
      to: email,
      subject: '🔧 iPhone Repair Appointment Confirmed - InstaKyle',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #007AFF;">🔧 InstaKyle iPhone Repair</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">Appointment Confirmed!</h2>
            <p style="font-size: 16px; color: #666;">Hi ${firstName}, your mobile repair appointment has been successfully scheduled.</p>
          </div>

          <div style="background: white; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">📋 Appointment Details</h3>
            <div style="line-height: 1.6;">
              <p><strong>Customer:</strong> ${firstName} ${lastName}</p>
              <p><strong>Device:</strong> ${deviceModel}</p>
              <p><strong>Repair Type:</strong> ${repairType}</p>
              <p><strong>Date:</strong> ${new Date(preferredDate).toLocaleDateString()}</p>
              <p><strong>Time Block:</strong> ${timeDisplay}</p>
              <p><strong>Service Location:</strong><br>
                ${address}<br>
                ${city}, ${zipCode}
              </p>
              <p><strong>Total Cost:</strong> $${total ? total : '0'}${travelFee && travelFee > 0 ? ` (includes $${travelFee} travel fee)` : ''}</p>
            </div>
          </div>

          <div style="background: #e8f4fd; border: 1px solid #bee5eb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="color: #0c5460; margin-top: 0;">🚗 Mobile Service Reminder</h4>
            <p style="color: #0c5460; margin: 0;">We come to you! Please ensure someone will be available during your selected time block. We'll send a text when we're on our way.</p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; font-size: 14px;">
              Questions? Reply to this email or call us at (555) 123-4567
            </p>
          </div>
        </div>
      `
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Customer confirmation email sent:', result.messageId);
      return result;
    } catch (error) {
      console.error('Failed to send customer confirmation email:', error);
      throw new Error(`Failed to send customer confirmation email: ${error.message}`);
    }
  }

  async sendBusinessNotification(bookingData) {
    const { id, firstName, lastName, email, phone, preferredDate, preferredTime, deviceModel, repairType, address, city, zipCode, total, travelFee, brand, deviceType } = bookingData;
    
    const timeDisplay = preferredTime === 'flexible' ? 'Flexible - Contact customer' : preferredTime;
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'hello@instakyleiphonerepair.com',
      to: 'hello@instakyleiphonerepair.com',
      subject: `🔧 New Booking - ${firstName} ${lastName} - ${deviceModel}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #007AFF;">🔧 New Booking Received</h1>
            <p style="color: #666;">Book ID: ${id}</p>
          </div>

          <div style="background: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">👤 Customer Information</h2>
            <div style="line-height: 1.6;">
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
            </div>
          </div>

          <div style="background: white; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">📋 Service Details</h3>
            <div style="line-height: 1.6;">
              <p><strong>Brand:</strong> ${brand}</p>
              <p><strong>Device Type:</strong> ${deviceType}</p>
              <p><strong>Device Model:</strong> ${deviceModel}</p>
              <p><strong>Repair Type:</strong> ${repairType}</p>
              <p><strong>Preferred Date:</strong> ${new Date(preferredDate).toLocaleDateString()}</p>
              <p><strong>Time Block:</strong> ${timeDisplay}</p>
            </div>
          </div>

          <div style="background: white; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">📍 Service Location</h3>
            <div style="line-height: 1.6;">
              <p><strong>Address:</strong><br>
                ${address}<br>
                ${city}, ${zipCode}
              </p>
            </div>
          </div>

          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px;">
            <h3 style="color: #856404; margin-top: 0;">💰 Pricing Information</h3>
            <div style="line-height: 1.6;">
              <p><strong>Total Cost:</strong> $${total ? total : '0'}</p>
              ${travelFee && travelFee > 0 ? `<p><strong>Travel Fee:</strong> $${travelFee}</p>` : ''}
            </div>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; font-size: 14px;">
              This booking was automatically created through your website booking system.
            </p>
          </div>
        </div>
      `
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Business notification email sent:', result.messageId);
      return result;
    } catch (error) {
      console.error('Failed to send business notification email:', error);
      throw new Error(`Failed to send business notification email: ${error.message}`);
    }
  }

  async sendContactForm(formData) {
    const { name, email, phone, serviceType, device, message } = formData;
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'hello@instakyleiphonerepair.com',
      to: 'hello@instakyleiphonerepair.com',
      subject: `📧 New Contact Form Submission - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #007AFF;">📧 New Contact Form Submission</h1>
          </div>

          <div style="background: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">👤 Contact Information</h2>
            <div style="line-height: 1.6;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            </div>
          </div>

          <div style="background: white; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">📋 Service Details</h3>
            <div style="line-height: 1.6;">
              <p><strong>Service Type:</strong> ${serviceType}</p>
              <p><strong>Device Type:</strong> ${device}</p>
            </div>
          </div>

          <div style="background: white; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">💬 Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; font-size: 14px;">
              This message was submitted through the Instakyle website contact form.
            </p>
          </div>
        </div>
      `
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Contact form email sent:', result.messageId);
      return result;
    } catch (error) {
      console.error('Failed to send contact form email:', error);
      throw new Error(`Failed to send contact form email: ${error.message}`);
    }
  }

  async sendMailInForm(formData) {
    const { name, email, phone, device, model, issue, returnAddress } = formData;
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'hello@instakyleiphonerepair.com',
      to: 'hello@instakyleiphonerepair.com',
      subject: `📦 New Mail-In Repair Request - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #007AFF;">📦 New Mail-In Repair Request</h1>
          </div>

          <div style="background: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">👤 Customer Information</h2>
            <div style="line-height: 1.6;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            </div>
          </div>

          <div style="background: white; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">📱 Device Information</h3>
            <div style="line-height: 1.6;">
              <p><strong>Device Type:</strong> ${device}</p>
              <p><strong>Device Model:</strong> ${model}</p>
            </div>
          </div>

          <div style="background: white; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">🔧 Issue Description</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${issue}</p>
          </div>

          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px;">
            <h3 style="color: #856404; margin-top: 0;">📬 Return Shipping Address</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${returnAddress}</p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; font-size: 14px;">
              This mail-in repair request was submitted through the Instakyle website.
              <br>Please prepare for the incoming device shipment.
            </p>
          </div>
        </div>
      `
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Mail-in form email sent:', result.messageId);
      return result;
    } catch (error) {
      console.error('Failed to send mail-in form email:', error);
      throw new Error(`Failed to send mail-in form email: ${error.message}`);
    }
  }
}

export default EmailService;
