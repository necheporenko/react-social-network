import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import './index.scss';

export default class PinStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    // this.deleteStory = this.deleteStory.bind(this);
  }

  Close() {
    this.setState({ showModal: false });
  }
  Open() {
    this.setState({ showModal: true });
  }

  // deleteStory() {
  //   this.props.deleteStory(this.props.id);
  // }

  render() {
    return (
      <div className="delete-story-popup" onClick={this.Open}>
        <Modal show={this.state.showModal} onHide={this.Close}>
          <Modal.Header closeButton>
            <Modal.Title>Pin Story</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure want to delete this story? It will be deleted from all books.</p>
          </Modal.Body>

          <Modal.Footer>
            <div style={{float: 'right'}}>
              <button className="btn-brand btn-cancel" onClick={this.Close}>Cancel</button>
              <button
                className="btn-brand" style={{marginLeft: '10px'}} type="submit"
                // onClick={() => this.deleteStory()}
              >Pin Story</button>
            </div>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}

PinStory.propTypes = {
  deleteStory: PropTypes.func,
  id: PropTypes.number,
};
