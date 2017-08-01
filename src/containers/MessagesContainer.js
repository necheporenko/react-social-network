import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import ListMessage from '../components/Messages/ListMessage';
import { getConversationList, addTemporaryConversation, isNeedLoadTemporaryConversation, clearConversation } from '../redux/modules/profile';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    // const promises = [];
    // promises.push(dispatch(getConversationList()))
    //   .then(dispatch(addTemporaryConversation()));
    // dispatch(getConversationList());
    return Promise.resolve(dispatch(getConversationList()))
      .then(() => {
        if (isNeedLoadTemporaryConversation(getState())) {
          dispatch(clearConversation());
          dispatch(addTemporaryConversation());
        }
      });
    // return Promise.all(promises);
  }
}])

@connect((state) => ({
  conversations: state.profile.conversations,
}), {
  getConversationList,
  addTemporaryConversation
})

class MessagesContainer extends Component {
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
};

export default MessagesContainer;
