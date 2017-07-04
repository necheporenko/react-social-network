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
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
}), {
  searchStory
})

class SearchStories extends Component {
  render() {
    const { foundStories, authorizedUser, requestedUser} = this.props;
    return (
      <div className="search-story page-bg">
        <div className="stream">
          {/*<Post />*/}
          {foundStories && foundStories.map((story) => (
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
        </div>
      </div>
    );
  }
}

export default SearchStories;
