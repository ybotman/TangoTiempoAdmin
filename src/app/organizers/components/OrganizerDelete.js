'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

function OrganizerDelete({ organizer, onDelete, showAlert }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/api/organizers/${organizer._id}`,
        {
          method: 'DELETE',
        }
      );

      if (res.ok) {
        showAlert('Organizer deleted successfully!', 'success');
      } else {
        showAlert('Failed to delete organizer.', 'error');
      }
    } catch (error) {
      showAlert('An unexpected error occurred.', 'error');
    }

    onDelete();
    handleDeleteDialogClose();
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={handleDeleteClick}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete the organizer{' '}
            <strong>
              {organizer.name} {'('}_id: {organizer._id}
              {')'}
            </strong>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="outlined">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

OrganizerDelete.propTypes = {
  organizer: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    shortName: PropTypes.string.isRequired,
    firebaseUserId: PropTypes.string.isRequired,
    organizerRegion: PropTypes.string.isRequired,
    organizerDivision: PropTypes.string.isRequired,
    organizerCity: PropTypes.string.isRequired,
    activeFlag: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default OrganizerDelete;