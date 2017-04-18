import React from 'react';

const Tokens = () => {
  return (
    <div className="infoblocks-tokens">

      <div className="title-infoblocks">
        <a href="#"><span className="token-icon"></span>Tokens</a>
      </div>

      <ul className="tokens-mnu">
        <a href="#">
          <li className="tokens-mnu-exchange tokens-list">Exchange</li>
        </a>
        <a href="#">
          <li className="tokens-mnu-sash tokens-list">Sash</li>
        </a>
        <a href="#">
          <li className="tokens-mnu-public tokens-list">Public cache</li>
        </a>
        <a href="#">
          <li className="tokens-mnu-private tokens-list">Private cache</li>
        </a>
      </ul>
    </div>
  );
};

export default Tokens;
