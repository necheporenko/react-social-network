import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import './index.scss';

export default class ShowAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
  }

  Close() {
    this.setState({ showModal: false });
  }
  Open() {
    this.setState({ showModal: true });
  }

  render() {
    const {avatar} = this.props;
    return (
      <div className="show-avatar-popup" onClick={this.Open}>
        <Modal show={this.state.showModal} onHide={this.Close} className="show-avatar-popup-modal">
          <Modal.Body>
            <img src={avatar} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

ShowAvatar.propTypes = {
  avatar: PropTypes.string
};
