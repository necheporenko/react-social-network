import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import './index.scss';

class LeftMenu extends Component {
  render() {
    const { slug, first_name, last_name } = this.props.user;

    return (
      <div className="leftpanel-menu">
        <div className="wrapper">

          <ul className="nav-ul">
            <li className="nav-li">
              <IndexLink to={`/${slug}`} className="nav-a nav-storyline">
                <img src="http://devianmbanks.validbook.org/cdn/460/avatar/20x20.jpg?t=1486723970" />
                <span>{`${first_name} ${last_name}`}</span>
              </IndexLink>
            </li>
            <li className="nav-li">
              <Link to={`/${slug}/books`} className="nav-a nav-books">Books</Link>
            </li>
            <li className="nav-li">
              <Link to={`/${slug}/tokens`} className="nav-a nav-tokens">Tokens</Link>
            </li>
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
