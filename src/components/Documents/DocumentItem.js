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
              <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 4.5 18" width="4.5"><path d="M2.25 4.5c1.237 0 2.25-1.013 2.25-2.25C4.5 1.012 3.487 0 2.25 0 1.012 0 0 1.012 0 2.25 0 3.487 1.012 4.5 2.25 4.5zm0 2.25C1.012 6.75 0 7.763 0 9c0 1.238 1.012 2.25 2.25 2.25 1.237 0 2.25-1.012 2.25-2.25 0-1.237-1.013-2.25-2.25-2.25zm0 6.75C1.012 13.5 0 14.512 0 15.75S1.012 18 2.25 18c1.237 0 2.25-1.012 2.25-2.25S3.487 13.5 2.25 13.5z" fill="#cdcdcd"/></svg>
            </div>
            {this.showMoreOperationsRender()}
            {this.documentModalRender()}
          </div>
        </div>
      </Link>
    );
  }
}