import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import './index.scss';

class TokensMenu extends Component {
  render() {
    const { first_name, last_name } = this.props.userInfo;
    const link = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;

    return (
      <div className="sidebar tokens-nav">
        <div className="title">Caches</div>
        <ul>
          <Link onlyActiveOnIndex={true} to={`${link}/tokens`} activeClassName="active">
            <li className="tokens-mnu-sash">Sash</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`${link}/tokens/exchange`} activeClassName="active">
            <li className="tokens-mnu-exchange">Exchange</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`${link}/tokens/public`} activeClassName="active">
            <li className="tokens-mnu-public">Public cache</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`${link}/tokens/private`} activeClassName="active">
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
  userInfo: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
  };
}

export default connect(mapStateToProps, null)(TokensMenu);
