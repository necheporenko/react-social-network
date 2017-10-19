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
  constructor() {
    super();
    
    this.saveDraft = this.saveDraft.bind(this);
    this.fnHumanCard = this.fnHumanCard.bind(this);
    this.emptyDraftHumanCard = this.emptyDraftHumanCard.bind(this);
    this.humanCardRender = this.humanCardRender.bind(this);
    this.draftHumanCardRender = this.draftHumanCardRender.bind(this);
  }

  saveDraft() {
    const {createDraftHumanCard, updateDraftHumanCard, authorizedUser, draftHumanCard} = this.props;
    
    if (draftHumanCard && draftHumanCard.id) {
      updateDraftHumanCard(this.inputFullName.value, authorizedUser.id, this.inputPublicAddress.value, draftHumanCard.id);
    } else {
      createDraftHumanCard(this.inputFullName.value, authorizedUser.id, this.inputPublicAddress.value);
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
        <ReactMarkdown source={humanCard.markdown}/>
      </div>
    );
  }

  draftHumanCardRender() {
    const {draftHumanCard, authorizedUser, requestedUser, emptyDraftHumanCard} = this.props;
    const {first_name} = requestedUser;

    if (!draftHumanCard && !emptyDraftHumanCard) {
      return null;
    }

    return (
      <div className="draft-human-card">
        <h1 style={{marginBottom: 0}}>HUMAN CARD</h1>
        <p style={{marginTop: '5px', marginBottom: 0}}> 
          {requestedUser.slug !== authorizedUser.slug 
            ? <input
              type="text"
              placeholder={`${first_name}'s public address will be here`}
              defaultValue={draftHumanCard 
                ? draftHumanCard.public_adress 
                : ''
              }
              ref={el => this.inputPublicAddress = el}
              readOnly
            />
            : <input
              type="text"
              placeholder={`${first_name}'s public address will be here`}
              defaultValue={draftHumanCard 
                ? draftHumanCard.public_address 
                : ''
              }
              ref={el => this.inputPublicAddress = el}
            />
          }
          
        </p>
        <p style={{fontSize: '12px', marginTop: '5px', marginBottom: '10px'}}>
          This public address has been established for:
        </p>
        <p style={{marginTop: '10px'}}> 
          {requestedUser.slug !== authorizedUser.slug
            ? <input
              type="text" placeholder="Type name by which people know you"
              defaultValue={draftHumanCard 
                ? draftHumanCard.full_name 
                : `${requestedUser.first_name} ${requestedUser.last_name}`
              }
              ref={el => this.inputFullName = el}
              style={{fontSize: '20px'}}
              readOnly
            />
            : <input
              type="text" placeholder="Type name by which people know you"
              defaultValue={draftHumanCard 
                ? draftHumanCard.full_name 
                : `${requestedUser.first_name} ${requestedUser.last_name}`
              }
              ref={el => this.inputFullName = el}
              style={{fontSize: '20px'}}
            />
          }
        </p>
        <p style={{color: '#d2d2d2', fontSize: '12px', magrinTop: 5, marginBottom: 10}}>
          Digital signature and signing date will be here.
        </p>
      </div>
    );
  }

  render() {
    console.log('render');
    const {humanCard, authorizedUser, requestedUser, draftHumanCard, emptyDraftHumanCard} = this.props;

    return (
      <div className="human-card-container">
        <div
          className="human-card"
          onClick={this.fnHumanCard}>
          {this.emptyDraftHumanCard()}
          {this.humanCardRender()}
          {this.draftHumanCardRender()}
        </div>
        {requestedUser.slug === authorizedUser.slug && (draftHumanCard || emptyDraftHumanCard) &&
          <div className="human-card-btn">
            <button className="btn-brand" onClick={this.saveDraft}>Save</button>
            <SignHumanCard
              fullName={'' }
              publicAddress={''}
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
