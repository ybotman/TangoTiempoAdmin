import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function OrganizersLayout({ children }) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3">Organizers</Typography>
      {children}
    </Box>
  );
}

OrganizersLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OrganizersLayout;
