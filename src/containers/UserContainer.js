import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {getUser, getUserSlug, getUserProfile} from '../redux/modules/user';
import {
  create as createStory,
  load as loadStories,
  loadNext as loadNextStories,
  clearStories
} from '../redux/modules/story';
import {load as loadBookTree, clearBookTree} from '../redux/modules/book';
import {loadPeopleFollowers, loadPeopleFollowing, loadUserPeople, clearPeopleBlock} from '../redux/modules/follow';
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
  getUser,
  getUserSlug,
  getUserProfile,
  loadBookTree,
  clearBookTree,
  loadStories,
  createStory,
  clearStories,
  loadNextStories,
  loadPeopleFollowers,
  loadPeopleFollowing,
  loadUserPeople,
  clearPeopleBlock
})

export default class UserContainer extends Component {
  constructor(props) {
    super(props);
    this.requests = this.requests.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  componentDidMount() {
    (function () {
      document.body.scrollTop = 0;
    }());
    const {path, requestedUser, requestedUserProfile} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    if (findSlug !== requestedUser.slug) {
      this.clearState();
      this.requests(findSlug);
    }
    if (!requestedUserProfile.id) {
      this.requests(findSlug);
    }
  }

  componentDidUpdate(prevProps) {
    const {path, requestedUser} = this.props;
    if (prevProps.path !== path) {
      const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
      if (findSlug && (findSlug !== requestedUser.slug)) {
        this.clearState();
        this.requests(findSlug);
      }
    }
  }

  requests(findSlug) {
    this.props.getUser(findSlug)
      .then(this.props.loadStories(findSlug))
      .then(this.props.loadBookTree(findSlug))
      .then(this.props.getUserProfile(findSlug))
      .then(this.props.loadUserPeople(findSlug))
      .then(this.props.loadPeopleFollowing(findSlug))
      .then(this.props.loadPeopleFollowers(findSlug));
  }

  clearState() {
    this.props.clearBookTree();
    this.props.clearStories();
    this.props.clearPeopleBlock();
  }

  render() {
    const {requestedUser} = this.props;

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
  path: PropTypes.string,
  getUser: PropTypes.func,
  getUserProfile: PropTypes.func,
  requestedUserProfile: PropTypes.object,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
  loadNextStories: PropTypes.func,
  clearStories: PropTypes.func,
  bookTreeArr: PropTypes.array,               //book
  loadBookTree: PropTypes.func,
  clearBookTree: PropTypes.func,
  // userProfile: PropTypes.object,
  followers: PropTypes.object,                //follow
  following: PropTypes.object,
  clearPeopleBlock: PropTypes.func,
  people: PropTypes.array,                    //profile
  loadUserPeople: PropTypes.func,
  loadPeopleFollowing: PropTypes.func,
  loadPeopleFollowers: PropTypes.func,
};
