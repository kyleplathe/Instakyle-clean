import { body, validationResult } from 'express-validator';

export const validateBooking = [
  // Customer validation
  body('customerId').isUUID().withMessage('Invalid customer ID'),
  
  // Device validation
  body('deviceModel')
    .isString()
    .notEmpty()
    .withMessage('Device model is required'),
  
  // Repair type validation
  body('repairType')
    .isString()
    .isIn(['screen', 'battery', 'camera', 'charging_port', 'other'])
    .withMessage('Invalid repair type'),
  
  // Appointment date validation
  body('appointmentDate')
    .isISO8601()
    .withMessage('Invalid appointment date')
    .custom((value) => {
      const appointmentDate = new Date(value);
      const now = new Date();
      if (appointmentDate < now) {
        throw new Error('Appointment date must be in the future');
      }
      return true;
    }),
  
  // Location validation
  body('location')
    .isObject()
    .withMessage('Location must be an object'),
  body('location.address')
    .isString()
    .notEmpty()
    .withMessage('Address is required'),
  body('location.city')
    .isString()
    .notEmpty()
    .withMessage('City is required'),
  body('location.state')
    .isString()
    .notEmpty()
    .withMessage('State is required'),
  body('location.zipCode')
    .isString()
    .matches(/^\d{5}(-\d{4})?$/)
    .withMessage('Invalid ZIP code'),
  
  // Repair location validation
  body('repairLocation')
    .isString()
    .isIn(['customer_location', 'shop', 'meetup_point'])
    .withMessage('Invalid repair location'),
  
  // Validation result handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateLocation = [
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateStatusUpdate = [
  body('status')
    .isString()
    .isIn(['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'en_route', 'arrived'])
    .withMessage('Invalid status'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]; 