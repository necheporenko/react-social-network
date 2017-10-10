import React, {Component} from 'react';
import {Link} from 'react-router';
import DocumentModalItem from './DocumentModalItem';
import DocumentShowMoreOperations from './DocumentShowMoreOperations';
import './document-item.scss';

export default class DocumentItem extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
      showOperations: false
    };

    this.showOperations = this.showOperations.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  showOperations(e) {
    e.preventDefault();
    this.setState({
      showOperations: !this.state.showOperations
    });
  }

  showModal(e) {
    e.preventDefault();
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }

  saveChanges() {
    this.setState({
      showModal: false
    });
  }

  documentModalRender() {
    if (!this.state.showModal) {
      return null;
    }

    return (
      <DocumentModalItem
        showModal={this.state.showModal}
        closeModalHandler={this.closeModal}
        saveChangesHandler={this.saveChanges}
      />
    );
  }

  showMoreOperationsRender() {
    if (!this.state.showOperations) {
      return null;
    }

    return (
      <DocumentShowMoreOperations
        showModalHandler={this.showModal}
      />
    );
  }

  render() {
    const {document, boxKey} = this.props;
    console.log(this.state.showModal);

    return (
      <Link className="document-item" to={`/${document.slug}/documents/${boxKey}/${document.id}`}>
        <div className="document-item-thumbnail">
        </div>
        <div className="document-item-metadata-container">
          <div className="document-item-title">
            {document.title}
          </div>
          <div className="document-item-metadata-row">
            <div className="document-item-icon"/>
            <div className="document-item-created">{document.created}</div>
          </div>
          <div className="document-item-show-more-container" onClick={this.showOperations}>
            <div className="show-more-operations-icon">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="19px" viewBox="0 0 4.75 19" width="4.75px"><path d="M2.375 4.75c1.306 0 2.375-1.07 2.375-2.375C4.75 1.07 3.68 0 2.375 0 1.07 0 0 1.07 0 2.375 0 3.68 1.07 4.75 2.375 4.75zm0 2.375C1.07 7.125 0 8.195 0 9.5c0 1.306 1.07 2.375 2.375 2.375 1.306 0 2.375-1.07 2.375-2.375 0-1.306-1.07-2.375-2.375-2.375zm0 7.125C1.07 14.25 0 15.32 0 16.625 0 17.93 1.07 19 2.375 19c1.306 0 2.375-1.07 2.375-2.375 0-1.306-1.07-2.375-2.375-2.375z" fill="#cdcdcd"/></svg>
            </div>
            {this.showMoreOperationsRender()}
            {this.documentModalRender()}
          </div>
        </div>
      </Link>
    );
  }
}