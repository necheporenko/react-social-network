import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import RenameDocumentModal from './RenameDocumentModal';
import DocumentShowMoreOperations from './DocumentShowMoreOperations';
import {deleteDocument, updateDocument} from '../../redux/modules/document';
import './document-item.scss';

@connect(null, {
  deleteDocument,
  updateDocument
})

export default class DocumentItem extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
      showOperations: false
    };

    this.showOperations = this.showOperations.bind(this);
    this.closeRenameDocumentModal = this.closeRenameDocumentModal.bind(this);
    this.showRenameDocumentModal = this.showRenameDocumentModal.bind(this);
    this._closeShowMoreOperations = this._closeShowMoreOperations.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.renameDocument = this.renameDocument.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this._closeShowMoreOperations, false);
  }

  _closeShowMoreOperations(e) {
    e.preventDefault();
    e.stopPropagation();
    const {showOperations} = this.state;

    if (showOperations) {
      this.setState({
        showOperations: false
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this._closeShowMoreOperations, false);
  }

  showOperations(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      showOperations: !this.state.showOperations
    });
  }

  showRenameDocumentModal(e) {
    e.preventDefault();

    this.setState({
      showModal: true
    });
  }

  closeRenameDocumentModal() {
    this.setState({
      showModal: false
    });
  }
  
  renameDocument(title) {
    const {updateDocument, document} = this.props;
    
    updateDocument(document.id, title);
    
    this.setState({
      showModal: false
    });
  }

  documentModalRender() {
    if (!this.state.showModal) {
      return null;
    }

    return (
      <RenameDocumentModal
        title={this.props.document.title}
        showModal={this.state.showModal}
        renameDocumentHandler={this.renameDocument}
        closeModalHandler={this.closeRenameDocumentModal}
      />
    );
  }

  deleteDocument(e) {
    e.preventDefault();
    const {deleteDocument, document} = this.props;

    deleteDocument(document.id);
  }

  showMoreOperationsRender() {
    const {deleteDocument} = this.props;

    if (!this.state.showOperations) {
      return null;
    }

    return (
      <DocumentShowMoreOperations
        showModalHandler={this.showRenameDocumentModal}
        deleteDocumentHandler={this.deleteDocument}
      />
    );
  }

  render() {
    const {document, boxKey} = this.props;

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
          <div className="document-item-show-more-container">
            <div className="show-more-operations-icon" onClick={this.showOperations}>
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