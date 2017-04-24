import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';

//import { showActiveFormSteps } from '../actions/userActions';
import { showActiveFormSteps } from '../redux/modules/form';
import Engagement from '../components/Registration/Engagement';

class EngagementContainer extends Component {

  render() {
    return (
      <div>
        <Engagement
          activeFormSteps={this.props.activeFormSteps}
          showActiveFormSteps={this.props.showActiveFormSteps}
        />
      </div>
    );
  }
}

EngagementContainer.propTypes = {
  showActiveFormSteps: PropTypes.func,
  activeFormSteps: PropTypes.string
};

function mapStateToProps(state) {
  return {
    activeFormSteps: state.forms.activeFormSteps
  };
}

export default connect(mapStateToProps, {
  showActiveFormSteps
})(EngagementContainer);
