import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { Modal } from 'react-bootstrap';
import { getUser, getUserSlug, } from '../../redux/modules/user';
import './index.scss';

@connect((state) => ({
  requestedUser: state.user.requestedUser,
}), {
  getUser,
  getUserSlug,
})

export default class ChangeCoverImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      file: '',
      scale: 1,
      preview: null,
      picture: '',
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.handleCoverChange = this.handleCoverChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleScale = this.handleScale.bind(this);
  }

  Close() {
    this.props.showPopUp(false, '');
  }
  Open() {
    this.props.showPopUp(true);
  }

  handleCoverChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        coverBook: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  handleSave() {
    const newImage = this.editor.getImage().toDataURL();
    this.setState({
      picture: newImage,
    });
    this.props.uploadUserCoverBase64(newImage);
    this.props.uploadUserCover(newImage)
    .then(() => this.props.getUser(this.props.requestedUser.slug))
    .then(() => this.Close());
  }

  setEditorRef = (editor) => {
    this.editor = editor;
  };

  handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  };

  render() {
    const visible = this.props.visible;
    const currentImage = this.props.currentImage;

    return (
      <div className="create-new-book" onClick={this.Open}>
        <Modal show={visible} onHide={this.Close} className="modal-channel">
          <Modal.Header closeButton>
            <Modal.Title>Edit cover image1 </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="wrapper-popup">
              <h4>Crop it</h4>
              <AvatarEditor
                ref={this.setEditorRef}
                image={currentImage}
                width={540}
                height={68}
                border={20}
                color={[255, 255, 255, 0.6]}
                scale={parseFloat(this.state.scale)}
                rotate={0}
                onSave={this.handleSave}
              />
            </div>

            Zoom:
            <br />
            <input
              name="scale"
              type="range"
              onChange={this.handleScale}
              min="1"
              max="2"
              step="0.01"
              defaultValue="1"
            />
          </Modal.Body>

          <Modal.Footer>
            <div style={{float: 'right'}}>
              <button className="btn-brand btn-cancel" onClick={this.Close}>Cancel</button>
              <button className="btn-brand" style={{marginLeft: '10px'}} type="submit" onClick={this.handleSave}>Crop and Save</button>
            </div>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}

ChangeCoverImage.propTypes = {
  showPopUp: PropTypes.func,
  uploadUserCover: PropTypes.func,
  uploadUserCoverBase64: PropTypes.func,
  visible: PropTypes.bool,
  currentImage: PropTypes.string,
};
