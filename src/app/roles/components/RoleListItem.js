import { ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import RoleEdit from './RoleEdit';
import RoleDelete from './RoleDelete';

function RoleListItem({ role, permissions, onEdit, onDelete, showAlert }) {
  return (
    <ListItem
      key={role._id}
      secondaryAction={
        <>
          <RoleEdit
            role={role}
            permissions={permissions}
            onEdit={onEdit}
            showAlert={showAlert}
          />
          <RoleDelete role={role} onDelete={onDelete} showAlert={showAlert} />
        </>
      }
    >
      <ListItemText primary={role.roleName} secondary={role.description} />
    </ListItem>
  );
}

RoleListItem.propTypes = {
  role: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    roleName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default RoleListItem;
