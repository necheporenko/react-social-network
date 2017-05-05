import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { createStoryRequest, showUserStoriesRequest,
  isLoaded as isStoriesLoaded, load as loadStories } from '../redux/modules/story';
import SubHeader from '../components/StoryLine/SubHeader';
import Navigation from '../components/Navigation';
import StoryLine from '../components/StoryLine';

@asyncConnect([{
  promise: ({store: { dispatch, getState }}) => {
    // console.log('before if');
    // if (!isStoriesLoaded(getState())) {
    //   console.log('if:', getState().userInfo.id);
      // return dispatch(loadStories(getState().userInfo.id));
      //   return dispatch(loadStories(2));
    // }

    // const promises = []
    // const getCurrentUser = !isAuthLoaded(getState())
    //   ? dispatch(loadAuth()).then(() => getState().auth.user).catch(() => null)
    //   : Promise.resolve(getState().auth.user)
    //
    // promises.push(getCurrentUser.then((currentUser) => {
    // const listsPromises = []
    //
    // if (currentUser && !isAppsLoaded(getState())) {
    //   listsPromises.push(dispatch(loadApps(currentUser)))
    // }
    //
    // return Promise.all(listsPromises)
  }
}])

@connect((state) => ({
  stories: state.story.storiesArr
}), {loadStories})

class UserContainer extends Component {
  render() {
    return (
      <div>
        <SubHeader
          user={this.props.userInfo}
        />
        <Navigation />
        {/*{this.props.isAuthenticated && }*/}
        <StoryLine
          storiesArr={this.props.storiesArr}
          createStoryRequest={this.props.createStoryRequest}
          showUserStoriesRequest={this.props.showUserStoriesRequest}
          userInfo={this.props.userInfo}
        />
        <div>
          asdd
          <button onClick={() => this.props.loadStories(this.props.userInfo.id)}>load</button>
        </div>
      </div>
    );
  }
}

UserContainer.propTypes = {
  // isAuthenticated: PropTypes.bool,
  userInfo: PropTypes.object,

  createStoryRequest: PropTypes.func,
  storiesArr: PropTypes.array,
  showUserStoriesRequest: PropTypes.func
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.users.isAuthenticated,
    userInfo: state.users.userInfo,

    storiesArr: state.story.storiesArr
  };
}

export default connect(mapStateToProps, {
  createStoryRequest,
  showUserStoriesRequest
})(UserContainer);
