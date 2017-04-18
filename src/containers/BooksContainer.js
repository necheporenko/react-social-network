import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import Books from '../components/Books';
import SubHeader from '../components/StoryLine/SubHeader';

class BooksContainer extends Component {
  render() {
    return (
      <div>
        <SubHeader
          user={this.props.userInfo}
        />
        <Navigation />
        <Books />
      </div>
    );
  }
}

BooksContainer.propTypes = {
  userInfo: PropTypes.object
};

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo
  };
}

export default connect(mapStateToProps, null)(BooksContainer);
