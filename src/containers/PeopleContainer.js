import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import Navigation from '../components/Navigation';
// import SubHeader from '../components/StoryLine/SubHeader';

class PeopleContainer extends Component {

  render() {
    return (
      <div>
        {/* <SubHeader
          user={this.props.userInfo}
        /> */}
        {/* <Navigation /> */}
        {this.props.children}
      </div>
    );
  }
}

PeopleContainer.propTypes = {
  children: PropTypes.element,
  // userInfo: PropTypes.object
};

function mapStateToProps() {
  return {
    // userInfo: state.users.userInfo
  };
}

export default connect(mapStateToProps, null)(PeopleContainer);
