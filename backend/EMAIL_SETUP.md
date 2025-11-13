# Email Setup for InstaKyle Booking System

## Overview
The booking system now includes automated email notifications:
- **Customer Confirmation Email**: Sent to the customer confirming their appointment
- **Business Notification Email**: Sent to `hello@instakyleiphonerepair.com` with all booking details

## Email Service Configuration

### Environment Variables Required
Add these to your `.env` file in the `backend` directory:

```env
# Email Configuration
EMAIL_USER=hello@instakyleiphonerepair.com
EMAIL_PASS=your_app_password_here

# Alternative: Use general password (less secure)
# EMAIL_PASS=your_regular_password
```

### Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password as `EMAIL_PASS`

### Alternative Email Services

If you don't want to use Gmail, you can modify the `EmailService.js` to use:

- **SendGrid**: Professional email service with better deliverability
- **Amazon SES**: Cost-effective for high volume
- **Outlook/Hotmail**: Similar setup to Gmail

## Features Implemented

### ✅ 1-Hour Time Blocks
- Updated time selection to show 1-hour blocks (9:00-10:00, 10:00-11:00, etc.)
- Includes flexible option for customers

### ✅ iOS Calendar Integration
- Generates Google Calendar links for easy calendar sync
- Works with iOS Calendar (opens in Safari/mobile)
- Includes appointment details and location

### ✅ Email Notifications
- **Customer Email**: Professional confirmation with all appointment details
- **Business Email**: Complete booking information sent to your email

### ✅ Enhanced Booking Confirmation Page
- Shows calendar sync button
- Displays email confirmation notice
- Better formatting with all booking details

## Testing

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Test the email endpoint:
   ```bash
   curl -X POST http://localhost:3001/api/send-email \
     -H "Content-Type: application/json" \
     -d '{
       "to": "test@example.com",
       "type": "customer_confirmation",
       "bookingData": {...}
     }'
   ```

## Calendar Integration

The calendar URLs are generated automatically and include:
- Appointment date and time
- Location details
- Customer information
- Repair type and device info

Customers can click the "Add to Calendar" button to open their calendar app.

## Next Steps

After setting up the email credentials, your booking system will:
1. Send confirmation emails to customers
2. Send notification emails to your business email
3. Provide calendar sync functionality
4. Use 1-hour time blocks for better scheduling

The system is ready to replace your current third-party booking system!



