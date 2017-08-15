import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Form, Input, Select, RadioGroup, Checkbox } from 'formsy-react-components';
import {ButtonToolbar, DropdownButton} from 'react-bootstrap';
import { load as loadBookTree } from '../../redux/modules/book';
import BookTree from '../BooksTree';
import coverBook from '../../img/Default/cover-book.png';
import './index.scss';

const selectCountry = [
  {value: null, label: 'Select your country'},
  {value: 'United States', label: 'United States'},
  {value: 'Afghanistan', label: 'Afghanistan'},
  {value: 'Aland Islands', label: 'Aland Islands'},
  {value: 'Albania', label: 'Albania'},
  {value: 'Algeria', label: 'Algeria'}
];

const radioOptions = [
  {value: '0', label: 'only you'},
  {value: '1', label: 'anyone'},
  {value: '2', label: 'specific people'}
];

const radioOptions2 = [
  {value: '0', label: 'only you'},
  {value: '1', label: 'specific people'}
];

@connect((state) => ({
  requestedUser: state.user.requestedUser,
  uploadingImage: state.user.uploadingImage,
}), {

})

export default class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      loading: false,
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  Close() {
    this.setState({ showModal: false });
  }
  Open() {
    this.setState({ showModal: true });
  }

  handleSave() {
  }

  render() {
    const { book_name, book_description } = this.props;

    return (
      <div className="editBook-popup" onClick={this.Open}>
        <a><i/>Edit book</a>
        <Modal show={this.state.showModal} onHide={this.Close} className="modal-channel">
          <Modal.Header closeButton>
            <Modal.Title>Edit Book</Modal.Title>
          </Modal.Header>

          <Form
            rowClassName={[{'form-group': false}, {row: false}, 'channel-form']}
            onSubmit={(data) => console.log(data)}
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
              <Select
                name="location"
                value=""
                labelClassName={[{'col-sm-3': false}, 'channel-label']}
                label="Book location"
                elementWrapperClassName={[{'col-sm-9': false}, 'channel-element-wrapper']}
                placeholder="Select location"
                options={selectCountry}
              />
              <BookTree
                bookTreeArr={this.props.bookTreeArr}
              />
              <Input
                name="description"
                value={book_description}
                labelClassName={[{'col-sm-3': false}, 'channel-label']}
                label="Description"
                elementWrapperClassName={[{'col-sm-9': false}, 'channel-element-wrapper']}
                placeholder="(Optional)"
                type="text"
              />

              <div className="book-settings-access book-settings-access-dropdown">
                <ButtonToolbar>
                  <DropdownButton className="bootstrap-pure-btn" title="Access settings">
                    <RadioGroup
                      name="radioGrp1"
                      value="0"
                      label="Who can see that book exists?"
                      labelClassName={[{'col-sm-3': false}, 'book-list-label']}
                      elementWrapperClassName={[{'col-sm-9': false}, 'book-element-wrapper']}
                      options={radioOptions}
                      onChange={(name, value) => (console.log(name, value))}
                    />
                    <RadioGroup
                      name="radioGrp2"
                      value="1"
                      label="Who can see the content of the book?"
                      labelClassName={[{'col-sm-3': false}, 'book-list-label']}
                      elementWrapperClassName={[{'col-sm-9': false}, 'book-element-wrapper']}
                      options={radioOptions}
                    />
                    <RadioGroup
                      name="radioGrp3"
                      value="1"
                      label="Who can add stories to the book?"
                      labelClassName={[{'col-sm-3': false}, 'book-list-label']}
                      elementWrapperClassName={[{'col-sm-9': false}, 'book-element-wrapper']}
                      options={radioOptions}
                    />
                    <RadioGroup
                      name="radioGrp4"
                      value="1"
                      label="Who can delete stories from the book?"
                      labelClassName={[{'col-sm-3': false}, 'book-list-label']}
                      elementWrapperClassName={[{'col-sm-9': false}, 'book-element-wrapper']}
                      options={radioOptions}
                    />
                    <RadioGroup
                      name="radioGrp5"
                      value="1"
                      label="Who can manage access settings to the book?"
                      labelClassName={[{'col-sm-3': false}, 'book-list-label']}
                      elementWrapperClassName={[{'col-sm-9': false}, 'book-element-wrapper']}
                      options={radioOptions2}
                    />
                    <RadioGroup
                      name="radioGrp6"
                      value="1"
                      label="Who is the owner of the book?"
                      labelClassName={[{'col-sm-3': false}, 'book-list-label']}
                      elementWrapperClassName={[{'col-sm-9': false}, 'book-element-wrapper']}
                      options={radioOptions2}
                    />
                  </DropdownButton>
                </ButtonToolbar>
              </div>

              <div className="book-settings-access book-settings-access-dropdown book-other-settings-dropdown">
                <ButtonToolbar>
                  <DropdownButton className="bootstrap-pure-btn" title="Other settings">
                    <Checkbox
                      name="exportCheckbo1x"
                      value={false}
                      label="Automatically export stories from the book into its parent book"
                      labelClassName={[{'col-sm-3': false}, 'book-list-label checkboxStyles']}
                      className="export-checkbox"
                    />
                    <input
                      type="checkbox" name="exportCheckbox" id="exportCheckbox"
                    />
                    <label className="export-checkbox-label" htmlFor={'exportCheckbox'}><span/></label>
                    <Checkbox
                      name="importCheckbox"
                      value={true}
                      label="Automatically import stories into the book from its subbooks"
                      labelClassName={[{'col-sm-3': false}, 'book-list-label']}
                      className="import-checkbox checkboxStyles"
                    />
                    <br/>

                    <div>
                      <form>
                        <div>Who can see that book exists?</div>
                        <div>
                          <input type="radio" name="id1" id="id1" checked="true" />
                          <label htmlFor={'id1'}><span/><p>Only you</p></label>

                          <input type="radio" name="id1" id="id2" />
                          <label htmlFor={'id2'}><span/><p>Anyone</p></label>

                          <input type="radio" name="id1" id="id3"/>
                          <label htmlFor={'id3'}><span/><p>Specific people</p></label>
                        </div>
                      </form>
                    </div>

                    <div>
                      <form>
                        <div>Who can see the content of the book?</div>
                        <div>
                          <input type="radio" name="id2" id="id4" checked={false} />
                          <label htmlFor={'id4'}><span/><p>Only you</p></label>

                          <input type="radio" name="id2" id="id5" checked={true} />
                          <label htmlFor={'id5'}><span/><p>Anyone</p></label>

                          <input type="radio" name="id2" id="id6" checked={false}/>
                          <label htmlFor={'id6'}><span/><p>Specific people</p></label>
                        </div>
                      </form>
                    </div>

                  </DropdownButton>
                </ButtonToolbar>
              </div>

            </Modal.Body>

            <Modal.Footer>
              <div style={{float: 'left'}}>Delete</div>
              <div style={{float: 'right'}}>
                <button className="btn-brand btn-cancel" onClick={this.Close}>Cancel</button>
                <button className="btn-brand" style={{marginLeft: '10px'}} type="submit">Create Book</button>
              </div>
            </Modal.Footer>
          </Form>

        </Modal>
      </div>
    );
  }
}

EditBook.propTypes = {};
