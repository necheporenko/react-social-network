import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import {Form, Input} from 'formsy-react-components';
import './document-modal-item.scss';

class CreateBoxModal extends Component {
  constructor() {
    super();

    this.onSaveChangesClick = this.onSaveChangesClick.bind(this);
  }

  onSaveChangesClick() {
    this.props.createBoxHander(this.name && this.name.state && this.name.state._value);
  }

  render() {
    const {closeModalHandler, saveChangesHandler, showModal, title} = this.props;
    console.log(this.props);

    return (
      <Modal 
        bsClass="document-item-modal"
        show={showModal}
        onHide={closeModalHandler || saveChangesHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title>New box</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form rowClassName={[{'form-group': false}, {row: false}, 'channel-form']}>
            <Input
              name="name"
              labelClassName={[{'col-sm-3': false}, 'channel-label']}
              elementWrapperClassName={[{'col-sm-9': false}, 'channel-element-wrapper']}
              value={'Untitled box'}
              ref={input => { this.name = input; }}
              type="text"
            />

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <button 
            className="btn-brand btn-cancel" 
            onClick={closeModalHandler}>Cancel</button>
          <button 
            className="btn-brand" 
            style={{marginLeft: '16px'}} 
            onClick={this.onSaveChangesClick}>Create</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateBoxModal;
