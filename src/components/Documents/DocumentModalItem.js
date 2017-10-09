import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {Form, Input} from 'formsy-react-components';

export default class DocumentModalItem extends Component {
  render() {
    const {closeModalHandler, saveChangesHandler, showModal} = this.props;
    console.log(this.props);

    return (
      <div className="static-modal">
        <Modal show={showModal} onHide={closeModalHandler || saveChangesHandler}>
          <Modal.Header>
            <Modal.Title>Rename</Modal.Title>
          </Modal.Header>
    
          <Modal.Body>
            <Form>
              <Input
                name="name"
                value={'Undefained'}
                labelClassName={[{'col-sm-3': false}, 'channel-label']}
                label="Book name"
                elementWrapperClassName={[{'col-sm-9': false}, 'channel-element-wrapper']}
                placeholder="Type name or select book template"
                type="text"
              />
            </Form>
          </Modal.Body>
    
          <Modal.Footer>
            <Button onClick={closeModalHandler}>Close</Button>
            <Button onClick={saveChangesHandler} bsStyle="primary">Save changes</Button>
          </Modal.Footer>
    
        </Modal>
      </div>
    );
  }
}