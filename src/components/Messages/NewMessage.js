import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Textarea } from 'formsy-react-components';
import { getConversationByUser, createMessage } from '../../redux/modules/profile';
import { newSearchUser } from '../../redux/modules/search';
import './index.scss';

@connect((state) => ({
  foundUsers: state.search.foundUsers
}), {
  getConversation: getConversationByUser,
  newSearchUser,
  createMessage,
})

class NewMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedUsersID: [],
    };
    this.handleSearchUser = this.handleSearchUser.bind(this);
    this.addCheckedUser = this.addCheckedUser.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleSearchUser(event) {
    console.log('str', event.target.value);
    this.props.newSearchUser(event.target.value);
  }

  addCheckedUser(user) {
    const currentCheckedUsersID = this.state.checkedUsersID;
    currentCheckedUsersID.push(user.id);

    this.setState({ checkedUsersID: currentCheckedUsersID });
    this.props.getConversation(this.state.checkedUsersID.toString());
  }

  sendMessage(data) {
    console.log('data', data.message);

    this.props.createMessage(
      data.message,
      null,
      Array.from(this.state.checkedUsersID, item => parseInt(item, 10))  // str -> number
    );
  }

  render() {
    const { foundUsers } = this.props;
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
            />
            { foundUsers.length > 0 &&
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

NewMessage.propTypes = {
  foundUsers: PropTypes.array,
  newSearchUser: PropTypes.func,
  getConversation: PropTypes.func,
  createMessage: PropTypes.func,
};

export default NewMessage;
