import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {like as likePostChannel, viewMoreComments as viewMoreCommentsChannel} from '../../../redux/modules/channel';
import Sbox from './Sbox';
import Post from '../Post/index';
import './index.scss';

@connect((state) => ({
  over: state.channel.over,
  channel_slug: state.channel.channel_slug,
  pagination: state.channel.pagination
}), {
  likePostChannel,
  viewMoreCommentsChannel
})

export default class ChannelStream extends Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.like = this.like.bind(this);
    this.showMoreComments = this.showMoreComments.bind(this);
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

  like(id) {
    this.props.likePostChannel(id);
  }

  showMoreComments(id, paginationComment) {
    this.props.viewMoreCommentsChannel(id, paginationComment);
  }

  render() {
    const { channelStories } = this.props;
    const loader = (
      <div className="wrapper-loader">
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        </div>
      </div>
    );

    return (
      <div className="stream" style={{marginLeft: 0}}>
        <Sbox
          authorizedUser={this.props.authorizedUser}
          createStory={this.props.createStory}
          reloadStream={this.reloadStreamChannel}
        />
        <InfiniteScroll
          loadMore={this.load}
          hasMore={true}
          threshold={50}
          loader={loader}
        >
          { channelStories && channelStories.map((story) => (
            <Post
              key={story.id}
              id={story.id}
              post={story.text}
              user={story.user}
              date={story.date}
              images={story.images}
              likes={story.likes}
              books={story.books}
              loudness={story.loudness}
              visibility={story.visibility}
              comments={story.comments}
              paginationComment={story.paginationComment}
              counts={story.counts}
              likeFunc={this.like}
              showMoreCommentsFunc={this.showMoreComments}
              authorizedUser={this.props.authorizedUser}
              requestedUser={this.props.requestedUser}
            />
        ))}
        </InfiniteScroll>
      </div>
    );
  }
}

ChannelStream.propTypes = {
  authorizedUser: PropTypes.object,
  requestedUser: PropTypes.object,
  createStory: PropTypes.func,
  channelStories: PropTypes.array,
  over: PropTypes.bool,
  loadNextChannelStories: PropTypes.func,
  channel_slug: PropTypes.string,
  pagination: PropTypes.number,
  likePostChannel: PropTypes.func,
  viewMoreCommentsChannel: PropTypes.func,
  showChannel: PropTypes.func,
};
