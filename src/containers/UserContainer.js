import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { getUser, getUserSlug, isPolling } from '../redux/modules/user';
import { create as createStory, load as loadStories, loadNext as loadNextStories } from '../redux/modules/story';
import { create as createBook, load as loadBookTree } from '../redux/modules/book';
import { load as loadProfile, loadUserFriends } from '../redux/modules/profile';
import { loadPeopleFollowers, loadPeopleFollowing } from '../redux/modules/follow';
import SubHeader from '../components/StoryLine/SubHeader';
import Navigation from '../components/Navigation';
import StoryLine from '../components/StoryLine';


@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(getUser(getUserSlug(getState()))));
    // dispatch(clearPagination());
    promises.push(dispatch(loadPeopleFollowing(getUserSlug(getState()))));
    promises.push(dispatch(loadPeopleFollowers(getUserSlug(getState()))));
    promises.push(dispatch(loadStories(getUserSlug(getState()))));
    promises.push(dispatch(loadBookTree(getUserSlug(getState()))));
    // promises.push(dispatch(loadProfile(getUserSlug(getState()))));
    promises.push(dispatch(loadUserFriends(getUserSlug(getState()))));
    return Promise.all(promises);
  }
}])


@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
  isAuthenticated: state.user.isAuthenticated,
  storiesArr: state.story.storiesArr,
  bookTreeArr: state.book.bookTreeArr,
  // userProfile: state.profile.userProfile,
  following: state.follow.following,
  followers: state.follow.followers,
  friends: state.profile.friends
}), {
  loadStories,
  createStory,
  getUser,
  getUserSlug,
  loadBookTree,
  loadNextStories,
})

export default class UserContainer extends Component {
  componentDidMount() {
    (function () { document.body.scrollTop = 0; }());
  }

  render() {
    return (
      <div>
        <SubHeader
          requestedUser={this.props.requestedUser}
        />
        <Navigation
          requestedUser={this.props.requestedUser}
        />
        <StoryLine
          authorizedUser={this.props.authorizedUser}
          requestedUser={this.props.requestedUser}
          storiesArr={this.props.storiesArr}
          createStory={this.props.createStory}
          loadStories={this.props.loadStories}
          bookTreeArr={this.props.bookTreeArr}
          loadNextStories={this.props.loadNextStories}
          // userProfile={this.props.userProfile}
          following={this.props.following}
          followers={this.props.followers}
          friends={this.props.friends}
        />
      </div>
    );
  }
}

UserContainer.propTypes = {
  authorizedUser: PropTypes.object,           //user
  requestedUser: PropTypes.object,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
  loadNextStories: PropTypes.func,
  bookTreeArr: PropTypes.array,               //book
  // userProfile: PropTypes.object,
  followers: PropTypes.object,                //follow
  following: PropTypes.object,
  friends: PropTypes.array,                   //profile
};
