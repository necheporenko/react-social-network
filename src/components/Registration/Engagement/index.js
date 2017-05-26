import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { save as saveProfile, load as loadProfile, isLoadedProfile } from '../../../redux/modules/profile';
import { showActiveFormSteps } from '../../../redux/modules/form';
import EngagementFormStep1 from './EngagementFormStep1';
import EngagementFormStep2 from './EngagementFormStep2';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    if (!isLoadedProfile(getState())) {
      promises.push(dispatch(loadProfile()));
    }
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  activeFormSteps: state.forms.activeFormSteps,
  first_name: state.sign.authorizedUser.first_name,
  last_name: state.sign.authorizedUser.last_name,
  bio: state.profile.userProfile.bio,
  occupation: state.profile.userProfile.occupation,
  company: state.profile.userProfile.company,
  country: state.profile.userProfile.country,
  location: state.profile.userProfile.location,
  birthDate: state.profile.userProfile.birthDate,
  birthMonth: state.profile.userProfile.birthMonth,
  birthDateVisibility: state.profile.userProfile.birthDateVisibility,
  birthYear: state.profile.userProfile.birthYear,
  birthYearVisibility: state.profile.userProfile.birthYearVisibility,
  twitter: state.profile.userProfile.twitter,
  facebook: state.profile.userProfile.facebook,
  linkedin: state.profile.userProfile.linkedin,
  website: state.profile.userProfile.website,
  phone: state.profile.userProfile.phone,
  skype: state.profile.userProfile.skype
}), {
  showActiveFormSteps,
  saveProfile
})

export default class Engagement extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.onFormShowSteps = this.onFormShowSteps.bind(this);
  }

  onFormShowSteps(formSteps) {
    console.log(formSteps);
    this.props.showActiveFormSteps(formSteps);
  }

  submitForm(data) {
    data.first_name = this.props.first_name;        // get first_name & last_name from store
    data.last_name = this.props.last_name;
    console.log(data);
    this.props.saveProfile(data);
  }

  invalid() {
    console.log('error');
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
                  bio={this.props.bio}
                  occupation={this.props.occupation}
                  company={this.props.company}
                  country={this.props.country}
                  location={this.props.location}
                  birthDate={this.props.birthDate}
                  birthMonth={this.props.birthMonth}
                  birthDateVisibility={this.props.birthDateVisibility}
                  birthYear={this.props.birthYear}
                  birthYearVisibility={this.props.birthYearVisibility}
                  twitter={this.props.twitter}
                  facebook={this.props.facebook}
                  linkedin={this.props.linkedin}
                  website={this.props.website}
                  phone={this.props.phone}
                  skype={this.props.skype}
                />
              </div>
            }

            {this.props.activeFormSteps === 'step-2' &&
              <div className="engagement-content engagement-content-2">
                <div className="engagement-content-title">Set your profile picture to help people find you</div>
                <EngagementFormStep2
                  avatar={this.avatar}
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
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  bio: PropTypes.string,
  occupation: PropTypes.string,
  company: PropTypes.string,
  country: PropTypes.string,
  location: PropTypes.string,
  birthDate: PropTypes.string,
  birthMonth: PropTypes.string,
  birthDateVisibility: PropTypes.number,
  birthYear: PropTypes.string,
  birthYearVisibility: PropTypes.number,
  twitter: PropTypes.string,
  facebook: PropTypes.string,
  linkedin: PropTypes.string,
  website: PropTypes.string,
  phone: PropTypes.string,
  skype: PropTypes.string,
  saveProfile: PropTypes.func,
};
