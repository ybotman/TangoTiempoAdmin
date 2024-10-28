import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function LocationsLayout({ children }) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3">Locations</Typography>
      {children}
    </Box>
  );
}

LocationsLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LocationsLayout;
