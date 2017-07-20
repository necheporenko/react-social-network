import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Form, Textarea } from 'formsy-react-components';
import { getConversationByID, createMessage, getConversationID } from '../../redux/modules/profile';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(getConversationByID(getConversationID(getState()))));
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  conversation: state.profile.conversation
}), {
  getConversationByID,
  createMessage
})

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedUsersID: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(data) {
    console.log('datass', data.message, this.props.conversation.receiversID);

    this.props.createMessage(
      data.message,
      this.props.conversation.conversation_id,
      this.props.conversation.receiversID
    );
  }

  render() {
    const { conversation } = this.props;
    return (
      <div className="messages-content">
        <div className="wrapper">
          <div className="additional-title">New Private Messages</div>
          <div>
            <div className="messages-box">

              { conversation.messages && conversation.messages.map(message => (
                <div key={message.id}>
                  <div className="time-divider">
                    <span>{message.date}</span>
                  </div>
                  <div className="messages-post">
                    <Link to={`/${message.user.slug}`}>
                      <img src={message.user.avatar32} alt=""/>
                      <h5>{`${message.user.first_name} ${message.user.last_name}`}</h5>
                    </Link>
                    <span>12:00</span>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}

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
                  rowClassName={[{'form-group': false}, {row: false}, 'messages-form']}
                  onSubmit={this.sendMessage}
                >
                  <div className="messages-wrap-form">
                    <Textarea
                      rows={5}
                      cols={40}
                      name="message"
                      labelClassName={[{'col-sm-3': false}, 'disabled-label']}
                      className={['form-control messages-send-field']}
                      elementWrapperClassName={[{'col-sm-9': false}, 'messages-element-wrapper']}
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

Messages.propTypes = {
  conversation: PropTypes.object,
  createMessage: PropTypes.func,
};

export default Messages;
