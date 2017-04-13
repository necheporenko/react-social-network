import React, { Component, PropTypes } from 'react';
import Logo from './Logo';
import SearchField from './SearchField';
import UserButtons from './UserButtons';

import './index.scss';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Logo />
        <div className="name-channel">Mashup</div>
        <SearchField />    
        <UserButtons
          onSignIn={this.props.onSignIn}
          onSignOut={this.props.onSignOut}
          user={this.props.user}
        />
        {this.props.children}
      </div>
    );
  }
}

Header.propTypes = {
  children: PropTypes.element,
  onSignIn: PropTypes.func,
  onSignOut: PropTypes.func,
  user: PropTypes.object
};

export default Header;
