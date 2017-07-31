import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { ButtonToolbar, DropdownButton } from 'react-bootstrap';
import { getConversationList, getUserNotifications, seenAllNotification, seenAllConversations, clearConversation,
  readAllNotification, readAllConversations, readConversation, readNotification } from '../../redux/modules/profile';

@connect((state) => ({
  conversations: state.profile.conversations,
  bubbleMessage: state.profile.bubbleMessage,
  bubbleNotification: state.profile.bubbleNotification,
}), {
  getConversationList,
  seenAllNotification,
  seenAllConversations,
  getUserNotifications,
  readAllNotification,
  readAllConversations,
  readConversation,
  readNotification,
  clearConversation,
})

class UserButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.clickMail = this.clickMail.bind(this);
    this.clickNotification = this.clickNotification.bind(this);
  }

  clickMail() {
    this.props.getConversationList();
    this.props.seenAllConversations();
  }

  clickNotification() {
    this.props.getUserNotifications();
    this.props.seenAllNotification();
  }

  closeDropdown() {
    console.log('hiiiii');
    return false;
  }

  render() {
    const { slug, first_name, avatar32 } = this.props.authorizedUser;
    const { logoutUser, notifications, conversations, bubbleMessage, bubbleNotification } = this.props;
    return (
      <nav className="header-navigation">
        <div className="extension">
          <button>Install extension</button>
        </div>

        <div className="icons">
          <div className="wrap-icon-search">
            <a href="#">
              <div className="icon-search"/>
            </a>
          </div>
          <div className="wrap-icon-mail" onClick={this.clickMail}>
            <ButtonToolbar>
              { bubbleMessage > 0 &&
                <div className="bubble"><span>{ bubbleMessage }</span></div>
              }
              <DropdownButton className="bootstrap-pure-btn" bsStyle="default" title={''} id={1} noCaret pullRight>
                <div className="notification-box">
                  <div>
                    <h4>Messages</h4>
                    <div style={{display: 'flex'}}>
                      <a onClick={this.props.readAllConversations}>Mark All Read</a>
                      <i>.</i>
                      <Link to="/messages/new" onClick={this.props.clearConversation} >New Message</Link>
                    </div>
                  </div>
                  <hr/>
                  <ul>
                    { conversations && conversations.map(conversation => (
                      <Link
                        to={`/messages/${conversation.conversation_id}`}
                        key={conversation.conversation_id}
                        style={{background: conversation.is_seen ? '#fff' : '#eff6ff'}}
                        onClick={() => this.props.readConversation(conversation.conversation_id)}
                      >
                        <li>
                          <img src={conversation.receivers[0].avatar} alt=""/>
                          <h6>{conversation.receiversName.toString()}</h6>
                          {/*<h6>{ conversation.messages && conversation.receivers.map(receiver => receiver.first_name)}</h6>*/}
                          {/*<h6>{`${conversation.messages && conversation.receivers[0].first_name} ${conversation.receivers[0].last_name}`}</h6>*/}
                          <span>{conversation.messages && conversation.messages[0].text}</span>
                        </li>
                      </Link>
                    ))}
                  </ul>
                  <div style={{paddingTop: '7px', justifyContent: 'center'}}>
                    <Link to="/messages">See all</Link>
                  </div>
                </div>
              </DropdownButton>
            </ButtonToolbar>
          </div>

          <div className="wrap-icon-bell" onClick={this.clickNotification}>
            {/*<div className="clickNotification" onClick={this.clickNotification}></div>*/}
            { bubbleNotification > 0 &&
              <div className="bubble"><span>{ bubbleNotification }</span></div>
            }
            <ButtonToolbar>
              <DropdownButton className="bootstrap-pure-btn" bsStyle="default" title={''} id={2} noCaret pullRight>
                <div className="notification-box">
                  <div>
                    <h4>Notifications</h4>
                    <a onClick={this.props.readAllNotification}>Mark All as Read</a>
                  </div>
                  <hr/>
                  <ul>
                    { notifications && notifications.map((notification) => (
                      <Link
                        to={notification.link}
                        key={notification.id}
                        onClick={() => this.props.readNotification(notification.id)}
                      >
                        <li key={notification.id} style={{background: notification.is_seen ? '#fff' : '#eff6ff'}}>
                          <div>
                            <img src={notification.user.avatar} alt=""/>
                            <h6 dangerouslySetInnerHTML={{__html: notification.text}}/>
                          </div>
                          <p>{notification.created}</p>
                        </li>
                      </Link>
                    ))}
                    {/*<a href="#">*/}
                    {/*<li>*/}
                    {/*<div>*/}
                    {/*<img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>*/}
                    {/*<h6><a><b>Name Surna1</b></a>commented on your story</h6>*/}
                    {/*</div>*/}
                    {/*<p>21 Mar 2017</p>*/}
                    {/*</li>*/}
                    {/*</a>*/}
                    {/*<li>*/}
                    {/*<div>*/}
                    {/*<img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>*/}
                    {/*<h6><a href="#"><b>Name Surname</b></a> liked your <a href="#"> story</a></h6>*/}
                    {/*</div>*/}
                    {/*<p>21 Mar 2017</p>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*<div>*/}
                    {/*<img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>*/}
                    {/*<h6><a href="#"><b>Name Surname</b></a>commented on your story</h6>*/}
                    {/*</div>*/}
                    {/*<p>21 Mar 2017</p>*/}
                    {/*</li>*/}
                  </ul>
                  <div style={{padding: '7px 5px 0'}}>
                    <Link to="/notifications">See all</Link>
                    <Link to="/settings/notifications">Settings</Link>
                  </div>
                </div>
              </DropdownButton>
            </ButtonToolbar>
          </div>
        </div>

        <div className="infouser">
          <Link to={`/${slug}`}>
            <span>{first_name}</span>
            <img src={avatar32} alt=""/>
          </Link>
        </div>

        <div className="profile-menu">
          <ButtonToolbar>
            <DropdownButton className="bootstrap-pure-btn" bsStyle="default" title={''} id={3} noCaret pullRight>
              <Link to="/settings">Settings</Link>
              <Link to="/settings/privacy">Privacy Control Center</Link>
              <Link to="/" onClick={logoutUser}>Sign out</Link>
            </DropdownButton>
          </ButtonToolbar>
        </div>

      </nav>
    );
  }
}

UserButtons.propTypes = {
  authorizedUser: PropTypes.object,
  logoutUser: PropTypes.func,
  seenAllConversations: PropTypes.func,
  seenAllNotification: PropTypes.func,
  getConversationList: PropTypes.func,
  getUserNotifications: PropTypes.func,
  readAllNotification: PropTypes.func,
  bubbleMessage: PropTypes.number,
  bubbleNotification: PropTypes.number,
  conversations: PropTypes.array,
  notifications: PropTypes.array,
  readAllConversations: PropTypes.func,
  readNotification: PropTypes.func,
  readConversation: PropTypes.func,
  clearConversation: PropTypes.func,
};

export default UserButtons;
