'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import PropTypes from 'prop-types';

function LocationInsert({ onInsert, showAlert }) {
  const [insertDialogOpen, setInsertDialogOpen] = useState(false);

  const handleInsertClick = () => {
    setInsertDialogOpen(true);
  };

  const handleInsertDialogClose = () => {
    setInsertDialogOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const address_1 = event.target.address_1.value;
    const address_2 = event.target.address_2.value;
    const city = event.target.city.value;
    const state = event.target.state.value;
    const zip = event.target.zip.value;
    const country = event.target.country.value || 'USA';

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/api/locations`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            address_1,
            address_2,
            city,
            state,
            zip,
            country,
          }),
        }
      );

      if (res.ok) {
        showAlert('Location inserted successfully!', 'success');
        onInsert();
        handleInsertDialogClose();
      } else {
        showAlert('Failed to insert location.', 'error');
      }
    } catch (error) {
      showAlert('An unexpected error occurred.', 'error');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="contained" color="primary" onClick={handleInsertClick}>
        Insert Location
      </Button>
      <Dialog
        open={insertDialogOpen}
        onClose={handleInsertDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ component: 'form', onSubmit: handleSubmit }}
      >
        <DialogTitle>Insert Location</DialogTitle>
        <DialogContent>
          <Stack sx={{ mt: 1 }} spacing={2}>
            <TextField id="name" label="Location Name" required />
            <Divider />
            <TextField id="address_1" label="Address Line 1" required />
            <TextField id="address_2" label="Address Line 2" />
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField id="city" label="City" required fullWidth />
              </Grid>
              <Grid size={6}>
                <TextField id="state" label="State" required fullWidth />
              </Grid>
              <Grid size={6}>
                <TextField id="zip" label="ZIP Code" required fullWidth />
              </Grid>
              <Grid size={6}>
                <TextField
                  id="country"
                  label="Country"
                  defaultValue="USA"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInsertDialogClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Insert
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

LocationInsert.propTypes = {
  onInsert: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default LocationInsert;
