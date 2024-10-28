'use client';

import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';

function LocationEdit({ location, onEdit, showAlert }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const locationId = event.target.locationId.value;
    const name = event.target.name.value;
    const address_1 = event.target.address_1.value;
    const address_2 = event.target.address_2.value;
    const address_3 = event.target.address_3.value;
    const city = event.target.city.value;
    const state = event.target.state.value;
    const zip = event.target.zip.value;
    const country = event.target.country.value || 'USA';
    const latitude = parseFloat(event.target.latitude.value);
    const longitude = parseFloat(event.target.longitude.value);
    const calculatedRegion = event.target.calculatedRegion.value;
    const calculatedDivision = event.target.calculatedDivision.value;
    const calculatedCity = event.target.calculatedCity.value;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/api/locations/${locationId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            address_1,
            address_2,
            address_3,
            city,
            state,
            zip,
            country,
            latitude,
            longitude,
            calculatedRegion,
            calculatedDivision,
            calculatedCity,
          }),
        }
      );

      if (res.ok) {
        onEdit();
        handleEditDialogClose();
        showAlert('Location updated successfully!', 'success');
      } else {
        showAlert('Failed to update location.', 'error');
      }
    } catch (error) {
      showAlert('An unexpected error occurred.', 'error');
    }
  };

  return (
    <>
      <IconButton aria-label="edit" onClick={handleEditClick}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        aria-labelledby="edit-location-dialog"
        maxWidth="sm"
        fullWidth
        PaperProps={{ component: 'form', onSubmit: handleSubmit }}
      >
        <DialogTitle>Edit Location</DialogTitle>
        <DialogContent>
          <Stack sx={{ mt: 1 }} spacing={2}>
            <TextField
              id="locationId"
              label="_id"
              defaultValue={location._id}
              disabled
            />
            <Divider />
            <TextField
              id="name"
              label="Location Name"
              defaultValue={location.name}
              required
            />
            <TextField
              id="address_1"
              label="Address Line 1"
              defaultValue={location.address_1}
              required
            />
            <TextField
              id="address_2"
              label="Address Line 2"
              defaultValue={location.address_2}
            />
            <TextField
              id="address_3"
              label="Address Line 3"
              defaultValue={location.address_3}
            />
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  id="city"
                  label="City"
                  defaultValue={location.city}
                  required
                  fullWidth
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  id="state"
                  label="State"
                  defaultValue={location.state}
                  required
                  fullWidth
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  id="zip"
                  label="ZIP Code"
                  defaultValue={location.zip}
                  required
                  fullWidth
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  id="country"
                  label="Country"
                  defaultValue={location.country || 'USA'}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Divider />
            <Typography variant="subtitle1">Geolocation</Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  id="latitude"
                  label="Latitude"
                  type="number"
                  defaultValue={location.latitude}
                  required
                  fullWidth
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  id="longitude"
                  label="Longitude"
                  type="number"
                  defaultValue={location.longitude}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <Divider />

            <TextField
              id="calculatedRegion"
              label="Calculated Region ID"
              defaultValue={location.calculatedRegion}
              required
            />
            <TextField
              id="calculatedDivision"
              label="Calculated Division ID"
              defaultValue={location.calculatedDivision}
              required
            />
            <TextField
              id="calculatedCity"
              label="Calculated City ID"
              defaultValue={location.calculatedCity}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

LocationEdit.propTypes = {
  location: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address_1: PropTypes.string.isRequired,
    address_2: PropTypes.string,
    address_3: PropTypes.string,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    country: PropTypes.string,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    calculatedRegion: PropTypes.string.isRequired,
    calculatedDivision: PropTypes.string.isRequired,
    calculatedCity: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default LocationEdit;
