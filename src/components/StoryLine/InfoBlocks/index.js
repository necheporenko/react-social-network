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

    return (
      <div className="infobloks">
        <Cutaway
          requestedUser={this.props.requestedUser}
          requestedUserProfile={this.props.requestedUserProfile}
          humanCard={this.props.humanCard}
        />
        {/*<Tokens/>*/}
        <Photos
          loaded={this.props.loaded}
          requestedUser={this.props.requestedUser}
        />
        <Peoples
          following={this.props.following}
          followers={this.props.followers}
          people={this.props.people}
          requestedUser={this.props.requestedUser}
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
