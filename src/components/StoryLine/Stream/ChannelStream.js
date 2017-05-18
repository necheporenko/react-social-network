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
        />
        {channelStories && channelStories.map((story) => (
          <Post
            key={story.id}
            post={story.text}
            user={story.user}
            created={story.created}
          />
        ))}
      </div>
    );
  }
}

ChannelStream.propTypes = {
  user: PropTypes.object,
  createStory: PropTypes.func,
  channelStories: PropTypes.array,
};

export default ChannelStream;
