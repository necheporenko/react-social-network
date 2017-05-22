import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import './index.scss';

class LeftMenu extends Component {
  render() {
    const { slug, first_name, last_name, avatar_url } = this.props.user;

    return (
      <div className="leftpanel-menu">
        <div className="wrapper">

          <ul className="nav-ul">
            <IndexLink to={`/${slug}`} className="nav-a nav-storyline">
              <li className="nav-li">
                <img src={avatar_url} />
                <span>{`${first_name} ${last_name}`}</span>
              </li>
            </IndexLink>
            <Link to={`/${slug}/books`} className="nav-a">
              <li className="nav-li nav-books">
                <span>Books</span>
              </li>
            </Link>
            <Link to={`/${slug}/tokens`} className="nav-a">
              <li className="nav-li nav-tokens">
                <span>Tokens</span>
              </li>
            </Link>
          </ul>

        </div>
      </div>
    );
  }
}

LeftMenu.propTypes = {
  user: PropTypes.object,
};

export default LeftMenu;
