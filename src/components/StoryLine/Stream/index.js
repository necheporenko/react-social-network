import React, { Component, PropTypes } from 'react';
import Sbox from './Sbox';
import Post from './Post';
import './index.scss';

class Stream extends Component {
  render() {
    const { storiesArr } = this.props;
    return (
      <div className="stream">
        <Sbox
          createStoryRequest={this.props.createStoryRequest}
        />
        {storiesArr.map((story, index) => (
          <Post
            key={index}
            post={story.description}
          />
        ))}
        {/*<Post />*/}
        {/*<Post />*/}
        {this.props.children}
      </div>
    );
  }
}

Stream.propTypes = {
  children: PropTypes.element,
  createStoryRequest: PropTypes.func,
  storiesArr: PropTypes.array
};

export default Stream;
