import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { ButtonToolbar, DropdownButton } from 'react-bootstrap';
import uploadImageCallBack from './uploadImageCallBack';
import { getCheckboxOfBook } from '../../../redux/modules/book';
import { create as createStory } from '../../../redux/modules/story';
import BookTreeForSboxContainer from '../../../containers/BookTreeForSboxContainer';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.scss';

const list = ['20px', '60px'];
let index;
let step = 0;

@connect((state) => ({
  arrCheckbox: state.book.arrCheckbox,
  bookTreeArr: state.book.bookTreeArr,
}), {
  getCheckboxOfBook,
  createStory
})

class Sbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: '',
      data: '',
      toolbarHidden: true,
      jump: '20px',
      loud: {
        quiet_log: false,
        loud_log: true,
        loud_book: true,
        post_fb: false,
        post_twitter: false,
        storyline: true
      }
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.showToolbar = this.showToolbar.bind(this);
    this.onSubmitStory = this.onSubmitStory.bind(this);
    this.test = this.test.bind(this);
    this.test2 = this.test2.bind(this);
  }

  onEditorStateChange = (editorContent) => {
    this.setState({
      editorContent,
      data: draftToHtml(convertToRaw(editorContent.getCurrentContent()))
    });
  };

  onSubmitStory() {
    console.log(this.state.data);
    this.props.createStory(this.state.data, this.props.arrCheckbox)
      .then(() => this.props.reloadStream());
    this.props.getCheckboxOfBook([]);
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

  test2(event) {
    this.state.loud[event.target.name] = event.target.checked;

    const currentStateItem = event.target.checked;
    const currentStateLoud = Object.assign(this.state.loud);

    if (!this.state.loud.loud_log && !this.state.loud.loud_book) {
      currentStateLoud.quiet_log = true;
      currentStateLoud.loud_log = false;
      currentStateLoud.loud_book = false;
      currentStateLoud.storyline = false;
      this.setState({loud: currentStateLoud});
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
            }
          });
        }
        break;

      case 'loud_log':
        if (!currentStateItem) {
          currentStateLoud.loud_log = false;
          this.setState({loud: currentStateLoud});
        } else {
          currentStateLoud.quiet_log = false;
          currentStateLoud.loud_log = true;
          currentStateLoud.loud_book = true;
          currentStateLoud.storyline = true;
          this.setState({loud: currentStateLoud});
        }
        break;

      case 'loud_book':
        if (currentStateItem) {
          currentStateLoud.loud_book = true;
          currentStateLoud.quiet_log = false;
          this.setState({loud: currentStateLoud});
        } else {
          currentStateLoud.loud_book = false;
          this.setState({loud: currentStateLoud});
        }
        break;

      default:
        this.setState({loud: this.state.loud});
    }
  }

  render() {
    const { editorContent } = this.state;
    const { first_name, last_name, avatar32} = this.props.authorizedUser;
    const link = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;

    return (
      <div className="sbox">
        <Editor
          toolbarHidden={this.state.toolbarHidden}
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
          <Link to={link}><img src={avatar32} style={{width: '32px', height: '32px'}} /></Link>
        </div>
        {/*<form onSubmit={this.test}>*/}
        <div className="sbox-footer">
          <div style={{display: 'flex'}}>
            <div
              className="btn-brand"
              type="submit"
              onClick={this.onSubmitStory}
              style={{fontSize: '13px'}}
            >Log</div>
            {/*<button className="btn-brand" type="submit">Log</button>*/}
            <ButtonToolbar>
              <DropdownButton className="bootstrap-pure-btn" bsStyle="default" title="Select Book" id={5} >
                <div className="sbox-booktree">
                  <BookTreeForSboxContainer
                    bookTreeArr={this.props.bookTreeArr}
                  />
                </div>
              </DropdownButton>
              <DropdownButton className="bootstrap-pure-btn" bsStyle="default" title="" id={6} >
                <div className="sbox-logging">
                  <ul>
                    <li>
                      <div>
                        <input type="radio" name="quiet_log" id="quiet_log" checked={this.state.loud.quiet_log} onChange={this.test2}/>
                        <label htmlFor={'quiet_log'}><span></span></label>
                        <i className="quiet_log_icon"></i>
                        <p>Quiet logging</p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <input type="checkbox" name="loud_log" id="loud_log" checked={this.state.loud.loud_log} onChange={this.test2}/>
                        <label htmlFor={'loud_log'}><span></span></label>
                        <i className="loud_log_icon"></i>
                        <p>Loud logging</p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <input type="checkbox" name="loud_book" id="loud_book" checked={this.state.loud.loud_book} onChange={this.test2}/>
                        <label htmlFor={'loud_book'}><span></span></label>
                        <i className="loud_book_icon"></i>
                        <p>Loud in book</p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <input type="checkbox" name="post_fb" id="post_fb" checked={this.state.loud.post_fb} onChange={this.test2}/>
                        <label htmlFor={'post_fb'}><span></span></label>
                        <i className="post_fb_icon"></i>
                        <p>Post to Facebook</p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <input type="checkbox" name="post_twitter" id="post_twitter" checked={this.state.loud.post_twitter} onChange={this.test2}/>
                        <label htmlFor={'post_twitter'}><span></span></label>
                        <i className="post_twitter_icon"></i>
                        <p>Post to Twitter</p>
                      </div>
                    </li>
                    <li>
                     <div>
                       <input type="checkbox" name="storyline" id="storyline" checked={this.state.loud.storyline} onChange={this.test2}/>
                       <label htmlFor={'storyline'}><span></span></label>
                       <p>Story will appear on Storyline</p>
                     </div>
                    </li>
                    {/*<button onClick={() => this.test()}>click for test</button>*/}
                  </ul>
                </div>
              </DropdownButton>
            </ButtonToolbar>
          </div>
          <div className="camera" style={{height: '20px', marginTop: '3px'}} onClick={this.showToolbar}>
            <span>More Options</span>
            <i></i>
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
};

export default Sbox;
