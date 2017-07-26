import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import { getUser, getUserSlug } from '../redux/modules/user';
import Navigation from '../components/Navigation';
import SubHeader from '../components/StoryLine/SubHeader';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    promises.push(dispatch(getUser(getUserSlug(getState()))));

    return Promise.all(promises);
  }
}])

@connect((state) => ({
  requestedUser: state.user.requestedUser
}), {
  getUser,
  getUserSlug,
})

export default class PeopleContainer extends Component {
  render() {
    const { requestedUser } = this.props;

    return (
      <div>
        <Helmet
          title={`${requestedUser.first_name} ${requestedUser.last_name} - People`}
        />
        <SubHeader
          requestedUser={this.props.requestedUser}
        />
        <Navigation
          requestedUser={this.props.requestedUser}
        />
        {this.props.children}
      </div>
    );
  }
}

PeopleContainer.propTypes = {
  children: PropTypes.element,
  requestedUser: PropTypes.object
};
