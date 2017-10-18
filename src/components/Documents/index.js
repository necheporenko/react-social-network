import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {getBox} from '../../redux/modules/document';
import DocumentsMenu from './DocumentsMenu';
import DocumentItem from './DocumentItem';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
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
    this.addIconsRender = this.addIconsRender.bind(this);
    this.boxesRender = this.boxesRender.bind(this);
  }

  componentDidMount() {
    const {path} = this.props;
    const boxSlug = path.indexOf('/documents/') === -1 ? 'desk' : path.substring(path.indexOf('/documents/') + 11);
    this.props.getBox(boxSlug);
  }

  componentDidUpdate(prevProps) {
    const {path, box} = this.props;
    if (prevProps.path !== path) {
      const boxSlug = path.indexOf('/documents/') === -1 ? 'desk' : path.substring(path.indexOf('/documents/') + 11);
      if (boxSlug && (boxSlug !== box.key)) {
        this.props.getBox(boxSlug);
      }
    }
  }

  _newDocumentClick() {
    browserHistory.push(`/${this.props.authorizedUser.slug}/documents/document`);
  }

  tooltipRender(text) {
    return <Tooltip id="tooltip">{text}</Tooltip>;
  }

  addIconsRender() {
    const {requestedUser, authorizedUser} = this.props;

    if (requestedUser.slug !== authorizedUser.slug) {
      return null;
    }
    return (
      <div className="add-new-item">
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Upload document</Tooltip>}>
          <div className="upload-document">
            <span className="upload-document-icon"></span>
          </div>
        </OverlayTrigger>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Create new document</Tooltip>}>
          <div className="add-new-document" onClick={this._newDocumentClick}>
            <span
              className="add-new-document-icon"
            />
          </div>
        </OverlayTrigger>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Create new box</Tooltip>}>
          <div className="add-new-box">
            <span
              className="add-new-box-icon"
              to={'#'}/>
          </div>
        </OverlayTrigger>
      </div>
    );
  }

  boxesRender() {
    const {box, authorizedUser, requestedUser} = this.props;
    let availableBoxes = Object.assign({}, box);

    if (requestedUser.slug !== authorizedUser.slug) {
      availableBoxes = Object.assign(availableBoxes, {
        children: box.children.filter(box => box.key !== 'backup-box-for-signed-documents')
      });
    }

    return availableBoxes.children.map(box => (
      <Link key={box.id} to={`/${requestedUser.slug}/documents/${box.key}`} className="box-card">
        <li className="documents-mnu-box">{box.name}</li>
      </Link>
    ))
  }

  render() {
    const {box, fixedBlocks, authorizedUser, boxes} = this.props;
    console.log(this.props);
    const {slug} = this.props.requestedUser;

    return (
      <div className="common-lists tokens-lists">
        {/*<button onClick={() => this.httpGet()}>CLICK</button>*/}
        {/*<div style={{background: '#fff', padding: '5px'}}>{box.name}</div>*/}
        {box.id && box.children.length > 0 &&
        <div className="wrapper-boxes">
          <div className="boxes-header">
            <h1>Boxes</h1>
            <div className="add-new-items-container">
              {this.addIconsRender()}
            </div>
          </div>
          <div className="wrapper-box-card">
            {this.boxesRender()}
          </div>
        </div>
        }

        {slug === authorizedUser.slug && box.documents &&
        <div className="wrapper-doc">
          <h1>Documents</h1>
          <div className="wrapper-doc-card">
            {box.documents.map(document => (
              <DocumentItem
                key={document.id}
                document={document}
                boxKey={box.key}
              />
            ))}
          </div>
        </div>
        }

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

// {/*{slug === authorizedUser.slug &&*/}
        // {/*<div className="add-new-item">*/}
        // {/*<OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Upload document</Tooltip>}>*/}
        // {/*<div className="upload-document">*/}
        // {/*<span className="upload-document-icon"></span>*/}
        // {/*</div>*/}
        // {/*</OverlayTrigger>*/}
        // {/*<OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Create new document</Tooltip>}>*/}
        // {/*<div className="add-new-document" onClick={this._newDocumentClick}>*/}
        // {/*<span*/}
        // {/*className="add-new-document-icon"*/}
        // {/*/>*/}
        // {/*</div>*/}
        // {/*</OverlayTrigger>*/}
        // {/*<OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Create new box</Tooltip>}>*/}
        // {/*<div className="add-new-box">*/}
        // {/*<span*/}
        // {/*className="add-new-box-icon"*/}
        // {/*to={'#'}/>*/}
        // {/*</div>*/}
        // {/*</OverlayTrigger>*/}
        // {/*</div>*/}
        // {/*}*/}