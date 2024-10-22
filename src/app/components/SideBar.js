import { Box, List, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import CategoryIcon from '@mui/icons-material/Category';
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
      </List>
      <Divider />
    </Box>
  );
}

export default SideBar;
