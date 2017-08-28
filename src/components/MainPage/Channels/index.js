import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import AddChannel from './AddChannel';
import './index.scss';

@connect((state) => ({
  path: state.routing.locationBeforeTransitions.pathname,
}), {})

class Channels extends Component {
  constructor(props) {
    super(props);
    this.showChannelStories = this.showChannelStories.bind(this);
  }

  showChannelStories(slug) {
    this.props.showChannel(slug);
  }

  render() {
    const {channelsArr, path} = this.props;

    return (
      <div className="channels">
        <div className="sidebar ">
          <div style={{display: 'flex'}}>
            <h3 className="title">CHANNELS</h3>
            <AddChannel
              authorizedUser={this.props.authorizedUser}
              createChannel={this.props.createChannel}
              loadChannels={this.props.loadChannels}
            />
          </div>
          <ul>
            {channelsArr && channelsArr.map((channel) => (
              <Link
                key={channel.id}
                to={`/channel/${channel.slug}`}
                onlyActiveOnIndex={true}
                activeClassName="active"
                onClick={() => this.showChannelStories(channel.slug)}
                className={(path === '/' && channel.name === 'Mashup') ? 'active' : null}
              >
                <li>{channel.name}</li>
              </Link>
            ))}
          </ul>
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
  path: PropTypes.string,
};

export default Channels;
