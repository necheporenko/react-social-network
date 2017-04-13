import React, { Component } from 'react';
// import './index.scss';   //  T_T

class Notification extends Component {
  render() {
    const styles = require('./index.scss');
    return (
      <div className={styles.notification}>
        <div className={styles.notificationBox}>
          <div className={styles.additionalTitle}>Notifications</div>
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
