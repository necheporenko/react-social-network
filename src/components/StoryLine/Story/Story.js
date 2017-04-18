import React, { Component } from 'react';
import Post from '../Stream/Post';
//import './index.scss';

class Story extends Component {
  render() {
    return (
      <div className="stream">
          <Post />
      </div>
    );
  }
}

export default Story;
