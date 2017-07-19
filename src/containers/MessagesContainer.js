import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import ListMessage from '../components/Messages/ListMessage';
import { getConversationList } from '../redux/modules/profile';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(getConversationList()));
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  conversations: state.profile.conversations,
}), {
  getConversationList
})

class MessagesContainer extends Component {
  render() {
    return (
      <div className="additional-wrap">
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
