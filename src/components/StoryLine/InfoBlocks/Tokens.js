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
          <Link to={`/${slug}/caches`}><span className="token-icon"/>Chest</Link>
        </div>

        <ul className="tokens-mnu">
          <Link to={`/${slug}/chest/exchange`}>
            <li className="tokens-mnu-exchange tokens-list">Exchange</li>
          </Link>
          <Link to={`/${slug}/chest`}>
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
