import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import Books from '../components/Books';
import SubHeader from '../components/StoryLine/SubHeader';

@connect((state) => ({
  user: state.sign.user
}), {})

export default class BooksContainer extends Component {
  render() {
    return (
      <div>
        <SubHeader
          user={this.props.user}
        />
        <Navigation />
        <Books />
      </div>
    );
  }
}

BooksContainer.propTypes = {
  user: PropTypes.object
};
