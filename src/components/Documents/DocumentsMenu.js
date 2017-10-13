import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getUser} from '../../redux/modules/user';
import {load as loadBoxes} from '../../redux/modules/document';
import BoxesTree from './BoxesTree';
import './index.scss';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
  boxes: state.document.boxes,
  path: state.routing.locationBeforeTransitions.pathname,
}), {
  getUser,
  loadBoxes
})

export default class DocumentsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    console.log('DocumentsMenu');
    const {path} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    this.props.getUser(findSlug)
      .then(this.props.loadBoxes(findSlug));
  }

  openBoxes() {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    const {isOpen} = this.state;
    const {boxes, path, fixedBlocks, authorizedUser} = this.props;
    const {slug, id} = this.props.requestedUser;
    const findBoxes = path.indexOf('/documents/boxes');
    console.log(this.props);

    const linkToHumanCard = () => {
      const humanCards = boxes[0] ? boxes[0].human_card : null;

      if (humanCards && humanCards.draft_id) {
        return humanCards.draft_id;
      } else if (humanCards && humanCards.human_card_address) {
        return humanCards.human_card_address;
      }

      return null;
    };

    return (
      <div
        className="sidebar documents-nav"
        style={{
          position: fixedBlocks ? 'fixed' : null,
          top: fixedBlocks ? 118 : null
        }}
      >
        <div className={this.props.sidebar}>
          <ul>

            {/*{boxes.length > 0 && boxes[0].children.filter(box => box.key === 'board').map(box => (*/}
            {/*<Link key={box.id} onlyActiveOnIndex={false} to={`/${slug}/documents/${box.key}`} activeClassName="active"*/}
            {/*className={path.slice(-9) === 'documents' && 'active'}>*/}
            {/*<li className="documents-mnu-board">{box.name}</li>*/}
            {/*</Link>*/}
            {/*))}*/}
            {/*{boxes.length > 0 &&*/}
            {/*<Link to={`/${slug}/documents/${boxes[0].board.key}`} activeClassName="active" className={path.slice(-9) === 'documents' && 'active'}>*/}
            {/*<li className="documents-mnu-board">{boxes[0].board.name}</li>*/}
            {/*</Link>*/}
            {/*}*/}

            {/*<hr/>*/}
            <div className="wrap-boxes" style={{backgroundColor: findBoxes > 0 && '#e1e1e1'}}>
              <div className={isOpen ? ' arrow-boxes' : 'arrow-boxes-close'} onClick={() => this.openBoxes()}><i/></div>
              <Link onlyActiveOnIndex={true} to={`/${slug}/documents/boxes`} activeClassName="active">
                <li className="documents-mnu-boxes">Desk</li>
              </Link>
              {/* <div className="create-new-item">
                <a href="#">+ Create new box</a>
              </div> */}
            </div>

            <div className="boxes-mnu" style={{display: isOpen ? 'block' : 'none'}}>
              {boxes.length > 0 && boxes[0].children.filter(box => ((box.key !== 'bin') && (box.key !== 'board'))).map(box => (
                <Link key={box.id} onlyActiveOnIndex={true} to={`/${slug}/documents/${box.id}-${box.key}`} activeClassName="active">
                  <li className="documents-mnu-box">{box.name}</li>
                </Link>
              ))}
              {boxes.length > 0 &&
              <Link onlyActiveOnIndex={true} to={`/${slug}/documents/${boxes[0].bin.key}`} activeClassName="active">
                <li className="documents-mnu-box-bin">{boxes[0].bin.name}</li>
              </Link>
              }
            </div>

            {/*<Link onlyActiveOnIndex={true} to={`/${slug}/documents/inbox`} activeClassName="active">*/}
            {/*<li className="documents-mnu-box-private">Signed Documents</li>*/}
            {/*</Link>*/}

            {/*<div className="doc-buttons">*/}
            {/*<button>New Box</button>*/}
            {/*<Link to={`/${slug}/documents/document`}>*/}
            {/*<button>New document</button>*/}
            {/*</Link>*/}
            {/*</div>*/}

            {/*<hr/>*/}

            {/*{boxes.length > 0 && boxes[0].children.filter(box => box.key === 'bin').map(box => (*/}
            {/*<Link key={box.id} onlyActiveOnIndex={true} to={`/${slug}/documents/${box.key}`} activeClassName="active">*/}
            {/*<li className="documents-mnu-box-bin">{box.name}</li>*/}
            {/*</Link>*/}
            {/*))}*/}


            <hr/>

            {linkToHumanCard()
              ? <Link
                onlyActiveOnIndex={true}
                to={`/${slug}/documents/human-card/${linkToHumanCard()}`}
                activeClassName="active">
                <li className="documents-mnu-hc">Human Card Page</li>
              </Link>
              : <Link
                onlyActiveOnIndex={true}
                to={`/${slug}/documents/human-card`}
                activeClassName="active">
                <li className="documents-mnu-hc">Human Card Page</li>
              </Link>
            }

            <hr/>

            {authorizedUser.id === id &&
            <Link onlyActiveOnIndex={true} to={`/${slug}/documents/wallet`} activeClassName="active">
              <li className="documents-mnu-wallet">Wallet</li>
              <hr/>
            </Link>
            }

          </ul>


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
  requestedUser: PropTypes.object,
  sidebar: PropTypes.string,
  path: PropTypes.string,
  getUser: PropTypes.func,
  loadBoxes: PropTypes.func,
  boxes: PropTypes.array,
};
