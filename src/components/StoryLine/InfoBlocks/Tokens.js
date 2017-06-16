import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

@connect((state) => ({
  requestedUser: state.user.requestedUser,
}), {})

export default class Tokens extends Component {
  render() {
    const { slug } = this.props.requestedUser;
    return (
      <div className="infoblocks-tokens">

        <div className="title-infoblocks">
          <Link to={`/${slug}/cache`}><span className="token-icon"></span>Caches</Link>
        </div>

        <ul className="tokens-mnu">
          <Link to={`/${slug}/cache/exchange`}>
            <li className="tokens-mnu-exchange tokens-list">Exchange</li>
          </Link>
          <Link to={`/${slug}/cache`}>
            <li className="tokens-mnu-sash tokens-list">Sash</li>
          </Link>
          {/*<a href="#">*/}
          {/*<li className="tokens-mnu-public tokens-list">Public cache</li>*/}
          {/*</a>*/}
          {/*<a href="#">*/}
          {/*<li className="tokens-mnu-private tokens-list">Private cache</li>*/}
          {/*</a>*/}
        </ul>
      </div>
    );
  }
}

Tokens.propTypes = {
  requestedUser: PropTypes.object,
};
