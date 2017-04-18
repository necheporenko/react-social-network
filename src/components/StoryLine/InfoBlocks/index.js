import React, { Component, PropTypes } from 'react';
import Сutaway from './Сutaway';
import Tokens from './Tokens';
import Photos from './Photos';
import Peoples from './Peoples';

import './index.scss';

class InfoBloks extends Component {
  render() {
    return (
      <div className="infobloks">
        <div className="wrapper">
          <Сutaway />
          <Tokens />
          <Photos />
          <Peoples />
        </div>

        {this.props.children}
      </div>
    );
  }
}

InfoBloks.propTypes = {
  children: PropTypes.element
};

export default InfoBloks;
