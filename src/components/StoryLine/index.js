import React, { Component, PropTypes } from 'react';
import BooksTree from '../BooksTree';
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
          <BooksTree
            infoBlocksTop={chooseScroll.booksTree}
            user={this.props.user}
          />
          <Stream
            storiesArr={this.props.storiesArr}
            createStoryRequest={this.props.createStoryRequest}
            showUserStoriesRequest={this.props.showUserStoriesRequest}
            user={this.props.user}
          />
          <InfoBloks />
        </div>
      </div>
    );
  }
}

StoryLine.propTypes = {
  showUserStoriesRequest: PropTypes.func,
  createStoryRequest: PropTypes.func,
  storiesArr: PropTypes.array,
  user: PropTypes.object
};

export default StoryLine;
