'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from './SideBar';

const drawerWidth = 240;

function TopBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = (newOpen) => () => {
    setMobileOpen(newOpen);
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={(theme) => ({
          zIndex: {
            sm: theme.zIndex.drawer + 1, // For sm and larger screens, set a higher z-index
          },
        })}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle(true)}
            sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Small Screen */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          display: { xs: 'block', sm: 'none' },
        }}
      >
        <SideBar />
      </Drawer>
    </Box>
  );
}

export default TopBar;
