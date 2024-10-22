import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import SideBar from './SideBar';
import TopBar from './TopBar';

const drawerWidth = 240;

function DashboardContainer({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar />

      {/* Large Screen */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <Toolbar />
        <SideBar />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

DashboardContainer.propTypes = {
  children: PropTypes.node,
};

export default DashboardContainer;
