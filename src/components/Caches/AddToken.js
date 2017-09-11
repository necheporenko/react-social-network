import React, { Component } from 'react';
import { Form, Select, Input } from 'formsy-react-components';
import { Modal, ButtonToolbar, DropdownButton } from 'react-bootstrap';
import SBox from '../StoryLine/Stream/Sbox';
import './index.scss';

const typeToken = [
  {value: null, label: 'Select type name of the token'},
  {value: 'ownership', label: 'Ownership'},
  {value: 'confirmation', label: 'Confirmation'},
  {value: 'appreciation', label: 'Appreciation'}
];

class AddToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showSmallModal: false
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.smOpen = this.smOpen.bind(this);
    this.smClose = this.smClose.bind(this);
  }

  Close() {
    this.setState({ showModal: false });
  }
  smClose() {
    this.setState({ showSmallModal: false });
  }
  Open() {
    this.setState({ showModal: true });
  }
  smOpen() {
    this.setState({ showSmallModal: true });
  }

  render() {
    return (
      <div className="token add-token" onClick={this.Open}>
        <a href="#">
          <div><span>Create <br/> New Document</span></div>
        </a>

        <Modal show={this.state.showModal} onHide={this.Close} className="modal-token">
          <div className="popup-body">
            <div className="token">
              <a href="">
                <i><span>Upload <br/> Cover Image</span></i>
              </a>
            </div>

            <Form
              rowClassName={[{'form-group': false}, {row: false}, 'token-form']}
            >
              <Select
                name="token"
                value
                label="Token of "
                labelClassName={[{'col-sm-3': false}, 'token-label']}
                elementWrapperClassName={[{'col-sm-9': false}]}
                className={'form-control token-form-select'}
                options={typeToken}
              />

              <SBox />

              <div className="token-import">
                <a href="#">
                  <i></i>
                </a>

                <a onClick={this.smOpen} href="#" style={{'padding-left': '10px'}}>Import existing story as content for this token</a>
                <Modal show={this.state.showSmallModal} onHide={this.smClose} className="modal-small-token">
                  <Modal.Header closeButton>
                    <Modal.Title>Paste existing story into the text of token</Modal.Title>
                  </Modal.Header>
                  <div className="wrapper">
                    <Input
                      name="token_link"
                      value={this.smToken}
                      labelClassName={[{'col-sm-3': false}, 'disabled-label']}
                      elementWrapperClassName={[{'col-sm-9': false}, 'token-small-element-wrapper']}
                      placeholder="Paste here link of the story"
                      type="text"
                    />

                    <p>To find direct link to the story. Click on the arrow in the right upper corner of the story, then click on 'Story Details', and then copy the link from the browser address bar.</p>

                    <button className="btn-brand">Paste story</button>
                    <button className="btn-brand btn-cancel" onClick={this.smClose}>Cancel</button>
                  </div>
                </Modal>
              </div>

              <hr/>

              <ButtonToolbar>
                <DropdownButton className="bootstrap-pure-btn" title="Standard Terms and Conditions" pullRight >

                </DropdownButton>
              </ButtonToolbar>
              <ButtonToolbar>
                <DropdownButton className="bootstrap-pure-btn" title="Automatic Conditions" pullRight >
                </DropdownButton>
              </ButtonToolbar>

              <hr/>
              <div className="token-creators">
                <div className="owner">
                  <img src="http://devianmbanks.validbook.org/cdn/460/avatar/32x32.jpg?t=1490082285" alt=""/>
                  <div style={{'margin-left': '10px'}}>
                    <h5>Name Surname</h5> <br/>
                    <h6>first owner</h6>
                  </div>
                </div>
                <div className="creator">
                  <img src="http://devianmbanks.validbook.org/cdn/460/avatar/32x32.jpg?t=1490082285" alt=""/>
                  <div style={{'margin-right': '10px'}}>
                    <h5>Name Surname</h5> <br/>
                    <h6>token creator</h6>
                  </div>
                </div>
              </div>
              <button className="btn-brand" style={{float: 'right', 'margin-top': '15px'}}>Create Token</button>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddToken;
