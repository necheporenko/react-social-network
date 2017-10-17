import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import ReactMarkdown from 'react-markdown';
import {createDraftHumanCard, updateDraftHumanCard} from '../../redux/modules/document';
import SignHumanCard from '../Popup/SignHumanCard';
import './human-card.scss';

const borderColorLight = 'rgb(225, 225, 225)';
const borderColorDark = 'rgb(162, 162, 162)';

@connect(null, {
  createDraftHumanCard,
  updateDraftHumanCard
})

export default class HumanCard extends Component {
  constructor(props) {
    super(props);

    const {requestedUser, draftHumanCard} = this.props;

    this.state = {
      fullName: '',
      publicAddress: props.draftHumanCard ? props.draftHumanCard.public_address : '',
    };

    if (draftHumanCard) {
      this.state.fullName = draftHumanCard.full_name;
    } else if (requestedUser && requestedUser.first_name && requestedUser.last_name) {
      this.state.fullName = `${requestedUser.first_name} ${requestedUser.last_name}`;
    }
    
    this.changeFullName = this.changeFullName.bind(this);
    this.changePublicAddress = this.changePublicAddress.bind(this);
    this.saveDraft = this.saveDraft.bind(this);
    this.requestHumanCard = this.requestHumanCard.bind(this);
    this.copyAddress = this.copyAddress.bind(this);
    this.CopyToClipboard = this.CopyToClipboard.bind(this);
    this.fnHumanCard = this.fnHumanCard.bind(this);
    this.onHoverHumanCard = this.onHoverHumanCard.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.draftHumanCard && (nextProps.draftHumanCard.full_name !== this.state.fullName ||
      nextProps.draftHumanCard.public_address !== this.state.public_address)) {
      this.setState({
        fullName: nextProps.draftHumanCard.full_name,
        publicAddress: nextProps.draftHumanCard.public_address
      });
    } else {
      this.setState({
        fullName: `${nextProps.requestedUser.first_name} ${nextProps.requestedUser.last_name}`
      });
    }
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
    const {createDraftHumanCard, updateDraftHumanCard, authorizedUser, draftHumanCard} = this.props;
    
    if (draftHumanCard && draftHumanCard.id) {
      updateDraftHumanCard(this.inputFullName.value, authorizedUser.id, this.inputPublicAddress.value, draftHumanCard.id);
    } else {
      createDraftHumanCard(this.inputFullName.value, authorizedUser.id, this.inputPublicAddress.value);
    }
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

  // const div = document.querySelector('.markdown-human-card div');
  // if (div) {
  //   function w(linkHC) {
  //     const h1 = div.querySelector('h1');
  //     const p5 = div.querySelector('p:nth-child(5)');
  //     const p8 = div.querySelector('p:nth-child(8)');

  //     h1.addEventListener('click', linkHC);
  //     p5.addEventListener('click', linkHC);
  //     p8.addEventListener('click', linkHC);
  //   }
  //   setTimeout(() => w(this.linkHC), 1000);
  // }

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
  
  onHoverHumanCard(e) {
    const human_card = document.querySelector('.human-card');

    if (human_card && this.props.humanCard) {
      const p3 = human_card.querySelector('p:nth-child(3)');
      const h2 = human_card.querySelector('h2');
      const hrs = human_card.querySelectorAll('hr');
      const hr1 = hrs[0];
      const hr2 = hrs[1];

      if (e.target === h2) {
        hr2.style.borderTopColor = borderColorDark;
      } else if (e.target === p3) {
        hr1.style.borderTopColor = borderColorDark;
      } else {
        hr1.style.borderTopColor = borderColorLight;
        hr2.style.borderTopColor = borderColorLight;
      }
    } else {
      const inputs = human_card.querySelectorAll('input');
      const item1 = inputs[0];
      const item2 = inputs[1];
      const item1Style = getComputedStyle(item1);
      const item2Style = getComputedStyle(item2);

      if (item1 && item2 && (e.target === item1)) {
        item1.style.borderBottomColor = borderColorDark;
      } else if (item1 && item2 && e.target === item2) {
        item2.style.borderBottomColor = borderColorDark;
      } else {
        item1.style.borderBottomColor = borderColorLight;
        item2.style.borderBottomColor = borderColorLight;
      }
    }
  }

