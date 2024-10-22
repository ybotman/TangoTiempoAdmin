import { Box, List, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import SideBarItem from './SideBarItem';

function SideBar() {
  return (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        <SideBarItem primaryText="Users" href="/users" icon={<PeopleIcon />} />
        <SideBarItem primaryText="Events" href="/events" icon={<EventIcon />} />
      </List>
      <Divider />
    </Box>
  );
}

export default SideBar;
