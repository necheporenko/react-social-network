import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import NavigationInfoUser from './NavigationUserInfo';
import './index.scss';

let savePositionTop;

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: null
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.saveScroll = this.saveScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.saveScroll();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }


  handleScroll(e) {
    const scrollTop = e.srcElement.body.scrollTop;
    savePositionTop = scrollTop;
    this.setState({ "scrollTop": scrollTop });
  }

  saveScroll() {
    this.setState({ "scrollTop": savePositionTop });
  }

  render() {
    const { first_name, last_name } = this.props.userInfo;
    const link = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;
    const { scrollTop } = this.state;

    const chooseNav = () => {
      let chooseNav;
      let displayUser;

      if(scrollTop <= 275 || !scrollTop) {
          chooseNav = "navigation";
          displayUser = "navigation-infouser-none";
        } else {
          chooseNav = "navigation navigation-fixed";
          displayUser = "navigation-infouser";
        }
      let result = {posTop: chooseNav, show: displayUser};
      return result;
    };
    
    const navigation = chooseNav();

    return (
      <div className={navigation.posTop}>
        <div className="navigation-wrap">
          <Link
            to={link}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Storyline
          </Link>
          <Link
            to={link + '/books'}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Books
          </Link>
          <Link
            to={link + '/tokens'}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Tokens
          </Link>
          <Link
            to={link + '/people'}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            People
          </Link>
          <Link
            to={link + '/photos'}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Photos
          </Link>
        </div>
        {/* {showName &&
          <NavigationInfoUser
            userName={`${first_name} ${last_name}`}
            link={link}
            displayUser={navigation.show}
          />
        } */}
        <NavigationInfoUser
          userName={`${first_name} ${last_name}`}
          link={link}
          displayUser={navigation.show}
        />
      </div>

    );
  }
}

Navigation.propTypes = {
  children: PropTypes.element,
  userInfo: PropTypes.object,
  routing: PropTypes.object
};

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    routing: state.routing.locationBeforeTransitions
  };
}

export default connect(mapStateToProps, null)(Navigation);
