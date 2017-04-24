import React, { Component } from 'react';
import './index.scss';

class Notification extends Component {
  render() {
    return (
      <div className="notification">
        <div className="notificationBox">
          <div className="additionalTitle">Notifications</div>
          <hr/>
          <ul>
            <li>
              <a href="#">
                <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                <h6><a href=""><b>Name Surname</b></a>commented on your story</h6>
              </a>
              <p>21 Mar 2017</p>
            </li>
            <li>
              <a href="#">
                <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                <h6><a href=""><b>Name Surname</b></a> liked your <a href=""> story</a></h6>
              </a>
              <p>21 Mar 2017</p>
            </li>
            <li>
              <a href="#">
                <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                <h6><a href=""><b>Name Surname</b></a>commented on your story</h6>
              </a>
              <p>21 Mar 2017</p>
            </li>
          </ul>

        </div>
      </div>
    );
  }
}

export default Notification;
