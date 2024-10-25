import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';

function CategoryDeleteDialog({
  open,
  category,
  onClose,
  onDelete,
  showAlert,
}) {
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/api/categories/${category._id}`,
        {
          method: 'DELETE',
        }
      );

      if (res.ok) {
        showAlert('Category deleted successfully!', 'success');
      } else {
        showAlert('Failed to delete category.', 'error');
      }
    } catch (error) {
      showAlert('An unexpected error occurred.', 'error');
    }

    onDelete();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Delete the category{' '}
          <strong>
            {category.categoryName} {'('}_id: {category._id}
            {')'}
          </strong>
          ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" variant="outlined">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CategoryDeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default CategoryDeleteDialog;
