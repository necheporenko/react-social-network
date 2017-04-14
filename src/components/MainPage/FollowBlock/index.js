import React, { Component } from 'react';
import './index.scss';

class FollowBlock extends Component {
  render() {
    return (
      <div className="follow-block">
        <div className="wrapper">
          <h3 className="title">Who to follow</h3>

          <div className="follow-people">
            <a href="#" className="follow-people-link-img">
              <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1478596764" />
            </a>
            <div className="follow-people-text">
              <div className="follow-people-text-user">
                <a href="#">Name Surname</a>
              </div>
              <div className="follow-people-text-btn">
                <a href="#">Follow</a>
              </div>
            </div>
          </div>
          <div className="follow-people">
            <a href="#" className="follow-people-link-img">
              <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1478596764"/>
            </a>
            <div className="follow-people-text">
              <div className="follow-people-text-user">
                <a href="#">Name Surname</a>
              </div>
              <div className="follow-people-text-btn">
                <a href="#">Follow</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FollowBlock;
