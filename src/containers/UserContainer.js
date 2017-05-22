import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { getUser, getUserSlug, isPolling } from '../redux/modules/sign';
import { create as createStory, load as loadStories, loadNext as loadNextStories, clearPagination} from '../redux/modules/story';
import { create as createBook, load as loadBookTree } from '../redux/modules/book';
import SubHeader from '../components/StoryLine/SubHeader';
import Navigation from '../components/Navigation';
import StoryLine from '../components/StoryLine';


@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(getUser(getUserSlug(getState()))));
    dispatch(clearPagination());
    promises.push(dispatch(loadStories(getUserSlug(getState()))));

    promises.push(dispatch(loadBookTree(getUserSlug(getState()))));
    return Promise.all(promises);
  }
}])


@connect((state) => ({
  user: state.sign.user,
  activeUser: state.sign.activeUser,
  isAuthenticated: state.sign.isAuthenticated,
  storiesArr: state.story.storiesArr,
  bookTreeArr: state.book.bookTreeArr,
}), {
  loadStories,
  createStory,
  getUser,
  getUserSlug,
  isPolling,
  loadBookTree,
  loadNextStories
})

export default class UserContainer extends Component {

  render() {
    return (
      <div>
        <SubHeader
          activeUser={this.props.activeUser}
        />
        <Navigation
          activeUser={this.props.activeUser}
        />
        <StoryLine
          user={this.props.user}
          activeUser={this.props.activeUser}
          storiesArr={this.props.storiesArr}
          createStory={this.props.createStory}
          loadStories={this.props.loadStories}
          bookTreeArr={this.props.bookTreeArr}
          loadNextStories={this.props.loadNextStories}
        />
      </div>
    );
  }
}

UserContainer.propTypes = {
  user: PropTypes.object,                     //sign
  activeUser: PropTypes.object,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
  loadNextStories: PropTypes.func,
  bookTreeArr: PropTypes.array,               //book
};
