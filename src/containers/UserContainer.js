import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {getUser, getUserSlug, getUserProfile} from '../redux/modules/user';
import { create as createStory, load as loadStories, loadNext as loadNextStories } from '../redux/modules/story';
import {load as loadBookTree} from '../redux/modules/book';
import { loadPeopleFollowers, loadPeopleFollowing, loadUserPeople } from '../redux/modules/follow';
import SubHeader from '../components/StoryLine/SubHeader';
import Navigation from '../components/Navigation';
import StoryLine from '../components/StoryLine';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
  requestedUserProfile: state.user.requestedUserProfile,
  isAuthenticated: state.user.isAuthenticated,
  storiesArr: state.story.storiesArr,
  bookTreeArr: state.book.bookTreeArr,
  following: state.follow.following,
  followers: state.follow.followers,
  people: state.follow.people,
  path: state.routing.locationBeforeTransitions.pathname,
}), {
  loadStories,
  createStory,
  getUser,
  getUserSlug,
  getUserProfile,
  loadBookTree,
  loadNextStories,
  loadPeopleFollowers,
  loadPeopleFollowing,
  loadUserPeople
})

export default class UserContainer extends Component {
  componentDidMount() {
    // (function () { document.body.scrollTop = 0; }());
    const {path} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    this.props.getUser(findSlug)
      .then(this.props.loadStories(findSlug))
      .then(this.props.loadBookTree(findSlug))
      .then(this.props.getUserProfile(findSlug))
      .then(this.props.loadUserPeople(findSlug))
      .then(this.props.loadPeopleFollowing(findSlug))
      .then(this.props.loadPeopleFollowers(findSlug));
  }

  render() {
    const { requestedUser } = this.props;

    return (
      <div>
        <Helmet
          title={`${requestedUser.first_name} ${requestedUser.last_name} - Storyline`}
        />
        <SubHeader
          requestedUser={this.props.requestedUser}
        />
        <Navigation
          requestedUser={this.props.requestedUser}
        />
        <StoryLine
          authorizedUser={this.props.authorizedUser}
          requestedUser={this.props.requestedUser}
          requestedUserProfile={this.props.requestedUserProfile}
          storiesArr={this.props.storiesArr}
          createStory={this.props.createStory}
          loadStories={this.props.loadStories}
          bookTreeArr={this.props.bookTreeArr}
          loadNextStories={this.props.loadNextStories}
          // userProfile={this.props.userProfile}
          following={this.props.following}
          followers={this.props.followers}
          people={this.props.people}
        />
      </div>
    );
  }
}

UserContainer.propTypes = {
  authorizedUser: PropTypes.object,           //user
  requestedUser: PropTypes.object,
  path: PropTypes.bool,
  getUser: PropTypes.func,
  getUserProfile: PropTypes.func,
  requestedUserProfile: PropTypes.object,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
  loadNextStories: PropTypes.func,
  bookTreeArr: PropTypes.array,               //book
  loadBookTree: PropTypes.func,
  // userProfile: PropTypes.object,
  followers: PropTypes.object,                //follow
  following: PropTypes.object,
  people: PropTypes.array,                    //profile
  loadUserPeople: PropTypes.func,
  loadPeopleFollowing: PropTypes.func,
  loadPeopleFollowers: PropTypes.func,
};
