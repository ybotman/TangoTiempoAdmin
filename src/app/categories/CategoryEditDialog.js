import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';

function CategoryEditDialog({ open, onClose, category }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="edit-category-dialog"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <Stack sx={{ mt: 1 }} spacing={2}>
          <TextField id="categoryId" label="_id" defaultValue={category._id} />
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
