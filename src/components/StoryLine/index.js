import React, { Component, PropTypes } from 'react';
import BooksTreeContainer from '../../containers/BooksTreeContainer';
import Stream from './Stream/index';
import InfoBloks from './InfoBlocks/index';
import './index.scss';

class StoryLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    const scrollTop = e.srcElement.body.scrollTop;
    //console.log(scrollTop);
    this.setState({ scrollTop: scrollTop });
  }

  render() {
    const { scrollTop } = this.state;
    const scroll = () => {
      let booksTreeTop;
      let infoBlocksTop;

      if (scrollTop <= 275) {
        booksTreeTop = 'wrapper';
        infoBlocksTop = 'navigation-infouser-none';
      } else {
        booksTreeTop = 'wrapper wrapper-fixed';
        infoBlocksTop = 'navigation-infouser';
      }
      const result = {booksTree: booksTreeTop, infoBloks: infoBlocksTop};
      return result;
    };
    const chooseScroll = scroll();

    return (
      <div className="storyLine">
        <div className="wrap-storyLine">
          <BooksTreeContainer
            infoBlocksTop={chooseScroll.booksTree}
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
          <InfoBloks
            requestedUser={this.props.requestedUser}
            following={this.props.following}
            followers={this.props.followers}
            people={this.props.people}
          />
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
