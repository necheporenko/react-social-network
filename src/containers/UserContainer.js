import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import SubHeader from '../components/StoryLine/SubHeader';
import Navigation from '../components/Navigation';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser
}))

export default class UserContainer extends Component {
  render() {
    const {requestedUser, authorizedUser} = this.props;

    return (
      <div>
        <Helmet
          title={`${requestedUser.first_name} ${requestedUser.last_name} - Storyline`}
        />
        <SubHeader
          requestedUser={requestedUser}
        />
        <Navigation
          requestedUser={requestedUser}
          authorizedUser={authorizedUser}
        />
        <div style={{ marginTop: 20 }}>
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
