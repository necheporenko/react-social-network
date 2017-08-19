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
          requestedUserProfile={this.props.requestedUserProfile}
        />
        {/*<Tokens />*/}
        <Peoples
          following={this.props.following}
          followers={this.props.followers}
          people={this.props.people}
        />
        <Photos
          loaded={this.props.loaded}
        />
      </div>
    );
  }
}

InfoBloks.propTypes = {
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
