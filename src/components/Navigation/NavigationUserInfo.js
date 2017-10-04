import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const NavigationInfoUser = ({ link, userName, displayUser, avatar32}) => {
  const _infoUserClick = (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'SPAN') {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={displayUser} onClick={_infoUserClick}>
      <img src={avatar32} alt={userName} />
      <span>{userName}</span>
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
