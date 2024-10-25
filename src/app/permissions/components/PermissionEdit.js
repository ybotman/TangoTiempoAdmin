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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';

function PermissionEdit({ permission, onEdit, showAlert }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const permissionId = event.target.permissionId.value;
    const permissionName = event.target.permissionName.value;
    const description = event.target.description.value;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/api/permissions/${permissionId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ permissionName, description }),
        }
      );

      if (res.ok) {
        onEdit();
        handleEditDialogClose();
        showAlert('Permission updated successfully!', 'success');
      } else {
        showAlert('Failed to update permission.', 'error');
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
        aria-labelledby="edit-permission-dialog"
        maxWidth="sm"
        fullWidth
        PaperProps={{ component: 'form', onSubmit: handleSubmit }}
      >
        <DialogTitle>Edit Permission</DialogTitle>
        <DialogContent>
          <Stack sx={{ mt: 1 }} spacing={2}>
            <TextField
              id="permissionId"
              label="_id"
              defaultValue={permission._id}
              disabled
            />
            <TextField
              id="permissionName"
              label="Permission Name"
              defaultValue={permission.permissionName}
              required
            />
            <TextField
              id="description"
              label="Description"
              defaultValue={permission.description}
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

PermissionEdit.propTypes = {
  permission: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    permissionName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default PermissionEdit;
