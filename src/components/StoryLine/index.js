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
            user={this.props.user}
            bookTreeArr={this.props.bookTreeArr}
          />
          <Stream
            user={this.props.user}
            storiesArr={this.props.storiesArr}
            createStory={this.props.createStory}
            loadStories={this.props.loadStories}
          />
          <InfoBloks />
        </div>
      </div>
    );
  }
}

StoryLine.propTypes = {
  user: PropTypes.object,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
};

export default StoryLine;
