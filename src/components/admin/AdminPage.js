

import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import LocationManagement from './LocationManagement';
import OrganizerManagement from './OrganizerManagement';
import RegionManagement from './RegionManagement';
import UserLoginManagement from './UserLoginManagement';
import { LocationsProvider } from '@/contexts/LocationsContext';
import { OrganizersProvider } from '@/contexts/OrganizersContext';
import { RegionsProvider } from '@/contexts/RegionsContext';
import { UserLoginsProvider } from '@/contexts/UserLoginsContext';

function AdminPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={activeTab} onChange={handleChange} centered>
        <Tab label="Manage Regions" />
        <Tab label="Manage Organizers" />
        <Tab label="Manage Locations" />
        <Tab label="Manage User Logins" />
      </Tabs>
      <Box sx={{ padding: 2 }}>
        {activeTab === 0 && (
          <RegionsProvider>
            <RegionManagement />
          </RegionsProvider>
        )}
        {activeTab === 1 && (
          <OrganizersProvider>
            <OrganizerManagement />
          </OrganizersProvider>
        )}
        {activeTab === 2 && (
          <LocationsProvider>
            <LocationManagement />
          </LocationsProvider>
        )}
        {activeTab === 3 && (
          <UserLoginsProvider>
            <UserLoginManagement />
          </UserLoginsProvider>
        )}
      </Box>
    </Box>
  );
}

export default AdminPage;