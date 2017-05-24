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
        <Cutaway
          userProfile={this.props.userProfile}
        />
        <Tokens />
        <Photos />
        <Peoples />
        {this.props.children}
      </div>
    );
  }
}

InfoBloks.propTypes = {
  children: PropTypes.element,
  userProfile: PropTypes.object
};

export default InfoBloks;
