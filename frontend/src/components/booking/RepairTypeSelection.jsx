import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  useTheme
} from '@mui/material';
import { devices } from '../../data/devices';
import { getRepairPrice } from '../../services/pricingService';

const repairTypes = {
  screen: {
    name: 'Screen Repair',
    description: 'Replace cracked or damaged screen with OEM quality parts',
    icon: '📱'
  },
  battery: {
    name: 'Battery Replacement',
    description: 'Replace old or faulty battery with new OEM battery',
    icon: '🔋'
  },
  camera: {
    name: 'Camera Repair',
    description: 'Fix camera issues or replace damaged camera module',
    icon: '📸'
  },
  charging_port: {
    name: 'Charging Port Repair',
    description: 'Fix charging issues or replace damaged port',
    icon: '🔌'
  }
};

const RepairTypeSelection = ({ onComplete, deviceModel, initialValue }) => {
  const theme = useTheme();
  const [selectedRepair, setSelectedRepair] = useState(initialValue);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const loadPrices = async () => {
      const device = devices.find(d => d.model === deviceModel);
      if (!device) return;

      const pricePromises = device.repairs.map(async (repairType) => {
        const price = await getRepairPrice(deviceModel, repairType);
        return [repairType, price];
      });

      const priceResults = await Promise.all(pricePromises);
      setPrices(Object.fromEntries(priceResults));
    };

    loadPrices();
  }, [deviceModel]);

  const handleRepairSelect = (repairType) => {
    setSelectedRepair(repairType);
    onComplete({ repairType });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Repair Type
      </Typography>

      <RadioGroup
        value={selectedRepair}
        onChange={(e) => handleRepairSelect(e.target.value)}
      >
        <Grid container spacing={2}>
          {Object.entries(repairTypes).map(([type, info]) => {
            const device = devices.find(d => d.model === deviceModel);
            const isAvailable = device?.repairs.includes(type);
            
            return (
              <Grid item xs={12} sm={6} key={type}>
                <Card
                  sx={{
                    cursor: isAvailable ? 'pointer' : 'not-allowed',
                    opacity: isAvailable ? 1 : 0.6,
                    transition: 'transform 0.2s',
                    transform: selectedRepair === type ? 'scale(1.02)' : 'scale(1)',
                    border: selectedRepair === type ? `2px solid ${theme.palette.primary.main}` : 'none',
                    '&:hover': {
                      transform: isAvailable ? 'scale(1.02)' : 'scale(1)',
                    },
                  }}
                  onClick={() => isAvailable && handleRepairSelect(type)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h4" sx={{ mr: 2 }}>
                        {info.icon}
                      </Typography>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" component="div">
                          {info.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {info.description}
                        </Typography>
                      </Box>
                      <FormControlLabel
                        value={type}
                        control={<Radio />}
                        label=""
                        disabled={!isAvailable}
                      />
                    </Box>
                    {isAvailable && prices[type] && (
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ mt: 1, textAlign: 'right' }}
                      >
                        ${prices[type].toFixed(2)}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </RadioGroup>
    </Box>
  );
};

export default RepairTypeSelection; 