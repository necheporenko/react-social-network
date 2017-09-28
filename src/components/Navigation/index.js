import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import NavigationUserInfo from './NavigationUserInfo';
import './index.scss';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
}), {})

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationPosition: 'navigation',
      showSmallUser: 'navigation-infouser-none'
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    window.removeEventListener('scroll', this.handleScroll);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('scu');
    if (this.state.navigationPosition !== nextState.navigationPosition && this.state.showSmallUser !== nextState.showSmallUser) {
      return true;
    }

    return false;
  }

  handleScroll() {
    const scrollTop = document.documentElement.scrollTop;
    let navigationPosition;
    let displayUser;

    if (scrollTop <= 236) {
      navigationPosition = 'navigation';
      displayUser = 'navigation-infouser-none';
    } else {
      navigationPosition = 'navigation navigation-fixed';
      displayUser = 'navigation-infouser';
    }

    this.setState({
      navigationPosition,
      showSmallUser: displayUser
    });
  }

  onNavigationLinkClick(e) {
    if (e.target.tagName === 'a') {
      document.documentElement.scrollTop = 237;
    }
  }

  render() {
    const {first_name, last_name, slug, avatar32, isFollowing, id, cover} = this.props.requestedUser;
    const {navigationPosition, showSmallUser} = this.state;
    console.log('nav render');

    return (
      <div className={navigationPosition} style={{boxShadow: id ? '0 2px 4px 0 rgba(0, 0, 0, 0.1)' : 'none'}}>
        <div
          onClick={this.onNavigationLinkClick}
          className="navigation-wrap"
          style={{borderColor: cover && cover.color ? `#${cover.color}` : '#1976d2'}}
        >
          <Link
            to={`/${slug}`}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Storyline
          </Link>
          <Link
            to={`/${slug}/books`}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Books
          </Link>
          <Link
            to={`/${slug}/people`}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            People
          </Link>
          <Link
            to={`/${slug}/photos`}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Photos
          </Link>
          <Link
            to={`/${slug}/documents`}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Documents
          </Link>
        </div>

        {this.props.requestedUser.id &&
        <div>
          {this.props.authorizedUser.id !== this.props.requestedUser.id &&
          <div
            className="btn-following btn-message"
            onClick={() => this.openConversation(id, this.props.requestedUser)}
          >
            <Link // to="/messages/new"
            >
              <div>Chat<i/></div>
            </Link>
          </div>
          }
          <div
            className="btn-following"
            onClick={isFollowing ?
                () => this.unfollow(id)
                :
                () => this.follow(id)
            }>
            <div>
              {isFollowing ? 'Following' : 'Follow'}
            </div>
            <span/>
          </div>
        </div>
        }
        <NavigationUserInfo
          userName={`${first_name} ${last_name}`}
          avatar32={avatar32}
          link={`/${slug}`}
          displayUser={showSmallUser}
        />
      </div>

    );
  }
}

Navigation.propTypes = {
  requestedUser: PropTypes.object,
};
