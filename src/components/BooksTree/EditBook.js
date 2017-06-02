import React, { Component, PropTypes } from 'react';
import { Form, Input, Select } from 'formsy-react-components';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { edit as editBook, load as loadBookTree } from '../../redux/modules/book';
import { showPopUp } from '../../redux/modules/form';
import ChangeImage from '../Popup/ChangeImage';
import './index.scss';
import coverBook from '../../img/Default/cover-book.png';

//for test
// const selectCountry = [
//   {value: null, label: 'Select your country'},
//   {value: 'United States', label: 'United States'},
//   {value: 'Afghanistan', label: 'Afghanistan'},
//   {value: 'Aland Islands', label: 'Aland Islands'},
//   {value: 'Albania', label: 'Albania'},
//   {value: 'Algeria', label: 'Algeria'}
// ];

@connect((state) => ({
  bookTreeArr: state.book.bookTreeArr,
  visible: state.forms.visible,
  currentImage: state.forms.currentImage
}), {
  loadBookTree,
  editBook,
  showPopUp
})

class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      file: '',
      coverBook: coverBook,
      // scale: 1.2,
      // rotate: 0,
      // border: 0,
      // preview: null,
      // width: 460,
      // height: 200,
      // picture: 'http://devianmbanks.validbook.org/cdn/stories_images/713/original.jpg',
      // test: '',
      // showPopup: false
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.onSubmitBook = this.onSubmitBook.bind(this);
    this.handleCoverChange = this.handleCoverChange.bind(this);
  }

  onSubmitBook(data) {
    console.log(data);
    this.props.editBook(this.props.book_slug, data.name, data.description)
      .then(this.Close())
      .then(() => this.props.loadBookTree());
  }

  Close() {
    this.setState({ showModal: false });
  }
  Open() {
    this.setState({ showModal: true });
  }

  handleCoverChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        // file: file,
        // coverBook: reader.result,
      });
      this.props.showPopUp(true, reader.result);
      file = null;
    };
    reader.readAsDataURL(file);
  }

  render() {
    const { book_name, book_description } = this.props;
    const { coverBook } = this.state;

    return (
      <div className="create-new-book" onClick={this.Open}>
        {/*<a href="#">+ Create new book</a>*/}
        <div className="active-popup"></div>

        <Modal show={this.state.showModal} onHide={this.Close} className="modal-channel">
          <Modal.Header closeButton>
            <Modal.Title>Edit book</Modal.Title>
          </Modal.Header>

          <Form
            rowClassName={[{'form-group': false}, {row: false}, 'channel-form']}
            onSubmit={this.onSubmitBook}
          >
            <Modal.Body>
              <div className="wrapper-popup">
                <h4>Cover image</h4>

                <img src={coverBook} alt=""/>

                <div className="add-cover-book">
                  <input type="file" onChange={(e) => this.handleCoverChange(e)}/>
                  <span>Change Cover</span>
                </div>
              </div>

              <Input
                name="name"
                value={book_name}
                labelClassName={[{'col-sm-3': false}, 'channel-label']}
                label="Book name"
                elementWrapperClassName={[{'col-sm-9': false}, 'channel-element-wrapper']}
                placeholder="Type name or select book template"
                type="text"
              />
              {/*<Select*/}
                {/*name="location"*/}
                {/*value=""*/}
                {/*labelClassName={[{'col-sm-3': false}, 'channel-label']}*/}
                {/*label="Book location"*/}
                {/*elementWrapperClassName={[{'col-sm-9': false}, 'channel-element-wrapper']}*/}
                {/*placeholder="Select location"*/}
                {/*options={selectCountry}*/}
              {/*/>*/}
              <Input
                name="description"
                value={book_description}
                labelClassName={[{'col-sm-3': false}, 'channel-label']}
                label="Description"
                elementWrapperClassName={[{'col-sm-9': false}, 'channel-element-wrapper']}
                placeholder="(Optional)"
                type="text"
              />
            </Modal.Body>

            <Modal.Footer>
              <div style={{float: 'right'}}>
                <button className="btn-brand btn-cancel" onClick={this.Close}>Cancel</button>
                <button className="btn-brand" style={{marginLeft: '10px'}} type="submit">Edit Book</button>
              </div>
            </Modal.Footer>
          </Form>

          <ChangeImage
            showPopUp={this.props.showPopUp}
            visible={this.props.visible}
            currentImage={this.props.currentImage}
          />

        </Modal>
      </div>
    );
  }
}

EditBook.propTypes = {
  book_name: PropTypes.string,
  book_description: PropTypes.string,
  book_slug: PropTypes.string,
  loadBookTree: PropTypes.func,
  editBook: PropTypes.func,
};

export default EditBook;
