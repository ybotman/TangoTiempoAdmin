import { ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import OrganizerEdit from './OrganizerEdit';
import OrganizerDelete from './OrganizerDelete';

function OrganizerListItem({
  organizer,
  regions,
  onEdit,
  onDelete,
  showAlert,
}) {
  return (
    <ListItem
      key={organizer._id}
      secondaryAction={
        <>
          <OrganizerEdit
            organizer={organizer}
            regions={regions}
            onEdit={onEdit}
            showAlert={showAlert}
          />
          <OrganizerDelete
            organizer={organizer}
            onDelete={onDelete}
            showAlert={showAlert}
          />
        </>
      }
    >
      <ListItemText
        primary={organizer.name}
        secondary={`${organizer.shortName} - ${organizer.publicEmail || 'No email provided'}`}
      />
    </ListItem>
  );
}

OrganizerListItem.propTypes = {
  organizer: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    shortName: PropTypes.string.isRequired,
    btcNiceName: PropTypes.string,
    firebaseUserId: PropTypes.string.isRequired,
    url: PropTypes.string,
    description: PropTypes.string,
    phone: PropTypes.string,
    publicEmail: PropTypes.string,
    loginId: PropTypes.string,
    activeFlag: PropTypes.bool.isRequired,
    paymentTier: PropTypes.string.isRequired,
    paidBool: PropTypes.bool.isRequired,
    organizerRegion: PropTypes.string.isRequired,
    organizerDivision: PropTypes.string.isRequired,
    organizerCity: PropTypes.string.isRequired,
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

export default OrganizerListItem;
