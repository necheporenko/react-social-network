import React, { Component } from 'react';
import BooksTree from '../BooksTree';
import Stream from './Stream';
import InfoBloks from './InfoBlocks';

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
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(e) {
    const scrollTop = e.srcElement.body.scrollTop;
    //console.log(scrollTop);
    this.setState({ "scrollTop": scrollTop });
  }

  render() {
    const { scrollTop } = this.state;
    const scroll = () => {
      let booksTreeTop;
      let infoBlocksTop;

      if(scrollTop <= 275) {
          booksTreeTop = "wrapper";
          infoBlocksTop = "navigation-infouser-none";
        } else {
          booksTreeTop = "wrapper wrapper-fixed";
          infoBlocksTop = "navigation-infouser";
        }
      let result = {booksTree: booksTreeTop, infoBloks: infoBlocksTop};
      return result;
    };
    let chooseScroll = scroll();

    return (
      <div className="storyLine">
        <div className="wrap-storyLine">
          <BooksTree
            infoBlocksTop={chooseScroll.booksTree}
          />
          <Stream />
          <InfoBloks />
        </div>
      </div>
    );
  }
}

export default StoryLine;
