import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function RolesLayout({ children }) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3">Roles</Typography>
      {children}
    </Box>
  );
}

RolesLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RolesLayout;
