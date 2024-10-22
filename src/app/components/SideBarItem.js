import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PropTypes from 'prop-types';

function SideBarItem({ primaryText, href, icon }) {
  return (
    <ListItem key={primaryText} disablePadding>
      <ListItemButton href={href}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primaryText} />
      </ListItemButton>
    </ListItem>
  );
}

SideBarItem.propTypes = {
  primaryText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default SideBarItem;
