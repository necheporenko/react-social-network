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
            <Link onlyActiveOnIndex={true} to={`/${slug}/documents`} activeClassName="active">
              <li className="tokens-mnu-sash">Board</li>
            </Link>
            <Link onlyActiveOnIndex={true} to={`/${slug}/documents/exchange`} activeClassName="active">
              <li className="tokens-mnu-exchange">Inbox</li>
            </Link>
            <Link onlyActiveOnIndex={true} to={`/${slug}/tokens/public`} activeClassName="active">
              <li className="tokens-mnu-public">Wallet</li>
            </Link>
            {/*<Link onlyActiveOnIndex={true} to={`/${slug}/tokens/private`} activeClassName="active">*/}
              {/*<li className="tokens-mnu-private">Private cache</li>*/}
            {/*</Link>*/}
          </ul>
          <div className="create-new-item">
            <a href="#">+ Create new box</a>
          </div>
        </div>
      </div>
    );
  }
}

TokensMenu.propTypes = {
  authorizedUser: PropTypes.object,
};
