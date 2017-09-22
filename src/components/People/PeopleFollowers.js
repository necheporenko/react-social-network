import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {getUserSlug} from '../../redux/modules/user';
import {
  loadPeopleFollowers,
  isLoadedFollowers,
  follow as followUser,
  unfollow as unfollowUser
} from '../../redux/modules/follow';
import PeopleMenu from './PeopleMenu';
import './index.scss';

@connect((state) => ({
  followers: state.follow.followers,
  requestedUser: state.user.requestedUser,
  path: state.routing.locationBeforeTransitions.pathname,
}), {
  loadPeopleFollowers,
  isLoadedFollowers,
  followUser,
  unfollowUser,
  getUserSlug,
})

class PeopleFollowers extends Component {
  constructor(props) {
    super(props);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }

  componentDidMount() {
    const {path} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    this.props.loadPeopleFollowers(findSlug);
  }

  follow(id) {
    this.props.followUser(id, 'followers');
  }

  unfollow(id) {
    this.props.unfollowUser(id, 'followers');
  }

  render() {
    const {followers} = this.props;

    return (
      <div className="people contents">

        <PeopleMenu/>

        <div className="common-lists people-lists">
          <div className="wrapper">

            {followers.users && followers.users.map((people) => (
              <div key={people.id} className="people-card">
                <Link to={`/${people.slug}`}>
                  <img src={people.avatar}/>
                  <div>{`${people.first_name} ${people.last_name}`}</div>
                </Link>
                <div
                  className="btn-following"
                  onClick={
                    !people.is_follow ?
                      () => {
                        this.follow(people.id);
                      }
                      :
                      () => {
                        this.unfollow(people.id);
                      }
                  }>
                  <div>
                    {!people.is_follow ? 'Follow' : 'Following'}
                  </div>
                  <span/>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    );
  }
}

PeopleFollowers.propTypes = {
  followers: PropTypes.array,
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
  loadPeopleFollowers: PropTypes.func,
  path: PropTypes.string,
  requestedUser: PropTypes.object,
};

export default PeopleFollowers;
