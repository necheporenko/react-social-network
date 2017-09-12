import React, { Component } from 'react';
import DocumentsMenu from './DocumentsMenu';
import AddToken from './AddToken';
import './index.scss';

class TokensPrivate extends Component {

  render() {
    return (
      <div className="tokens contents">
        <DocumentsMenu/>

        <div className="common-lists tokens-lists" onClick={this.open}>
          <AddToken />

          <div className="document">
            <a href=""><i></i></a>
          </div>
          <div className="document">
            <a href=""><i></i></a>
          </div>

        </div>

      </div>
    );
  }
}

export default TokensPrivate;
