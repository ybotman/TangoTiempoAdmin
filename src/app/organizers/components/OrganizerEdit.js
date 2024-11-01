'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  IconButton,
  Divider,
  Autocomplete,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';

function OrganizerEdit({ organizer, regions, onEdit, showAlert }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const region = regions.find(
      (region) => region._id === organizer.organizerRegion
    );
    const division = region?.divisions.find(
      (division) => division._id === organizer.organizerDivision
    );
    const city = division?.majorCities.find(
      (city) => city._id === organizer.organizerCity
    );
    setSelectedRegion(region);
    setDivisions(region?.divisions || []);
    setSelectedDivision(division);
    setCities(division?.majorCities || []);
    setSelectedCity(city);
  }, [organizer, regions]);

  useEffect(() => {
    if (selectedRegion) {
      setDivisions(selectedRegion.divisions);
      setSelectedDivision(selectedRegion.divisions[0]);
      setCities(selectedRegion.divisions[0].majorCities);
      setSelectedCity(selectedRegion.divisions[0].majorCities[0]);
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedDivision) {
      setCities(selectedDivision.majorCities);
      setSelectedCity(selectedDivision.majorCities[0]);
    }
  }, [selectedDivision]);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const organizerId = event.target.organizerId.value;
    const name = event.target.name.value;
    const shortName = event.target.shortName.value;
    const btcNiceName = event.target.btcNiceName.value;
    const firebaseUserId = event.target.firebaseUserId.value;
    const url = event.target.url.value;
    const description = event.target.description.value;
    const phone = event.target.phone.value;
    const publicEmail = event.target.publicEmail.value;
    const loginId = event.target.loginId.value;
    const activeFlag = event.target.activeFlag.checked;
    const paymentTier = event.target.paymentTier.value;
    const paidBool = event.target.paidBool.checked;
    const organizerRegion = selectedRegion?._id;
    const organizerDivision = selectedDivision?._id;
    const organizerCity = selectedCity?._id;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/api/organizers/${organizerId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            shortName,
            btcNiceName,
            firebaseUserId,
            url,
            description,
            phone,
            publicEmail,
            loginId,
            activeFlag,
            paymentTier,
            paidBool,
            organizerRegion,
            organizerDivision,
            organizerCity,
          }),
        }
      );

      if (res.ok) {
        onEdit();
        handleEditDialogClose();
        showAlert('Organizer updated successfully!', 'success');
      } else {
        showAlert('Failed to update organizer.', 'error');
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
        aria-labelledby="edit-organizer-dialog"
        maxWidth="md"
        fullWidth
        PaperProps={{ component: 'form', onSubmit: handleSubmit }}
      >
        <DialogTitle>Edit Organizer</DialogTitle>
        <DialogContent>
          <Stack sx={{ mt: 1 }} spacing={2}>
            <TextField
              id="organizerId"
              label="_id"
              defaultValue={organizer._id}
              disabled
            />
            <TextField
              id="name"
              label="Organizer Name"
              defaultValue={organizer.name}
              required
            />
            <TextField
              id="shortName"
              label="Short Name"
              defaultValue={organizer.shortName}
              required
            />
            <TextField
              id="btcNiceName"
              label="BTC Nice Name"
              defaultValue={organizer.btcNiceName}
            />
            <TextField
              id="firebaseUserId"
              label="Firebase User ID"
              defaultValue={organizer.firebaseUserId}
              required
            />
            <TextField
              id="url"
              label="Website URL"
              defaultValue={organizer.url}
            />
            <TextField
              id="description"
              label="Description"
              defaultValue={organizer.description}
              multiline
              rows={3}
            />
            <TextField
              id="phone"
              label="Phone"
              defaultValue={organizer.phone}
            />
            <TextField
              id="publicEmail"
              label="Public Email"
              defaultValue={organizer.publicEmail}
            />
            <TextField
              id="loginId"
              label="Login ID"
              defaultValue={organizer.loginId}
            />
            <Divider />
            <Autocomplete
              options={regions}
              getOptionLabel={(option) => option.regionName}
              value={selectedRegion}
              onChange={(event, newValue) => setSelectedRegion(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Region" required />
              )}
            />
            <Autocomplete
              options={divisions}
              getOptionLabel={(option) => option.divisionName}
              value={selectedDivision}
              onChange={(event, newValue) => setSelectedDivision(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Division" required />
              )}
            />
            <Autocomplete
              options={cities}
              getOptionLabel={(option) => option.cityName}
              value={selectedCity}
              onChange={(event, newValue) => setSelectedCity(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="City" required />
              )}
            />
            <Divider />
            <TextField
              id="paymentTier"
              label="Payment Tier"
              select
              SelectProps={{ native: true }}
              defaultValue={organizer.paymentTier || 'free'}
            >
              <option value="free">Free</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
            </TextField>
            <FormControlLabel
              control={
                <Checkbox
                  id="activeFlag"
                  defaultChecked={organizer.activeFlag}
                />
              }
              label="Active"
            />
            <FormControlLabel
              control={
                <Checkbox id="paidBool" defaultChecked={organizer.paidBool} />
              }
              label="Has Paid for Services"
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

OrganizerEdit.propTypes = {
  organizer: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    shortName: PropTypes.string.isRequired,
    btcNiceName: PropTypes.string,
    firebaseUserId: PropTypes.string.isRequired,
    url: PropTypes.string,
    description: PropTypes.string,
    phone: PropTypes.string,
    publicEmail: PropTypes.string,
    loginId: PropTypes.string,
    activeFlag: PropTypes.bool.isRequired,
    paymentTier: PropTypes.string.isRequired,
    paidBool: PropTypes.bool.isRequired,
    organizerRegion: PropTypes.string.isRequired,
    organizerDivision: PropTypes.string.isRequired,
    organizerCity: PropTypes.string.isRequired,
  }).isRequired,
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      regionName: PropTypes.string.isRequired,
      divisions: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          divisionName: PropTypes.string.isRequired,
          majorCities: PropTypes.arrayOf(
            PropTypes.shape({
              _id: PropTypes.string.isRequired,
              cityName: PropTypes.string.isRequired,
            })
          ),
        })
      ),
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default OrganizerEdit;
