import React, { Component } from 'react';
import DocumentsMenu from './DocumentsMenu';
import './index.scss';

export default class Boxes extends Component {
  render() {
    return (
      <div className="tokens contents">
        <DocumentsMenu/>

        <div className="common-lists tokens-lists">
          <div>No boxes to see</div>
        </div>
      </div>
    );
  }
}
