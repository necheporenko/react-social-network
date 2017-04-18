import React, { Component, PropTypes } from 'react';
import ProfileMenu from '../components/Information&Profile/Profile/ProfileMenu';

class ProfileContainer extends Component {
  render() {
    return (
      <div className="additional-wrap">
        <ProfileMenu />
        {this.props.children}
      </div>

    );
  }
}

ProfileContainer.propTypes = {
  children: PropTypes.element
};

export default ProfileContainer;
