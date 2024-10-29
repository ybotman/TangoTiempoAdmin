import { ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import LocationEdit from './LocationEdit';
import LocationDelete from './LocationDelete';

function LocationListItem({ location, regions, onEdit, onDelete, showAlert }) {
  return (
    <ListItem
      key={location._id}
      secondaryAction={
        <>
          <LocationEdit
            location={location}
            regions={regions}
            onEdit={onEdit}
            showAlert={showAlert}
          />
          <LocationDelete
            location={location}
            onDelete={onDelete}
            showAlert={showAlert}
          />
        </>
      }
    >
      <ListItemText
        primary={location.name}
        secondary={`${location.address_1}, ${location.city}, ${location.state}, ${location.zip}`}
      />
    </ListItem>
  );
}

LocationListItem.propTypes = {
  location: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address_1: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
  }).isRequired,
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      regionName: PropTypes.string.isRequired,
      divisions: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          divisionName: PropTypes.string.isRequired,
          majorCities: PropTypes.arrayOf(
            PropTypes.shape({
              _id: PropTypes.string.isRequired,
              cityName: PropTypes.string.isRequired,
            })
          ),
        })
      ),
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default LocationListItem;
