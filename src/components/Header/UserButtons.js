import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {ButtonToolbar, DropdownButton} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import {
  getConversationList,
  getUserNotifications,
  seenAllNotification,
  seenAllConversations,
  clearConversation,
  readAllNotification,
  readAllConversations,
  readConversation,
  readNotification,
  loadNextConversations,
  clearConversionsList,
  loadNextNotifications,
} from '../../redux/modules/profile';
import {clearStories} from '../../redux/modules/story';
import {clearBookStories} from '../../redux/modules/book';

@connect((state) => ({
  conversations: state.profile.conversations,
  bubbleMessage: state.profile.bubbleMessage,
  bubbleNotification: state.profile.bubbleNotification,
  paginationConversations: state.profile.paginationConversations,
  hasMoreConversations: state.profile.hasMoreConversations,
  firstLoadConversations: state.profile.firstLoadConversations,
  paginationNotifications: state.profile.paginationNotifications,
  hasMoreNotifications: state.profile.hasMoreNotifications,
  firstLoadNotifications: state.profile.firstLoadNotifications,
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
  loadNextConversations,
  clearConversionsList,
  loadNextNotifications,
  clearStories,
  clearBookStories,
})

class UserButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownMessages: false,
      dropdownNotifications: false,
    };
    this.clickMail = this.clickMail.bind(this);
    this.clearStream = this.clearStream.bind(this);
    this.groupAvatars = this.groupAvatars.bind(this);
    this.clickNotification = this.clickNotification.bind(this);
    this.loadNotifications = this.loadNotifications.bind(this);
    this.loadConversations = this.loadConversations.bind(this);
    this.showDropdowns = this.showDropdowns.bind(this);
    this.whoWroteMessage = this.whoWroteMessage.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  clickMail() {
    // this.props.clearConversionsList();
    this.props.getConversationList();
    this.props.seenAllConversations();
  }

  clickNotification() {
    if (!this.props.firstLoadNotifications) {
      this.props.getUserNotifications();
    }
    this.props.seenAllNotification();
  }

  groupAvatars(receivers) {
    switch (receivers.length) {
      case 1:
        return (
          <div className="wrapper-avatars">
            <img src={receivers[0].avatar} alt=""/>
          </div>
        );
      case 2:
        return (
          <div className="wrapper-avatars">
            <div className="grid-half">
              <img src={receivers[0].avatar} alt=""/>
            </div>
            <div className="grid-half">
              <img src={receivers[1].avatar} alt=""/>
            </div>
          </div>
        );

      default:
        return (
          <div className="wrapper-avatars">
            <div className="grid-half grid-half-1">
              <img src={receivers[0].avatar} alt=""/>
            </div>
            <div className="grid-half grid-half-2">
              <div className="grid-fourth">
                <img src={receivers[1].avatar} alt=""/>
              </div>
              <div className="grid-fourth">
                <img src={receivers[2].avatar} alt=""/>
              </div>
            </div>
          </div>
        );
    }
  }

  loadConversations() {
    if (this.state.dropdownMessages && this.props.firstLoadConversations) {
      this.props.loadNextConversations(this.props.paginationConversations);
    }
  }

  loadNotifications() {
    if (this.state.dropdownNotifications && this.props.firstLoadNotifications) {
      this.props.loadNextNotifications(this.props.paginationNotifications);
    }
  }

  showDropdowns(dropdown, allowAction) {
    switch (dropdown) {
      case 'messages':
        if (allowAction) {
          this.clickMail();
          this.setState({
            dropdownMessages: !this.state.dropdownMessages
          });
        }
        break;

      case 'notifications':
        if (allowAction) {
          this.clickNotification();
          this.setState({
            dropdownNotifications: !this.state.dropdownNotifications
          });
        }
        break;

      default:
        console.log('error');
    }
  }

  whoWroteMessage(message, receivers) {
    if (message.user.id === this.props.authorizedUser.id) {
      return `You: ${message.text}`;
    }
    if (receivers.length > 1) {
      return `${message.user.first_name}: ${message.text}`;
    }
    return message.text;
  }

  onBlur(e) {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.setState({
          dropdownMessages: false,
          dropdownNotifications: false
        });
      }
    }, 0);
  }

  clearStream() {
    // this.props.clearBookStories();
    // this.props.clearStories();
  }

  render() {
    const {slug, first_name, avatar32} = this.props.authorizedUser;
    const {logoutUser, notifications, conversations, bubbleMessage, bubbleNotification} = this.props;
    return (
      <nav className="header-navigation">
        <div className="icons">
          <div className="wrap-icon-search">
            <a href="#">
              <div className="icon-search"/>
            </a>
          </div>

          {/*
              -==== Start Dropdown Messages ====-
           */}
          <div className="wrap-icon-mail" tabIndex={0} onBlur={this.onBlur}>
            <i
              style={{backgroundPosition: this.state.dropdownMessages ? '-112px -466px' : '-129px -466px'}}
              onClick={() => {
                this.showDropdowns('messages', true);
              }}
            />
            {bubbleMessage > 0 && <div className="bubble"><span>{bubbleMessage}</span></div>}

            <div
              style={{display: this.state.dropdownMessages ? 'block' : 'none'}}
              className="dropdown-common dropdown-messages"
            >
              <div className="notification-box">
                <div className="triangle"/>
                <div>
                  <h4>Messages</h4>
                  <div style={{display: 'flex'}}>
                    <a onClick={this.props.readAllConversations}>Mark All Read</a>
                    <i>.</i>
                    <Link to="/messages/new" onClick={this.props.clearConversation}>New Message</Link>
                  </div>
                </div>
                <hr/>
                <ul>
                  <InfiniteScroll
                    loadMore={this.loadConversations}
                    hasMore={this.props.hasMoreConversations}
                    threshold={50}
                    // loader={loader}
                    useWindow={false}
                  >
                    {conversations && conversations.map(conversation => (
                      <Link
                        to={`/messages/${conversation.conversation_id}`}
                        key={conversation.conversation_id}
                        style={{background: conversation.is_seen ? '#fff' : '#E4F0F6'}}
                        onClick={() => this.props.readConversation(conversation.conversation_id)}
                      >
                        <li>
                          {this.groupAvatars(conversation.receivers)}
                          {/*<img src={conversation.receivers[0].avatar} alt=""/>*/}
                          <h6>{conversation.receiversName && conversation.receiversName.toString()}</h6>
                          {/*<h6>{ conversation.messages && conversation.receivers.map(receiver => receiver.first_name)}</h6>*/}
                          {/*<h6>{`${conversation.messages && conversation.receivers[0].first_name} ${conversation.receivers[0].last_name}`}</h6>*/}
                          {conversation.messages.length > 0 &&
                          <span>{this.whoWroteMessage(conversation.messages[0], conversation.receivers)}</span>
                          }
                          <span
                            className="date">{conversation.messages && conversation.messages[0].date.substring(11, 17)}</span>
                          <div
                            className="tooltip-date">{conversation.messages && conversation.messages[0].date.substring(0, 11)}</div>
                        </li>
                      </Link>
                    ))}
                  </InfiniteScroll>
                </ul>
                <div style={{padding: '3px 0 5px', justifyContent: 'center'}}>
                  <Link to="/messages">See all</Link>
                </div>
              </div>
            </div>
          </div>
          {/*
              -==== End Dropdown Messages ====-
           */}


          {/*
              -==== Start Dropdown Notifications ====-
           */}
          <div className="wrap-icon-bell" onBlur={this.onBlur} tabIndex={0}>
            <i
              style={{backgroundPosition: this.state.dropdownNotifications ? '-46px -486px' : ' -32px -486px'}}
              onClick={() => this.showDropdowns('notifications', true)}
            />

            {bubbleNotification > 0 && <div className="bubble"><span>{bubbleNotification}</span></div>}

            <div
              className="dropdown-common dropdown-notifications"
              style={{display: this.state.dropdownNotifications ? 'block' : 'none'}}
            >
              <div className="notification-box">
                <div className="triangle"/>
                <div>
                  <h4>Notifications</h4>
                  <a onClick={this.props.readAllNotification}>Mark All as Read</a>
                </div>
                <hr/>
                <ul>
                  <InfiniteScroll
                    loadMore={this.loadNotifications}
                    hasMore={this.props.hasMoreNotifications}
                    threshold={50}
                    // loader={loader}
                    useWindow={false}
                  >
                    {notifications && notifications.map((notification) => (
                      <Link
                        to={notification.link}
                        key={notification.id}
                        onClick={() => this.props.readNotification(notification.id)}
                      >
                        <li key={notification.id} style={{background: notification.is_seen ? '#fff' : '#E4F0F6'}}>
                          <div>
                            <img src={notification.user.avatar} alt=""/>
                            <h6
                              dangerouslySetInnerHTML={{__html: notification.text}}
                              style={{display: 'flex', width: '265px', fontWeight: 400}}
                            />
                          </div>
                          <p>{notification.created}</p>
                        </li>
                      </Link>
                    ))}
                  </InfiniteScroll>
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
                <div style={{padding: '4px 5px 4px'}}>
                  <Link to="/notifications">See all</Link>
                  <Link to="/settings/notifications">Settings</Link>
                </div>
              </div>
            </div>
          </div>
          {/*
              -==== End Dropdown Notifications ====-
           */}
        </div>

        <div className="infouser">
          <Link to={`/${slug}`} onClick={this.clearStream}>
            <span>{first_name}</span>
            <img src={avatar32} alt=""/>
          </Link>
        </div>

        <div className="profile-menu">
          <ButtonToolbar>
            <DropdownButton className="bootstrap-pure-btn" bsStyle="default" title={''} id={3} noCaret pullRight>
              <div className="triangle"/>
              <Link to="/settings">Settings</Link>
              <Link to="/settings/privacy">Privacy Control Center</Link>
              <Link to="/" onClick={logoutUser}>Sign out</Link>
              <hr/>
              <div className="extension">
                <div>Get Browser Log Button</div>
              </div>
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
  loadNextConversations: PropTypes.func,
  paginationConversations: PropTypes.number,
  hasMoreConversations: PropTypes.bool,
  clearConversionsList: PropTypes.func,
  firstLoadConversations: PropTypes.bool,
  firstLoadNotifications: PropTypes.bool,
  clearBookStories: PropTypes.func,
  clearStories: PropTypes.func,
};

export default UserButtons;
