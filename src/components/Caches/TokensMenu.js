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
          <div className="doc-buttons">
            <button>New Box</button>
            <Link to={`/${slug}/documents/document`}>
              <button>New document</button>
            </Link>
          </div>

          <ul>
            <Link onlyActiveOnIndex={true} to={`/${slug}/documents`} activeClassName="active">
              <li className="tokens-mnu-sash">Board</li>
            </Link>
            <Link onlyActiveOnIndex={true} to={`/${slug}/documents/exchange`} activeClassName="active">
              <li className="tokens-mnu-exchange">Inbox</li>
            </Link>
            <Link onlyActiveOnIndex={true} to={`/${slug}/documents/public`} activeClassName="active">
              <li className="tokens-mnu-public">Wallet</li>
            </Link>
            <hr/>
            <Link onlyActiveOnIndex={true} to={`/${slug}/documents/private`} activeClassName="active">
              <li className="tokens-mnu-private">Box 1</li>
            </Link>
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
  sidebar: PropTypes.string,
};
