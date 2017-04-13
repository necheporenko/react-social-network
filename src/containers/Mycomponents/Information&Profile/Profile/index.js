import React, { Component, PropTypes } from 'react';
//import { Link } from 'react-router';
//import { Form, Input, Select, Textarea, File } from 'formsy-react-components';
//import ProfileMenu from './ProfileMenu';
import ProfileForm from './ProfileForm';
import './index.scss';

class Profile extends Component {

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

          {this.props.children}
        </div>
    );
  }
}

Profile.propTypes = {
  children: PropTypes.element
};

export default Profile;
