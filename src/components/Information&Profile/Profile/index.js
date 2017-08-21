import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {save as saveProfile, getUserProfile} from '../../../redux/modules/user';
import ProfileForm from './ProfileForm';
import './index.scss';

@connect((state) => ({
  authSlug: state.user.authorizedUser.slug,
  first_name: state.user.requestedUserProfile.first_name,
  last_name: state.user.requestedUserProfile.last_name,
  bio: state.user.requestedUserProfile.bio,
  occupation: state.user.requestedUserProfile.occupation,
  company: state.user.requestedUserProfile.company,
  country: state.user.requestedUserProfile.country_id,
  location: state.user.requestedUserProfile.location,
  birthDate: state.user.requestedUserProfile.birthDay,
  birthMonth: state.user.requestedUserProfile.birthMonth,
  birthDateVisibility: state.user.requestedUserProfile.birthDateVisibility,
  birthYear: state.user.requestedUserProfile.birthYear,
  birthYearVisibility: state.user.requestedUserProfile.birthYearVisibility,
  twitter: state.user.requestedUserProfile.twitter,
  facebook: state.user.requestedUserProfile.facebook,
  linkedin: state.user.requestedUserProfile.linkedin,
  website: state.user.requestedUserProfile.website,
  phone: state.user.requestedUserProfile.phone,
  skype: state.user.requestedUserProfile.skype
}), {
  saveProfile,
  getUserProfile
})

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.props.getUserProfile(this.props.authSlug);
  }

  submitForm(data) {
    console.log(data);
    this.props.saveProfile(data);
  }

  invalid() {
    console.log('error');
  }

  render() {
    return (
      <div className="additional-content">
        <Helmet title="Edit profile"/>
        <div className="additional-title">Edit profile</div>

        <ProfileForm
          onSubmit={this.submitForm}
          onInvalidSubmit={this.invalid}
          first_name={this.props.first_name}
          last_name={this.props.last_name}
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
  authSlug: PropTypes.string,
  children: PropTypes.element,
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
  getUserProfile: PropTypes.func,
};
