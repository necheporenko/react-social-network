import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const NavigationInfoUser = ({ link, userName, displayUser, avatar}) => {
  return (
    <div className={displayUser}>
      <Link to={link}>
        <img src={avatar} alt={userName} />
        <span>{userName}</span>
      </Link>
    </div>
  );
};

NavigationInfoUser.propTypes = {
  link: PropTypes.string,
  userName: PropTypes.string,
  displayUser: PropTypes.string,
  avatar: PropTypes.string
};

export default NavigationInfoUser;
