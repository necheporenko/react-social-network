import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const NavigationInfoUser = ({ link, userName, displayUser, avatar32}) => {
  return (
    <div className={displayUser}>
      <Link to={link}>
        <img src={avatar32} alt={userName} />
        <span>{userName}</span>
      </Link>
    </div>
  );
};

NavigationInfoUser.propTypes = {
  link: PropTypes.string,
  userName: PropTypes.string,
  displayUser: PropTypes.string,
  avatar32: PropTypes.string
};

export default NavigationInfoUser;
