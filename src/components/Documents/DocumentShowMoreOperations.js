import React, { Component } from 'react';
import {NavDropdown, MenuItem} from 'react-bootstrap';
import './show-more-operations.scss';

class DocumentShowMoreOperations extends Component {
  render() {
    const {showModalHandler} = this.props;

    return (
      <div className="document-dropdown-menu">
        <div className="document-dropdown-menu-container">
          <div onClick={showModalHandler}>Rename document</div>
          <div>Delete</div>
        </div>
      </div>
    );
  }
}

export default DocumentShowMoreOperations;