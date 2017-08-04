import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { ButtonToolbar, DropdownButton } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import { getConversationList, getUserNotifications, seenAllNotification, seenAllConversations, clearConversation,
  readAllNotification, readAllConversations, readConversation, readNotification, loadNextConversations } from '../../redux/modules/profile';

@connect((state) => ({
  conversations: state.profile.conversations,
  bubbleMessage: state.profile.bubbleMessage,
  bubbleNotification: state.profile.bubbleNotification,
  paginationConversations: state.profile.paginationConversations,
  hasMoreConversations: state.profile.hasMoreConversations,
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
})

class UserButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.clickMail = this.clickMail.bind(this);
    this.groupAvatars = this.groupAvatars.bind(this);
    this.clickNotification = this.clickNotification.bind(this);
    this.loadConversations = this.loadConversations.bind(this);
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

      case 3:
        return (
          <div className="wrapper-avatars">
            <div className="grid-half">
              <img src={receivers[0].avatar} alt=""/>
            </div>
            <div className="grid-half">
              <div className="grid-fourth">
                <img src={receivers[1].avatar} alt=""/>
              </div>
              <div className="grid-fourth">
                <img src={receivers[2].avatar} alt=""/>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="wrapper-avatars">
            <div className="grid-half">
              <div className="grid-fourth">
                <img src={receivers[0].avatar} alt=""/>
              </div>
              <div className="grid-fourth">
                <img src={receivers[1].avatar} alt=""/>
              </div>
            </div>
            <div className="grid-half">
              <div className="grid-fourth">
                <img src={receivers[2].avatar} alt=""/>
              </div>
              <div className="grid-fourth">
                <img src={receivers[3].avatar} alt=""/>
              </div>
            </div>
          </div>
        );
    }
  }

  loadConversations() {
    this.props.loadNextConversations(this.props.paginationConversations);
  }

  render() {
    const { slug, first_name, avatar32 } = this.props.authorizedUser;
    const { logoutUser, notifications, conversations, bubbleMessage, bubbleNotification } = this.props;
    return (
      <nav className="header-navigation">
        <div className="extension">
          {/*<button>Install extension</button>*/}
          <div>0</div>
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
                  <div className="triangle"/>
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
                    <InfiniteScroll
                      // loadMore={this.loadConversations}
                      // hasMore={this.props.hasMoreConversations}
                      hasMore={true}
                      threshold={75}
                      // loader={loader}
                      useWindow={false}
                    >
                      { conversations && conversations.map(conversation => (
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
                            <span>{conversation.messages && conversation.messages[0].text}</span>
                            <span className="date">{conversation.messages && conversation.messages[0].date.substring(11, 17)}</span>
                            <div className="tooltip-date">{conversation.messages && conversation.messages[0].date.substring(0, 11)}</div>
                          </li>
                        </Link>
                    ))}
                    </InfiniteScroll>
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
                  <div className="triangle"/>
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
                        <li key={notification.id} style={{background: notification.is_seen ? '#fff' : '#E4F0F6'}}>
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
  hasMoreConversations: PropTypes.boolean,
};

export default UserButtons;
