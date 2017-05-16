import React, { Component, PropTypes } from 'react';
import { Form, Input } from 'formsy-react-components';
import { Modal } from 'react-bootstrap';
import './index.scss';

class AddChannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.onSubmitChannel = this.onSubmitChannel.bind(this);
  }

  onSubmitChannel(data) {
    console.log(data);
    this.props.createChannel(data.name, data.description)
      .then(this.Close())
      .then(() => this.props.loadChannels());
  }

  Close() {
    this.setState({ showModal: false });
  }
  Open() {
    this.setState({ showModal: true });
  }

  render() {
    const { channel_name, channel_description } = this.props;

    return (
      <div className="create-new-item" onClick={this.Open}>
        <a href="#">+ Create new channel</a>

        <Modal show={this.state.showModal} onHide={this.Close} className="modal-channel">
          <Modal.Header closeButton>
            <Modal.Title>Create channel</Modal.Title>
          </Modal.Header>

          <Form
            rowClassName={[{'form-group': false}, {row: false}, 'channel-form']}
            onSubmit={this.onSubmitChannel}
          >
            <Modal.Body>
              <Input
                name="name"
                value={channel_name}
                labelClassName={[{'col-sm-3': false}, 'channel-label']}
                label="Channel name"
                elementWrapperClassName={[{'col-sm-9': false}, 'channel-element-wrapper']}
                placeholder="Give name to your new channel"
                type="text"
              />
              <Input
                name="description"
                value={channel_description}
                labelClassName={[{'col-sm-3': false}, 'channel-label']}
                label="Description"
                elementWrapperClassName={[{'col-sm-9': false}, 'channel-element-wrapper']}
                placeholder="(Optional)"
                type="text"
              />
              <Input
                name="content"
                value=""
                labelClassName={[{'col-sm-3': false}, 'channel-label']}
                label="Channel`s Content"
                elementWrapperClassName={[{'col-sm-9': false}, 'channel-element-wrapper']}
                placeholder="Type name of person, book or thing that you want to follow in this channel"
                type="text"
              />
            </Modal.Body>

            <Modal.Footer>
              <div style={{float: 'right'}}>
                <button className="btn-brand btn-cancel" onClick={this.Close}>Cancel</button>
                <button className="btn-brand" style={{marginLeft: '10px'}} type="submit">Create Channel</button>
              </div>
            </Modal.Footer>
          </Form>

        </Modal>
      </div>
    );
  }
}

AddChannel.propTypes = {
  channel_name: PropTypes.string,
  channel_description: PropTypes.string,
  createChannel: PropTypes.func,
  loadChannels: PropTypes.func,
};

export default AddChannel;
