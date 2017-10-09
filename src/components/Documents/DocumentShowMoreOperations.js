import React, { Component } from 'react';
import {NavDropdown, MenuItem} from 'react-bootstrap';
import './show-more-operations.scss';

class DocumentShowMoreOperations extends Component {
  render() {
    const {showModalHandler} = this.props;

    return (
      <div className="document-dropdown-menu">
        <div onClick={showModalHandler}>Rename document</div>
        <div>Delete</div>
      </div>
    );
  }
}

export default DocumentShowMoreOperations;