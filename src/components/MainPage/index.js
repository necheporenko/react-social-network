import React, { Component, PropTypes } from 'react';
import Stream from '../StoryLine/Stream';
import LeftMenu from './LeftMenu';
import Channels from './Channels';
import FollowBlock from './FollowBlock';
import './index.scss';

class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <div className="wrapper">
          <div className="left-column">
            <LeftMenu
              user={this.props.user}
            />
            <Channels
              channelsArr={this.props.channelsArr}
              createChannelRequest={this.props.createChannelRequest}
            />
          </div>

          <div className="mid-column">
            <Stream
              user={this.props.user}
              storiesArr={this.props.storiesArr}
              createStory={this.props.createStory}
              loadStories={this.props.loadStories}
            />
            <FollowBlock />
          </div>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  user: PropTypes.object,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
  createChannelRequest: PropTypes.func,
  channelsArr: PropTypes.array,
};

export default MainPage;
