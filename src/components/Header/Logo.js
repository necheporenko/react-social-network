import React from 'react';
import { Link } from 'react-router';

function zeroTop() {
  document.body.scrollTop = 0;
}

const Logo = () => {
  return (
    <div
      className="logo"
    >
      <Link to="/" onClick={() => zeroTop()}>
        <img src={require('../../img/Default/logo.svg')} />
      </Link>
    </div>
  );
};

export default Logo;
