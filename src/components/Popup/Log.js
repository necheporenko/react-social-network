import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { relogStory } from '../../redux/modules/story';
import BookTreeForLogPopup from '../BooksTree/BookTreeForLogPopup';
import './index.scss';

@connect((state) => ({
  requestedUser: state.user.requestedUser,
  uploadingImage: state.user.uploadingImage,
}), {
  relogStory
})

export default class LogStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      loading: false,
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.relog = this.relog.bind(this);
  }

  Close() {
    this.setState({ showModal: false });
  }
  Open() {
    this.setState({ showModal: true });
  }

  relog(books) {
    const currentBook = [books];
    console.log('hi', currentBook, this.props.storyID);
    this.props.relogStory(this.props.storyID, currentBook);
  }

  render() {
    return (
      <div className="log-popup" onClick={this.Open}>
        <Modal show={this.state.showModal} onHide={this.Close} className="modal-log avatar-popup">
          <Modal.Header closeButton>
            <Modal.Title>Log Story</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <BookTreeForLogPopup
              relog={this.relog}
            />
          </Modal.Body>

        </Modal>
      </div>
    );
  }
}

LogStory.propTypes = {
  storyID: PropTypes.number,
  relogStory: PropTypes.func,
};
