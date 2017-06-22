import React, { Component } from 'react';
import Logo from './Logo';
import SearchField from './SearchField';
import './index.scss';

class MinHeader extends Component {
  render() {
    return (
      <div className="header">
        <Logo />
        <SearchField />

        <div className="header-sign-btn">
          <button className="header-sign-up">Sign Up</button>
          <button className="header-sign-in">Sign In</button>
        </div>
      </div>
    );
  }
}

export default MinHeader;
