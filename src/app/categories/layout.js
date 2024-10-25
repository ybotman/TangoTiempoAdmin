import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function CategoriesLayout({ children }) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        Categories
      </Typography>
      {children}
    </Box>
  );
}

CategoriesLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CategoriesLayout;
