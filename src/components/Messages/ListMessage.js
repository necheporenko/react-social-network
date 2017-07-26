import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { clearConversation, deleteConversation, leftConversation, searchConversation } from '../../redux/modules/profile';
import './index.scss';

@connect((state) => ({
}), {
  clearConversation,
  deleteConversation,
  leftConversation,
  searchConversation
})

class ListMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedUsersID: [],
    };
    this.getReceivers = this.getReceivers.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  render() {
    const { conversations } = this.props;

    return (
      <div className="messages-mnu">
        <div className="additional-title">Conversations
         <Link to="/messages/new" className="new-message" onClick={() => this.props.clearConversation()}><i/></Link>
        </div>
        <ul className="conversations-list">
          <div className="messages-search">
            <input type="text" placeholder="Search" onChange={this.handleSearch}/>
            <i/>
          </div>

          { !conversations &&
            <li style={{padding: '10px 15px'}}>No conversations yet.</li>
          }

          { conversations && conversations.map(conversation => (
            <div key={conversation.conversation_id}>
              <Link to={`/messages/${conversation.conversation_id}`} onlyActiveOnIndex={true} activeClassName="active">
                <li>
                  <img src={conversation.receivers[0].avatar} alt=""/>
                  <h5>{this.getReceivers(conversation.receivers)}</h5>
                </li>
                <span>{conversation.messages && conversation.messages[0].date.substring(11, 17)}</span>
                <p>{conversation.messages && conversation.messages[0].text}</p>
              </Link>
              <div className="conversation-settings">
                <i/>
                <div>
                  <ul>
                    { conversation.receivers.length > 1 &&
                      <li onClick={() => this.props.leftConversation(conversation.conversation_id)}>Leave Group</li>
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
};

export default ListMessage;
