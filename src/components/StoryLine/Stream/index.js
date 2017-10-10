import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {
  like as likePostStoryline,
  viewMoreComments as viewMoreCommentsStoryline,
  createComment as createCommentStoryline,
} from '../../../redux/modules/story';
import Sbox from './Sbox';
import Post from '../Post/index';
import Loader from '../../Common/Loader';
import './index.scss';

@connect((state) => ({
  over: state.story.over,
  slug: state.user.requestedUser.slug,
  isAuthenticated: state.user.isAuthenticated,
  paginationStory: state.story.paginationStory,
  loaded: state.story.loaded,
}), {
  likePostStoryline,
  viewMoreCommentsStoryline,
  createCommentStoryline,
})

class Stream extends Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.like = this.like.bind(this);
    this.showMoreComments = this.showMoreComments.bind(this);
    this.reloadStreamStoryline = this.reloadStreamStoryline.bind(this);
    this.createComment = this.createComment.bind(this);
  }

  load() {
    if (!this.props.over) {
      this.props.loadNextStories(this.props.slug, this.props.paginationStory);
    }
  }

  reloadStreamStoryline() {
    this.props.loadStories(this.props.slug);
  }

  like(id) {
    this.props.likePostStoryline(id);
  }

  createComment(entity_id, content, parent_id, user) {
    this.props.createCommentStoryline(entity_id, content, parent_id, user);
  }

  showMoreComments(id, paginationComment) {
    this.props.viewMoreCommentsStoryline(id, paginationComment);
  }

  render() {
    const {storiesArr, authorizedUser, requestedUser, isAuthenticated, loaded, style} = this.props;
    const loader = <Loader marginTop="52px"/>;

    return (
      <div className="stream" style={style}>
        {isAuthenticated && authorizedUser.id === requestedUser.id &&
        <Sbox
          authorizedUser={this.props.authorizedUser}
          createStory={this.props.createStory}
          reloadStream={this.reloadStreamStoryline}
        />
        }

        {loaded.stories ?
          <InfiniteScroll
            loadMore={this.load}
            hasMore={true}
            threshold={50}
            loader={loader}
          >
            {storiesArr && storiesArr.map((story, index) => (
              <Post
                key={index}
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
                createComment={this.createComment}
              />
            ))}
          </InfiniteScroll>
          :
          <Loader marginTop="52px"/>
        }
      </div>
    );
  }
}

Stream.propTypes = {
  authorizedUser: PropTypes.object,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loaded: PropTypes.object,
  loadStories: PropTypes.func,
  loadNextStories: PropTypes.func,
  over: PropTypes.bool,
  slug: PropTypes.string,
  requestedUser: PropTypes.object,
  likePostStoryline: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  viewMoreCommentsStoryline: PropTypes.func,
};

export default Stream;
