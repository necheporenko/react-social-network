import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {
  like as likePostChannel,
  viewMoreComments as viewMoreCommentsChannel,
  createComment as createCommentChannel
} from '../../../redux/modules/channel';
import Sbox from './Sbox';
import Post from '../Post/index';
import './index.scss';

@connect((state) => ({
  over: state.channel.over,
  loaded: state.channel.loaded.loadedChannelStories,
  channel_slug: state.channel.channel_slug,
  pagination: state.channel.pagination
}), {
  likePostChannel,
  viewMoreCommentsChannel,
  createCommentChannel,
})

export default class ChannelStream extends Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.like = this.like.bind(this);
    this.showMoreComments = this.showMoreComments.bind(this);
    this.reloadStreamChannel = this.reloadStreamChannel.bind(this);
    this.createComment = this.createComment.bind(this);
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

  createComment(entity_id, content, parent_id, user) {
    this.props.createCommentChannel(entity_id, content, parent_id, user);
  }

  showMoreComments(id, paginationComment) {
    this.props.viewMoreCommentsChannel(id, paginationComment);
  }

  render() {
    const {channelStories, loaded, over} = this.props;
    console.log(this.props);
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
        {loaded
          ? <InfiniteScroll
            loadMore={this.load}
            hasMore={true}
            threshold={50}
            loader={over ? null : loader}
          >
            {channelStories && channelStories.map((story, index) => (
              <Post
                key={index}
                story={story}
                likeFunc={this.like}
                showMoreCommentsFunc={this.showMoreComments}
                authorizedUser={this.props.authorizedUser}
                requestedUser={this.props.requestedUser}
                createComment={this.createComment}
              />
            ))}
          </InfiniteScroll>
          : loader
        }
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
