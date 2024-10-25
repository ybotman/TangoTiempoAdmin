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
} from '@mui/material';
import PropTypes from 'prop-types';

function PermissionInsert({ onInsert, showAlert }) {
  const [insertDialogOpen, setInsertDialogOpen] = useState(false);

  const handleInsertClick = () => {
    setInsertDialogOpen(true);
  };

  const handleInsertDialogClose = () => {
    setInsertDialogOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const permissionName = event.target.permissionName.value;
    const description = event.target.description.value;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/api/permissions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ permissionName, description }),
        }
      );

      if (res.ok) {
        showAlert('Permission inserted successfully!', 'success');
        onInsert();
        handleInsertDialogClose();
      } else {
        showAlert('Failed to insert permission.', 'error');
      }
    } catch (error) {
      showAlert('An unexpected error occurred.', 'error');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="contained" color="primary" onClick={handleInsertClick}>
        Insert Permission
      </Button>
      <Dialog
        open={insertDialogOpen}
        onClose={handleInsertDialogClose}
        maxWidth="md"
        fullWidth
        PaperProps={{ component: 'form', onSubmit: handleSubmit }}
      >
        <DialogTitle>Insert Permission</DialogTitle>
        <DialogContent>
          <Stack sx={{ mt: 1 }} spacing={2}>
            <TextField id="permissionName" label="Permission Name" />
            <TextField id="description" label="Description" />
            <DialogActions>
              <Button onClick={handleInsertDialogClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Insert
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

PermissionInsert.propTypes = {
  onInsert: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default PermissionInsert;
