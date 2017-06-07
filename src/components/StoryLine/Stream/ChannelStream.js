import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Sbox from './Sbox';
import Post from './Post';
import './index.scss';


@connect((state) => ({
  over: state.channel.over,
  channel_slug: state.channel.channel_slug,
  pagination: state.channel.pagination
}), {})

class ChannelStream extends Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.reloadStreamChannel = this.reloadStreamChannel.bind(this);
  }

  load() {
    if (!this.props.over) {
      this.props.loadNextChannelStories(this.props.channel_slug, this.props.pagination);
    }
  }

  reloadStreamChannel() {
    this.props.showChannel('');
  }

  render() {
    const { channelStories } = this.props;
    return (
      <div className="stream">
        <Sbox
          authorizedUser={this.props.authorizedUser}
          createStory={this.props.createStory}
          reloadStream={this.reloadStreamChannel}
        />
        <InfiniteScroll
          loadMore={this.load}
          hasMore={true}
          threshold={50}
        >
          {channelStories && channelStories.map((story) => (
            <Post
              key={story.id}
              id={story.id}
              post={story.text}
              user={story.user}
              created={story.created}
              images={story.images}
              likes={story.likes}
            />
        ))}
        </InfiniteScroll>
      </div>
    );
  }
}

ChannelStream.propTypes = {
  authorizedUser: PropTypes.object,
  createStory: PropTypes.func,
  channelStories: PropTypes.array,
  over: PropTypes.bool,
  loadNextChannelStories: PropTypes.func,
  channel_slug: PropTypes.string,
  pagination: PropTypes.number
};

export default ChannelStream;
