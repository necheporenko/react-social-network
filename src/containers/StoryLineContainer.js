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
import {getHumanCard, clearHumanCard} from '../redux/modules/document';
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
  humanCard: state.document.humanCard,
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
  clearPeopleBlock,
  getHumanCard,
  clearHumanCard
})

export default class StoryLineContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedBlocks: false
    };

    this.requests = this.requests.bind(this);
    this.clearState = this.clearState.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const {path, requestedUser, requestedUserProfile} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    window.addEventListener('scroll', this.handleScroll);
    if (findSlug !== requestedUser.slug) {
      this.clearState();
      this.requests(findSlug);
    }
    if (!requestedUserProfile.id) {
      this.requests(findSlug);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const {fixedBlocks} = this.state;

    if (scrollTop <= 236 && fixedBlocks) {
      this.setState({fixedBlocks: false});
    } else if (scrollTop > 236 && !fixedBlocks) {
      this.setState({fixedBlocks: true});
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
      .then(this.props.loadPeopleFollowers(findSlug))
      .then(() => (this.props.requestedUser.public_address && this.props.getHumanCard(this.props.requestedUser.public_address)));
  }

  clearState() {
    this.props.clearBookTree();
    this.props.clearStories();
    this.props.clearPeopleBlock();
    this.props.clearHumanCard();
  }

  render() {
    const {fixedBlocks} = this.state;
    const {
      requestedUser,
      authorizedUser,
      requestedUserProfile,
      storiesArr,
      createStory,
      loadStories,
      bookTreeArr,
      loadNextStories,
      following,
      followers,
      people,
      humanCard
    } = this.props;
    return (
      <div>
        <Helmet
          title={`${requestedUser.first_name} ${requestedUser.last_name} - Storyline`}
        />
        <StoryLine
          authorizedUser={authorizedUser}
          requestedUser={requestedUser}
          requestedUserProfile={requestedUserProfile}
          storiesArr={storiesArr}
          createStory={createStory}
          loadStories={loadStories}
          bookTreeArr={bookTreeArr}
          loadNextStories={loadNextStories}
          // userProfile={this.props.userProfile}
          following={following}
          followers={followers}
          people={people}
          fixedBlocks={fixedBlocks}
          humanCard={humanCard}
        />
      </div>
    );
  }

}

StoryLineContainer.propTypes = {
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
  getHumanCard: PropTypes.func,
  clearHumanCard: PropTypes.func,
  humanCard: PropTypes.object
};
