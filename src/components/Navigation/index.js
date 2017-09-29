import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import NavigationUserInfo from './NavigationUserInfo';
import './index.scss';

export default class Navigation extends Component {
  onLinkClick() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 236) {
      window.scrollTo(0, 237);
    } else {
      window.scrollTo(scrollTop);
    }
  }

  render() {
    const {first_name, last_name, slug, avatar32, isFollowing, id, cover} = this.props.requestedUser;
    const {authorizedUser, showSmallNavigation} = this.props;

    return (
      <div
        className={'navigation' + (showSmallNavigation ? ' navigation-fixed' : '')}
        style={{boxShadow: id ? '0 2px 4px 0 rgba(0, 0, 0, 0.1)' : 'none'}}>
        <div
          onClick={() => this.onLinkClick()}
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
          {authorizedUser.id !== this.props.requestedUser.id &&
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
          displayUser={showSmallNavigation ? 'navigation-infouser' : 'navigation-infouser-none'}
        />
      </div>

    );
  }
}

Navigation.propTypes = {
  requestedUser: PropTypes.object,
  authorizedUser: PropTypes.object,
  showSmallNavigation: PropTypes.bool,
};
