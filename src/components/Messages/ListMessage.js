import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { clearConversation, deleteConversation, leftConversation, searchConversation, readConversation,
  loadNextConversations } from '../../redux/modules/profile';
import { clearUserResult } from '../../redux/modules/search';
import './index.scss';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  paginationConversations: state.profile.paginationConversations,
  hasMoreConversations: state.profile.hasMoreConversations,
}), {
  clearConversation,
  deleteConversation,
  leftConversation,
  searchConversation,
  readConversation,
  loadNextConversations,
  clearUserResult,
})

class ListMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedUsersID: [],
    };
    this.getReceivers = this.getReceivers.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.groupAvatars = this.groupAvatars.bind(this);
    this.loadConversations = this.loadConversations.bind(this);
    this.clear = this.clear.bind(this);
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

  handleSearch(event) {
    this.props.searchConversation(event.target.value);
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

  clear() {
    this.props.clearConversation();
    this.props.clearUserResult();
  }

  render() {
    const { conversations, authorizedUser } = this.props;

    return (
      <div className="messages-mnu">
        <div className="additional-title">Conversations
         <Link to="/messages/new" className="new-message" onClick={this.clear} title="New Message"><i/></Link>
        </div>
        <ul className="conversations-list">
          <div className="messages-search">
            <input type="text" placeholder="Search" onChange={this.handleSearch}/>
            <i/>
          </div>

          <InfiniteScroll
            loadMore={this.loadConversations}
            hasMore={this.props.hasMoreConversations}
            threshold={75}
            // loader={loader}
            useWindow={false}
          >

            { conversations.length === 0 && <li style={{padding: '10px 15px'}}>No conversations found</li> }

            { conversations && conversations.map(conversation => (
              <div
                className={conversation.is_seen ? 'conversation' : 'conversation conversation-not-seen'}
                key={conversation.conversation_id}
                onClick={() => { this.props.readConversation(conversation.conversation_id); this.props.clearUserResult(); }}
               >
                <Link
                  to={`/messages/${conversation.conversation_id}`}
                  onlyActiveOnIndex={true}
                  activeClassName="active"
                >
                  <li>
                    {this.groupAvatars(conversation.receivers)}
                    {/*<img src={conversation.receivers[0].avatar} alt=""/>*/}
                    <h5>{this.getReceivers(conversation.receivers)}</h5>
                  </li>
                  <span>{conversation.messages && conversation.messages[0].date.substring(11, 17)}</span>
                  <div className="tooltip-date">{conversation.messages && conversation.messages[0].date.substring(0, 11)}</div>
                  <p>{conversation.messages && conversation.messages[0].text}</p>
                </Link>
                <div className="conversation-settings">
                  <i/>
                  <div>
                    <ul>
                      { conversation.receivers.length > 1 &&
                      <li onClick={() => this.props.leftConversation(conversation.conversation_id, authorizedUser.first_name)}>Leave Group</li>
                    }
                      <li onClick={() => this.props.deleteConversation(conversation.conversation_id)}>Delete</li>
                      <li>Report Spam or Abuse...</li>
                    </ul>
                  </div>
                </div>
              </div>
         ))}

            {/*/!*<Link to="/messages">*!/*/}
            {/*<a href="#">*/}
            {/*<li>*/}
            {/*<img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>*/}
            {/*<h5>Name Surname</h5>*/}
            {/*</li>*/}
            {/*<p>Message text...</p>*/}
            {/*</a>*/}
            {/*/!*</Link>*!/*/}

            {/*<a href="#">*/}
            {/*<li>*/}
            {/*<img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>*/}
            {/*<h5>Name Surname</h5>*/}
            {/*</li>*/}
            {/*<p>Message text...</p>*/}
            {/*</a>*/}
          </InfiniteScroll>
        </ul>
      </div>
    );
  }
}

ListMessage.propTypes = {
  conversations: PropTypes.array,
  clearConversation: PropTypes.func,
  deleteConversation: PropTypes.func,
  leftConversation: PropTypes.func,
  searchConversation: PropTypes.func,
  readConversation: PropTypes.func,
  authorizedUser: PropTypes.object,
  loadNextConversations: PropTypes.func,
  paginationConversations: PropTypes.number,
  hasMoreConversations: PropTypes.boolean,
  clearUserResult: PropTypes.func,
};

export default ListMessage;
