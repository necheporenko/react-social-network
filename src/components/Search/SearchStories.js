import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { searchStory } from '../../redux/modules/search';
import Post from '../StoryLine/Stream/Post';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(searchStory(getState())));
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  query: state.search.query,
  foundStories: state.search.foundStories,
}), {
  searchStory
})

class SearchStories extends Component {
  render() {
    const { foundStories } = this.props;
    return (
      <div className="search-story page-bg">
        <div className="stream">
          {/*<Post />*/}
          {foundStories && foundStories.map((story) => (
            <Post
              key={story.id}
              post={story.text}
              user={story.user}
              created={story.created}
              images={story.images}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default SearchStories;
