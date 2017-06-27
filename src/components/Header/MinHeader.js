import React, { Component } from 'react';
import { Link } from 'react-router';
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
          <Link to="/easy" >
            <button className="header-sign-up">Sign Up</button>
          </Link>
          <Link to="/auth" >
            <button className="header-sign-in">Sign In</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default MinHeader;
