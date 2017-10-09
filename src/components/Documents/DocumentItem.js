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
            <div className="show-more-operations-icon"></div>
            {this.showMoreOperationsRender()}
            {this.documentModalRender()}
          </div>
        </div>
      </Link>
    );
  }
}