import React, { Component } from 'react';
import { Form, Textarea } from 'formsy-react-components';
import './index.scss';

class Messages extends Component {
  render() {
    return (
        <div className="messages-content">
          <div className="wrapper">
            <div className="additional-title">New Private Messages</div>
            <div>
              <div className="messages-box">
                <div className="time-divider">
                  <span>23 March</span>
                </div>
                <div className="messages-post">
                  <a href="#">
                    <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                    <h5>Name Surname</h5>
                  </a>
                  <span>12:00</span>
                  <p>Message text...</p>
                </div>
                <div className="messages-post">
                  <a href="#">
                    <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                    <h5>Name Surname</h5>
                  </a>
                  <span>12:01</span>
                  <p>Message text...</p>
                </div>

                <div className="time-divider">
                  <span>Today</span>
                </div>
                <div className="messages-post">
                  <a href="#">
                    <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                    <h5>Name Surname</h5>
                  </a>
                  <span>14:00</span>
                  <p>Message text...</p>
                </div>
              </div>

              <div className="messages-send">
                <div className="wrapper">
                  <Form
                    rowClassName = {[{'form-group': false}, {row: false}, 'messages-form']}
                  >
                    <div className="messages-wrap-form">
                      <Textarea
                        rows={5}
                        cols={40}
                        name="message"
                        labelClassName={[{'col-sm-3': false}, 'disabled-label']}
                        className = {['form-control messages-send-field']}
                        elementWrapperClassName = {[{'col-sm-9': false}, 'messages-element-wrapper']}
                        value=""
                        placeholder="Enter your message..."
                      />
                      <button className="messages-btn" type="submit">Send Message</button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>

        </div>

    );
  }
}

export default Messages;
