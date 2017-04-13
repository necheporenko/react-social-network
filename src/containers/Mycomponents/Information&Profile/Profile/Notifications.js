import React from 'react';
import { Form, Checkbox } from 'formsy-react-components';
import {NOTIFICATION, NOTIFICATION_UPDATES} from '../../../constants/notification';
import './index.scss';


class Notifications extends React.Component {
  render() {

    return (
      <div className="additional-content">
        <div className="additional-title">Notification Settings</div>

          <div className="notification-head">
            <span className="notification-head-email">Email</span>
            <span className="notification-head-web">Web</span>
          </div>

          <div className="notification-wrap">

            {NOTIFICATION.map((notice, index) => (
                <div key={index} className="notification-line">
                  <span>{notice.content}</span>
                  <div className="notification-checkbox">
                    <Form
                      layout="notification"
                      rowClassName={[{'form-group': false}, {row: false}]}
                    >
                      {notice.checkbox.map((checkbox, index) => (
                        <Checkbox
                          key={index}
                          name={checkbox.name}
                          value={checkbox.value}
                          className={`notification-checkbox-${checkbox.name}`}
                          labelClassName={[{'col-sm-3': false}, 'disabled-label']}
                          />
                        )
                      )}
                    </Form>
                  </div>
                </div>
              ))}

              <div className="notifications-updates">Updates from Validbook</div>

              {NOTIFICATION_UPDATES.map((notice, index) => (
                <div key={index} className="notifications-update-line">
                  <Form
                    layout="notification"
                    rowClassName={[{'form-group': false}, {row: false}]}
                  >
                    <Checkbox
                      name={notice.name}
                      value={notice.value}
                      labelClassName={[{'col-sm-3': false}, 'disabled-label']}
                    />
                  </Form>
                  <span>{notice.content}</span>
                </div>
              ))}

          </div>

        {/* {this.props.children} */}
      </div>

    );
  }
}

export default Notifications;
