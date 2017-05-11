import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import SubHeader from '../components/StoryLine/SubHeader';

@connect((state) => ({
  user: state.sign.user
}), {})

export default class PeopleContainer extends Component {
  render() {
    return (
      <div>
        <SubHeader
          user={this.props.user}
        />
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

PeopleContainer.propTypes = {
  children: PropTypes.element,
  user: PropTypes.object
};
