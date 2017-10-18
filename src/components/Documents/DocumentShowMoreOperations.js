import React, { Component } from 'react';
import './show-more-operations.scss';

class DocumentShowMoreOperations extends Component {
  render() {
    const {showModalHandler} = this.props;

    return (
      <div className="document-dropdown-menu">
        <div className="document-dropdown-menu-container">
          <div><span className="open-icon"/><span>Open</span></div>
          <hr />
          <div><span className="share-icon"/><span>Share</span></div>
          <div><span className="move-to-icon"/><span>Move to ...</span></div>
          <div><span className="make-copy-icon"/><span>Make a copy ...</span></div>
          <div onClick={showModalHandler}><span className="rename-icon"/><span>Rename document</span></div>
          <div><span className="download-icon"/><span>Download</span></div>
          <hr />
          <div><span className="verify-icon"/><span>Verify Signatures</span></div>
          <div><span className="sign-icon"/><span>Sign</span></div>
          <hr />
          <div><span className="delete-icon"/><span>Delete</span></div>
        </div>
      </div>
    );
  }
}

export default DocumentShowMoreOperations;
