import React from 'react';
import { Link } from 'react-router';
import './index.scss';

const ProfileMenu = () => {
  return (
    <div className="additional-mnu">
      <div className="additional-title">Settings</div>
      <ul className="additional-mnu-ul">
          {/* !!! need fix, because always active (/settings) */}
        <Link
          to="/settings"
          onlyActiveOnIndex={true}
          className="additional-mnu-link"
          activeClassName="additional-mnu-link-active"
        >
          <li>Edit Profile</li>
        </Link>
        <Link
          to="/settings/password"
          onlyActiveOnIndex={true}
          className="additional-mnu-link"
          activeClassName="additional-mnu-link-active"
        >
          <li >Change Password</li>
        </Link>
        <Link
          to="/settings/notifications"
          onlyActiveOnIndex={true}
          className="additional-mnu-link"
          activeClassName="additional-mnu-link-active">
          <li>Notifications Settings</li></Link>
        <Link
          to="/settings/privacy"
          onlyActiveOnIndex={true}
          className="additional-mnu-link"
          activeClassName="additional-mnu-link-active">
          <li>Privacy Control Center</li>
        </Link>
      </ul>
    </div>
  );
};

export default ProfileMenu;
