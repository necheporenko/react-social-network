import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const NavigationInfoUser = ({ link, userName, displayUser, avatar_url }) => {
  return (
    <div className={displayUser}>
      <Link to={link}>
        <img src={avatar_url} alt={userName} />
        <span>{userName}</span>
      </Link>
    </div>
  );
};

NavigationInfoUser.propTypes = {
  link: PropTypes.string,
  userName: PropTypes.string,
  displayUser: PropTypes.string,
  avatar_url: PropTypes.string
};

export default NavigationInfoUser;
