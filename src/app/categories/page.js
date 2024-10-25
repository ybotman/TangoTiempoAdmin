'use client';

import { useState } from 'react';
import {
  Box,
  List,
  Skeleton,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import useSWR from 'swr';
import CategoryListItem from './components/CategoryListItem';
import CategoryInsert from './components/CategoryInsert';
import fetcher from '../utils/fetcher';

function CategoriesPage() {
  const {
    data: categories,
    isLoading,
    mutate,
    error,
  } = useSWR(`${process.env.NEXT_PUBLIC_BE_URL}/api/categories`, fetcher);

  // State for managing alerts
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'error', // 'error', 'success', 'warning', 'info'
  });

  // Function to show alerts
  const showAlert = (message, severity = 'error') => {
    setAlert({
      open: true,
      message,
      severity,
    });
  };

  // Function to handle closing the alert
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  return (
    <Box>
      <Typography variant="h3">Categories</Typography>
      <CategoryInsert onInsert={mutate} showAlert={showAlert} />

      {isLoading ? (
        <Skeleton variant="rectangular" height={500} sx={{ mt: 1 }} />
      ) : (
        <List sx={{ bgcolor: 'grey.50', mt: 1 }}>
          {categories.map((category) => (
            <CategoryListItem
              key={category._id}
              category={category}
              onEdit={mutate}
              showAlert={showAlert}
            />
          ))}
        </List>
      )}

      {/* Snackbar for Alerts */}
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
    </Box>
  );
}

export default CategoriesPage;
