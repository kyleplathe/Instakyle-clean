import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  useTheme
} from '@mui/material';
import { validateLocation } from '../../services/locationService';

const LocationInput = ({ onComplete, initialValue }) => {
  const theme = useTheme();
  const [address, setAddress] = useState(initialValue?.address || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Initialize MapKit
    if (window.mapkit) {
      const map = new window.mapkit.Map(mapRef.current, {
        showsUserLocationControl: true,
        showsMapTypeControl: true,
        showsCompass: true,
        showsScale: true,
        showsZoomControl: true,
        showsUserLocation: true
      });

      setMap(map);

      // Add search functionality
      const searchBar = new window.mapkit.SearchBar({
        placeholder: 'Enter address...',
        visible: true
      });

      searchBar.addEventListener('search-complete', (event) => {
        if (event.results.length > 0) {
          const result = event.results[0];
          const location = {
            address: result.formattedAddress,
            coordinates: {
              latitude: result.coordinate.latitude,
              longitude: result.coordinate.longitude
            }
          };
          handleLocationSelect(location);
        }
      });

      map.addSubview(searchBar);
    }

    return () => {
      if (map) {
        map.destroy();
      }
    };
  }, []);

  const handleLocationSelect = async (location) => {
    try {
      setLoading(true);
      setError('');

      // Validate location with backend
      const validatedLocation = await validateLocation(location);

      // Update map marker
      if (markerRef.current) {
        map.removeAnnotation(markerRef.current);
      }

      const coordinate = new window.mapkit.Coordinate(
        validatedLocation.coordinates.latitude,
        validatedLocation.coordinates.longitude
      );

      markerRef.current = new window.mapkit.MarkerAnnotation(coordinate, {
        title: validatedLocation.formattedAddress,
        color: theme.palette.primary.main
      });

      map.addAnnotation(markerRef.current);
      map.setCenterAnimated(coordinate);
      map.setRegionAnimated(new window.mapkit.CoordinateRegion(
        coordinate,
        new window.mapkit.CoordinateSpan(0.01, 0.01)
      ));

      // Update form
      setAddress(validatedLocation.formattedAddress);
      onComplete({ location: validatedLocation });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Enter Your Location
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={loading}
          error={!!error}
          helperText={error}
        />
      </Box>

      <Paper
        ref={mapRef}
        sx={{
          height: 400,
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 1
        }}
      >
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              zIndex: 1
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Paper>

      <Alert severity="info" sx={{ mt: 2 }}>
        We'll come to your location for the repair. Please ensure the address is accurate.
      </Alert>
    </Box>
  );
};

export default LocationInput; 