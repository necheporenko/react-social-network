import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { showActiveFormSteps } from '../redux/modules/form';
import Engagement from '../components/Registration/Engagement/';

@connect((state) => ({
  activeFormSteps: state.forms.activeFormSteps
}), {
  showActiveFormSteps
})

export default class EngagementContainer extends Component {
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
