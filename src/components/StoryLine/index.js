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
    // const height = this.infoBlock.clientHeight;
    // this.setState({ height });
    // console.log('height', height)
    const {path} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));

    // this.props.loadStories(findSlug)
    //   .then(this.props.loadBookTree(findSlug))
    //   .then(this.props.loadUserPeople(findSlug))
    //   .then(this.props.loadPeopleFollowing(findSlug))
    //   .then(this.props.loadPeopleFollowers(findSlug));
    // console.log('componentDidMount', this.props);
  }

  componentWillMount() {
    const {path} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    // this.props.getUser(findSlug);
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
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop <= 275) {
        booksTreeTop = 'wrapper';
      } else {
        booksTreeTop = 'wrapper wrapper-fixed';
      }

      if (scrollTop < (this.state.height - (clientHeight - 350))) {
        infoBlocksTop = scrollTop;
      } else if (this.state.height - (clientHeight - 350)) {
        infoBlocksTop = this.state.height - (clientHeight - 350);
      }
      // console.log('result', this.state.height - (clientHeight - 350));

      const result = {booksTree: booksTreeTop, infoBloks: infoBlocksTop};
      return result;
    };
    // const chooseScroll = scroll();

    return (
      <div className="storyLine">
        <div className="wrap-storyLine">
          <div style={{display: 'flex', width: '860px'}}>
            <BooksTreeContainer
              // booksTreeTop={chooseScroll.booksTree}
              requestedUser={this.props.requestedUser}
              bookTreeArr={this.props.bookTreeArr}
            />
            <Stream
              authorizedUser={this.props.authorizedUser}
              requestedUser={this.props.requestedUser}
              storiesArr={this.props.storiesArr}
              createStory={this.props.createStory}
              loadStories={this.props.loadStories}
              loadNextStories={this.props.loadNextStories}
            />
          </div>

          {/*<div*/}
            {/*style={{*/}
              {/*left: 'calc(50% + 275px)',*/}
              {/*width: '322px',*/}
              {/*flex: '0 0 320px',*/}
              {/*top: `calc(354px - ${chooseScroll.infoBloks}px)`,*/}
              {/*position: 'fixed',*/}
            {/*}}*/}
            {/*ref={(c) => { this.infoBlock = c; }}*/}
            {/*>*/}
            {/*<InfoBloks*/}
              {/*requestedUser={this.props.requestedUser}*/}
              {/*following={this.props.following}*/}
              {/*followers={this.props.followers}*/}
              {/*people={this.props.people}*/}
              {/*/>*/}
          {/*</div>*/}

        </div>
      </div>
    );
  }
}

StoryLine.propTypes = {
  authorizedUser: PropTypes.object,
  requestedUser: PropTypes.object,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
  loadNextStories: PropTypes.func,
  bookTreeArr: PropTypes.array,
  // userProfile: PropTypes.object,
  followers: PropTypes.object,
  following: PropTypes.object,
  people: PropTypes.array
};

export default StoryLine;
