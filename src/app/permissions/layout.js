import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function PermissionsLayout({ children }) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3">Permissions</Typography>
      {children}
    </Box>
  );
}

PermissionsLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PermissionsLayout;
