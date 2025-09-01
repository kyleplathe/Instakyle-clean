import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { devices } from '../../data/devices';

const DeviceSelection = ({ onComplete, initialValue }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(initialValue);

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device.model);
    onComplete({ deviceModel: device.model });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Your Device
      </Typography>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search devices..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={2}>
        {filteredDevices.map((device) => (
          <Grid item xs={12} sm={6} md={4} key={device.model}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                transform: selectedDevice === device.model ? 'scale(1.02)' : 'scale(1)',
                border: selectedDevice === device.model ? `2px solid ${theme.palette.primary.main}` : 'none',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
              onClick={() => handleDeviceSelect(device)}
            >
              <CardMedia
                component="img"
                height="140"
                image={device.image}
                alt={device.name}
                sx={{ objectFit: 'contain', p: 2 }}
              />
              <CardContent>
                <Typography variant="h6" component="div" noWrap>
                  {device.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {device.brand}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredDevices.length === 0 && (
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 4 }}>
          No devices found matching your search.
        </Typography>
      )}
    </Box>
  );
};

export default DeviceSelection; 