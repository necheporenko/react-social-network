import React, {Component} from 'react';
import HumanCard from './HumanCard';
import {connect} from 'react-redux';
import SubHeader from '../StoryLine/SubHeader';
import {getUser} from '../../redux/modules/user';
import './human-card-page.scss';

@connect((state) => ({
  requestedUser: state.user.requestedUser,
  path: state.routing.locationBeforeTransitions.pathname,
}), {
  getUser,
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
    const {path, requestedUser} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));

    if (findSlug !== requestedUser.slug) {
      this.props.getUser(findSlug);
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

  navigationRender() {
    const {showSmallNavigation} = this.state;
    const {slug, avatar32, first_name, last_name, id} = this.props.requestedUser;

    if (!id) {
      return null;
    }

    const scrollTo = () => {
      window.scrollTo(0, 0);
    };

    return (
      <div className="human-card-navigation" style={{
        position: showSmallNavigation ? 'fixed' : null,
        top: showSmallNavigation ? 52 : null,
        zIndex: showSmallNavigation ? 11 : null
      }}>
        <div className="user-info" style={{visibility: showSmallNavigation ? 'visible' : 'hidden'}}>
          <a href={`/${slug}`}>
            <img src={avatar32} alt={`${first_name} ${last_name}`}/>
            <span>{first_name} {last_name}</span>
          </a>
        </div>
        <div className="human-card-page" onClick={scrollTo}>
          <span>Human Card Page</span>
        </div>
      </div>
    );
  }

  linkedDigitalPropertyRender() {
    return (
      <div className="linked-property">
        <h2>Linked digital property</h2>
        <div className="property-list">
          <div>
            <input id="item1" type="checkbox" checked/>
            <label htmlFor="item1">validbook.org/jimbo.fry</label>
          </div>
          <div>
            <input id="item2" type="checkbox"/>
            <label htmlFor="item1">facebook.com/jimbo.fry</label>
          </div>
          <div>
            <input id="item3" type="checkbox"/>
            <label htmlFor="item1">twitter.com/friedcookies</label>
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
      <div className="validators-graph">
        
      </div>
    );
  }

  render() {
    const {requestedUser} = this.props;
    const {showSmallNavigation} = this.state;
    
    return (
      <div>
        <SubHeader
          requestedUser={requestedUser}
        />
        {this.navigationRender()}
        <div id="human-card-page" style={{
          marginTop: showSmallNavigation ? 70 : 20
        }}>
          <div className="upper-block">
            <HumanCard />
            {this.linkedDigitalPropertyRender()}
            {this.validatorsRender()}
          </div>
          {this.validatorsGraphRender()}
        </div>
      </div>
    );
  }
}