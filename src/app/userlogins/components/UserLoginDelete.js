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

function UserLoginDelete({ userLogin, onDelete, showAlert }) {
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
        `${process.env.NEXT_PUBLIC_BE_URL}/api/userlogins/${userLogin._id}`,
        {
          method: 'DELETE',
        }
      );

      if (res.ok) {
        showAlert('User login deleted successfully!', 'success');
      } else {
        showAlert('Failed to delete user login.', 'error');
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
            Delete the user login{' '}
            <strong>
              {userLogin.localUserInfo?.loginUserName ||
                userLogin.firebaseUserId}{' '}
              {' ('}
              _id: {userLogin._id}
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

UserLoginDelete.propTypes = {
  userLogin: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firebaseUserId: PropTypes.string.isRequired,
    localUserInfo: PropTypes.shape({
      loginUserName: PropTypes.string,
    }),
    active: PropTypes.bool,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default UserLoginDelete;
