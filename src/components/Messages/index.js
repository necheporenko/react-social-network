import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Textarea from 'react-textarea-autosize';
import { getConversationByID, createMessage, deleteMessage, getConversationID, addMember } from '../../redux/modules/profile';
import { newSearchUser } from '../../redux/modules/search';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (getConversationID(getState())) {
      promises.push(dispatch(getConversationByID(getConversationID(getState()))));
    }
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  foundUsers: state.search.foundUsers,
  conversation: state.profile.conversation,
  authorizedUser: state.user.authorizedUser,
}), {
  getConversationByID,
  createMessage,
  deleteMessage,
  newSearchUser,
  addMember
})

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedUsersID: {
        fullName: [],
        id: []
      },
      messageSetting: false,
      showAddSearch: false,
      hideTypeahead: false,
    };
    this.getReceivers = this.getReceivers.bind(this);
    this.addCheckedUser = this.addCheckedUser.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.confirmMembers = this.confirmMembers.bind(this);
    this.toggleAddSearch = this.toggleAddSearch.bind(this);
    this.handleSearchUser = this.handleSearchUser.bind(this);
    this.openMessageSettings = this.openMessageSettings.bind(this);
  }

  componentDidMount() {
    this.messageBlock.scrollTop = this.messageBlock.scrollHeight;
  }

  componentDidUpdate() {
    this.messageBlock.scrollTop = this.messageBlock.scrollHeight;
  }

  handleSearchUser(event) {
    // console.log('this.state.hideTypeahead', this.state.hideTypeahead);
    if (this.state.hideTypeahead) {
      this.setState({ hideTypeahead: false });
    }
    this.props.newSearchUser(event.target.value);
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

  openMessageSettings() {
    console.log('click2', this.state.messageSetting);
    const currentState = this.state.messageSetting;
    this.setState({messageSetting: !currentState});

    return this.state.messageSetting;
  }

  getReceivers(receivers) {
    let result;
    const receiversArr = [];

    if (receivers.length === 1) {
      result = `${receivers[0].first_name} ${receivers[0].last_name}`;
    } else if (receivers.length > 1) {
      receivers.map(receiver => {
        receiversArr.push(` ${receiver.first_name}`);
      });
      result = receiversArr.toString();
    }

    return result;
  }

  addCheckedUser(user) {
    const currentCheckedUsersID = this.state.checkedUsersID;
    currentCheckedUsersID.fullName.push(` ${user.first_name} ${user.last_name}`);
    currentCheckedUsersID.id.push(user.id);

    this.setState({ checkedUsersID: currentCheckedUsersID, hideTypeahead: true });
    this.inputMessage.value = '';
    this.inputMessage.focus();
  }

  confirmMembers(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      this.props.addMember(this.props.conversation.conversation_id, this.state.checkedUsersID.id);
    }
    if (event.keyCode === 8 && this.state.checkedUsersID.fullName.length > 0 && !event.target.value) {
      const deleteLastCheckedUsersID = this.state.checkedUsersID;
      deleteLastCheckedUsersID.fullName.splice(-1, 1);
      deleteLastCheckedUsersID.id.splice(-1, 1);
      this.setState({ checkedUsersID: deleteLastCheckedUsersID });
    }
  }

  toggleAddSearch() {
    this.setState({
      showAddSearch: !this.state.showAddSearch
    });
  }

  render() {
    const { conversation, authorizedUser, foundUsers } = this.props;
    return (
      <div className="messages-content">
        <div className="wrapper">
          { conversation.receivers &&
            <div className="additional-title" style={{display: 'flex', justifyContent: 'space-between'}}>
              <span style={{display: this.state.showAddSearch ? 'none' : 'block', width: '100%', textAlign: 'center'}}>
                {this.getReceivers(conversation.receivers)}
              </span>
              {conversation.receivers.length !== 1 &&
                <div>
                  <div style={{display: this.state.showAddSearch ? 'block' : 'none'}}>
                    <div style={{display: this.state.checkedUsersID.fullName.length > 0 ? 'flex' : 'inline-flex'}}>
                      <span style={{fontWeight: 400, fontSize: '12px'}}>To:</span>
                      <div className="list-of-found-users">
                        {this.state.checkedUsersID && this.state.checkedUsersID.fullName.map((user, index) => (
                          <span key={index}>{user}</span>
                    ))}
                      </div>
                    </div>

                    <input
                      type="text"
                      className="messages-input"
                      placeholder={this.state.checkedUsersID.fullName.length > 0 ? '' : 'Add more people...'}
                      onChange={this.handleSearchUser}
                      onKeyDown={this.confirmMembers}
                      ref={el => this.inputMessage = el}
                      style={{position: this.state.checkedUsersID.fullName.length > 0 ? 'relative' : 'static'}}
                />
                    {!this.state.hideTypeahead && foundUsers.length > 0 &&
                    <div className="wrapper-find-users">
                      {foundUsers && foundUsers.map(user => (
                        <div key={user.id} className="found-user" onClick={() => this.addCheckedUser(user)}>
                          <img src={user.avatar}/>
                          <p>{user.first_name} {user.last_name}</p>
                        </div>
                  ))}
                    </div>
                }
                  </div>
                  < i
                    className={!this.state.showAddSearch ? 'add-member' : 'add-member add-member-cross'}
                    onClick={this.toggleAddSearch} style={{fontStyle: 'normal'}}
                />
                </div>
              }
            </div>
          }

          <div className="messages-box" ref={el => this.messageBlock = el} >
            <div>

              { conversation.messages && conversation.messages.map((message, i, arr) => (
              (message.is_tech === 0 &&
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
                      <h5>{message.user.first_name}</h5>
                    </Link>
                    <div className="wrapper-settings">
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

                  <p title={message.date.substring(0, 17)}>{message.text}</p>
                </div>
              </div>
              )
              ||
              <div key={message.id}>
                { (i === 0 || (i > 0 && message.date.substring(0, 2) !== arr[i - 1].date.substring(0, 2))) &&
                <div className="time-divider">
                  <span>{message.date.substring(0, 11)}</span>
                </div>
                }
                <div className="messages-post-tech">
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
              {/*<div>*/}
              {/*<a href="#">*/}
              {/*<img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/></a>*/}
              {/*<a>*/}
              {/*<h5>Name Surname</h5>*/}
              {/*</a>*/}
              {/*</div>*/}
              {/*<span>14:00</span>*/}
              {/*<div*/}
              {/*className="message-settings"*/}
              {/*onClick={this.openMessageSettings}*/}
              {/*>*/}
              {/*<i>...</i>*/}
              {/*<div*/}
              {/*style={{ display: this.state.messageSetting ? 'block' : 'none'}}*/}
              {/*>*/}
              {/*<ul>*/}
              {/*<li>Delete</li>*/}
              {/*</ul>*/}
              {/*</div>*/}
              {/*</div>*/}
              {/*<p>Message text...3</p>*/}
              {/*</div>*/}

              {/*<div className="messages-post messages-post-reverse">*/}
              {/*<div>*/}
              {/*<a href="#">*/}
              {/*<img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/></a>*/}
              {/*<a>*/}
              {/*<h5>Name Surname</h5>*/}
              {/*</a>*/}
              {/*</div>*/}
              {/*<span>14:00</span>*/}
              {/*<div*/}
              {/*className="message-settings"*/}
              {/*onClick={this.openMessageSettings}*/}
              {/*>*/}
              {/*<i>...</i>*/}
              {/*<div*/}
              {/*style={{ display: this.state.messageSetting ? 'block' : 'none'}}*/}
              {/*>*/}
              {/*<ul>*/}
              {/*<li>Delete</li>*/}
              {/*</ul>*/}
              {/*</div>*/}
              {/*</div>*/}
              {/*<p>Message text...3</p>*/}
              {/*</div>*/}
              {/*<div className="messages-post messages-post-reverse">*/}
              {/*<div>*/}
              {/*<a href="#">*/}
              {/*<img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/></a>*/}
              {/*<a>*/}
              {/*<h5>Name Surname</h5>*/}
              {/*</a>*/}
              {/*</div>*/}
              {/*<span>14:00</span>*/}
              {/*<div*/}
              {/*className="message-settings"*/}
              {/*onClick={this.openMessageSettings}*/}
              {/*>*/}
              {/*<i>...</i>*/}
              {/*<div*/}
              {/*style={{ display: this.state.messageSetting ? 'block' : 'none'}}*/}
              {/*>*/}
              {/*<ul>*/}
              {/*<li>Delete</li>*/}
              {/*</ul>*/}
              {/*</div>*/}
              {/*</div>*/}
              {/*<p>Message text...3</p>*/}
              {/*</div>*/}
            </div>
          </div>
          { conversation.conversation_id && (
            <div className="messages-send">
              <div className="wrapper">
                <Textarea
                  placeholder="Type a message..."
                  onKeyDown={this.handleKeyPress}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Messages.propTypes = {
  conversation: PropTypes.object,
  createMessage: PropTypes.func,
  deleteMessage: PropTypes.func,
  addMember: PropTypes.func,
  newSearchUser: PropTypes.func,
  authorizedUser: PropTypes.object,
  foundUsers: PropTypes.array,
};

export default Messages;
