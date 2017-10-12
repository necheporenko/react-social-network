import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Cutaway from './Сutaway';
import Tokens from './Tokens';
import Photos from './Photos';
import Peoples from './Peoples';
import './index.scss';

@connect((state) => ({
  loaded: state.follow.loaded,
}), {})

class InfoBloks extends Component {

  render() {
    const {requestedUser, requestedUserProfile, loaded, following, followers, people, authorizedUser} = this.props;

    return (
      <div className="infobloks">
        <Cutaway
          authorizedUser={authorizedUser}
          requestedUser={requestedUser}
          requestedUserProfile={requestedUserProfile}
        />
        {/*<Tokens/>*/}
        <Photos
          loaded={loaded}
          requestedUser={requestedUser}
        />
        <Peoples
          following={following}
          followers={followers}
          people={people}
          requestedUser={requestedUser}
        />
      </div>
    );
  }
}

InfoBloks.propTypes = {
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

export default InfoBloks;
