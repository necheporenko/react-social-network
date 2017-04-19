import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AddChannel from './AddChannel';
import './index.scss';

class Channels extends Component {
  render() {
    const { channelsArr } = this.props;
    return (
      <div className="channels">
        <div className="sidebar ">
          <h3 className="title">CHANNELS</h3>
          <ul>
            <Link onlyActiveOnIndex={true} activeClassName="active">
              <li>Mashup</li>
            </Link>
            <Link onlyActiveOnIndex={true} activeClassName="active">
              <li>Mashup 2</li>
            </Link>

            {channelsArr.map((channel, index) => (
              <Link key={index} onlyActiveOnIndex={true} activeClassName="active">
                <li>{channel.name}</li>
              </Link>
            ))}
          </ul>
          <AddChannel
            createChannelRequest={this.props.createChannelRequest}
          />
        </div>
      </div>

    );
  }
}


Channels.propTypes = {
  createChannelRequest: PropTypes.func,
  channelsArr: PropTypes.array
};

export default Channels;
