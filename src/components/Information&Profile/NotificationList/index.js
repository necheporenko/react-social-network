import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroller';
import { getUserNotifications, loadNextNotifications } from '../../../redux/modules/profile';
import Loader from '../../Common/Loader';
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
  pagination: state.profile.paginationNotifications,
  hasMoreNotifications: state.profile.hasMoreNotifications
}), {
  loadNextNotifications
})

class NotificationList extends Component {
  constructor() {
    super();
    this.load = this.load.bind(this);
  }

  load() {
    const {hasMoreNotifications, loadNextNotifications, pagination} = this.props;

    if (hasMoreNotifications) {
      loadNextNotifications(pagination);
    }
  }

  render() {
    const { notifications, loaded, hasMoreNotifications } = this.props;
    const loader = <Loader marginTop="10px"/>;
    console.log(notifications);

    return (
      <div className="notification">
        <Helmet title="Notifications"/>

        <div className="notification-box notification-box-list">
          <div className="additional-title">Notifications</div>
          <hr/>
          <InfiniteScroll
            element={'ul'}
            loadMore={this.load}
            hasMore={true}
            threshold={50}
            loader={hasMoreNotifications ? loader : null}
          >
            {notifications && notifications.map((notification) => (
              <li key={notification.id}>
                <div>
                  <img src={notification.user.avatar} alt=""/>
                  <h6 dangerouslySetInnerHTML={{__html: notification.text}}/>
                </div>
                <p>{notification.created}</p>
              </li>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

NotificationList.propTypes = {
  notifications: PropTypes.array,
};

export default NotificationList;
