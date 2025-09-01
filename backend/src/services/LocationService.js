import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class LocationService {
  constructor() {
    this.mapkitKey = process.env.APPLE_MAPKIT_KEY;
    this.teamId = process.env.APPLE_TEAM_ID;
    this.keyId = process.env.APPLE_KEY_ID;
    this.technicianLocation = null;
    this.activeBookings = new Map();
  }

  async getMapKitToken() {
    try {
      const response = await axios.post(
        `https://api.apple.com/maps/v1/token`,
        {
          teamId: this.teamId,
          keyId: this.keyId,
          key: this.mapkitKey
        }
      );
      return response.data.token;
    } catch (error) {
      console.error('Error getting MapKit token:', error);
      throw new Error('Failed to get MapKit token');
    }
  }

  async updateTechnicianLocation(latitude, longitude) {
    this.technicianLocation = { latitude, longitude };
    await this.updateAllETAs();
  }

  async calculateETA(destination) {
    try {
      const token = await this.getMapKitToken();
      const response = await axios.get(
        `https://api.apple.com/maps/v1/directions`,
        {
          params: {
            origin: `${this.technicianLocation.latitude},${this.technicianLocation.longitude}`,
            destination: `${destination.latitude},${destination.longitude}`,
            transportType: 'automobile'
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const route = response.data.routes[0];
      const duration = route.expectedTravelTime; // in seconds
      const distance = route.distance; // in meters

      return {
        durationMinutes: Math.ceil(duration / 60),
        distanceMiles: (distance / 1609.34).toFixed(1),
        route: route.polyline,
        trafficInfo: route.trafficInfo
      };
    } catch (error) {
      console.error('Error calculating ETA:', error);
      throw new Error('Failed to calculate ETA');
    }
  }

  async updateAllETAs() {
    for (const [bookingId, booking] of this.activeBookings) {
      try {
        const eta = await this.calculateETA(booking.location.coordinates);
        booking.estimatedArrivalTime = new Date(Date.now() + (eta.durationMinutes * 60000));
        await this.notifyCustomerETA(booking, eta);
      } catch (error) {
        console.error(`Failed to update ETA for booking ${bookingId}:`, error);
      }
    }
  }

  async optimizeRoute(bookings) {
    try {
      const token = await this.getMapKitToken();
      const waypoints = bookings.map(booking => ({
        location: `${booking.location.coordinates.latitude},${booking.location.coordinates.longitude}`,
        stopover: true
      }));

      const response = await axios.post(
        `https://api.apple.com/maps/v1/route/optimize`,
        {
          origin: `${this.technicianLocation.latitude},${this.technicianLocation.longitude}`,
          destination: `${this.technicianLocation.latitude},${this.technicianLocation.longitude}`,
          waypoints: waypoints,
          transportType: 'automobile'
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      return {
        optimizedOrder: response.data.waypointOrder,
        totalDistance: response.data.totalDistance,
        totalDuration: response.data.totalDuration,
        route: response.data.route
      };
    } catch (error) {
      console.error('Error optimizing route:', error);
      throw new Error('Failed to optimize route');
    }
  }

  async validateLocation(location) {
    try {
      const token = await this.getMapKitToken();
      const response = await axios.get(
        `https://api.apple.com/maps/v1/geocode`,
        {
          params: {
            q: location.address
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.results.length === 0) {
        throw new Error('Invalid address');
      }

      const result = response.data.results[0];
      return {
        formattedAddress: result.formattedAddress,
        coordinates: {
          latitude: result.coordinate.latitude,
          longitude: result.coordinate.longitude
        },
        region: result.region,
        locality: result.locality
      };
    } catch (error) {
      console.error('Error validating location:', error);
      throw new Error('Failed to validate location');
    }
  }

  async calculateTravelFee(location) {
    const validatedLocation = await this.validateLocation(location);
    const distance = await this.calculateDistance(validatedLocation.coordinates);
    return this.calculateFee(distance);
  }

  async calculateDistance(destination) {
    try {
      const token = await this.getMapKitToken();
      const response = await axios.get(
        `https://api.apple.com/maps/v1/distance`,
        {
          params: {
            origin: `${this.technicianLocation.latitude},${this.technicianLocation.longitude}`,
            destination: `${destination.latitude},${destination.longitude}`,
            transportType: 'automobile'
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      return response.data.distance / 1609.34; // Convert meters to miles
    } catch (error) {
      console.error('Error calculating distance:', error);
      throw new Error('Failed to calculate distance');
    }
  }

  calculateFee(distanceMiles) {
    const baseFee = 25;
    const perMileRate = 2.5;
    const minimumDistance = 5;
    const maximumDistance = 30;

    if (distanceMiles < minimumDistance) {
      return baseFee;
    }

    if (distanceMiles > maximumDistance) {
      throw new Error(`Distance exceeds maximum travel range of ${maximumDistance} miles`);
    }

    return baseFee + (distanceMiles * perMileRate);
  }

  async notifyCustomerETA(booking, eta) {
    const message = {
      booking,
      eta: eta.durationMinutes,
      distance: eta.distanceMiles,
      trafficInfo: eta.trafficInfo
    };
    
    this.emit('etaUpdate', message);
  }
}

export default new LocationService(); 