import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { getUserSlug } from '../../redux/modules/user';
import { loadPeopleFollowing, isLoadedFollowing, follow as followUser, unfollow as unfollowUser } from '../../redux/modules/follow';
import PeopleMenu from './PeopleMenu';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    // if (!isLoadedFollowing(getState())) {
    promises.push(dispatch(loadPeopleFollowing(getUserSlug(getState()))));
    // }
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  following: state.follow.following,
}), {
  loadPeopleFollowing,
  isLoadedFollowing,
  followUser,
  unfollowUser,
  getUserSlug,
})

class People extends Component {
  constructor(props) {
    super(props);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }

  follow(id) {
    this.props.followUser(id, 'people');
      // .then(() => this.props.loadPeopleFollowing());
  }

  unfollow(id) {
    this.props.unfollowUser(id, 'people');
      // .then(() => this.props.loadPeopleFollowing());
  }

  render() {
    const { following } = this.props;

    return (
      <div className="people contents">

        <PeopleMenu />

        <div className="common-lists people-lists">
          <div className="wrapper">

            {following && following.map((people) => (
              <div key={people.id} className="people-card">
                <Link to={`/${people.slug}`}>
                  <img src={people.avatar} />
                  <div>{`${people.first_name} ${people.last_name}`}</div>
                </Link>
                <div
                  className="btn-following"
                  onClick={
                          !people.isFollowing ?
                            () => {
                              this.follow(people.id);
                            }
                            :
                            () => {
                              this.unfollow(people.id);
                            }
                        }>
                  <div>
                    {!people.isFollowing ? 'Follow' : 'Following'}
                  </div>
                  <span></span>
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>
    );
  }
}

People.propTypes = {
  following: PropTypes.array,
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
  loadPeopleFollowing: PropTypes.func,
};

export default People;
