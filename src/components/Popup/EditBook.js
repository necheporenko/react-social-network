import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import {Form, Input, Select, RadioGroup, Checkbox} from 'formsy-react-components';
import {ButtonToolbar, DropdownButton} from 'react-bootstrap';
import {load as loadBookTree} from '../../redux/modules/book';
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
}), {})

export default class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      loading: false,
      settingsInDropdown: this.props.bookSettings,
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.handleSaveSettingsInDropdown = this.handleSaveSettingsInDropdown.bind(this);
  }

  Close() {
    this.setState({showModal: false});
  }

  Open() {
    this.setState({showModal: true});
  }

  handleSaveSettingsInDropdown(options, index) {
    const newSettingsInDropdown = this.state.settingsInDropdown;
    newSettingsInDropdown[`${options}`] = index;

    this.setState({
      settingsInDropdown: newSettingsInDropdown
    });

    console.log(this.state.settingsInDropdown);
  }

  render() {
    const {book_name, book_description} = this.props;

    const radioAccessSettingsDropdown = [
      {
        label: 'Who can see the content of the book?',
        type: 'can_see_content',
        radio: ['only you', 'anyone', 'specific people'],
        selectedOptions: this.state.settingsInDropdown.can_see_content
      },
      {
        label: 'Who can add stories to the book?',
        type: 'can_add_stories',
        radio: ['only you', 'anyone', 'specific people'],
        selectedOptions: this.state.settingsInDropdown.can_add_stories
      },
      {
        label: 'Who can delete stories from the book?',
        type: 'can_delete_stories',
        radio: ['only you', 'anyone', 'specific people'],
        selectedOptions: this.state.settingsInDropdown.can_delete_stories
      },
      {
        label: 'Who can manage access settings to the book??',
        type: 'can_manage_settings',
        radio: ['only you', 'specific people'],
        selectedOptions: this.state.settingsInDropdown.can_manage_settings
      }
    ];

    return (
      <div className="editBook-popup" onClick={this.Open}>
        <a><i/>Edit book</a>
        <Modal show={this.state.showModal} onHide={this.Close} className="modal-channel">
          <Modal.Header closeButton>
            <Modal.Title>Edit Book</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form
              rowClassName={[{'form-group': false}, {row: false}, 'channel-form']}
              onSubmit={(data) => console.log(data)}
            >
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
            </Form>

            <div className="book-settings-access book-settings-access-dropdown">
              <ButtonToolbar>
                <DropdownButton className="bootstrap-pure-btn" title="Access settings" id={'settings1'}>
                  {/*<div>*/}
                  <form>
                    {radioAccessSettingsDropdown.map((element, index) => (
                      <div className="wrapper-block-radio" style={{padding: '4px 0'}}>
                        <div className="block-radio">
                          <div>{element.label}</div>
                          <div>{element.radio.map((radioInput, indexRadio) => (
                            <div>
                              {console.log(element.selectedOptions, indexRadio, index, 'BOT', element.radio.length)}
                              <input
                                type="radio" value={element.type} name={index} id={`${indexRadio}${index}drop`}
                                checked={element.selectedOptions === indexRadio}
                                onChange={(event) => this.handleSaveSettingsInDropdown(event.target.value, indexRadio)}
                              />
                              <label htmlFor={`${indexRadio}${index}drop`}><span/><p>{radioInput}</p></label>
                            </div>
                          ))}
                          </div>
                        </div>
                        {element.selectedOptions === element.radio.length - 1 &&
                        <input type="text" placeholder="Type name or email address"/>
                        }
                      </div>
                    ))}
                  </form>
                  {/*</div>*/}
                </DropdownButton>
              </ButtonToolbar>
            </div>

            <div className="book-settings-access book-settings-access-dropdown book-other-settings-dropdown">
              <ButtonToolbar>
                <DropdownButton className="bootstrap-pure-btn" title="Other settings" id={'settings2'}>
                  {/*<Checkbox*/}
                  {/*name="exportCheckbo1x"*/}
                  {/*value={false}*/}
                  {/*label="Automatically export stories from the book into its parent book"*/}
                  {/*labelClassName={[{'col-sm-3': false}, 'book-list-label checkboxStyles']}*/}
                  {/*className="export-checkbox"*/}
                  {/*/>*/}
                  <div className="wrapper-checkbox">
                    <input type="checkbox" name="exportCheckbox" id="exportCheckbox"/>
                    <label className="export-checkbox-label" htmlFor={'exportCheckbox'}><span/></label>
                    <i className="export-checkbox"/>
                    <p>Automatically export stories from the book into its parent book</p>
                  </div>

                  <div className="wrapper-checkbox">
                    <input type="checkbox" name="importCheckbox" id="importCheckbox"/>
                    <label htmlFor={'importCheckbox'}><span/></label>
                    <i className="import-checkbox"/>
                    <p>Automatically import stories into the book from its subbooks</p>
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

        </Modal>
      </div>
    );
  }
}

EditBook.propTypes = {};
