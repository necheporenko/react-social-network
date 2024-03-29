import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {Editor} from 'react-draft-wysiwyg';
import AutosizeInput from 'react-input-autosize';
import {Form, Select, Input} from 'formsy-react-components';
import {Modal, ButtonToolbar, DropdownButton} from 'react-bootstrap';
import SBox from '../StoryLine/Stream/Sbox';
import {createDocument} from '../../redux/modules/document';
import './index.scss';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  box: state.document.box,
}), {
  createDocument
})

export default class NewDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: '',
      title: 'Untitled',
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.handleDocTitle = this.handleDocTitle.bind(this);
    this.save = this.save.bind(this);
  }

  onEditorStateChange = (editorContent) => {
    this.setState({
      editorContent,
      data: draftToHtml(convertToRaw(editorContent.getCurrentContent()))
    });
  };

  handleDocTitle(event) {
    this.setState({
      title: event.target.value
    });
  }

  save() {
    const file =
      `<!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width">
        </head>
        <body>
         ${this.state.data}
        </body>
        </html>`
    ;

    this.props.createDocument(this.props.box.key, this.props.authorizedUser.id, this.state.title, file);
  }

  render() {
    return (
      <div className="docs">
        <Helmet
          title={`React Validbook - ${this.state.title}`}
        />

        <div className="docs-input">
          {/*<div className="input-buffer" ref={el => this.inputBuffer = el}>{this.state.title}</div>*/}
          {/*<input*/}
          {/*type="text"*/}
          {/*value={this.state.title}*/}
          {/*// style={{width: `calc(${((this.state.title.length + 1) * 10)}px)`}}*/}
          {/*style={{width: `${this.inputBuffer.offsetWidth}px`}}*/}
          {/*onChange={this.handleDocTitle}*/}
          {/*maxLength="40"*/}
          {/*ref={el => this.input = el}*/}
          {/*/>*/}
          <AutosizeInput
            name="form-field-name"
            value={this.state.title}
            onChange={this.handleDocTitle}
          />
        </div>

        <div className="docs-btn">
          <button className="btn-brand" onClick={() => this.save()}>Save</button>
          <button className="btn-brand btn-sign">Sign</button>
        </div>

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
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link'],
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
