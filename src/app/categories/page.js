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

  // useEffect to handle fetch errors
  useEffect(() => {
    if (error) {
      showAlert('Could not fetch categories.', 'error');
    }
  }, [error]);

  return (
    <>
      <CategoryInsert onInsert={mutate} showAlert={showAlert} />

      {isLoading ? (
        // Render skeletons while loading
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
      ) : categories && categories.length > 0 ? (
        // Render the list of categories
        <List sx={{ bgcolor: 'grey.50', mt: 1 }}>
          {categories.map((category) => (
            <CategoryListItem
              key={category._id}
              category={category}
              onEdit={mutate}
              onDelete={mutate}
              showAlert={showAlert}
            />
          ))}
        </List>
      ) : (
        // Render a message when there are no categories
        <Typography variant="body1" sx={{ mt: 2 }}>
          No categories found.
        </Typography>
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
    </>
  );
}

export default CategoriesPage;
