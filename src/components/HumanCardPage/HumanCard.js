import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import ReactMarkdown from 'react-markdown';
import {createDraftHumanCard, updateDraftHumanCard} from '../../redux/modules/document';
import SignHumanCard from '../Popup/SignHumanCard';
import './human-card.scss';

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
      this.state['fullName'] = draftHumanCard.full_name;
    } else if (requestedUser && requestedUser.first_name && requestedUser.last_name) {
      this.state['fullName'] = `${requestedUser.first_name} ${requestedUser.last_name}`
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

  // linkHC() {
  //   const {humanCard} = this.props;
  //   const {slug} = this.props.requestedUser;
  //   browserHistory.push(`/${slug}/documents/human-card/${humanCard.public_address}`);
  // }
  
  onHoverHumanCard(e) {
    const el = document.querySelector('.infoblock-human-card .review-proofs a');
    const human_card = document.querySelector('.human-card');

    const borderNone = () => {
      el.style.textDecoration = 'none';
      human_card.style.border = '1px solid #dadada';
    };

    const borderSolid = () => {
      el.style.textDecoration = 'underline';
      human_card.style.border = '1px solid #777';
    };
    
    if (el && this.props.humanCard) {
      const h2 = human_card.querySelector('h2');
      const p3 = human_card.querySelector('p:nth-child(3)');
      
      if (e.target === h2 || e.target === p3) {
        borderNone();
      } else {
        borderSolid();
      } 
    } else if (el) {
      const inputs = human_card.querySelectorAll('input');
      const item1 = inputs[0];
      const item2 = inputs[1];
      const item1Style = getComputedStyle(item1);
      console.log(item1Style)
      const item2Style = getComputedStyle(item2);

      if (item1 && item2 && (e.target === item1 || e.target === item2)) {
        borderNone();
        
        if (e.target === item1 && item1Style.borderBottomColor === 'rgb(225, 225, 225)') {
          item1.style.borderBottomColor = 'rgb(119, 119, 119)';
        } else if (e.target === item2 && item2Style.borderBottomColor === 'rgb(225, 225, 225)') {
          item2.style.borderBottomColor = 'rgb(119, 119, 119)';
        }
      } else {
        borderSolid();

        if (item1Style.borderBottomColor === 'rgb(119, 119, 119)') {
          item1.style.borderBottomColor = 'rgb(225, 225, 225)';
        } else if (item2Style.borderBottomColor === 'rgb(119, 119, 119)') {
          item2.style.borderBottomColor = 'rgb(225, 225, 225)';
        }
      }
    }
  }
  
  onFocusInputs(e) {
    const inputs = document.querySelectorAll('.human_card input');
    const item1 = inputs[0];
    const item2 = inputs[1];

    if (e.target === item1) {
      item1.style.borderBottomColor = 'rgb(77, 144, 254)';
    } else if (e.target === item2) {
      item2.style.borderBottomColor = 'rgb(77, 144, 254)';
    }
  }

  onHoverOutHumanCard() {
    const el = document.querySelector('.infoblock-human-card .review-proofs a');
    const human_card = document.querySelector('.infoblock-human-card .human-card');

    if (el) {
      el.style.textDecoration = 'none';
      human_card.style.border = '1px solid #dadada';
    }
  }

  fnHumanCard(e) {
    const {slug} = this.props.requestedUser;
    const div = document.querySelector('.wrapper-human-card');
    const el = document.querySelector('.infoblock-human-card .review-proofs a');

    const getLink = () => {
      const id = this.linkToHumanCard();
      
      if (id) {
        browserHistory.push(`/${slug}/documents/human-card/${id}`);
      } else {
        browserHistory.push(`/${slug}/documents/human-card`);
      }
    };

    if (div && el && this.props.humanCard) {
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
    const {humanCard, draftHumanCard, authorizedUser} = this.props;
    const {first_name, last_name, slug} = this.props.requestedUser;

    return (
      <div 
        className="wrapper-human-card"
        onMouseOut={this.onHoverOutHumanCard} 
        onMouseMove={this.onHoverHumanCard}
        onClick={this.fnHumanCard}
      >
        <div className="human-card human-card-preview">
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
                    style={{fontSize: '13px'}}
                    readOnly
                  />
                  : <input
                    type="text" placeholder="Paste your public address here"
                    onChange={this.changePublicAddress}
                    value={this.state.publicAddress}
                    onFocus={this.onFocusInputs}
                    ref={el => this.inputPublicAddress = el}
                    style={{fontSize: '13px'}}
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
                    type="text" placeholder="Paste your getAddress here"
                    value={this.state.fullName}
                    style={{fontSize: '22px'}}
                    readOnly
                  />
                  : <input
                    type="text" placeholder="Paste your getAddress here"
                    onChange={this.changeFullName}
                    value={this.state.fullName}
                    onFocus={this.onFocusInputs}
                    ref={el => this.inputFullName = el}
                    style={{fontSize: '22px'}}
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
