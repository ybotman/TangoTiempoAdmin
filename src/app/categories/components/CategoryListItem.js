import { ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import CategoryEdit from './CategoryEdit';
import CategoryDelete from './CategoryDelete';

function CategoryListItem({ category, onEdit, onDelete, showAlert }) {
  return (
    <ListItem
      key={category._id}
      secondaryAction={
        <>
          <CategoryEdit
            category={category}
            onEdit={onEdit}
            showAlert={showAlert}
          />
          <CategoryDelete
            category={category}
            onDelete={onDelete}
            showAlert={showAlert}
          />
        </>
      }
    >
      <ListItemText primary={category.categoryName} />
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
