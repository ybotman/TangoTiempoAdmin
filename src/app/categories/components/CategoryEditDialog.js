// TangoTiempoAdmin/src/app/components/CategoryEditDialog.js
'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';

function CategoryEditDialog({ open, onClose, category, onEdit, showAlert }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const categoryId = event.target.categoryId.value;
    const categoryName = event.target.categoryName.value;
    const categoryCode = event.target.categoryCode.value;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/api/categories/${categoryId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ categoryName, categoryCode }),
        }
      );

      if (res.ok) {
        onEdit(); // Refresh the categories list
        onClose(); // Close the dialog
        showAlert('Category updated successfully!', 'success'); // Show success alert
      } else {
        showAlert('Failed to update category.', 'error');
      }
    } catch (error) {
      // Handle network or unexpected errors
      showAlert('An unexpected error occurred.', 'error');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="edit-category-dialog"
      maxWidth="sm"
      fullWidth
      PaperProps={{ component: 'form', onSubmit: handleSubmit }}
    >
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <Stack sx={{ mt: 1 }} spacing={2}>
          <TextField
            id="categoryId"
            label="_id"
            defaultValue={category._id}
            disabled
          />
          <TextField
            id="categoryName"
            label="Category Name"
            defaultValue={category.categoryName}
            required
          />
          <TextField
            id="categoryCode"
            label="Category Code"
            defaultValue={category.categoryCode}
            required
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CategoryEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    categoryCode: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired, // Ensure prop type is defined
};

export default CategoryEditDialog;
