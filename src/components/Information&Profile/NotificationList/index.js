import React, { Component, PropTypes } from 'react';
import './index.scss';

class NotificationList extends Component {
  render() {
    return (
      <div className="notification">

        <div className="notification-box">
          <div className="additional-title">Notifications</div>
          <hr/>
          <ul>
            <li>
              <div>
                <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                <h6><a href="#"><b>Name Surname</b></a>commented on your story</h6>
              </div>
              <p>21 Mar 2017</p>
            </li>
            <li>
              <div>
                <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                <h6><a href="#"><b>Name Surname</b></a>commented on your story</h6>
              </div>
              <p>21 Mar 2017</p>
            </li>
            <li>
              <div>
                <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                <h6><a href="#"><b>Name Surname</b></a>commented on your story</h6>
              </div>
              <p>21 Mar 2017</p>
            </li>
          </ul>

        </div>
      </div>
    );
  }
}

NotificationList.propTypes = {
  children: PropTypes.element
};

export default NotificationList;
