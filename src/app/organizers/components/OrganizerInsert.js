'use client';

import { useEffect, useState } from 'react';
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
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import PropTypes from 'prop-types';

function OrganizerInsert({ onInsert, showAlert, regions }) {
  const [insertDialogOpen, setInsertDialogOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const [cities, setCities] = useState([]);

  // Update divisions and reset selected division and city when region changes
  useEffect(() => {
    if (selectedRegion) {
      setDivisions(selectedRegion.divisions);
      setSelectedDivision(null);
      setCities([]);
      setSelectedCity(null);
    } else {
      setDivisions([]);
      setSelectedDivision(null);
      setCities([]);
      setSelectedCity(null);
    }
  }, [selectedRegion]);

  // Update cities and reset selected city when division changes
  useEffect(() => {
    if (selectedDivision) {
      setCities(selectedDivision.majorCities);
      setSelectedCity(null);
    } else {
      setCities([]);
      setSelectedCity(null);
    }
  }, [selectedDivision]);

  const handleInsertClick = () => {
    setInsertDialogOpen(true);
  };

  const handleInsertDialogClose = () => {
    setInsertDialogOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const shortName = event.target.shortName.value;
    const btcNiceName = event.target.btcNiceName.value;
    const firebaseUserId = event.target.firebaseUserId.value;
    const url = event.target.url.value;
    const description = event.target.description.value;
    const phone = event.target.phone.value;
    const publicEmail = event.target.publicEmail.value;
    const loginId = event.target.loginId.value;
    const paymentTier = event.target.paymentTier.value;
    const activeFlag = event.target.activeFlag.checked;
    const paidBool = event.target.paidBool.checked;
    const organizerRegion = selectedRegion?._id;
    const organizerDivision = selectedDivision?._id;
    const organizerCity = selectedCity?._id;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/api/organizers`,
        {
          method: 'POST',
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
            paymentTier,
            activeFlag,
            paidBool,
            organizerRegion,
            organizerDivision,
            organizerCity,
          }),
        }
      );

      if (res.ok) {
        showAlert('Organizer inserted successfully!', 'success');
        onInsert();
        handleInsertDialogClose();
      } else {
        showAlert('Failed to insert organizer.', 'error');
      }
    } catch (error) {
      showAlert('An unexpected error occurred.', 'error');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="contained" color="primary" onClick={handleInsertClick}>
        Insert Organizer
      </Button>
      <Dialog
        open={insertDialogOpen}
        onClose={handleInsertDialogClose}
        maxWidth="md"
        fullWidth
        PaperProps={{ component: 'form', onSubmit: handleSubmit }}
      >
        <DialogTitle>Insert Organizer</DialogTitle>
        <DialogContent>
          <Stack sx={{ mt: 1 }} spacing={2}>
            <TextField id="name" label="Organizer Name" required />
            <TextField id="shortName" label="Short Name" required />
            <TextField id="btcNiceName" label="BTC Nice Name" />
            <TextField id="firebaseUserId" label="Firebase User ID" required />
            <TextField id="url" label="Website URL" />
            <TextField
              id="description"
              label="Description"
              multiline
              rows={3}
            />
            <TextField id="phone" label="Phone" />
            <TextField id="publicEmail" label="Public Email" />
            <TextField id="loginId" label="Login ID" />
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
              defaultValue="free"
            >
              <option value="free">Free</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
            </TextField>
            <FormControlLabel
              control={<Checkbox id="activeFlag" defaultChecked />}
              label="Active"
            />
            <FormControlLabel
              control={<Checkbox id="paidBool" />}
              label="Has Paid for Services"
            />
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

OrganizerInsert.propTypes = {
  onInsert: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
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
};

export default OrganizerInsert;
