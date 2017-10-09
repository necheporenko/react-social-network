import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import NavigationUserInfo from './NavigationUserInfo';
import {followRequestedUser, unfollowRequestedUser} from '../../redux/modules/user';
import './index.scss';

@connect(state => ({}), {
  followRequestedUser,
  unfollowRequestedUser,
})

export default class Navigation extends Component {
  onLinkClick() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 236) {
      window.scrollTo(0, 237);
    }
  }

  follow = (id) => {
    this.props.followRequestedUser(id);
  };

  unfollow = (id) => {
    this.props.unfollowRequestedUser(id);
  };

  render() {
    const {first_name, last_name, slug, avatar32, is_follow, id, cover} = this.props.requestedUser;
    const {authorizedUser, showSmallNavigation} = this.props;
    // const style ={}

    return (
      <div
        className={'navigation' + (showSmallNavigation ? ' navigation-fixed' : '')}
        style={{boxShadow: id ? '0 2px 4px 0 rgba(0, 0, 0, 0.1)' : 'none'}}
      >
        <div className="wrapper-navigation">
          <NavigationUserInfo
            userName={`${first_name} ${last_name}`}
            avatar32={avatar32}
            link={`/${slug}`}
            displayUser={showSmallNavigation ? 'navigation-infouser' : 'navigation-infouser-none'}
          />

          <div
            onClick={() => this.onLinkClick()}
            className="navigation-wrap"
            style={{borderColor: cover && cover.color ? `#${cover.color}` : '#1976d2'}}
          >
            <Link
              to={`/${slug}`}
              onlyActiveOnIndex={true}
              activeClassName="active"
              style={{padding: '16px 10px 27px'}}
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
              onClick={is_follow
                ? () => this.unfollow(id)
                : () => this.follow(id)
              }
              // style={{
              //   borderColor: cover.color ? cover.color : '#1976d2',
              //   color: cover.color ? cover.color : '#1976d2',
              //   // backgroundColor: is_follow ? '#1976d2' : '#fff',
              // }}
            >
              <div>
                {is_follow ? 'Following' : 'Follow'}
              </div>
              <span/>
            </div>
          </div>
          }
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  requestedUser: PropTypes.object,
  authorizedUser: PropTypes.object,
  showSmallNavigation: PropTypes.bool,
};
