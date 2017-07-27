import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { getUserNotifications } from '../../../redux/modules/profile';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState }}) => {
    const promises = [];
    promises.push(dispatch(getUserNotifications()));
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  notifications: state.profile.notifications,
}), {})

class NotificationList extends Component {
  render() {
    const { notifications } = this.props;

    return (
      <div className="notification">

        <div className="notification-box notification-box-list">
          <div className="additional-title">Notifications</div>
          <hr/>
          <ul>
            { notifications && notifications.map((notification) => (
              <li key={notification.id}>
                <div>
                  <img src={notification.user.avatar} alt=""/>
                  <h6 dangerouslySetInnerHTML={{__html: notification.text}}/>
                </div>
                <p>{notification.created}</p>
              </li>
            ))}
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
                <h6><a href="#">Name Surname</a><span>commented on your</span><a href="#">story</a>.</h6>
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
  notifications: PropTypes.array,
};

export default NotificationList;
