import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import ListMessage from '../components/Messages/ListMessage';
import {
  getConversationList,
  addTemporaryConversation,
  isNeedLoadTemporaryConversation,
  clearConversation
} from '../redux/modules/profile';

@connect((state) => ({
  conversations: state.profile.conversations,
  needLoadTemporaryConversation: state.profile.needLoadTemporaryConversation
}), {
  getConversationList,
  addTemporaryConversation,
  clearConversation
})

class MessagesContainer extends Component {
  componentDidMount() {
    this.props.getConversationList()
      .then(() => {
        if (this.props.needLoadTemporaryConversation) {
          this.props.clearConversation();
          this.props.addTemporaryConversation();
        }
      });
  }

  render() {
    return (
      <div className="additional-wrap">
        <Helmet title="Conversations"/>
        <ListMessage
          conversations={this.props.conversations}
        />
        {this.props.children}
      </div>
    );
  }
}

MessagesContainer.propTypes = {
  children: PropTypes.element,
  conversations: PropTypes.array,
  getConversationList: PropTypes.func,
};

export default MessagesContainer;
