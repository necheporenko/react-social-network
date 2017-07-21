import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Form, Input, } from 'formsy-react-components';
import Textarea from 'react-textarea-autosize';
import { getConversationByUser, createMessage } from '../../redux/modules/profile';
import { newSearchUser } from '../../redux/modules/search';
import './index.scss';

@connect((state) => ({
  foundUsers: state.search.foundUsers,
  conversation: state.profile.conversation,
}), {
  getConversationByUser,
  newSearchUser,
  createMessage,
})

class NewMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedUsersID: [],
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
    currentCheckedUsersID.push(user.id);

    this.setState({ checkedUsersID: currentCheckedUsersID, hideTypeahead: true });
    this.props.getConversationByUser(this.state.checkedUsersID.toString());
    this.inputMessage.value = '';
  }

  handleKeyPress(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();

      this.props.createMessage(
        event.target.value,
        null,
        Array.from(this.state.checkedUsersID, item => parseInt(item, 10))  // str -> number
      )
        .then(event.target.value = '');
    }
  }

  render() {
    const { foundUsers, conversation } = this.props;
    return (
      <div className="messages-content">
        <div className="wrapper">
          <div className="additional-title">
            {/*<Form*/}
            {/*rowClassName={[{'form-group': false}, {row: false}, 'row-new-message']}*/}
            {/*className={['new-messages-form']}*/}
            {/*>*/}
            {/**/}
            {/*<Input*/}
            {/*name="to"*/}
            {/*value=""*/}
            {/*// label="To:"*/}
            {/*labelClassName={[{'col-sm-3': false}, 'disabled-label']}*/}
            {/*elementWrapperClassName={[{'col-sm-9': false}, 'new-messages']}*/}
            {/*type="text"*/}
            {/*onChange={() => this.searchUser(value)}*/}
            {/*placeholder="Type the name of person"*/}
            {/*/>*/}
            {/*</Form>*/}
            <span>To:</span>
            <input
              type="text"
              className="messages-input"
              placeholder="Type the name of person"
              onChange={this.handleSearchUser}
              ref={el => this.inputMessage = el}
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
      </div>
    );
  }
}

NewMessage.propTypes = {
  foundUsers: PropTypes.array,
  newSearchUser: PropTypes.func,
  getConversationByUser: PropTypes.func,
  createMessage: PropTypes.func,
  conversation: PropTypes.object,
};

export default NewMessage;
