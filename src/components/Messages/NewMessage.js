import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import { getConversationByUser, createMessage } from '../../redux/modules/profile';
import { newSearchUser } from '../../redux/modules/search';
import './index.scss';

@connect((state) => ({
  foundUsers: state.search.foundUsers,
  conversation: state.profile.conversation,
  authorizedUser: state.user.authorizedUser,
}), {
  getConversationByUser,
  newSearchUser,
  createMessage,
})

class NewMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedUsersID: {
        fullName: [],
        id: []
      },
      hideTypeahead: false,
    };
    this.handleSearchUser = this.handleSearchUser.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.addCheckedUser = this.addCheckedUser.bind(this);
  }

  handleSearchUser(event) {
    // console.log('this.state.hideTypeahead', this.state.hideTypeahead);
    if (this.state.hideTypeahead) {
      this.setState({ hideTypeahead: false });
    }
    this.props.newSearchUser(event.target.value);
  }

  addCheckedUser(user) {
    const currentCheckedUsersID = this.state.checkedUsersID;
    currentCheckedUsersID.fullName.push(` ${user.first_name} ${user.last_name}`);
    currentCheckedUsersID.id.push(user.id);

    this.setState({ checkedUsersID: currentCheckedUsersID, hideTypeahead: true });
    this.props.getConversationByUser(this.state.checkedUsersID.id.toString(), currentCheckedUsersID.fullName.toString());
    this.inputMessage.value = '';
  }

  handleKeyPress(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();

      this.props.createMessage(
        event.target.value,
        null,
        Array.from(this.state.checkedUsersID.id, item => parseInt(item, 10))  // str -> number
      )
        .then(event.target.value = '');
    }
  }

  render() {
    const { foundUsers, conversation, authorizedUser } = this.props;
    return (
      <div className="messages-content">
        <div className="wrapper">
          <div className="additional-title">

            <div style={{display: this.state.checkedUsersID.fullName.length > 0 ? 'flex' : 'inline-flex'}}>
              <span>To:</span>
              <div className="list-of-found-users">
                { this.state.checkedUsersID && this.state.checkedUsersID.fullName.map((user, index) => (
                  <span key={index}>{user}</span>
               ))}
              </div>
            </div>

            <input
              type="text"
              className="messages-input"
              placeholder="Type the name of person"
              onChange={this.handleSearchUser}
              ref={el => this.inputMessage = el}
              style={{position: this.state.checkedUsersID.fullName.length > 0 ? 'relative' : 'static'}}
            />
            { !this.state.hideTypeahead && foundUsers.length > 0 &&
              <div className="wrapper-find-users">
                { foundUsers && foundUsers.map(user => (
                  <div key={user.id} className="found-user" onClick={() => this.addCheckedUser(user)}>
                    <img src={user.avatar}/>
                    <p>{user.first_name} {user.last_name}</p>
                  </div>
              ))}
              </div>
            }
          </div>

          <div className="messages-box">
            { conversation.messages && conversation.messages.map((message, i, arr) => (
              <div key={message.id}>
                {/*message.date.substring(0, 2) ===  it's a day*/}
                { (i === 0 || (i > 0 && message.date.substring(0, 2) !== arr[i - 1].date.substring(0, 2))) &&
                  <div className="time-divider">
                    <span>{message.date.substring(0, 11)}</span>
                  </div>
                  }

                <div className={message.user.id === authorizedUser.id ? 'messages-post messages-post-reverse' : 'messages-post'}>
                  <div>
                    <Link to={`/${message.user.slug}`}>
                      <img src={message.user.avatar} alt=""/>
                    </Link>
                    <Link to={`/${message.user.slug}`}>
                      <h5>{`${message.user.first_name} ${message.user.last_name}`}</h5>
                    </Link>
                    <div className="wrapper-time-settings">
                      <span>{message.date.substring(11, 17)}</span>
                      <div
                        className="message-settings"
                        onClick={this.openMessageSettings}
                        >
                        <i>...</i>
                        <div style={{ display: this.state.messageSetting ? 'block' : 'none'}}>
                          <ul>
                            <li onClick={() => this.props.deleteMessage(message.id)}>Delete</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p>{message.text}</p>
                </div>
              </div>
              ))}
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

NewMessage.propTypes = {
  foundUsers: PropTypes.array,
  newSearchUser: PropTypes.func,
  getConversationByUser: PropTypes.func,
  createMessage: PropTypes.func,
  deleteMessage: PropTypes.func,
  conversation: PropTypes.object,
  authorizedUser: PropTypes.object,
};

export default NewMessage;
