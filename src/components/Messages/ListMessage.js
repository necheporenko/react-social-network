import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Form, Input } from 'formsy-react-components';
import { cleanConversation } from '../../redux/modules/profile';
import './index.scss';

@connect((state) => ({
}), {
  cleanConversation
})

class ListMessage extends Component {
  render() {
    const { conversations } = this.props;
    return (
      <div className="messages-mnu">
        <div className="additional-title">Messanger
         <Link to="/messages/new" className="new-message" onClick={() => this.props.cleanConversation()}><i/></Link>
        </div>
        <ul className="conversations-list">
          <Form rowClassName={[{'form-group': false}, {row: false}, 'messages-form']} >
            <Input
              name="to"
              value=""
              labelClassName={[{'col-sm-3': false}, 'disabled-label']}
              elementWrapperClassName={[{'col-sm-9': false}, 'messages-search']}
              type="text"
              placeholder="Search"
           />
          </Form>

          { !conversations &&
            <li style={{padding: '10px 15px'}}>No conversations yet.</li>
          }

          { conversations && conversations.map(conversation => (
            <Link to={`/messages/${conversation.conversation_id}`} key={conversation.conversation_id}>
              <li>
                <img src={conversation.receivers[0].avatar32} alt=""/>
                <h5>{`${conversation.receivers[0].first_name} ${conversation.receivers[0].last_name}`}</h5>
              </li>
              <p>{conversation.messages[0].text}</p>
            </Link>
         ))}

          {/*<Link to="/messages">*/}
          <a href="#">
            <li>
              <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
              <h5>Name Surname</h5>
            </li>
            <p>Message text...</p>
          </a>
          {/*</Link>*/}

          <a href="#">
            <li>
              <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
              <h5>Name Surname</h5>
            </li>
            <p>Message text...</p>
          </a>
        </ul>
      </div>
    );
  }
}

ListMessage.propTypes = {
  conversations: PropTypes.array,
  cleanConversation: PropTypes.func,
};

export default ListMessage;
