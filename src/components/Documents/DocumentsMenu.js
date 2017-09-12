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

export default class TokensMenu extends Component {
  componentDidMount() {
    const {path} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    this.props.loadBoxes(findSlug);
    console.log(findSlug, this.props.boxes);
  }

  render() {
    const {slug} = this.props.authorizedUser;

    return (
      <div className="sidebar tokens-nav">
        <div className={this.props.sidebar}>
          <ul>
            <Link onlyActiveOnIndex={true} to={`/${slug}/documents`} activeClassName="active">
              <li className="tokens-mnu-sash">Board</li>
            </Link>
            <Link onlyActiveOnIndex={true} to={`/${slug}/documents/inbox`} activeClassName="active">
              <li className="tokens-mnu-exchange">Inbox</li>
            </Link>
            <Link onlyActiveOnIndex={true} to={`/${slug}/documents/wallet`} activeClassName="active">
              <li className="tokens-mnu-public">Wallet</li>
            </Link>
            <hr/>
            <div className="doc-buttons">
              <button>New Box</button>
              <Link to={`/${slug}/documents/document`}>
                <button>New document</button>
              </Link>
            </div>
            <hr/>

            <Link onlyActiveOnIndex={true} to={`/${slug}/documents/private`} activeClassName="active">
              <li className="tokens-mnu-private">Box 1</li>
            </Link>
          </ul>
          {/*<div className="create-new-item">*/}
          {/*<a href="#">+ Create new box</a>*/}
          {/*</div>*/}

          {/*<BoxesTree*/}
          {/*boxes={this.props.boxes}*/}
          {/*/>*/}
        </div>
      </div>
    );
  }
}

TokensMenu.propTypes = {
  authorizedUser: PropTypes.object,
  sidebar: PropTypes.string,
  path: PropTypes.string,
  // getUser: PropTypes.func,
  loadBoxes: PropTypes.func,
  boxes: PropTypes.array,
};
