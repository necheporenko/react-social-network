import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { getUser, getUserSlug, isPolling } from '../redux/modules/sign';
import { create as createStory, load as loadStories, loadNext as loadNextStories } from '../redux/modules/story';
import { create as createBook, load as loadBookTree } from '../redux/modules/book';
import { load as loadProfile } from '../redux/modules/profile';
import SubHeader from '../components/StoryLine/SubHeader';
import Navigation from '../components/Navigation';
import StoryLine from '../components/StoryLine';


@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(getUser(getUserSlug(getState()))));
    // dispatch(clearPagination());
    promises.push(dispatch(loadStories(getUserSlug(getState()))));
    promises.push(dispatch(loadBookTree(getUserSlug(getState()))));
    promises.push(dispatch(loadProfile(getUserSlug(getState()))));
    return Promise.all(promises);
  }
}])


@connect((state) => ({
  authorizedUser: state.sign.authorizedUser,
  requestedUser: state.sign.requestedUser,
  isAuthenticated: state.sign.isAuthenticated,
  storiesArr: state.story.storiesArr,
  bookTreeArr: state.book.bookTreeArr,
  userProfile: state.profile.userProfile,
}), {
  loadStories,
  createStory,
  getUser,
  getUserSlug,
  isPolling,
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
          userProfile={this.props.userProfile}
        />
      </div>
    );
  }
}

UserContainer.propTypes = {
  authorizedUser: PropTypes.object,                     //sign
  requestedUser: PropTypes.object,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
  loadNextStories: PropTypes.func,
  bookTreeArr: PropTypes.array,               //book
  userProfile: PropTypes.object
};
