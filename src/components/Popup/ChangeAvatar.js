import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { Modal } from 'react-bootstrap';
import { getUser, load as loadAuth } from '../../redux/modules/user';
import { load as loadStories } from '../../redux/modules/story';
import './index.scss';

@connect((state) => ({
  requestedUser: state.user.requestedUser,
  uploadingImage: state.user.uploadingImage,
}), {
  getUser,
  loadAuth,
  loadStories
})

export default class ChangeAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      file: '',
      scale: 1.2,
      picture: '',
      loading: false,
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleScale = this.handleScale.bind(this);
  }

  Close() {
    this.props.showPopUp(false, '');
  }
  Open() {
    this.props.showPopUp(true);
  }

  handleSave() {
    const newImage = this.editor.getImage().toDataURL('image/jpeg', 1.0);
    this.setState({picture: newImage});
    this.props.uploadAvatarBase64(newImage);
    this.props.uploadAvatar(newImage, this.props.currentImage.name, this.props.currentImage.url)
    .then(() => this.props.getUser(this.props.requestedUser.slug))
    .then(() => this.props.loadAuth())
    .then(() => this.props.loadStories(this.props.requestedUser.slug))
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
    const { uploadingImage, visible, currentImage } = this.props;

    return (
      <div className="create-new-book" onClick={this.Open}>
        <Modal show={visible} onHide={this.Close} className="modal-channel avatar-popup">
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile Image</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="wrapper-popup">
              <h4>Crop it</h4>
              <div style={{width: '280px', margin: '0 auto'}}>
                <AvatarEditor
                  ref={this.setEditorRef}
                  image={currentImage.url}
                  width={230}
                  height={230}
                  border={25}
                  color={[255, 255, 255, 0.6]}
                  scale={parseFloat(this.state.scale)}
                  rotate={0}
                  onSave={this.handleSave}
                  style={uploadingImage ? {opacity: 0.3} : {opacity: 1}}
                />
                { uploadingImage &&
                  <div className="wrapper-loader">
                    <div className="loader">
                      <svg className="circular" viewBox="25 25 50 50">
                        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                      </svg>
                    </div>
                  </div>
                }
              </div>
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
              defaultValue="1.2"
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

ChangeAvatar.propTypes = {
  showPopUp: PropTypes.func,
  uploadAvatar: PropTypes.func,
  uploadAvatarBase64: PropTypes.func,
  visible: PropTypes.bool,
  currentImage: PropTypes.string,
  uploadingImage: PropTypes.bool,
  getUser: PropTypes.func,
  loadAuth: PropTypes.func,
  loadStories: PropTypes.func,
  requestedUser: PropTypes.object,
};
