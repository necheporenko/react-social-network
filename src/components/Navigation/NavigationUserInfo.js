import React from 'react';
import { Link } from 'react-router';

const NavigationInfoUser = ({ link, userName, displayUser }) => {
  return (
    <div className={displayUser}>
      <Link to={link}>
        <img src="http://devianmbanks.validbook.org/cdn/460/avatar/32x32.jpg?t=1486723970" alt="" />
        <span>{userName}</span>
      </Link>
    </div>
  );
};

export default NavigationInfoUser;
