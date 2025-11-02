import express from 'express';
import EmailService from '../services/EmailService.js';

const router = express.Router();
const emailService = new EmailService();

// Send email endpoint
router.post('/send-email', async (req, res) => {
  try {
    const { to, type, bookingData } = req.body;
    
    if (!to || !type || !bookingData) {
      return res.status(400).json({ 
        error: 'Missing required fields: to, type, and bookingData are required' 
      });
    }

    let result;
    
    if (type === 'customer_confirmation') {
      result = await emailService.sendCustomerConfirmation(bookingData);
    } else if (type === 'business_notification') {
      result = await emailService.sendBusinessNotification(bookingData);
    } else {
      return res.status(400).json({ 
        error: 'Invalid email type. Use "customer_confirmation" or "business_notification"' 
      });
    }

    res.json({ 
      success: true, 
      messageId: result.messageId,
      type: type,
      to: to
    });
    
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
});

// Contact form endpoint
router.post('/contact', async (req, res) => {
  try {
    const formData = req.body;
    
    if (!formData.name || !formData.email || !formData.message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, and message are required' 
      });
    }

    const result = await emailService.sendContactForm(formData);

    res.json({ 
      success: true, 
      messageId: result.messageId,
      message: 'Contact form submitted successfully'
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      error: 'Failed to submit contact form',
      details: error.message 
    });
  }
});

// Mail-in form endpoint
router.post('/mail-in', async (req, res) => {
  try {
    const formData = req.body;
    
    if (!formData.name || !formData.email || !formData.device || !formData.issue) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, device, and issue are required' 
      });
    }

    const result = await emailService.sendMailInForm(formData);

    res.json({ 
      success: true, 
      messageId: result.messageId,
      message: 'Mail-in request submitted successfully'
    });
    
  } catch (error) {
    console.error('Mail-in form error:', error);
    res.status(500).json({ 
      error: 'Failed to submit mail-in request',
      details: error.message 
    });
  }
});

export default router;



