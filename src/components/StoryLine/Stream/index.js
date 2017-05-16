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
          user={this.props.user}
          createStory={this.props.createStory}
          loadStories={this.props.loadStories}
        />
        {storiesArr && storiesArr.map((story) => (
          <Post
            key={story.id}
            post={story.text}
          />
        ))}
      </div>
    );
  }
}

Stream.propTypes = {
  user: PropTypes.object,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
};

export default Stream;
