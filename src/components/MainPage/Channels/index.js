import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AddChannel from './AddChannel';
import './index.scss';

class Channels extends Component {
  constructor(props) {
    super(props);
    this.showChannelStories = this.showChannelStories.bind(this);
  }

  showChannelStories(slug) {
    this.props.showChannel(slug);
  }

  render() {
    const { channelsArr } = this.props;
    return (
      <div className="channels">
        <div className="sidebar ">
          <h3 className="title">CHANNELS</h3>
          <ul>
            {channelsArr && channelsArr.map((channel) => (
              <Link
                key={channel.id}
                to={`/channel/${channel.slug}`}
                onlyActiveOnIndex={true}
                activeClassName="active"
                onClick={() => this.showChannelStories(channel.slug)}
              >
                <li>{channel.name}</li>
              </Link>
            ))}
          </ul>
          <AddChannel
            authorizedUser={this.props.authorizedUser}
            createChannel={this.props.createChannel}
            loadChannels={this.props.loadChannels}
          />
        </div>
      </div>
    );
  }
}


Channels.propTypes = {
  createChannel: PropTypes.func,
  loadChannels: PropTypes.func,
  showChannel: PropTypes.func,
  channelsArr: PropTypes.array,
  authorizedUser: PropTypes.object,
};

export default Channels;
