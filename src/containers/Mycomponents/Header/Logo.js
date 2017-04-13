import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
  return (
    <div
      className="logo"
    >
      <Link to="/">
        <img src="http://validbook.org/images/logo.svg" />
      </Link>
    </div>
  );
};

export default Logo;
