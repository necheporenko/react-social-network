import React, { Component, PropTypes } from 'react';
import Cutaway from './Сutaway';
import Tokens from './Tokens';
import Photos from './Photos';
import Peoples from './Peoples';
import './index.scss';

class InfoBloks extends Component {
  render() {
    return (
      <div className="infobloks">
        {/*<Cutaway*/}
          {/*requestedUser={this.props.requestedUser}*/}
        {/*/>*/}
        <Tokens />
        <Photos />
        <Peoples
          following={this.props.following}
          followers={this.props.followers}
          people={this.props.people}
        />
        {this.props.children}
      </div>
    );
  }
}

InfoBloks.propTypes = {
  children: PropTypes.element,
  requestedUser: PropTypes.object,
  followers: PropTypes.object,
  following: PropTypes.object,
  people: PropTypes.array
};

export default InfoBloks;
