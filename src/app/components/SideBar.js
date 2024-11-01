import { Box, List, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import CategoryIcon from '@mui/icons-material/Category';
import KeyIcon from '@mui/icons-material/Key';
import PlaceIcon from '@mui/icons-material/Place';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import SideBarItem from './SideBarItem';

function SideBar() {
  return (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        <SideBarItem primaryText="Users" href="/users" icon={<PeopleIcon />} />
        <SideBarItem primaryText="Events" href="/events" icon={<EventIcon />} />
        <SideBarItem
          primaryText="Categories"
          href="/categories"
          icon={<CategoryIcon />}
        />
        <SideBarItem
          primaryText="Permissions"
          href="/permissions"
          icon={<KeyIcon />}
        />
        <SideBarItem
          primaryText="Locations"
          href="/locations"
          icon={<PlaceIcon />}
        />
        <SideBarItem
          primaryText="Roles"
          href="/roles"
          icon={<AddModeratorIcon />}
        />
      </List>
      <Divider />
    </Box>
  );
}

export default SideBar;
