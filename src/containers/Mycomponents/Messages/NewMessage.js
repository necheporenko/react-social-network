import React, { Component } from 'react';
import { Form, Input, Textarea } from 'formsy-react-components';
import './index.scss';

class NewMessage extends Component {
  render() {
    return (
        <div className="messages-content">
          <div className="wrapper">
            <div className="additional-title">
              <Form
                rowClassName = {[{'form-group': false}, {row: false}, 'row-new-message']}
                className = {['new-messages-form']}
              >
                <span>To:</span>
                <Input
                  name="to"
                  value=""
                  label="To:"
                  labelClassName={[{'col-sm-3': false}, 'disabled-label']}
                  elementWrapperClassName = {[{'col-sm-9': false}, 'new-messages']}
                  type="text"
                  placeholder="Type the name of person"
                />
              </Form>
            </div>
            <div>


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

export default NewMessage;
