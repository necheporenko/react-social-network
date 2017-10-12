import React, {PureComponent, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import {convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import Files from 'react-files';
import {ButtonToolbar, DropdownButton} from 'react-bootstrap';
import uploadImageCallBack from './uploadImageCallBack';
import {create as createStory} from '../../../redux/modules/story';
import BookTreeForSboxContainer from '../../../containers/BookTreeForSboxContainer';
import './draft-wysiwyg.scss';
import './index.scss';

const list = ['20px', '60px'];
let index;
let step = 0;

@connect((state) => ({
  arrCheckbox: state.book.arrCheckbox,
  bookTreeArr: state.book.bookTreeArr,
}), {
  createStory,
})

class Sbox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: '',
      data: '',
      toolbarHidden: true,
      sboxVisibleElements: 'none',
      sboxFocusBtn: '#5c96d0',
      sboxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)',
      jump: '20px',
      loud: {
        quiet_log: false,
        loud_log: true,
        loud_book: true,
        post_fb: false,
        post_twitter: false,
        storyline: true
      },
      loud_type: {
        in_channels: 1,
        in_books: 1,
      },
      loudIcon: 'loud_log_icon',
      visibility: {
        public: true,
        private: false,
        custom: false
      },
      visibility_type: 0,
      visibilityIcon: 'public_icon',
      files: []
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.showToolbar = this.showToolbar.bind(this);
    this.onSubmitStory = this.onSubmitStory.bind(this);
    this.test = this.test.bind(this);
    this.focusSboxElement = this.focusSboxElement.bind(this);
    this.handleCheckLoud = this.handleCheckLoud.bind(this);
    this.handleCheckVisibility = this.handleCheckVisibility.bind(this);
    this.selectedBooks = this.selectedBooks.bind(this);
  }


  onEditorStateChange = (editorContent) => {
    this.setState({
      editorContent,
      data: draftToHtml(convertToRaw(editorContent.getCurrentContent()))
    });
  };

  focusSboxElement() {
    this.setState({sboxVisibleElements: 'flex', sboxFocusBtn: '#1870C8', sboxShadow: '0px 7px 15px 2px rgba(0, 0, 0, 0.15)'});
  }


  showToolbar() {
    ++step;
    index = step % 2;
    this.setState({
      toolbarHidden: !this.state.toolbarHidden,
      jump: list[index]
    });
  }

  test(event) {
    // event.preventDefault();
    console.log(this.state.loud);
    console.log('hi');
  }

  handleCheckLoud(event) {
    this.state.loud[event.target.name] = event.target.checked;

    const currentStateItem = event.target.checked;
    const currentStateLoud = Object.assign(this.state.loud);

    if (!this.state.loud.loud_log && !this.state.loud.loud_book) {
      currentStateLoud.quiet_log = true;
      currentStateLoud.loud_log = false;
      currentStateLoud.loud_book = false;
      currentStateLoud.storyline = false;
      this.setState({
        loud: currentStateLoud,
        loudIcon: 'quiet_log_icon',
        loud_type: {
          in_channels: 0,
          in_books: 0,
        }
      });
    } else if (this.state.loud.loud_log && !this.state.loud.loud_book) {
      currentStateLoud.loud_book = true;
      this.setState({
        loud: currentStateLoud,
        loud_type: {
          in_channels: 1,
          in_books: 1,
        }
      });
    }

    switch (event.target.name) {
      case 'quiet_log':
        if (currentStateItem) {
          this.setState({
            loud: {
              quiet_log: true,
              loud_log: false,
              loud_book: false,
              post_fb: false,
              post_twitter: false,
              storyline: false
            },
            loud_type: {
              in_channels: 0,
              in_books: 0,
            },
            loudIcon: 'quiet_log_icon'
          });
        }
        break;

      case 'loud_log':
        if (!currentStateItem) {
          currentStateLoud.loud_log = false;
          this.setState({
            loud: currentStateLoud,
            loud_type: {
              in_channels: 0,
              in_books: 1,
            }
          });
        } else {
          currentStateLoud.quiet_log = false;
          currentStateLoud.loud_log = true;
          currentStateLoud.loud_book = true;
          currentStateLoud.storyline = true;
          this.setState({
            loud: currentStateLoud,
            loudIcon: 'loud_log_icon',
            loud_type: {
              in_channels: 1,
              in_books: 1,
            }
          });
        }
        break;

      case 'loud_book':
        if (currentStateItem) {
          currentStateLoud.loud_book = true;
          currentStateLoud.quiet_log = false;
          this.setState({
            loud: currentStateLoud,
            loudIcon: 'loud_book_icon',
            loud_type: {
              in_channels: 0,
              in_books: 1,
            }
          });
        }
        break;

      default:
        this.setState({loud: this.state.loud, loud_type: this.state.loud_type});
    }
  }

  handleCheckVisibility(event) {
    this.state.visibility[event.target.name] = event.target.checked;
    const currentStateItem = event.target.checked;
    // const currentStateVisibility = Object.assign(this.state.loud);

    switch (event.target.name) {
      case 'public_visibility':
        if (currentStateItem) {
          this.setState({
            visibility: {
              public: true,
              private: false,
              custom: false
            },
            visibilityIcon: 'public_icon',
            visibility_type: 0
          });
        }
        break;

      case 'private_visibility':
        if (currentStateItem) {
          this.setState({
            visibility: {
              public: false,
              private: true,
              custom: false
            },
            visibilityIcon: 'private_icon',
            visibility_type: 1
          });
        }
        break;

      case 'custom_visibility':
        if (currentStateItem) {
          this.setState({
            visibility: {
              public: false,
              private: false,
              custom: true
            },
            visibilityIcon: 'custom_icon',
            visibility_type: 2
          });
        }
        break;

      default:
        this.setState({visibility: this.state.visibility});
    }
  }

  selectedBooks(arrCheckbox) {
    const quantity = arrCheckbox.length;

    if (quantity === 0) {
      return 'Select Book';
    } else if (quantity === 1) {
      let result;
      this.props.bookTreeArr[0].children.map(book => {
        if (book.key === arrCheckbox[0]) {
          result = book.name;
        }
      });
      return result;
    } else if (quantity > 1) {
      return `${quantity} books`;
    }
  }


  onFilesError = (error, file) => {
    console.log(`error code ${error.code}: ${error.message}`);
  };

  onSubmitStory() {
    // console.log('onSubmitStory', this.state.data, this.state.loud.storyline, this.state.loud_type, this.state.visibility_type);
    this.props.createStoryFunc(
      this.state.data,
      this.props.arrCheckbox,
      this.state.files
      // this.state.loud.storyline,
      // this.state.loud_type,
      // this.state.visibility_type
      // obj
    );
      // .then(() => this.props.reloadStream());
    this.setState({
      editorContent: '',        //  cleaning input
      files: [],
      sboxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)'
    });
  }

  onFilesChange = (files) => {
    this.setState({
      files
    });
  };


  // filesUpload() {
  //   const formData = new FormData();
  //   Object.keys(this.state.files).forEach((key) => {
  //     const file = this.state.files[key];
  //     formData.append('file', new Blob([file], {type: file.type}), file.name || 'file');
  //   });
  //   console.log(formData);
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('POST', 'http://api.validbook.org/v1/upload/story-image?&access_token=RCEqGhqnani8jMQF56cBeXs_-t_-5fHZ', true);
  //   xhr.send(formData);
  // }

  render() {
    const {editorContent, sboxShadow} = this.state;
    const {first_name, last_name, avatar32} = this.props.authorizedUser;
    const link = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;

    return (
      <div className="sbox" style={{boxShadow: sboxShadow}}>
        <Editor
          toolbarHidden={this.state.toolbarHidden}
          onFocus={this.focusSboxElement}
          wrapperClassName="wrapper-sbox"
          editorClassName="editor-sbox"
          toolbarClassName="toolbar-sbox"
          editorState={editorContent}
          onEditorStateChange={this.onEditorStateChange}
          placeholder="Log something..."
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'image'],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough']
            },
            list: {
              inDropdown: true
            },
            textAlign: {
              inDropdown: true
            },
            link: {
              inDropdown: true
            },
            // image: {
            //   uploadCallback: uploadImageCallBack,
            //   defaultSize: {
            //     width: '100%',
            //     height: '100%'
            //   }
            // }
          }}
        />

        <div className="files">
          <Files
            ref="files"
            className="files-dropzone-gallery"
            onChange={this.onFilesChange}
            onError={this.onFilesError}
            accepts={['image/*', 'text/*']}
            multiple
            clickable={false}
          >
            {
              this.state.files.length > 0 &&
              <div className="files-gallery">
                {this.state.files.map((file) =>
                  <img
                    className="files-gallery-item" src={file.preview.url} key={file.id}
                    style={{width: '100px', height: '100px'}}/>
                )}
              </div>
            }
          </Files>
        </div>

        <div className="sbox-user-avatar32" style={{top: this.state.jump, position: 'absolute', left: '20px'}}>
          <Link to={link}>
            <img
              src={avatar32}
              style={{
                width: '32px',
                height: '32px',
                border: '1px solid #dddddd',
                borderRadius: '50%'
              }}
            />
          </Link>
        </div>
        {/*<form onSubmit={this.test}>*/}
        <div className="sbox-footer">
          <div style={{display: 'flex'}}>
            <div
              className="btn-brand"
              type="submit"
              onClick={this.onSubmitStory}
              style={{
                fontSize: '13px',
                // backgroundColor: this.state.sboxFocusBtn
              }}
            >Log
            </div>
            <ButtonToolbar>
              <DropdownButton
                className="bootstrap-pure-btn"
                bsStyle="default"
                title={this.selectedBooks(this.props.arrCheckbox)}
                id={5}
              >
                <div className="sbox-booktree">
                  <BookTreeForSboxContainer
                    bookTreeArr={this.props.bookTreeArr}
                  />
                </div>
              </DropdownButton>
              <DropdownButton
                className="bootstrap-pure-btn sbox-dropdown-btn" bsStyle="default"
                title={<i className={`dropdown-btn-icon ${this.state.loudIcon}`}/>} id={6}
                style={{display: this.state.sboxVisibleElements}}
              >
                <div className="sbox-logging">
                  <ul>
                    <li style={{borderBottom: '1px solid #eee'}}>
                      <div>
                        <input
                          type="radio" name="quiet_log" id="quiet_log"
                          checked={this.state.loud.quiet_log}
                          onChange={this.handleCheckLoud}/>
                        <label htmlFor={'quiet_log'}><span/></label>
                        <div>
                          <i className="quiet_log_icon"/>
                          <p>Quiet logging</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <input
                          type="checkbox" name="loud_log" id="loud_log"
                          checked={this.state.loud.loud_log}
                          onChange={this.handleCheckLoud}/>
                        <label htmlFor={'loud_log'}><span/></label>
                        <div>
                          <i className="loud_log_icon"/>
                          <p>Loud logging</p>
                        </div>
                      </div>
                    </li>
                    <li style={{borderBottom: '1px solid #eee'}}>
                      <div>
                        <input
                          type="checkbox" name="loud_book" id="loud_book"
                          checked={this.state.loud.loud_book}
                          onChange={this.handleCheckLoud}/>
                        <label htmlFor={'loud_book'}><span/></label>
                        <div>
                          <i className="loud_book_icon"/>
                          <p>Loud in book</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <input
                          type="checkbox" name="post_fb" id="post_fb"
                          checked={this.state.loud.post_fb}
                          onChange={this.handleCheckLoud}/>
                        <label htmlFor={'post_fb'}><span/></label>
                        <div>
                          <i className="post_fb_icon"/>
                          <p>Post to Facebook</p>
                        </div>
                      </div>
                    </li>
                    <li style={{borderBottom: '1px solid #eee'}}>
                      <div>
                        <input
                          type="checkbox" name="post_twitter" id="post_twitter"
                          checked={this.state.loud.post_twitter}
                          onChange={this.handleCheckLoud}/>
                        <label htmlFor={'post_twitter'}><span/></label>
                        <div>
                          <i className="post_twitter_icon"/>
                          <p>Post to Twitter</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <input
                          type="checkbox" name="storyline" id="storyline"
                          checked={this.state.loud.storyline}
                          onChange={this.handleCheckLoud}/>
                        <label htmlFor={'storyline'}><span/></label>
                        <div>
                          <p>Story will appear on Storyline</p>
                        </div>
                      </div>
                    </li>
                    {/*<button onClick={() => console.log('state 8:', this.state.loud_type)}>click for test</button>*/}
                  </ul>
                </div>
              </DropdownButton>
              <DropdownButton
                className="bootstrap-pure-btn sbox-dropdown-btn" bsStyle="default"
                title={<i className={`dropdown-btn-icon ${this.state.visibilityIcon}`}/>} id={7}
                style={{display: this.state.sboxVisibleElements}}
              >
                <div className="sbox-visibility">
                  <ul>
                    <li>
                      <div>
                        <input
                          type="checkbox" name="public_visibility" id="public_visibility"
                          checked={this.state.visibility.public}
                          onChange={this.handleCheckVisibility}/>
                        <label htmlFor={'public_visibility'}><span/></label>
                        <div>
                          <i className="public_icon"/>
                          <p>Public</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <input
                          type="checkbox" name="private_visibility" id="private_visibility"
                          checked={this.state.visibility.private}
                          onChange={this.handleCheckVisibility}/>
                        <label htmlFor={'private_visibility'}><span/></label>
                        <div>
                          <i className="private_icon"/>
                          <p>Private</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <input
                          type="checkbox" name="custom_visibility" id="custom_visibility"
                          checked={this.state.visibility.custom}
                          onChange={this.handleCheckVisibility}/>
                        <label htmlFor={'custom_visibility'}><span/></label>
                        <div>
                          <i className="custom_icon"/>
                          <p>Custom</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </DropdownButton>
            </ButtonToolbar>
          </div>
          <div style={{display: this.state.sboxVisibleElements}}>
            <span style={{marginTop: '4px'}} onClick={this.showToolbar}>More Options</span>
            <Files
              ref="files"
              className="files-dropzone-gallery"
              onChange={this.onFilesChange}
              onError={this.onFilesError}
              accepts={['image/*', 'text/*']}
              multiple
              clickable
            >
              <div className="camera">
                <i/>
              </div>
            </Files>
          </div>

        </div>
        {/*</form>*/}
      </div>
    );
  }
}

Sbox.propTypes = {
  authorizedUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    avatar32: PropTypes.string,
  }),
  createStory: PropTypes.func,                //story
  loadStories: PropTypes.func,
  reloadStream: PropTypes.func,
  bookTreeArr: PropTypes.array,
  arrCheckbox: PropTypes.array,
};

export default Sbox;
