import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Form, Checkbox } from 'formsy-react-components';
import {NOTIFICATION, NOTIFICATION_UPDATES} from '../../../constants/notification';
import { getNotificationSettings, setNotificationSettings } from '../../../redux/modules/profile';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(getNotificationSettings()));
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  notificationSettings: state.profile.notificationSettings,
}), {
  getNotificationSettings,
  setNotificationSettings
})

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNotificationSettings: this.props.notificationSettings.settings,
      currentNotificationUpdates: this.props.notificationSettings.updates,
    };
    this.handleCheckSettings = this.handleCheckSettings.bind(this);
  }

  handleCheckSettings(index, place) {
    const newSettings = this.state.currentNotificationSettings;
    const newUpdates = this.state.currentNotificationUpdates;
    // console.log(newSettings, newUpdates);

    switch (place) {
      case 'email':
        newSettings[index].email = !newSettings[index].email;
        this.props.setNotificationSettings(newSettings, 'settings');
        this.setState({
          currentNotificationSettings: newSettings,
        });
        break;
      case 'web':
        newSettings[index].web = !newSettings[index].web;
        this.props.setNotificationSettings(newSettings, 'settings');
        this.setState({
          currentNotificationSettings: newSettings,
        });
        break;
      case 'update':
        newUpdates[index].value = !newUpdates[index].value;
        this.props.setNotificationSettings(newUpdates, 'updates');
        this.setState({
          currentNotificationUpdates: newUpdates,
        });
        break;

      default:
        console.log('error');
    }
    // console.log('test', this.state.currentNotificationSettings);
  }

  render() {
    const { settings, updated } = this.props.notificationSettings;
    return (
      <div className="additional-content">
        <div className="additional-title">Notification Settings</div>

        <div className="notification-head">
          <span className="notification-head-email">Email</span>
          <span className="notification-head-web">Web</span>
        </div>

        <div className="notification-wrap">

          { this.state.currentNotificationSettings.map((element, index) => (
            <div className="notification-line" key={index}>
              <span>{element.label}</span>
              <div className="notification-checkbox checkboxStyles">

                <div className="notification-checkbox-email">
                  <input
                    type="checkbox" name={`email${index}`} id={`email${index}`}
                    checked={element.email}
                    onChange={() => this.handleCheckSettings(index, 'email')}
                  />
                  <label htmlFor={`email${index}`}><span/></label>
                </div>
                <div className="notification-checkbox-web">
                  <input
                    type="checkbox" name={`web${index}`} id={`web${index}`}
                    checked={element.web}
                    onChange={() => this.handleCheckSettings(index, 'web')}
                  />
                  <label htmlFor={`web${index}`}><span/></label>
                </div>

              </div>
            </div>
          ))}


          {/*{NOTIFICATION.map((notice, index) => (*/}
            {/*<div key={index} className="notification-line">*/}
              {/*<span>{notice.content}</span>*/}
              {/*<div className="notification-checkbox">*/}
                {/*<Form*/}
                  {/*layout="notification"*/}
                  {/*rowClassName={[{'form-group': false}, {row: false}]}*/}
                {/*>*/}
                  {/*{notice.checkbox.map((checkbox, index) => (*/}
                    {/*<Checkbox*/}
                      {/*key={index}*/}
                      {/*name={checkbox.name}*/}
                      {/*value={checkbox.value}*/}
                      {/*className={`notification-checkbox-${checkbox.name}`}*/}
                      {/*labelClassName={[{'col-sm-3': false}, 'disabled-label']}*/}
                      {/*/>*/}
                    {/*)*/}
                  {/*)}*/}
                {/*</Form>*/}
              {/*</div>*/}
            {/*</div>*/}
            {/*))}*/}

          <div className="notifications-updates">Updates from Validbook</div>

          { this.state.currentNotificationUpdates.map((element, index) => (
            <div className="notifications-update-line checkboxStyles" key={index}>
              <input
                type="checkbox" name={`update${index}`} id={`update${index}`}
                checked={element.value}
                onChange={() => this.handleCheckSettings(index, 'update')}
              />
              <label htmlFor={`update${index}`}><span/></label>
              <span>{element.label}</span>
            </div>
          ))}

          {/*{NOTIFICATION_UPDATES.map((notice, index) => (*/}
            {/*<div key={index} className="notifications-update-line">*/}
              {/*<Form*/}
                {/*layout="notification"*/}
                {/*rowClassName={[{'form-group': false}, {row: false}]}*/}
              {/*>*/}
                {/*<Checkbox*/}
                  {/*name={notice.name}*/}
                  {/*value={notice.value}*/}
                  {/*labelClassName={[{'col-sm-3': false}, 'disabled-label']}*/}
                {/*/>*/}
              {/*</Form>*/}
              {/*<span>{notice.content}</span>*/}
            {/*</div>*/}
          {/*))}*/}

        </div>

        {/* {this.props.children} */}
      </div>

    );
  }
}

Notifications.propTypes = {
  notificationSettings: PropTypes.array,
};

export default Notifications;
