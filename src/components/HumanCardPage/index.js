import React, {Component} from 'react';
import {Link} from 'react-router';
import HumanCard from './HumanCard';
import {connect} from 'react-redux';
import SubHeader from '../StoryLine/SubHeader';
import {getUser} from '../../redux/modules/user';
import {getHumanCard, getDraftHumanCard, emptyDraftHumanCard} from '../../redux/modules/document';
import './human-card-page.scss';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
  path: state.routing.locationBeforeTransitions.pathname,
  humanCard: state.document.humanCard,
  draftHumanCard: state.document.draftHumanCard
}), {
  getUser,
  getHumanCard,
  getDraftHumanCard,
  emptyDraftHumanCard
})

export default class HumanCardPage extends Component {
  constructor() {
    super();

    this.state = {
      showSmallNavigation: false
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const {path, requestedUser, getUser, getHumanCard, getDraftHumanCard, emptyDraftHumanCard} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    const humanCardSlug = path.substring(path.indexOf('/human-card/') + 12);

    if (!isNaN(humanCardSlug) && humanCardSlug.indexOf('0x') === -1) {
      getUser(findSlug).then(getDraftHumanCard(humanCardSlug));
    } else if (humanCardSlug.indexOf('0x') !== -1) {
      getUser(findSlug).then(getHumanCard(humanCardSlug));
    } else {
      getUser(findSlug).then(emptyDraftHumanCard());
    }
  }
  
  componentWillUnmount() {
    window.scrollTo(0, 0);
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const {showSmallNavigation} = this.state;

    if (scrollTop <= 236 && showSmallNavigation) {
      this.setState({showSmallNavigation: false});
    } else if (scrollTop > 236 && !showSmallNavigation) {
      this.setState({showSmallNavigation: true});
    }
  }

  linkedDigitalPropertyRender() {
    return (
      <div className="linked-property">
        <h2>Linked digital property</h2>
        <div className="property-list">
          <div>
            validbook.org/jimbo.fry
          </div>
          <div>
            facebook.com/jimbo.fry
          </div>
          <div>
            twitter.com/friedcookies
          </div>
        </div>
      </div>
    );
  }

  validatorsRender() {
    return (
      <div className="validators">
        <h2>Validators</h2>
        <ul className="validators-list">
          <li>Jimbo Fry</li>
          <li>Validator 2</li>
          <li>Validator 3</li>
          <li>Validator 4</li>
          <li>Validator 5</li>
        </ul>
      </div>
    );
  }

  validatorsGraphRender() {
    return (
      <div className="validators-graph"/>
    );
  }

  render() {
    const {authorizedUser, humanCard, draftHumanCard, requestedUser} = this.props;
    const {showSmallNavigation} = this.state;
    
    return (
      <div className="human-card-page">
        <div className="upper-block">
          <HumanCard
            humanCard={humanCard}
            draftHumanCard={draftHumanCard}
            requestedUser={requestedUser}
            authorizedUser={authorizedUser}
          />
          {this.linkedDigitalPropertyRender()}
          {this.validatorsRender()}
        </div>
        {this.validatorsGraphRender()}
      </div>
    );
  }
}
