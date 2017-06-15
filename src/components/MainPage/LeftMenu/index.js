import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import BooksTree from '../../BooksTree';
import './index.scss';

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  openBooktree() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { isOpen } = this.state;
    const { slug, first_name, last_name, avatar32} = this.props.authorizedUser;
    const showBooktree = () => {
      let arrow;
      let display_state;
      if (!isOpen) {
        arrow = 'booktree';
        display_state = 'none';
      } else {
        arrow = 'booktree booktree-close';
        display_state = 'block';
      }
      return { arrow, display_state };
    };
    const navigation = showBooktree();
    return (
      <div className="leftpanel-menu">
        <div className="wrapper">

          <ul className="nav-ul">
            <IndexLink to={`/${slug}`} className="nav-a nav-storyline">
              <li className="nav-li">
                <img src={avatar32} />
                <span>{`${first_name} ${last_name}`}</span>
              </li>
            </IndexLink>
            <Link to={`/${slug}/books`} className="nav-a">
              <li className="nav-li nav-books">
                <span>Books</span>
              </li>
            </Link>
            <i className={navigation.arrow} onClick={() => this.openBooktree()}></i>
            <div style={{display: navigation.display_state}}>
              <BooksTree
                bookTreeArr={this.props.bookTreeArr}
              />
            </div>
            <Link to={`/${slug}/cache`} className="nav-a">
              <li className="nav-li nav-tokens">
                <span>Cache</span>
              </li>
            </Link>
          </ul>

        </div>
      </div>
    );
  }
}

LeftMenu.propTypes = {
  authorizedUser: PropTypes.object,
};

export default LeftMenu;
