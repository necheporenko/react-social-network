import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import ReactMarkdown from 'react-markdown';
import {getUser} from '../../redux/modules/user';
import {getBox, createDraftHumanCard, updateDraftHumanCard} from '../../redux/modules/document';
import DocumentsMenu from './DocumentsMenu';
import SignHumanCard from '../Popup/SignHumanCard';
import DocumentItem from './DocumentItem';
import './index.scss';

let savePositionTop;

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
  path: state.routing.locationBeforeTransitions.pathname,
  box: state.document.box,
}), {
  getUser,
  getBox,
  createDraftHumanCard,
  updateDraftHumanCard,
})

export default class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: null,
      fullName: '',
      publicAddress: '',
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.saveScroll = this.saveScroll.bind(this);
    this.changeFullName = this.changeFullName.bind(this);
    this.changePublicAddress = this.changePublicAddress.bind(this);
    this.saveDraft = this.saveDraft.bind(this);
    this.requestHumanCard = this.requestHumanCard.bind(this);
    this.copyAddress = this.copyAddress.bind(this);
    this.CopyToClipboard = this.CopyToClipboard.bind(this);
    this.linkHC = this.linkHC.bind(this);
    this._newDocumentClick = this._newDocumentClick.bind(this);
  }

  componentDidMount() {
    console.log('Box');
    window.addEventListener('scroll', this.handleScroll);
    this.saveScroll();
    const {path} = this.props;
    const boxSlug = path.indexOf('/documents/') === -1 ? 'board' : path.substring(path.indexOf('/documents/') + 11);
    this.props.getBox(boxSlug);
  }

  componentWillUnmount() {
    // const div = document.querySelector('.markdown-human-card div');
    // const getAddress = div.getElementsByTagName('p');
    // const getName = div.getElementsByTagName('h2');

    window.removeEventListener('scroll', this.handleScroll);
    // getAddress[0].removeEventListener('click', this.copyAddress);
    // getName[0].removeEventListener('click', this.copyName);
  }

  copyAddress = () => {
    const div = document.querySelector('.markdown-human-card div');
    const getAddress = div.getElementsByTagName('p');

    let range;
    let select;
    if (document.createRange) {
      range = document.createRange();
      range.selectNodeContents(getAddress[0]);
      select = window.getSelection();
      select.removeAllRanges();
      select.addRange(range);
      document.execCommand('copy');
      select.removeAllRanges();
    } else {
      range = document.body.createTextRange();
      range.moveToElementText(getAddress[0]);
      range.select();
      document.execCommand('copy');
    }
  };

  copyName = () => {
    const div = document.querySelector('.markdown-human-card div');
    const getName = div.getElementsByTagName('h2');

    let range;
    let select;
    if (document.createRange) {
      range = document.createRange();
      range.selectNodeContents(getName[0]);
      select = window.getSelection();
      select.removeAllRanges();
      select.addRange(range);
      document.execCommand('copy');
      select.removeAllRanges();
    } else {
      range = document.body.createTextRange();
      range.moveToElementText(getName[0]);
      range.select();
      document.execCommand('copy');
    }
  };

  handleScroll(e) {
    const scrollTop = e.srcElement.body.scrollTop;
    savePositionTop = scrollTop;
    this.setState({scrollTop});
  }

  saveScroll() {
    // console.log(`saveScroll:${savePositionTop}`);
    this.setState({scrollTop: savePositionTop});
  }

  changeFullName(event) {
    this.setState({fullName: event.target.value});
  }

  changePublicAddress(event) {
    this.setState({publicAddress: event.target.value});
  }

  saveDraft() {
    const {createDraftHumanCard, updateDraftHumanCard, box, authorizedUser} = this.props;
    box.draft_human_card
      ?
      updateDraftHumanCard(this.inputFullName.value, authorizedUser.id, this.inputPublicAddress.value, box.draft_human_card.id)
      :
      createDraftHumanCard(this.inputFullName.value, authorizedUser.id, this.inputPublicAddress.value);
  }

  requestHumanCard(url) {
    const myInit = {
      method: 'GET',
      headers: new Headers(),
      mode: 'cors',
      cache: 'default'
    };

    const result = fetch(url, myInit);
    result.then(response => {
      return response.text();
    }).then((text) => {
      if (text !== this.state.markdownText) {
        return this.setState({markdownText: text});
      }
    }).catch((ex) => {
      console.log('failed', ex);
    });

    const div = document.querySelector('.markdown-human-card div');
    if (div) {
      function w(linkHC) {
        const h1 = div.querySelector('h1');
        const p5 = div.querySelector('p:nth-child(5)');
        const p8 = div.querySelector('p:nth-child(8)');

        h1.addEventListener('click', linkHC);
        p5.addEventListener('click', linkHC);
        p8.addEventListener('click', linkHC);
      }
      setTimeout(() => w(this.linkHC), 1000);
    }

//     const XHR = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
//     const xhr = new XHR();
// // (2) запрос на другой домен :)
//     xhr.open('GET', url, true);
//     xhr.onload = function () {
//       return <div>Hello</div>;
//       // return this.responseText;
//     };
//     xhr.onerror = function () {
//       alert(`Ошибка ${this.status}`);
//     };
//     xhr.send();
  }

  CopyToClipboard() {
    const div = document.querySelector('.markdown-human-card div');

    if (div) {
      function w(address, name) {
        const getAddress = div.getElementsByTagName('p');
        const getName = div.getElementsByTagName('h2');
        getAddress[0].addEventListener('click', address);
        getName[0].addEventListener('click', name);
      }
      setTimeout(() => w(this.copyAddress, this.copyName), 1000);
    }
  }

  linkHC() {
    const {box} = this.props;
    const {slug} = this.props.requestedUser;
    browserHistory.push(`/${slug}/documents/human-card/${box.human_card.public_address}`);
  }

  _newDocumentClick() {
    browserHistory.push(`/${this.props.authorizedUser.slug}/documents/document`);
  }

  // _newDocumentClick() {

  //   {slug === this.props.authorizedUser.slug &&
  //     }
  // }

  render() {
    const {scrollTop} = this.state;
    const {box, fixedBlocks, authorizedUser} = this.props;
    const {slug, first_name, last_name} = this.props.requestedUser;
    const fullName = `${first_name} ${last_name}`;
    console.log(this.props.box);

    const chooseNav = () => {
      let Nav;
      let sidebar;
      if (scrollTop <= 275 || !scrollTop) {
        Nav = 'tokens contents';
        sidebar = 'sidebar-default';
      } else {
        Nav = 'tokens contents contents-fixed';
        sidebar = 'sidebar-fixed';
      }
      const result = {posTop: Nav, sidebar};
      return result;
    };

    const navigation = chooseNav();

    return (
      <div className={navigation.posTop}>
        <DocumentsMenu
          fixedBlocks={fixedBlocks}
          sidebar={navigation.sidebar}
        />
        <div
          className="testtt"
          style={{
            marginLeft: fixedBlocks ? 240 : null
        }}>

          <div className="add-new-item">
            {slug === this.props.authorizedUser.slug &&
              <div className="add-new-document" onClick={this._newDocumentClick}>
                <span
                  className="add-new-document-icon"
                  />
              </div>
            }
            {slug === this.props.authorizedUser.slug &&
              <div className="add-new-box">
                <span
                  className="add-new-box-icon"
                  to={'#'}/>
              </div>
            }
          </div>
          <div className="common-lists tokens-lists">
            {/*<button onClick={() => this.httpGet()}>CLICK</button>*/}
            {slug === this.props.authorizedUser.slug && box.documents && box.documents.map(document => (
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
  getUser: PropTypes.func,
  authorizedUser: PropTypes.object,
  requestedUser: PropTypes.object,
  path: PropTypes.string,
  getBox: PropTypes.func,
  box: PropTypes.object,
  createDraftHumanCard: PropTypes.func,
  updateDraftHumanCard: PropTypes.func,
};
