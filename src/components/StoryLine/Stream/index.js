import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { like as likePostStoryline } from '../../../redux/modules/story';
import Sbox from './Sbox';
import Post from './Post';
import './index.scss';

@connect((state) => ({
  over: state.story.over,
  slug: state.user.requestedUser.slug,
  isAuthenticated: state.user.isAuthenticated,
  paginationStory: state.story.paginationStory
}), {
  likePostStoryline
})

class Stream extends Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.like = this.like.bind(this);
    this.reloadStreamStoryline = this.reloadStreamStoryline.bind(this);
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

  render() {
    const { storiesArr, authorizedUser, requestedUser, isAuthenticated } = this.props;
    const loader = (
      <div className="wrapper-loader">
        <div className="loader"z>
          <svg className="circular" viewBox="25 25 50 50">
            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        </div>
      </div>
    );

    return (
      <div className="stream">
        { isAuthenticated && authorizedUser.id === requestedUser.id &&
          <Sbox
            authorizedUser={this.props.authorizedUser}
            createStory={this.props.createStory}
            reloadStream={this.reloadStreamStoryline}
          />
        }

        <InfiniteScroll
          loadMore={this.load}
          hasMore={true}
          threshold={50}
          loader={loader}
        >
          { storiesArr && storiesArr.map((story) => (
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
              likeFunc={this.like}
              authorizedUser={this.props.authorizedUser}
              requestedUser={this.props.requestedUser}
            />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

Stream.propTypes = {
  authorizedUser: PropTypes.object,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
  loadNextStories: PropTypes.func,
  over: PropTypes.bool,
  slug: PropTypes.string,
  requestedUser: PropTypes.object,
  likePostStoryline: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  paginationStory: PropTypes.number,
};

export default Stream;
