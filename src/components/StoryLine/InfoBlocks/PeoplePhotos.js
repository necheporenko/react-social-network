import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Tokens from './Tokens';
import Photos from './Photos';
import Peoples from './Peoples';
import './index.scss';

@connect((state) => ({
  loaded: state.follow.loaded,
}), {})

class PeoplePhotos extends Component {
  render() {
    return (
      <div className="infobloks">

      </div>
    );
  }
}

PeoplePhotos.propTypes = {
  requestedUser: PropTypes.object,
  requestedUserProfile: PropTypes.object,
  followers: PropTypes.shape({
    users: PropTypes.array
  }),
  following: PropTypes.shape({
    users: PropTypes.array
  }),
  people: PropTypes.array
};

export default PeoplePhotos;
