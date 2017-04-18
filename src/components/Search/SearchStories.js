import React, { Component } from 'react';
import Post from '../StoryLine/Stream/Post';
import './index.scss';

class SearchStories extends Component {
  render() {
    return (
      <div className="search-story page-bg">
        <div className="stream">
          <Post />
        </div>
      </div>
    );
  }
}

export default SearchStories;
