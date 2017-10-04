import React, { Component } from 'react';
import DocumentsMenu from './DocumentsMenu';
import './index.scss';

export default class Boxes extends Component {
  render() {
    const {fixedBlocks} = this.props;

    return (
      <div className="tokens contents">
        <DocumentsMenu
          fixedBlocks={fixedBlocks}
        />

        <div
          className="common-lists tokens-lists"
          style={{marginLeft: fixedBlocks ? 240 : null}}
        >
          <div>No boxes to see</div>
        </div>
      </div>
    );
  }
}
