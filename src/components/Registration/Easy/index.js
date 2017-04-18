import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FacebookLogin } from 'react-facebook-login-component';
import { Form } from 'formsy-react-components';
import FormSignUp from '../FormSignUp';
import InformationFooter from '../../Information&Profile/Information/InformationFooter';
import MinHeader from '../../Header/MinHeader';
import './index.scss';

class Easy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authEmail: '',
      authPass: '',
      facebook_id: '281599312011088' //got from validbook.org
    };

    this.onSubmitRegisterForm = this.onSubmitRegisterForm.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  onSubmitRegisterForm(data) {
    const { firstName, lastName, email, password } = data;
    this.props.userRegisterRequest(firstName, lastName, email, password);
  }

  responseFacebook(response) {
    console.log('Facebook API login', response); // eslint-disable-line no-console
  }

  invalid() {
    console.log('error');       // eslint-disable-line no-console
  }

  render() {
    return (
      <div>
        <MinHeader />

        <div className="easy registration-xs">
          <h3 className="registration-xs-title">Sign Up – it’s free</h3>

          <FacebookLogin
            class="registration-btn registration-btn-fb"
            socialId={this.state.facebook_id}
            language="en_US"
            scope="public_profile,email"
            responseHandler={this.responseFacebook}
            xfbml={true}
            version="v2.5"
            buttonText="Sign up with Facebook"
          />

          <div className="easy-divider">
            <span>or sign up with email</span>
          </div>

          <Form
            onValidSubmit={this.onSubmitRegisterForm}
            onInvalidSubmit={this.invalid}
            rowClassName={[{'form-group': false}, {row: false}, 'registration-wrap-form']}
            >
            <FormSignUp
              firstName_value={this.firstName_value}
              lastName_value={this.lastName_value}
              email_value={this.email_value}
              password_value={this.password_value}
            />
            <div className="registration-wrap-info">
              <span>By clicking "Sign Up" you indicate that you have read and agreed to the </span>
              <Link to="/terms-of-service" className="hidden-link">Terms of Service.</Link>
            </div>
            <input className="registration-btn registration-btn-sign-up" type="submit" defaultValue="Sign Up"/>
          </Form>
          <InformationFooter />
        </div>
      </div>
    );
  }
}

Easy.propTypes = {
  userRegisterRequest: PropTypes.func
};

export default Easy;
