import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { ButtonToolbar, DropdownButton } from 'react-bootstrap';
import { getConversationList, clearMailCounter } from '../../redux/modules/profile';

@connect((state) => ({
  conversations: state.profile.conversations,
  bubbleMessage: state.profile.bubbleMessage,
}), {
  getConversationList,
  clearMailCounter
})

class UserButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.clickMail = this.clickMail.bind(this);
  }

  clickMail() {
    this.props.getConversationList();
    this.prop.clearMailCounter();
  }

  render() {
    const { slug, first_name, avatar32 } = this.props.authorizedUser;
    const { logoutUser, notifications, conversations, bubbleMessage } = this.props;
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
          <div className="wrap-icon-mail" onClick={() => this.clickMail()}>

            {/*<Link to="/messages">*/}
            {/*<div className="icon-mail"/>*/}
            {/*</Link>*/}
            <ButtonToolbar>
              { bubbleMessage > 0 &&
                <div className="bubble"><span>{ bubbleMessage }</span></div>
              }
              <DropdownButton className="bootstrap-pure-btn" bsStyle="default" title={''} id={1} noCaret pullRight>
                <div className="notification-box">
                  <div>
                    <h4>Messages</h4>
                    <a href="#">Mark as Read</a>
                  </div>
                  <hr/>
                  <ul>
                    { conversations && conversations.map(conversation => (
                      <Link to={`/messages/${conversation.conversation_id}`} key={conversation.conversation_id}>
                        <li>
                          <img src={conversation.receivers[0].avatar32} alt=""/>
                          <h6>{`${conversation.receivers[0].first_name} ${conversation.receivers[0].last_name}`}</h6>
                          <span>{conversation.messages[0].text}</span>
                        </li>
                      </Link>
                    ))}
                    <a href="#">
                      <li>
                        <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                        <h6>Name Surname</h6>
                        <span>Message text...</span>
                      </li>
                    </a>
                    <a href="#">
                      <li>
                        <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                        <h6>Name Surname</h6>
                        <span>Message text...</span>
                      </li>
                    </a>
                  </ul>
                  <div style={{paddingTop: '7px'}}>
                    <Link to="/messages">See all</Link>
                  </div>
                </div>
              </DropdownButton>
            </ButtonToolbar>
          </div>
          <div className="wrap-icon-bell">
            <div className="bubble"><span>12</span></div>
            <ButtonToolbar>
              <DropdownButton className="bootstrap-pure-btn" bsStyle="default" title={''} id={2} noCaret pullRight>
                <div className="notification-box">
                  <div>
                    <h4>Notifications</h4>
                    <a href="#">Mark as Read</a>
                  </div>
                  <hr/>
                  <ul>
                    {notifications && notifications.map((notification) => (
                      <li key={notification.id}>
                        <div>
                          <img src={notification.user.avatar} alt=""/>
                          <h6 dangerouslySetInnerHTML={{__html: notification.text}}/>
                        </div>
                        <p>{notification.created}</p>
                      </li>
                    ))}

                    <li>
                      <div>
                        <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                        <h6><a href="#"><b>Name Surname</b></a>commented on your story</h6>
                      </div>
                      <p>21 Mar 2017</p>
                    </li>
                    <li>
                      <div>
                        <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                        <h6><a href="#"><b>Name Surname</b></a> liked your <a href="#"> story</a></h6>
                      </div>
                      <p>21 Mar 2017</p>
                    </li>
                    <li>
                      <div>
                        <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                        <h6><a href="#"><b>Name Surname</b></a>commented on your story</h6>
                      </div>
                      <p>21 Mar 2017</p>
                    </li>
                  </ul>
                  <div style={{paddingTop: '7px'}}>
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
};

UserButtons.propTypes = {
  authorizedUser: PropTypes.object,
  logoutUser: PropTypes.func,
  clearMailCounter: PropTypes.func,
  getConversationList: PropTypes.func,
  bubbleMessage: PropTypes.number,
};

export default UserButtons;
