import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { like as likePostStoryline } from '../../../redux/modules/story';
import Sbox from './Sbox';
import Post from './Post';
import './index.scss';

let page;

@connect((state) => ({
  over: state.story.over,
  slug: state.user.requestedUser.slug,
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

  componentDidMount() {
    page = 1;
  }

  load() {
    page++;
    if (!this.props.over) {
      console.log(this.props.slug);
      this.props.loadNextStories(this.props.slug, page);
    }
  }

  reloadStreamStoryline() {
    this.props.loadStories();
  }

  like(id) {
    this.props.likePostStoryline(id);
  }

  render() {
    const { storiesArr, authorizedUser, requestedUser } = this.props;
    // const loader = <div className="loader">Loading ...</div>;

    return (
      <div className="stream">
        {authorizedUser.id === requestedUser.id &&
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
          // loader={loader}
        >
          {storiesArr && storiesArr.map((story) => (
            <Post
              key={story.id}
              id={story.id}
              post={story.text}
              user={story.user}
              created={story.created}
              images={story.images}
              likes={story.likes}
              likeFunc={this.like}
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
  requestedUser: PropTypes.object,
  likePostStoryline: PropTypes.func,
};

export default Stream;
