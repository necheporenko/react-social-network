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
        {/*<Tokens/>*/}
        <Peoples
          following={this.props.following}
          followers={this.props.followers}
          people={this.props.people}
          requestedUser={this.props.requestedUser}
        />
        <Photos
          loaded={this.props.loaded}
          requestedUser={this.props.requestedUser}
        />
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
