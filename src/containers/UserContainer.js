import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStoryRequest } from '../redux/modules/story';
import SubHeader from '../components/StoryLine/SubHeader';
import Navigation from '../components/Navigation';
import StoryLine from '../components/StoryLine';

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
        />
      </div>
    );
  }
}

UserContainer.propTypes = {
  // isAuthenticated: PropTypes.bool,
  userInfo: PropTypes.object,

  createStoryRequest: PropTypes.func,
  storiesArr: PropTypes.array
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.users.isAuthenticated,
    userInfo: state.users.userInfo,

    storiesArr: state.story.storiesArr
  };
}

export default connect(mapStateToProps, {
  createStoryRequest
})(UserContainer);
