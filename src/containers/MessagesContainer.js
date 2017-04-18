import React, { Component, PropTypes } from 'react';
import ListMessage from '../components/Messages/ListMessage';

class MessagesContainer extends Component {
  render() {
    return (
      <div className="additional-wrap">
        <ListMessage />
        {this.props.children}
      </div>
    );
  }
}

MessagesContainer.propTypes = {
  children: PropTypes.element
};

export default MessagesContainer;
