import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, getUserSlug } from '../../redux/modules/user';
import { create as createStory, load as loadStories, loadNext as loadNextStories } from '../../redux/modules/story';
import { create as createBook, load as loadBookTree } from '../../redux/modules/book';
import { loadPeopleFollowers, loadPeopleFollowing, loadUserPeople } from '../../redux/modules/follow';
import BooksTreeContainer from '../../containers/BooksTreeContainer';
import Stream from './Stream/index';
import InfoBloks from './InfoBlocks/index';
import './index.scss';

let documentHeight;

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
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
  loadBookTree,
  loadNextStories,
  loadPeopleFollowing,
  loadPeopleFollowers,
  loadUserPeople,
})

class StoryLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      height: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setState({height: this.infoBlock.clientHeight});
    documentHeight = document.documentElement.clientHeight;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.height !== this.infoBlock.clientHeight) {
      this.setState({height: this.infoBlock.clientHeight});
    }
    // console.log(prevProps, prevState);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    const scrollTop = document.documentElement.scrollTop || (e.target || e.srcElement).body.scrollTop;
    // console.log(scrollTop);
    this.setState({ scrollTop: scrollTop });
  }

  render() {
    const { scrollTop } = this.state;
    const scroll = () => {
      let booksTreeTop;
      let infoBlocksTop;

      if (scrollTop <= 275) {
        booksTreeTop = 'wrapper';
      } else {
        booksTreeTop = 'wrapper wrapper-fixed';
      }

      if (scrollTop < 276) {
        infoBlocksTop = 354 - scrollTop;
        // console.log('<!---result:', infoBlocksTop, scrollTop, 'clientHeight:', documentHeight, this.state.height, this.state.height - (documentHeight - 350));
      } else if (documentHeight - this.state.height > 110) {
        infoBlocksTop = 115;
        // console.log('<!---result2:', infoBlocksTop, scrollTop, 'clientHeight:', documentHeight, this.state.height, this.state.height - (documentHeight - 350));
      } else if (this.state.height - (documentHeight - 350)) {
        infoBlocksTop = (this.state.height - documentHeight) - ((this.state.height - documentHeight) * 1.75);
        // console.log('<!---result3:', infoBlocksTop, scrollTop, 'clientHeight:', documentHeight, this.state.height, this.state.height - (documentHeight - 350));
      }

      const result = {booksTree: booksTreeTop, infoBloks: infoBlocksTop};
      return result;
    };
    const chooseScroll = scroll();

    return (
      <div className="storyLine">
        <div className="wrap-storyLine">
          <div
            style={{
              // left: 'calc(50% + 275px)',
              // left: '160px',
              width: '320px',
              flex: '0 0 320px',
              top: chooseScroll.infoBloks,
              position: 'fixed',
            }}
            ref={(c) => {
              this.infoBlock = c;
            }}
          >
            <InfoBloks
              requestedUserProfile={this.props.requestedUserProfile}
              following={this.props.following}
              followers={this.props.followers}
              people={this.props.people}
            />
          </div>
          <Stream
            authorizedUser={this.props.authorizedUser}
            requestedUser={this.props.requestedUser}
            storiesArr={this.props.storiesArr}
            createStory={this.props.createStory}
            loadStories={this.props.loadStories}
            loadNextStories={this.props.loadNextStories}
          />
          <BooksTreeContainer
            booksTreeTop={chooseScroll.booksTree}
            requestedUser={this.props.requestedUser}
            bookTreeArr={this.props.bookTreeArr}
          />
        </div>
      </div>
    );
  }
}

StoryLine.propTypes = {
  authorizedUser: PropTypes.object,
  requestedUser: PropTypes.object,
  requestedUserProfile: PropTypes.object,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
  loadNextStories: PropTypes.func,
  bookTreeArr: PropTypes.array,
  // userProfile: PropTypes.object,
  followers: PropTypes.shape({
    users: PropTypes.array
  }),
  following: PropTypes.shape({
    users: PropTypes.array
  }),
  people: PropTypes.array
};

export default StoryLine;
