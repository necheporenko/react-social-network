import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { getUserSlug } from '../../redux/modules/user';
import { loadPeopleSuggested, isLoadedSuggested, follow as followUser, unfollow as unfollowUser } from '../../redux/modules/follow';
import PeopleMenu from './PeopleMenu';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (!isLoadedSuggested(getState())) {
      promises.push(dispatch(loadPeopleSuggested(getUserSlug(getState()))));
    }
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  suggested: state.follow.suggested,
}), {
  loadPeopleSuggested,
  isLoadedSuggested,
  followUser,
  unfollowUser,
  getUserSlug,
})


class PeopleSuggested extends Component {
  constructor(props) {
    super(props);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }

  follow(id) {
    this.props.followUser(id, 'people')
      .then(() => this.props.loadPeopleSuggested());
  }

  unfollow(id) {
    this.props.unfollowUser(id, 'people')
      .then(() => this.props.loadPeopleSuggested());
  }

  render() {
    const { suggested } = this.props;

    return (
      <div className="people contents">

        <PeopleMenu />

        <div className="common-lists people-lists">
          <div className="wrapper">

            {suggested && suggested.map((people) => (
              <div key={people.id} className="people-card">
                <Link to={`/${people.slug}`}>
                  <img src={people.avatar} />
                  <div>{`${people.first_name} ${people.last_name}`}</div>
                </Link>
                <div
                  className="btn-following"
                  onClick={
                    !people.isFollowing ?
                    () => this.follow(people.id)
                    :
                    () => this.unfollow(people.id)
                  }>
                  {!people.isFollowing ? 'Follow' : 'Following'}
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

PeopleSuggested.propTypes = {
  suggested: PropTypes.array,
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
  loadPeopleSuggested: PropTypes.func,
};

export default PeopleSuggested;
