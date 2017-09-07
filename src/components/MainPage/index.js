import React, { Component, PropTypes } from 'react';
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
            <Channels
              authorizedUser={this.props.authorizedUser}
              channelsArr={this.props.channelsArr}
              loadChannels={this.props.loadChannels}
              createChannel={this.props.createChannel}
              showChannel={this.props.showChannel}
            />
          </div>

          <div className="mid-column">
            <ChannelStream
              authorizedUser={this.props.authorizedUser}
              requestedUser={this.props.requestedUser}
              createStory={this.props.createStory}
              channelStories={this.props.channelStories}
              showChannel={this.props.showChannel}
              loadNextChannelStories={this.props.loadNextChannelStories}
            />
            <div>
              <LeftMenu
                authorizedUser={this.props.authorizedUser}
                bookTreeArr={this.props.bookTreeArr}
              />
              <FollowBlock
                whoToFollowList={this.props.whoToFollowList}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  authorizedUser: PropTypes.object,
  requestedUser: PropTypes.object,
  createStory: PropTypes.func,                //story
  createChannel: PropTypes.func,              //channel
  loadChannels: PropTypes.func,
  showChannel: PropTypes.func,
  loadNextChannelStories: PropTypes.func,
  channelsArr: PropTypes.array,
  channelStories: PropTypes.array,
  whoToFollowList: PropTypes.array,           //follow
  bookTreeArr: PropTypes.array,
};

export default MainPage;
