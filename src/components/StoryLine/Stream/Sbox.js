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

const list = ['15px', '55px'];
let index;
let step = 0;

@connect((state) => ({
  arrCheckbox: state.book.arrCheckbox,
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
      jump: '15px',
      loud: {
        quiet_log: true,
        loud_log: false,
        loud_book: true,
        post_fb: false,
        post_twitter: false,
        storyline: false
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
  }

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
    event.preventDefault();
    console.log(this.state.loud);
    console.log('hi');
  }

  test2(event) {
    this.state.loud[event.target.name] = event.target.checked;
    this.setState({loud: this.state.loud});
  }

  render() {
    const { editorContent } = this.state;
    const { first_name, last_name, avatar} = this.props.authorizedUser;
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
              uploadCallback: uploadImageCallBack
            }
          }}
        />

        <div className="sbox-user-avatar" style={{top: this.state.jump}}>
          <Link to={link}><img src={avatar} /></Link>
        </div>
        {/*<form onSubmit={this.test}>*/}
        <div className="sbox-footer">
          <div style={{display: 'flex'}}>
            <button className="btn-brand" type="submit" onClick={this.onSubmitStory}>Log</button>
            {/*<button className="btn-brand" type="submit">Log</button>*/}
            <ButtonToolbar>
              <DropdownButton className="bootstrap-pure-btn" bsStyle="default" title="Select Book" id={5} >
                <div className="sbox-booktree">
                  <BookTreeForSboxContainer />
                </div>
              </DropdownButton>
              <DropdownButton className="bootstrap-pure-btn" bsStyle="default" title="" id={6} >
                <div className="sbox-logging">
                  <ul>
                    <li>
                      <input type="radio" name="quiet_log" checked={this.state.loud.quiet_log} onChange={this.test2}/>
                      <i>Quiet logging</i>
                    </li>
                    <li>
                      <input type="checkbox" name="loud_log" checked={this.state.loud.loud_log} onChange={this.test2}/>
                      <i>Loud logging</i>
                    </li>
                    <li>
                      <input type="checkbox" name="loud_book" checked={this.state.loud.loud_book} onChange={this.test2}/>
                      <i>Loud in book</i>
                    </li>
                    <li>
                      <input type="checkbox" name="post_fb" checked={this.state.loud.post_fb} onChange={this.test2}/>
                      <i>Post to Facebook</i>
                    </li>
                    <li>
                      <input type="checkbox" name="post_twitter" checked={this.state.loud.post_twitter} onChange={this.test2}/>
                      <i>Post to Twitter</i>
                    </li>
                    <li>
                      <input type="checkbox" name="storyline" checked={this.state.loud.storyline} onChange={this.test2}/>
                      <i>Story will appear on Storyline</i>
                    </li>
                    <button onClick={() => this.test()}>click for test</button>
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
    avatar: PropTypes.string,
  }),
  createStory: PropTypes.func,                //story
  loadStories: PropTypes.func,
};

export default Sbox;
