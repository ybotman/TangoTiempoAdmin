'use client';

import { useState } from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import CategoryEditDialog from './CategoryEditDialog';
import CategoryDeleteDialog from './CategoryDeleteDialog';

function CategoryListItem({ category, onEdit, onDelete, showAlert }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <ListItem
      key={category._id}
      secondaryAction={
        <>
          <IconButton aria-label="edit" onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText primary={category.categoryName} />
      <CategoryEditDialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        category={category}
        onEdit={onEdit}
        showAlert={showAlert}
      />
      <CategoryDeleteDialog
        open={deleteDialogOpen}
        category={category}
        onClose={handleDeleteDialogClose}
        onDelete={onDelete}
        showAlert={showAlert}
      />
    </ListItem>
  );
}

CategoryListItem.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    categoryCode: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired, // Ensure prop type is defined
};

export default CategoryListItem;
