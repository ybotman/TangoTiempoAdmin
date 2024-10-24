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

function CategoryEditDialog({ open, onClose, category }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const categoryId = event.target.categoryId.value;
    const categoryName = event.target.categoryName.value;
    const categoryCode = event.target.categoryCode.value;

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
      // Update the category with the response
      const updatedCategory = await res.json();
      Object.assign(category, updatedCategory);

      onClose();
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
          />
          <TextField
            id="categoryCode"
            label="Category Code"
            defaultValue={category.categoryCode}
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Stack>
      </DialogContent>
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
  }),
};

export default CategoryEditDialog;
