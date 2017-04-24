import React, { Component, PropTypes } from 'react';
import EngagementFormStep1 from './EngagementFormStep1';
import EngagementFormStep2 from './EngagementFormStep2';

import './index.scss';

class Engagement extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.onFormShowSteps = this.onFormShowSteps.bind(this);
  }

  onFormShowSteps(formSteps) {
    console.log(formSteps); // eslint-disable-line no-console
    this.props.showActiveFormSteps(formSteps);
  }

  submitForm(data) {
    console.log(data); // eslint-disable-line no-console
  }
  invalid() {
    console.log('error');// eslint-disable-line no-console
  }

  render() {
    return (
      <div>
        {/* <Header /> */}
        <div className="engagement">
          <div className="engagement-wrap ">

            <div className="engagement-steps">
              <div className="engagement-step-1 engagement-step-1-active" onClick={() => this.onFormShowSteps('step-1')}>
                <div className="engagement-step-title">
                  <h3>Step 1</h3>
                  <p>Add details</p>
                </div>
              </div>
              <div className="engagement-step-2" onClick={() => this.onFormShowSteps('step-2')}>
                <div className="engagement-step-title">
                  <h3>Step 2</h3>
                  <p>Add picture</p>
                </div>
              </div>
            </div>
            {this.props.activeFormSteps === 'step-1' &&
              <div className="engagement-content engagement-content-1">
                <div className="engagement-content-title">Add more details about yourself. This information will help people find you.</div>

                <EngagementFormStep1
                  onSubmit={this.submitForm}      /* todo check onSubmit & onInvalidSubmit */
                  onInvalidSubmit={this.invalid}
                  bio_value={this.bio_value}
                  occ_value={this.occ_value}
                  company_value={this.company_value}
                  country_value={this.country_value}
                  location_value={this.location_value}
                  birthDate_value={this.birthDate_value}
                  birthMonth_value={this.birthMonth_value}
                  birthDateVisibility_value={this.birthDateVisibility_value}
                  birthYear_value={this.birthYear_value}
                  birthYearVisibility_value={this.birthYearVisibility_value}
                  twitter_value={this.twitter_value}
                  facebook_value={this.facebook_value}
                  linkedin_value={this.linkedin_value}
                  websites_value={this.websites_value}
                  telephone_value={this.telephone_value}
                  skype_value={this.skype_value}
                />
              </div>
            }

            {this.props.activeFormSteps === 'step-2' &&
              <div className="engagement-content engagement-content-2">
                <div className="engagement-content-title">Set your profile picture to help people find you</div>
                <EngagementFormStep2
                  avatar_value={this.avatar_value}
                />
              </div>
            }

          </div>
        </div>
      </div>
    );
  }
}

Engagement.propTypes = {
  activeFormSteps: PropTypes.string,
  showActiveFormSteps: PropTypes.func,

  // bio_value: PropTypes.string,
  // occ_value: PropTypes.string,
  // company_value: PropTypes.string,
  // country_value: PropTypes.string,
  // location_value: PropTypes.string,
  // birthDate_value: PropTypes.string,
  // birthMonth_value: PropTypes.string,
  // birthDateVisibility_value: PropTypes.string,
  // birthYear_value: PropTypes.string,
  // birthYearVisibility_value: PropTypes.string,
  // twitter_value: PropTypes.string,
  // facebook_value: PropTypes.string,
  // linkedin_value: PropTypes.string,
  // websites_value: PropTypes.string,
  // telephone_value: PropTypes.string,
  // skype_value: PropTypes.string
};

export default Engagement;
