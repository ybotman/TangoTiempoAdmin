'use client';

import { useState } from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import CategoryEditDialog from './CategoryEditDialog';

function CategoryListItem({ category }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  return (
    <ListItem
      key={category._id}
      secondaryAction={
        <IconButton aria-label="edit" onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
      }
    >
      <ListItemText primary={category.categoryName} />
      <CategoryEditDialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        category={category}
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
};

export default CategoryListItem;
