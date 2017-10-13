import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {getBox} from '../../redux/modules/document';
import DocumentsMenu from './DocumentsMenu';
import DocumentItem from './DocumentItem';
import './index.scss';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
  path: state.routing.locationBeforeTransitions.pathname,
  box: state.document.box,
  boxes: state.document.boxes,
}), {
  getBox
})

export default class Box extends Component {
  constructor() {
    super();

    this._newDocumentClick = this._newDocumentClick.bind(this);
  }

  componentDidMount() {
    const {path} = this.props;
    const boxSlug = path.indexOf('/documents/') === -1 ? 'board' : path.substring(path.indexOf('/documents/') + 11);
    this.props.getBox(boxSlug);
  }
  _newDocumentClick() {
    browserHistory.push(`/${this.props.authorizedUser.slug}/documents/document`);
  }

  render() {
    const {box, fixedBlocks, authorizedUser, boxes} = this.props;
    const {slug} = this.props.requestedUser;

    return (
      <div className={fixedBlocks ? 'tokens contents contents-fixed' : 'tokens contents'}>
        <DocumentsMenu
          fixedBlocks={fixedBlocks}
          sidebar={fixedBlocks ? 'sidebar-fixed' : 'sidebar-default'}
        />
        <div
          className="testtt"
          style={{
            marginLeft: fixedBlocks ? 240 : null
        }}>

          {slug === authorizedUser.slug &&
            <div className="add-new-item">
              <div className="upload-document">
                <span className="upload-document-icon"></span>
              </div>
              <div className="add-new-document" onClick={this._newDocumentClick}>
                <span
                  className="add-new-document-icon"
                  />
              </div>
              <div className="add-new-box">
                <span
                  className="add-new-box-icon"
                  to={'#'}/>
              </div>
            </div>
          }
          <div className="common-lists tokens-lists">
            {/*<button onClick={() => this.httpGet()}>CLICK</button>*/}
            {boxes.length > 0 && boxes[0].children.map(box => (
              <div style={{background: '#fff', padding: '5px'}}>{box.name}</div>
            ))}

            {slug === authorizedUser.slug && box.documents && box.documents.map(document => (
              <DocumentItem
                key={document.id}
                document={document}
                boxKey={box.key}
              />
            ))}

            {/*{doc.map((document, index) => (*/}
            {/*<div key={index} className="document">*/}
            {/*<a href="">*/}
            {/*<div>*/}
            {/*<i className="doc-icon"/>*/}
            {/*/!*<div className="doc-sign">*!/*/}
            {/*/!*<i/>*!/*/}
            {/*/!*</div>*!/*/}
            {/*<p>Document 1</p>*/}
            {/*</div>*/}
            {/*</a>*/}
            {/*</div>*/}
            {/*))}*/}

            {/*<AddToken*/}
            {/*authorizedUser={this.props.authorizedUser}*/}
            {/*/>*/}

          </div>
        </div>
      </div>
    );
  }
}

Box.propTypes = {
  authorizedUser: PropTypes.object,
  requestedUser: PropTypes.object,
  path: PropTypes.string,
  getBox: PropTypes.func,
  box: PropTypes.object
};
