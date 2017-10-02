import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import SubHeader from '../components/StoryLine/SubHeader';
import Navigation from '../components/Navigation';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser
}))

export default class UserContainer extends Component {
  constructor() {
    super();

    this.state = {
      showSmallNavigation: false
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
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

  render() {
    const {requestedUser, authorizedUser} = this.props;
    const { showSmallNavigation } = this.state;

    return (
      <div>
        <SubHeader
          requestedUser={requestedUser}
        />
        <Navigation
          requestedUser={requestedUser}
          authorizedUser={authorizedUser}
          showSmallNavigation={showSmallNavigation}
        />
        <div style={{ marginTop: (showSmallNavigation ? 68 : 20) }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

UserContainer.propTypes = {
  authorizedUser: PropTypes.object,           //user
  requestedUser: PropTypes.object
};
