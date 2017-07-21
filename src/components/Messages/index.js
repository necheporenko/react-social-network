import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Textarea from 'react-textarea-autosize';
import { Form } from 'formsy-react-components';
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
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.messageBlock.scrollTop = this.messageBlock.scrollHeight;
  }

  componentDidUpdate() {
    this.messageBlock.scrollTop = this.messageBlock.scrollHeight;
  }

  handleKeyPress(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();

      this.props.createMessage(
        event.target.value,
        this.props.conversation.conversation_id,
        this.props.conversation.receiversID
      )
        .then(event.target.value = '');
    }
  }

  render() {
    const { conversation } = this.props;
    return (
      <div className="messages-content">
        <div className="wrapper">
          <div className="additional-title">New Private Messages</div>
          <div className="messages-box" ref={(el) => this.messageBlock = el} >

            { conversation.messages && conversation.messages.map(message => (
              <div key={message.id}>
                <div className="time-divider">
                  <span>{message.date.substring(0, 11)}</span>
                </div>
                <div className="messages-post">
                  <div>
                    <Link to={`/${message.user.slug}`}>
                      <img src={message.user.avatar32} alt=""/>
                    </Link>
                    <Link to={`/${message.user.slug}`}>
                      <h5>{`${message.user.first_name} ${message.user.last_name}`}</h5>
                    </Link>
                  </div>
                  <span>{message.date.substring(11, 17)}</span>
                  <p>{message.text}</p>
                </div>
              </div>
              ))}

            {/*<div className="time-divider">*/}
            {/*<span>23 March</span>*/}
            {/*</div>*/}
            {/*<div className="messages-post">*/}
            {/*<a href="#">*/}
            {/*<img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>*/}
            {/*<h5>Name Surname</h5>*/}
            {/*</a>*/}
            {/*<span>12:00</span>*/}
            {/*<p>Message text...</p>*/}
            {/*</div>*/}
            {/*<div className="messages-post">*/}
            {/*<a href="#">*/}
            {/*<img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>*/}
            {/*<h5>Name Surname</h5>*/}
            {/*</a>*/}
            {/*<span>12:01</span>*/}
            {/*<p>Message text...</p>*/}
            {/*</div>*/}

            {/*<div className="time-divider">*/}
            {/*<span>Today</span>*/}
            {/*</div>*/}
            {/*<div className="messages-post">*/}
            {/*<a href="#">*/}
            {/*<img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>*/}
            {/*<h5>Name Surname</h5>*/}
            {/*</a>*/}
            {/*<span>14:00</span>*/}
            {/*<p>Message text...</p>*/}
            {/*</div>*/}
          </div>

          <div className="messages-send">
            <div className="wrapper">
              <Textarea
                placeholder="Enter your message..."
                onKeyDown={this.handleKeyPress}
              />
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
