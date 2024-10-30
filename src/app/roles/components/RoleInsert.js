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
  Autocomplete,
  Checkbox,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PropTypes from 'prop-types';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function RoleInsert({ onInsert, showAlert, permissions }) {
  const [insertDialogOpen, setInsertDialogOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handleInsertClick = () => {
    setInsertDialogOpen(true);
  };

  const handleInsertDialogClose = () => {
    setInsertDialogOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const roleName = event.target.roleName.value;
    const description = event.target.description.value;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/api/roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roleName,
          description,
          permissions: selectedPermissions,
        }),
      });

      if (res.ok) {
        showAlert('Role inserted successfully!', 'success');
        onInsert();
        handleInsertDialogClose();
      } else {
        showAlert('Failed to insert role.', 'error');
      }
    } catch (error) {
      showAlert('An unexpected error occurred.', 'error');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="contained" color="primary" onClick={handleInsertClick}>
        Insert Role
      </Button>
      <Dialog
        open={insertDialogOpen}
        onClose={handleInsertDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ component: 'form', onSubmit: handleSubmit }}
      >
        <DialogTitle>Insert Role</DialogTitle>
        <DialogContent>
          <Stack sx={{ mt: 1 }} spacing={2}>
            <TextField id="roleName" label="Role Name" required />
            <TextField id="description" label="Description" required />
            <Divider />
            <Autocomplete
              multiple
              disableCloseOnSelect
              id="permissions"
              options={permissions}
              getOptionLabel={(option) => option}
              value={selectedPermissions}
              onChange={(event, newValue) => {
                setSelectedPermissions(newValue);
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Permissions" />
              )}
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

RoleInsert.propTypes = {
  onInsert: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string).isRequired, // Available permissions for Autocomplete
};

export default RoleInsert;
