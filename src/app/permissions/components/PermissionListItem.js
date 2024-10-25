import { ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import PermissionEdit from './PermissionEdit';
import PermissionDelete from './PermissionDelete';

function PermissionListItem({ permission, onEdit, onDelete, showAlert }) {
  return (
    <ListItem
      key={permission._id}
      secondaryAction={
        <>
          <PermissionEdit
            permission={permission}
            onEdit={onEdit}
            showAlert={showAlert}
          />
          <PermissionDelete
            permission={permission}
            onDelete={onDelete}
            showAlert={showAlert}
          />
        </>
      }
    >
      <ListItemText
        primary={permission.permissionName}
        secondary={permission.description}
      />
    </ListItem>
  );
}

PermissionListItem.propTypes = {
  permission: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    permissionName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default PermissionListItem;
