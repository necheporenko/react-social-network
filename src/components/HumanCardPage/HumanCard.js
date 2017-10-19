import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import ReactMarkdown from 'react-markdown';
import {createDraftHumanCard, updateDraftHumanCard} from '../../redux/modules/document';
import SignHumanCard from '../Popup/SignHumanCard';
import Loader from '../Common/Loader';
import './human-card.scss';

const borderColorLight = 'rgb(225, 225, 225)';
const borderColorDark = 'rgb(162, 162, 162)';

@connect((state) => ({
  emptyDraftHumanCard: state.document.emptyDraftHumanCard
}), {
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
    this.fnHumanCard = this.fnHumanCard.bind(this);
    this.emptyDraftHumanCard = this.emptyDraftHumanCard.bind(this);
    this.humanCardRender = this.humanCardRender.bind(this);
    this.draftHumanCard = this.draftHumanCard.bind(this);
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
    const getAddress = div.querySelector('p:nth-child(3)');
    let range;
    let select;

    if (document.createRange) {
      range = document.createRange();
      range.selectNodeContents(getAddress);
      select = window.getSelection();
      select.removeAllRanges();
      select.addRange(range);
      document.execCommand('copy');
      select.removeAllRanges();
    } else {
      range = document.body.createTextRange();
      range.moveToElementText(getAddress);
      range.select();
      document.execCommand('copy');
    }
  };

  copyName = () => {
    const div = document.querySelector('.markdown-human-card div');
    const getName = div.querySelector('h2');
    let range;
    let select;

    if (document.createRange) {
      range = document.createRange();
      range.selectNodeContents(getName);
      select = window.getSelection();
      select.removeAllRanges();
      select.addRange(range);
      document.execCommand('copy');
      select.removeAllRanges();
    } else {
      range = document.body.createTextRange();
      range.moveToElementText(getName);
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

  emptyDraftHumanCard() {
    const {draftHumanCard, humanCard, emptyDraftHumanCard} = this.props;

    if (!emptyDraftHumanCard && !humanCard && !draftHumanCard) {
      return <Loader />;
    }
  }

  humanCardRender() {
    const {humanCard} = this.props;

    if (!humanCard) {
      return null;
    }

    return (
      <div className="markdown-human-card">
        {/*<Link to={`/${slug}/documents/human-card/${box.human_card.public_address}`} className="markdown-human-card">*/}
        {this.requestHumanCard(humanCard.url)}
        <ReactMarkdown source={humanCard.markdown}/>
        {/*</Link>*/}
      </div>
    );
  }

  draftHumanCard() {
    const {draftHumanCard, authorizedUser, requestedUser, emptyDraftHumanCard} = this.props;
    const {first_name} = requestedUser;
    const {publicAddress, fullName} = this.state;

    if (!draftHumanCard && !emptyDraftHumanCard) {
      return null;
    }

    return (
      <div className="draft-human-card">
        {/*<div className="help-human-card"><i/></div>*/}
        <h1 style={{marginBottom: 0}}>HUMAN CARD</h1>
        {/*<hr/>*/}
        <p style={{marginTop: '5px', marginBottom: 0}}> 
          {/*<strong>Public Address:</strong>*/}
          {requestedUser.slug !== authorizedUser.slug 
            ? <input
              type="text"
              placeholder={`${first_name}'s public address will be here`}
              value={publicAddress}
              readOnly
            />
            : <input
              type="text"
              placeholder={`${first_name}'s public address will be here`}
              onChange={this.changePublicAddress}
              value={publicAddress}
              ref={el => this.inputPublicAddress = el}
            />
          }
          
          {/*<div className="help-human-card"><i/></div>*/}
        </p>
        <p style={{fontSize: '12px', marginTop: '5px', marginBottom: '10px'}}>
          This public address has been established for:
        </p>
        <p style={{marginTop: '10px'}}> 
          {requestedUser.slug !== authorizedUser.slug
            ? <input
              type="text" placeholder="Type name by which people know you"
              value={fullName}
              style={{fontSize: '20px'}}
              readOnly
            />
            : <input
              type="text" placeholder="Type name by which people know you"
              onChange={this.changeFullName}
              value={fullName}
              ref={el => this.inputFullName = el}
              style={{fontSize: '20px'}}
            />
          }
          {/*<div className="help-human-card"><i/></div>*/}
        </p>
        <p style={{color: '#d2d2d2', fontSize: '12px', magrinTop: 5, marginBottom: 10}}>
          Digital signature and signing date will be here.
          {/*<span>  your signature will be here</span>*/}
          {/*<div className="help-human-card"><i/></div>*/}
        </p>
      </div>
    );
  }

  render() {
    console.log('render');
    const {humanCard, authorizedUser, requestedUser, draftHumanCard, emptyDraftHumanCard} = this.props;

    return (
      <div className="wrapper-human-card">
        <div
          className="human-card human-card-preview"
          onClick={this.fnHumanCard}>
          {this.emptyDraftHumanCard()}
          {this.humanCardRender()}
          {this.draftHumanCard()}
        </div>
        {requestedUser.slug === authorizedUser.slug && (draftHumanCard || emptyDraftHumanCard) &&
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
