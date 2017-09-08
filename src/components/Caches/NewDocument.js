import React, {Component} from 'react';
import {convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {Editor} from 'react-draft-wysiwyg';
import {Form, Select, Input} from 'formsy-react-components';
import {Modal, ButtonToolbar, DropdownButton} from 'react-bootstrap';
import SBox from '../StoryLine/Stream/Sbox';
import './index.scss';

export default class NewDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: '',
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange = (editorContent) => {
    this.setState({
      editorContent,
      data: draftToHtml(convertToRaw(editorContent.getCurrentContent()))
    });
  };

  render() {
    return (
      <div className="docs">

        <Editor
          // toolbarHidden={this.state.toolbarHidden}
          // onFocus={this.focusSboxElement}
          wrapperClassName="wrapper-document"
          toolbarClassName="toolbar-document"
          editorClassName="editor-document"
          editorState={this.state.editorContent}
          onEditorStateChange={this.onEditorStateChange}
          placeholder="Log something..."
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link',],
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
          }}
        />

      </div>
    );
  }
}
