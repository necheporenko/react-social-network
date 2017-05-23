import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Sbox from './Sbox';
import Post from './Post';
import './index.scss';

let page;

@connect((state) => ({
  over: state.channel.over,
  channel_slug: state.channel.channel_slug,
}), {})

class ChannelStream extends Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    console.log('Channnel page:', page);
    page = 1;
    console.log(page);
  }

  load() {
    page++;
    console.log('CHANNEL OVERRRRRRRRRRRRRRRRRRRRr', this.props.over);
    if (!this.props.over) {
      this.props.loadNextChannelStories(this.props.channel_slug, page);
    }
  }

  render() {
    const { channelStories } = this.props;
    return (
      <div className="stream">
        <Sbox
          user={this.props.user}
          createStory={this.props.createStory}
        />
        <InfiniteScroll
          loadMore={this.load}
          hasMore={true}
          threshold={50}
          // loader={loader}
        >
        {channelStories && channelStories.map((story) => (
          <Post
            key={story.id}
            post={story.text}
            user={story.user}
            created={story.created}
            images={story.images}
          />
        ))}
        </InfiniteScroll>
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
