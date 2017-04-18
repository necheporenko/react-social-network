import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SubHeader from '../components/StoryLine/SubHeader';
import Navigation from '../components/Navigation';
import StoryLine from '../components/StoryLine';

class UserContainer extends Component {
  render() {
    return (
      <div>
        <SubHeader
          user={this.props.userInfo}
        />
        <Navigation />
        {this.props.isAuthenticated &&
        <StoryLine />
        }
      </div>
    );
  }
}

UserContainer.propTypes = {
  isAuthenticated: PropTypes.bool,
  userInfo: PropTypes.object
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.users.isAuthenticated,
    userInfo: state.users.userInfo
  };
}

export default connect(mapStateToProps, null)(UserContainer);
