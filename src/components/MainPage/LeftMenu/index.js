import React, {Component, PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
// import BooksTree from '../../BooksTree';
import './index.scss';

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isShowMore: false
    };
  }

  openBooktree() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  showMore() {
    this.setState({
      isShowMore: !this.state.isShowMore
    });
  }

  render() {
    const {isOpen, isShowMore} = this.state;
    const {slug, first_name, last_name, avatar32, cover} = this.props.authorizedUser;
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
      return {arrow, display_state};
    };
    const navigation = showBooktree();

    return (
      <div className="leftpanel-menu">
        <div className="wrapper">
          <div className="shortcuts">
            {/*<img src={iconApps} alt=""/>*/}
            <span>Shortcuts</span>
          </div>
          <ul className="nav-ul">
            {/*<img src={cover} className="cover" alt=""/>*/}

            {/*<IndexLink to={`/${slug}`} className="nav-storyline">*/}
            {/*<img src={avatar32}/>*/}
            {/*<span>{`${first_name} ${last_name}`}</span>*/}
            {/*</IndexLink>*/}

            {/*<i className={navigation.arrow} onClick={() => this.openBooktree()}/>*/}
            <div className="nav-menu">
              {/*<Link to={`/${slug}`} className="nav-a nav-storyline">*/}
              {/*<img src={avatar32}/>*/}
              {/*<li className="nav-li">*/}
              {/*<span>Storyline</span>*/}
              {/*</li>*/}
              {/*</Link>*/}


              {/*<div style={{display: navigation.display_state}}>*/}
              {/*<BooksTree*/}
              {/*bookTreeArr={this.props.bookTreeArr}*/}
              {/*/>*/}
              {/*</div>*/}

              <Link to={`/${slug}/books`} className="nav-a nav-books">
                <li className="nav-li">
                  <span>Books</span>
                </li>
              </Link>

              <Link to={`/${slug}/documents`} className="nav-a nav-documents">
                <li className="nav-li">
                  <span>Documents</span>
                </li>
              </Link>

              <Link to={'/messages'} className="nav-a nav-messages">
                <li className="nav-li">
                  <span>Chats</span>
                </li>
              </Link>
            </div>

            <div className="more" onClick={() => this.showMore()}>{!isShowMore ? 'More' : 'Less'}</div>
            {isShowMore &&
            <div className="nav-menu">
              <Link to={`/${slug}/people`} className="nav-a nav-people">
                <li className="nav-li">
                  <span>People</span>
                </li>
              </Link>

              <Link to={`/${slug}/photos`} className="nav-a nav-photos">
                <li className="nav-li">
                  <span>Photos</span>
                </li>
              </Link>
            </div>
            }

          </ul>
        </div>
      </div>
    );
  }
}

LeftMenu.propTypes = {
  authorizedUser: PropTypes.object,
  // bookTreeArr: PropTypes.array,
};

export default LeftMenu;
