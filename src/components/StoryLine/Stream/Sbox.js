import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { ButtonToolbar, DropdownButton } from 'react-bootstrap';
import { getUserNotifications } from '../../../redux/modules/profile';
import uploadImageCallBack from './uploadImageCallBack';
import { create as createStory } from '../../../redux/modules/story';
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
  getUserNotifications
})

class Sbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: '',
      data: '',
      toolbarHidden: true,
      sboxVisibleElements: 'none',
      sboxFocusBtn: '#5c96d0',
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
      visibility_type: 'public',
      visibilityIcon: 'public_icon'
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.showToolbar = this.showToolbar.bind(this);
    this.onSubmitStory = this.onSubmitStory.bind(this);
    this.test = this.test.bind(this);
    this.focusSboxElement = this.focusSboxElement.bind(this);
    this.handleCheckLoud = this.handleCheckLoud.bind(this);
    this.handleCheckVisibility = this.handleCheckVisibility.bind(this);
    this.testSocket = this.testSocket.bind(this);
    this.selectedBooks = this.selectedBooks.bind(this);
  }

  onEditorStateChange = (editorContent) => {
    this.setState({
      editorContent,
      data: draftToHtml(convertToRaw(editorContent.getCurrentContent()))
    });
  };

  focusSboxElement() {
    this.setState({sboxVisibleElements: 'flex', sboxFocusBtn: '#1870C8'});
  }

  onSubmitStory() {
    console.log('onSubmitStory', this.state.data, this.state.loud.storyline, this.state.loud_type, this.state.visibility_type);
    this.props.createStory(
      this.state.data,
      this.props.arrCheckbox,
      this.state.loud.storyline,
      this.state.loud_type,
      this.state.visibility_type
    )
      .then(() => this.props.reloadStream());
    this.setState({
      editorContent: '',        //  cleaning input
    });
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
            visibility_type: 'public'
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
            visibility_type: 'private'
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
            visibility_type: 'custom'
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

  testSocket() {
    socket.send(
      JSON.stringify({
        type: 'notification',
        id: 10,
        text: "<a href='http://devasimov.validbook.org/bohdan.andriyiv'>Bohdan Andriyiv</a> liked your <a href='http://devasimov.validbook.org/story/1440'>story</a>.",
        created: '06 Jul 2017',
        user: {
          id: 4,
          fullName: 'Bohdan Andriyiv',
          slug: 'bohdan.andriyiv',
          avatar: 'https://s3-us-west-2.amazonaws.com/dev.validbook/avatars/2017/06/20/4/7oSnPdcNeVyCaF0Vo2-LA0Sl_7f0aB-C.jpg'
        }
      })
      // 'test'
      );
    // socket.onmessage = function (event) {
    //   console.log('onmessage', event.data);
    // };
    // this.props.getUserNotifications();
    // console.log({
    //   employees: [
    //     {firstName: 'John', lastName: 'Doe'},
    //     {firstName: 'Anna', lastName: 'Smith'},
    //     {firstName: 'Peter', lastName: 'Jones'}
    //   ]
    // });
  }

  render() {
    const { editorContent } = this.state;
    const { first_name, last_name, avatar32} = this.props.authorizedUser;
    const link = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;

    return (
      <div className="sbox">
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
            image: {
              uploadCallback: uploadImageCallBack,
              defaultSize: {
                width: '100%',
                height: '100%'
              }
            }
          }}
        />

        <div className="sbox-user-avatar32" style={{top: this.state.jump, position: 'absolute', left: '20px'}}>
          <Link to={link}><img src={avatar32} style={{width: '32px', height: '32px', border: '1px solid #dddddd'}} /></Link>
        </div>
        {/*<form onSubmit={this.test}>*/}
        <div className="sbox-footer">
          <div style={{display: 'flex'}}>
            <div
              className="btn-brand"
              type="submit"
              onClick={this.onSubmitStory}
              style={{fontSize: '13px', backgroundColor: this.state.sboxFocusBtn }}
            >Log</div>
            <button
              style={{padding: '5px'}} className="btn-brand" type="submit"
              onClick={() => this.testSocket()}>not press</button>
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
          <div
            className="camera" style={{height: '20px', marginTop: '3px', display: this.state.sboxVisibleElements}}
            onClick={this.showToolbar}>
            <span style={{marginTop: '4px'}}>More Options</span>
            <i/>
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
