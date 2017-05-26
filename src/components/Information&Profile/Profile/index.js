import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { save as saveProfile, load as loadProfile, isLoadedProfile } from '../../../redux/modules/profile';
import ProfileForm from './ProfileForm';
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
  saveProfile
})

export default class Profile extends Component {

  submitForm(data) {
    console.log(data); // eslint-disable-line no-console
  }

  invalid() {
    console.log('error');// eslint-disable-line no-console
  }

  render() {
    return (
      <div className="additional-content">
        <div className="additional-title">Edit profile</div>

        <ProfileForm
          onSubmit={this.submitForm}
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

        {this.props.children}
      </div>
    );
  }
}

Profile.propTypes = {
  children: PropTypes.element,
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
