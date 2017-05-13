import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './index.scss';

@connect((state) => ({
  user: state.sign.user,
}), {})

export default class TokensMenu extends Component {
  render() {
    const { slug } = this.props.user;

    return (
      <div className="sidebar tokens-nav">
        <div className="title">Caches</div>
        <ul>
          <Link onlyActiveOnIndex={true} to={`/${slug}/tokens`} activeClassName="active">
            <li className="tokens-mnu-sash">Sash</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`/${slug}/tokens/exchange`} activeClassName="active">
            <li className="tokens-mnu-exchange">Exchange</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`/${slug}/tokens/public`} activeClassName="active">
            <li className="tokens-mnu-public">Public cache</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`/${slug}/tokens/private`} activeClassName="active">
            <li className="tokens-mnu-private">Private cache</li>
          </Link>
        </ul>
        <div className="create-new-item">
          <a href="#">+ Create new cache</a>
        </div>
      </div>
    );
  }
}

TokensMenu.propTypes = {
  user: PropTypes.object,
};
