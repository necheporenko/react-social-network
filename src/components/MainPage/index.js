import React, { Component, PropTypes } from 'react';
import Stream from '../StoryLine/Stream';
import ChannelStream from '../StoryLine/Stream/ChannelStream';
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
              loadChannels={this.props.loadChannels}
              createChannel={this.props.createChannel}
              showChannel={this.props.showChannel}
            />
          </div>

          <div className="mid-column">
            <ChannelStream
              user={this.props.user}
              createStory={this.props.createStory}
              channelStories={this.props.channelStories}
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
  createChannel: PropTypes.func,              //channel
  loadChannels: PropTypes.func,
  showChannel: PropTypes.func,
  channelsArr: PropTypes.array,
  channelStories: PropTypes.array,
};

export default MainPage;
