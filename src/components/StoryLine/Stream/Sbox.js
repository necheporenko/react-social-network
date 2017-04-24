import React, { Component, PropTypes } from 'react';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { ButtonToolbar, DropdownButton } from 'react-bootstrap';
import uploadImageCallBack from './uploadImageCallBack';
import BooksTree from '../../BooksTree';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './index.scss';

const list = ['15px', '55px'];
let index;
let step = 0;

class Sbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: '',
      data: '',
      toolbarHidden: true,
      jump: '15px'
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.showToolbar = this.showToolbar.bind(this);
    this.onSubmitStory = this.onSubmitStory.bind(this);
  }

  onEditorStateChange = (editorContent) => {
    this.setState({
      editorContent,
      data: draftToHtml(convertToRaw(editorContent.getCurrentContent()))
    });
  }

  onSubmitStory() {
    console.log(this.state.data);
    this.props.createStoryRequest(this.state.data);
  }

  showToolbar() {
    ++step;
    index = step % 2;
    this.setState({
      toolbarHidden: !this.state.toolbarHidden,
      jump: list[index]
    });
  }

  render() {
    const { editorContent } = this.state;

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
          <a href="#"><img src="http://devianmbanks.validbook.org/cdn/460/avatar/32x32.jpg?t=1486723970" /></a>
        </div>

        <div className="sbox-footer">
          <div style={{display: 'flex'}}>
            <button className="btn-brand" type="submit" onClick={this.onSubmitStory}>Log</button>
            <ButtonToolbar>
              <DropdownButton className="bootstrap-pure-btn" bsStyle="default" title="Select Book" id={5} pullRight >
                <BooksTree />
              </DropdownButton>
            </ButtonToolbar>
          </div>
          <div style={{height: '20px', marginTop: '3px'}} onClick={this.showToolbar}>
            <span>More Options</span>
            <i></i>
          </div>
        </div>
      </div>
    );
  }
}

Sbox.propTypes = {
 //placeholder: PropTypes.string
  createStoryRequest: PropTypes.func,
};

export default Sbox;
