import { ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';

function CategoryListItem({ category }) {
  return (
    <ListItem
      key={category._id}
      secondaryAction={
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
      }
    >
      <ListItemText primary={category.categoryName} />
    </ListItem>
  );
}

CategoryListItem.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string,
    categoryName: PropTypes.string,
  }).isRequired,
};

export default CategoryListItem;
