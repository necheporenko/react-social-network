import React, { Component, PropTypes } from 'react';
import Sbox from './Sbox';
import Post from './Post';
import './index.scss';

class ChannelStream extends Component {
  render() {
    const { channelStories } = this.props;
    return (
      <div className="stream">
        <Sbox
          user={this.props.user}
          createStory={this.props.createStory}
          // loadStories={this.props.loadStories}
        />
        {channelStories && channelStories.map((story) => (
          <Post
            key={story.id}
            post={story.text}
          />
        ))}
        {this.props.children}
      </div>
    );
  }
}

ChannelStream.propTypes = {
  user: PropTypes.object,
  children: PropTypes.element,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
  channelStories: PropTypes.array,
};

export default ChannelStream;
