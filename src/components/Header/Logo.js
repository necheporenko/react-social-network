import React from 'react';
import { Link } from 'react-router';

function zeroTop() {
  // const scrollTop = document.body.scrollTop;
  document.body.scrollTop = 0;
  // console.log('ZERO:', scrollTop);
  console.log('ZERO');
}

const Logo = () => {
  return (
    <div
      className="logo"
    >
      <Link to="/" onClick={() => zeroTop()}>
        <img src="http://validbook.org/images/logo.svg" />
      </Link>
    </div>
  );
};

export default Logo;
