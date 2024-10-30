'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  IconButton,
  Divider,
  Autocomplete,
  Checkbox,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PropTypes from 'prop-types';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function RoleEdit({ role, permissions, onEdit, showAlert }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Set the selected permissions when the role is loaded
  useEffect(() => {
    const initialPermissions = role.permissions?.map((permission) =>
      permissions.find((p) => p === permission)
    );
    setSelectedPermissions(initialPermissions);
  }, [role, permissions]);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const roleId = event.target.roleId.value;
    const roleName = event.target.roleName.value;
    const description = event.target.description.value;
    const updatedPermissions = selectedPermissions;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/api/roles/${roleId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roleName,
            description,
            permissions: updatedPermissions,
          }),
        }
      );

      if (res.ok) {
        onEdit();
        handleEditDialogClose();
        showAlert('Role updated successfully!', 'success');
      } else {
        showAlert('Failed to update role.', 'error');
      }
    } catch (error) {
      showAlert('An unexpected error occurred.', 'error');
    }
  };

  return (
    <>
      <IconButton aria-label="edit" onClick={handleEditClick}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        aria-labelledby="edit-role-dialog"
        maxWidth="sm"
        fullWidth
        PaperProps={{ component: 'form', onSubmit: handleSubmit }}
      >
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <Stack sx={{ mt: 1 }} spacing={2}>
            <TextField
              id="roleId"
              label="_id"
              defaultValue={role._id}
              disabled
            />
            <Divider />
            <TextField
              id="roleName"
              label="Role Name"
              defaultValue={role.roleName}
              required
            />
            <TextField
              id="description"
              label="Description"
              defaultValue={role.description}
              required
            />
            <Divider />
            <Autocomplete
              multiple
              disableCloseOnSelect
              id="permissions"
              options={permissions}
              getOptionLabel={(option) => option}
              value={selectedPermissions}
              onChange={(event, newValue) => {
                setSelectedPermissions(newValue);
              }}
              renderOption={(props, option, { selected }) => {
                return (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                );
              }}
              // style={{ width: 500 }}
              renderInput={(params) => (
                <TextField {...params} label="Permissions" />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

RoleEdit.propTypes = {
  role: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    roleName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string).isRequired, // Available permissions for Autocomplete
  onEdit: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default RoleEdit;
