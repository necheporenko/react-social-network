import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import ReactMarkdown from 'react-markdown';
import {getUser} from '../../redux/modules/user';
import {getHumanCard, createDraftHumanCard, updateDraftHumanCard} from '../../redux/modules/document';
import SignHumanCard from '../Popup/SignHumanCard';
import './human-card.scss';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
  path: state.routing.locationBeforeTransitions.pathname,
  humanCard: state.document.humanCard,
  draft_human_card: state.document.draft_human_card
}), {
  getUser,
  getHumanCard,
  createDraftHumanCard,
  updateDraftHumanCard
})

export default class DraftHumanCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      publicAddress: '',
    };
    this.changeFullName = this.changeFullName.bind(this);
    this.changePublicAddress = this.changePublicAddress.bind(this);
    this.saveDraft = this.saveDraft.bind(this);
    this.requestHumanCard = this.requestHumanCard.bind(this);
    this.copyAddress = this.copyAddress.bind(this);
    this.CopyToClipboard = this.CopyToClipboard.bind(this);
    this.linkHC = this.linkHC.bind(this);
  }
  
  componentDidMount() {
    const {path} = this.props;
    const humanCardSlug = path.substring(path.indexOf('/human-card/') + 12);
    this.props.getHumanCard(humanCardSlug);
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

  changeFullName(event) {
    this.setState({fullName: event.target.value});
  }

  changePublicAddress(event) {
    this.setState({publicAddress: event.target.value});
  }

  saveDraft() {
    const {createDraftHumanCard, updateDraftHumanCard, authorizedUser, draft_human_card} = this.props;
    draft_human_card.id
      ?
      updateDraftHumanCard(this.inputFullName.value, authorizedUser.id, this.inputPublicAddress.value, draft_human_card.id)
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
    const {humanCard} = this.props;
    const {slug} = this.props.requestedUser;
    browserHistory.push(`/${slug}/documents/human-card/${humanCard.public_address}`);
  }

  render() {
    const {humanCard, draft_human_card} = this.props;
    const {first_name, last_name} = this.props.requestedUser;
    const fullName = `${first_name} ${last_name}`;

    return(
      <div style={{display: 'flex'}} className="wrapper-human-card">
        <div className="human-card human-card-preview">
          {humanCard.id
            ? <div className="markdown-human-card">
              {/*<Link to={`/${slug}/documents/human-card/${box.human_card.public_address}`} className="markdown-human-card">*/}
              {this.requestHumanCard(humanCard.url)}
              <ReactMarkdown source={humanCard.markdown}/>
                {/*{this.CopyToClipboard()}*/}
              {/*</Link>*/}
            </div>
            : <div className="draft-human-card">
              {/*<div className="help-human-card"><i/></div>*/}
              <h1 style={{marginBottom: 0}}>HUMAN CARD</h1>
              {/*<hr/>*/}
              <p style={{marginTop: '5px', marginBottom: 0}}>
                {/*<strong>Public Address:</strong>*/}
                <input
                  type="text" placeholder="Paste your public address here"
                  onChange={this.changePublicAddress}
                  value={this.state.publicAddress || (draft_human_card.id && draft_human_card.public_address) || ''}
                  ref={el => this.inputPublicAddress = el}
                  style={{fontSize: '13px'}}
              />
                {/*<div className="help-human-card"><i/></div>*/}
              </p>
              <p style={{fontSize: '12px', marginTop: '5px', marginBottom: '10px'}}>
                This public address has been established for:
              </p>
              <p style={{marginTop: '10px'}}>
                <input
                  type="text" placeholder="Paste your getAddress here"
                  onChange={this.changeFullName}
                  value={this.state.fullName || (draft_human_card.id && draft_human_card.full_name) || fullName}
                  ref={el => this.inputFullName = el}
                  style={{fontSize: '22px'}}
              />
                {/*<div className="help-human-card"><i/></div>*/}
              </p>
              <p style={{color: '#d2d2d2', fontSize: '13px', magrinTop: 5, marginBottom: 10}}>
                Digital signature and signing date will be here.
                {/*<span>  your signature will be here</span>*/}
                {/*<div className="help-human-card"><i/></div>*/}
              </p>
            </div>
          }
        </div>
      </div>
    ); 
  }
}

// {!box.human_card &&
//   <div className="human-card-btn">
//     <button className="btn-brand" onClick={this.saveDraft}>Save</button>
//     <SignHumanCard
//       fullName={this.state.fullName || (box.draft_human_card && box.draft_human_card.full_name) || fullName}
//       publicAddress={this.state.publicAddress || (box.draft_human_card && box.draft_human_card.public_address) || ''}
//     />
//   </div>
// }