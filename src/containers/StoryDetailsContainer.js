import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { getStory, getStoryId } from '../redux/modules/story';
import Post from '../components/StoryLine/Stream/Post';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(getStory(getStoryId(getState()))));
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  singleStory: state.story.singleStory,
}), {
  getStory,
  getStoryId
})

export default class StoryDetailsContainer extends Component {
  render() {
    const { singleStory } = this.props;
    return (
      <div style={{width: '500px', margin: '0 auto', paddingTop: '20px'}}>
        { singleStory && singleStory.map((story) => (
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
          />
        ))}
      </div>
    );
  }
}

StoryDetailsContainer.propTypes = {
  singleStory: PropTypes.array,
};
