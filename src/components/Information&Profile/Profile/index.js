import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { save as saveProfile, load as loadProfile, isLoadedProfile } from '../../../redux/modules/profile';
import ProfileForm from './ProfileForm';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    // if (!isLoadedProfile(getState())) {
    //   promises.push(dispatch(loadProfile()));
    // }
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  activeFormSteps: state.forms.activeFormSteps,
  first_name: state.user.authorizedUser.profile.first_name,
  last_name: state.user.authorizedUser.profile.last_name,
  bio: state.user.authorizedUser.profile.bio,
  occupation: state.user.authorizedUser.profile.occupation,
  company: state.user.authorizedUser.profile.company,
  country: state.user.authorizedUser.profile.country,
  location: state.user.authorizedUser.profile.location,
  birthDate: state.user.authorizedUser.profile.birthDate,
  birthMonth: state.user.authorizedUser.profile.birthMonth,
  birthDateVisibility: state.user.authorizedUser.profile.birthDateVisibility,
  birthYear: state.user.authorizedUser.profile.birthYear,
  birthYearVisibility: state.user.authorizedUser.profile.birthYearVisibility,
  twitter: state.user.authorizedUser.profile.twitter,
  facebook: state.user.authorizedUser.profile.facebook,
  linkedin: state.user.authorizedUser.profile.linkedin,
  website: state.user.authorizedUser.profile.website,
  phone: state.user.authorizedUser.profile.phone,
  skype: state.user.authorizedUser.profile.skype
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
