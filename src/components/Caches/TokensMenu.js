import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './index.scss';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
}), {})

export default class TokensMenu extends Component {
  render() {
    const { slug } = this.props.authorizedUser;

    return (
      <div className="sidebar tokens-nav">
        <div className={this.props.sidebar}>
          <ul>
            <Link onlyActiveOnIndex={true} to={`/${slug}/caches`} activeClassName="active">
              <li className="tokens-mnu-sash">Sash</li>
            </Link>
            <Link onlyActiveOnIndex={true} to={`/${slug}/caches/exchange`} activeClassName="active">
              <li className="tokens-mnu-exchange">Exchange</li>
            </Link>
            {/*<Link onlyActiveOnIndex={true} to={`/${slug}/tokens/public`} activeClassName="active">*/}
              {/*<li className="tokens-mnu-public">Public cache</li>*/}
            {/*</Link>*/}
            {/*<Link onlyActiveOnIndex={true} to={`/${slug}/tokens/private`} activeClassName="active">*/}
              {/*<li className="tokens-mnu-private">Private cache</li>*/}
            {/*</Link>*/}
          </ul>
          <div className="create-new-item">
            <a href="#">+ Create new drawer</a>
          </div>
        </div>
      </div>
    );
  }
}

TokensMenu.propTypes = {
  authorizedUser: PropTypes.object,
};
