import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { loadPeopleSuggested, isLoadedSuggested, follow as followUser, unfollow as unfollowUser } from '../../redux/modules/follow';
import PeopleMenu from './PeopleMenu';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (!isLoadedSuggested(getState())) {
      promises.push(dispatch(loadPeopleSuggested()));
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
})


class PeopleSuggested extends Component {
  constructor(props) {
    super(props);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }

  follow(id) {
    this.props.followUser(id)
      .then(() => this.props.loadPeopleSuggested());
  }

  unfollow(id) {
    this.props.unfollowUser(id)
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
                <a href="#">
                  <img src="http://devianmbanks.validbook.org/cdn/460/avatar/90x90.jpg?t=1486723970" />
                  <div>{`${people.first_name} ${people.last_name}`}</div>
                </a>
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
