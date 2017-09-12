import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getUser} from '../../redux/modules/user';
import {load as loadBoxes} from '../../redux/modules/document';
import BoxesTree from './BoxesTree';
import './index.scss';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  // requestedUser: state.user.requestedUser,
  boxes: state.document.boxes,
  path: state.routing.locationBeforeTransitions.pathname,
}), {
  // getUser,
  loadBoxes
})

export default class DocumentsMenu extends Component {
  componentDidMount() {
    const {path} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    this.props.loadBoxes(findSlug);
    console.log(findSlug, this.props.boxes);
  }

  render() {
    const {boxes} = this.props;
    const {slug} = this.props.authorizedUser;

    return (
      <div className="sidebar documents-nav">
        <div className={this.props.sidebar}>
          <ul>
            {/*{console.log('boxes', boxBin)}*/}
            {boxes.length > 0 && boxes[0].children.filter(box => box.key === 'board').map(box => (
              <Link onlyActiveOnIndex={true} to={`/${slug}/documents/${box.key}`} activeClassName="active">
                <li className="documents-mnu-board">{box.name}</li>
              </Link>
            ))}

            <Link onlyActiveOnIndex={true} to={`/${slug}/documents/inbox`} activeClassName="active">
              <li className="documents-mnu-inbox">Inbox</li>
            </Link>
            <Link onlyActiveOnIndex={true} to={`/${slug}/documents/wallet`} activeClassName="active">
              <li className="documents-mnu-wallet">Wallet</li>
            </Link>

            {/*<div className="doc-buttons">*/}
            {/*<button>New Box</button>*/}
            {/*<Link to={`/${slug}/documents/document`}>*/}
            {/*<button>New document</button>*/}
            {/*</Link>*/}
            {/*</div>*/}

            <hr/>

            {boxes.length > 0 && boxes[0].children.filter(box => ((box.key !== 'bin') && (box.key !== 'board'))).map(box => (
              <Link key={box.id} onlyActiveOnIndex={true} to={`/${slug}/documents/${box.id}-${box.key}`}
                    activeClassName="active">
                <li className="documents-mnu-box-private">{box.name}</li>
              </Link>
            ))}

            {boxes.length > 0 && boxes[0].children.filter(box => box.key === 'bin').map(box => (
              <Link onlyActiveOnIndex={true} to={`/${slug}/documents/${box.key}`} activeClassName="active">
                <li className="documents-mnu-box-bin">{box.name}</li>
              </Link>
            ))}
          </ul>
          <div className="create-new-item">
            <a href="#">+ Create new box</a>
          </div>

          {/*<BoxesTree*/}
          {/*boxes={this.props.boxes}*/}
          {/*/>*/}
        </div>
      </div>
    );
  }
}

DocumentsMenu.propTypes = {
  authorizedUser: PropTypes.object,
  sidebar: PropTypes.string,
  path: PropTypes.string,
  // getUser: PropTypes.func,
  loadBoxes: PropTypes.func,
  boxes: PropTypes.array,
};
