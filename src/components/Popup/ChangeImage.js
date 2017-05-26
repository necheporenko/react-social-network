import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { Modal } from 'react-bootstrap';
import './index.scss';
import coverBook from '../../img/Default/cover-book.png';


@connect((state) => ({
  // bookTreeArr: state.book.bookTreeArr,
}), {})

export default class ChangeImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      file: '',
      coverBook: coverBook,
      scale: 1.2,
      rotate: 0,
      border: 0,
      preview: null,
      width: 460,
      height: 200,
      picture: 'http://devianmbanks.validbook.org/cdn/stories_images/713/original.jpg',
      test: '',
      // qwerty,
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.onSubmitBook = this.onSubmitBook.bind(this);
    this.handleCoverChange = this.handleCoverChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleScale = this.handleScale.bind(this);
  }


  onSubmitBook(data) {
    console.log(data);
    this.props.createBook(data.name, 'root')
      .then(this.Close())
      .then(() => this.props.loadBookTree());
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

  handleSave = () => {
    const resized = this.editor.getImageScaledToCanvas().toDataURL();
    this.setState({
      test: resized,
    });
  };

  setEditorRef = (editor) => {
    this.editor = editor;
  };

  handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  };

  render() {
    const { book_name, book_description } = this.props;
    const { coverBook } = this.state;
    // const showPopup = this.props;
    const visible = this.props.visible;
    const currentImage = this.props.currentImage;

    return (
      <div className="create-new-book" onClick={this.Open}>
        <Modal show={visible} onHide={this.Close} className="modal-channel">
          <Modal.Header closeButton>
            <Modal.Title>Create new book</Modal.Title>
          </Modal.Header>

          {/*<Form*/}
          {/*rowClassName={[{'form-group': false}, {row: false}, 'channel-form']}*/}
          {/*onSubmit={this.onSubmitBook}*/}
          {/*>*/}
          <Modal.Body>
            <div className="wrapper-popup">
              <h4>Crop it</h4>
              {/*<img src={coverBook} alt=""/>*/}
              <AvatarEditor
                ref={this.setEditorRef}
                image={currentImage}
                width={568}
                height={200}
                border={0}
                color={[255, 255, 255, 0.6]} // RGBA
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
            <br />
            <input type="button" onClick={this.handleSave} value="Preview" />
            <br />
            <p>IMG</p>
            <img src={this.state.test} alt="" crossOrigin="anonymous" />

          </Modal.Body>

          <Modal.Footer>
            <div style={{float: 'right'}}>
              <button className="btn-brand btn-cancel" onClick={this.Close}>Cancel</button>
              <button className="btn-brand" style={{marginLeft: '10px'}} type="submit">Crop and Save</button>
            </div>
          </Modal.Footer>
          {/*</Form>*/}

        </Modal>
      </div>
    );
  }
}

ChangeImage.propTypes = {

};