  fnHumanCard(e) {
    const {slug} = this.props.requestedUser;
    const div = document.querySelector('.human-card');
    const el = document.querySelector('.infoblock-human-card .review-proofs a');

    const getLink = () => {
      const id = this.linkToHumanCard();
      
      if (id) {
        browserHistory.push(`/${slug}/documents/human-card/${id}`);
      } else {
        browserHistory.push(`/${slug}/documents/human-card`);
      }
    };

    if (el && this.props.humanCard) {
      const h2 = div.querySelector('h2');
      const p3 = div.querySelector('p:nth-child(3)');
      
      if (e.target !== h2 && e.target !== p3) {
        getLink();
      }
    } else if (el) {
      const inputs = div.querySelectorAll('input');

      if (e.target !== inputs[0] && e.target !== inputs[1]) {
        getLink();
      }
    }
  }

  linkToHumanCard() {
    const {humanCard, draftHumanCard} = this.props;

    if (humanCard && humanCard.public_address) {
      return humanCard.public_address;
    } else if (draftHumanCard && draftHumanCard.id) {
      return draftHumanCard.id;
    }

    return null;
  }

  render() {
    const reviewProof = document.querySelector('.infoblock-human-card .review-proofs a');
    if (reviewProof) {
      const human_card = document.querySelector('.human-card');
      const p3 = human_card.querySelector('p:nth-child(3)');

      p3.style.fontSize = '11px';
    }
    const {humanCard, draftHumanCard, authorizedUser} = this.props;
    const {slug} = this.props.requestedUser;

    return (
      <div className="wrapper-human-card">
        <div
          onMouseOut={this.onHoverOutHumanCard} 
          onMouseMove={this.onHoverHumanCard}
          className="human-card human-card-preview"
          onClick={this.fnHumanCard}>
          {humanCard && humanCard.id
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
                {slug !== authorizedUser.slug 
                  ? <input
                    type="text" placeholder="Paste your public address here"
                    value={this.state.publicAddress}
                    style={{fontSize: reviewProof ? '11px' : '12px'}}
                    readOnly
                  />
                  : <input
                    type="text" placeholder="Paste your public address here"
                    onChange={this.changePublicAddress}
                    value={this.state.publicAddress}
                    ref={el => this.inputPublicAddress = el}
                    style={{fontSize: reviewProof ? '11px' : '12px'}}
                  />
                }
                
                {/*<div className="help-human-card"><i/></div>*/}
              </p>
              <p style={{fontSize: '12px', marginTop: '5px', marginBottom: '10px'}}>
                This public address has been established for:
              </p>
              <p style={{marginTop: '10px'}}> 
                {slug !== authorizedUser.slug
                  ? <input
                    type="text" placeholder="Type name by which people know you"
                    value={this.state.fullName}
                    style={{fontSize: '20px'}}
                    readOnly
                  />
                  : <input
                    type="text" placeholder="Type name by which people know you"
                    onChange={this.changeFullName}
                    value={this.state.fullName}
                    ref={el => this.inputFullName = el}
                    style={{fontSize: '20px'}}
                  />
                }
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
        {slug === authorizedUser.slug && (!humanCard || !humanCard.id) &&
          <div className="human-card-btn">
            <button className="btn-brand" onClick={this.saveDraft}>Save</button>
            <SignHumanCard
              fullName={this.state.fullName}
              publicAddress={this.state.publicAddress}
            />
          </div>
        }
      </div>
    ); 
  }
}

HumanCard.PropTypes = {
  authorizedUser: PropTypes.object,
  requestedUser: PropTypes.object,
  humanCard: PropTypes.object,
  draftHumanCard: PropTypes.object
};
