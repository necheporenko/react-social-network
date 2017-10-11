import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {Form, Input} from 'formsy-react-components';
import './document-modal-item.scss';

export default class DocumentModalItem extends Component {
  render() {
    const {closeModalHandler, saveChangesHandler, showModal} = this.props;
    console.log(this.props);

    return (
      <div className="static-modal">
        <Modal 
          show={showModal}
          onHide={closeModalHandler || saveChangesHandler}
        >
          <Modal.Header closeButton>
            <Modal.Title>Rename</Modal.Title>
          </Modal.Header>
    
          <Modal.Body>
            <Form rowClassName={[{'form-group': false}, {row: false}, 'channel-form']}>
              <Input
                name="name"
                value={'Undefined'}
                labelClassName={[{'col-sm-3': false}, 'channel-label']}
                label="Enter new name:"
                elementWrapperClassName={[{'col-sm-9': false}, 'channel-element-wrapper']}
                placeholder=""
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
              onClick={saveChangesHandler}>OK</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}