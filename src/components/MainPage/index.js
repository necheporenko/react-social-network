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
              userInfo={this.props.userInfo}
            />
            <Channels
              channelsArr={this.props.channelsArr}
              createChannelRequest={this.props.createChannelRequest}
            />
          </div>

          <div className="mid-column">
            <Stream
              storiesArr={this.props.storiesArr}
              createStoryRequest={this.props.createStoryRequest}
            />
            <FollowBlock />
          </div>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  userInfo: PropTypes.object,
  createChannelRequest: PropTypes.func,
  channelsArr: PropTypes.array,
  createStoryRequest: PropTypes.func,
  storiesArr: PropTypes.array
};

export default MainPage;
