import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  customerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Customers',
      key: 'id'
    }
  },
  deviceModel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  repairType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'en_route', 'arrived'),
    defaultValue: 'scheduled'
  },
  estimatedDuration: {
    type: DataTypes.INTEGER, // in minutes
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT
  },
  partsRequired: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  totalCost: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  depositAmount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  // New fields for mobile repair
  location: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      coordinates: {
        latitude: null,
        longitude: null
      }
    }
  },
  travelDistance: {
    type: DataTypes.FLOAT, // in miles
    defaultValue: 0
  },
  travelFee: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  estimatedArrivalTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  actualArrivalTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  repairLocation: {
    type: DataTypes.ENUM('customer_location', 'shop', 'meetup_point'),
    defaultValue: 'customer_location'
  },
  // Pricing strategy fields
  pricingTier: {
    type: DataTypes.ENUM('premium', 'standard', 'competitive'),
    defaultValue: 'premium'
  },
  basePrice: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  brandExperienceMultiplier: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 1.25 // 25% premium for brand experience
  }
});

export default Booking; 