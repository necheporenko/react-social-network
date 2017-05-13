import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { create as createStory, isLoaded as isStoriesLoaded, load as loadStories } from '../redux/modules/story';
import SubHeader from '../components/StoryLine/SubHeader';
import Navigation from '../components/Navigation';
import StoryLine from '../components/StoryLine';


@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (!isStoriesLoaded(getState())) {
      promises.push(dispatch(loadStories()));
    }
    return Promise.all(promises);
  }
}])


@connect((state) => ({
  user: state.sign.user,
  isAuthenticated: state.sign.isAuthenticated,
  storiesArr: state.story.storiesArr
}), {
  loadStories,
  createStory
})

export default class UserContainer extends Component {
  render() {
    return (
      <div>
        <SubHeader
          user={this.props.user}
        />
        <Navigation
          user={this.props.user}
        />
        {/*{this.props.isAuthenticated && }*/}
        <StoryLine
          user={this.props.user}
          storiesArr={this.props.storiesArr}
          createStory={this.props.createStory}
          loadStories={this.props.loadStories}
        />
      </div>
    );
  }
}

UserContainer.propTypes = {
  user: PropTypes.object,                     //sign
  // isAuthenticated: PropTypes.bool,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
};
