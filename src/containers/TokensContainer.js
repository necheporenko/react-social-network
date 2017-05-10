import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import SubHeader from '../components/StoryLine/SubHeader';

class TokensContainer extends Component {

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

TokensContainer.propTypes = {
  children: PropTypes.element,
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.users.user
  };
}

export default connect(mapStateToProps, null)(TokensContainer);
