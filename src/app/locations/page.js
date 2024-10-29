'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  List,
  Skeleton,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import useSWR from 'swr';
import LocationListItem from './components/LocationListItem';
import LocationInsert from './components/LocationInsert';
import fetcher from '../utils/fetcher';

function LocationsPage() {
  const {
    data: locations,
    isLoading,
    mutate,
    error,
  } = useSWR(`${process.env.NEXT_PUBLIC_BE_URL}/api/locations`, fetcher);

  const { data: regions } = useSWR(
    `${process.env.NEXT_PUBLIC_BE_URL}/api/regions/activeRegions`,
    fetcher
  );

  // State for managing alerts
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'error', // 'error', 'success', 'warning', 'info'
  });

  const showAlert = (message, severity = 'error') => {
    setAlert({
      open: true,
      message,
      severity,
    });
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  useEffect(() => {
    if (error) {
      showAlert('Could not fetch locations.', 'error');
    }
  }, [error]);

  return (
    <>
      <LocationInsert onInsert={mutate} showAlert={showAlert} />

      {isLoading ? (
        <Box sx={{ mt: 2 }}>
          {[...Array(5)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={50}
              sx={{ mb: 1 }}
            />
          ))}
        </Box>
      ) : locations && locations.length > 0 ? (
        <List sx={{ bgcolor: 'grey.50', mt: 1 }}>
          {locations.map((location) => (
            <LocationListItem
              key={location._id}
              location={location}
              regions={regions}
              onEdit={mutate}
              onDelete={mutate}
              showAlert={showAlert}
            />
          ))}
        </List>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No locations found.
        </Typography>
      )}

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default LocationsPage;
