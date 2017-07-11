import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FacebookLogin } from 'react-facebook-login-component';
import { Form } from 'formsy-react-components';
import FormSignIn from '../FormSignIn';
import InformationFooter from '../../Information&Profile/Information/InformationFooter';
import MinHeader from '../../Header/MinHeader';
import './index.scss';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authEmail: '',
      authPass: '',
      facebook_id: '281599312011088' //got from validbook.org
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.onSubmitSignInForm = this.onSubmitSignInForm.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  onSubmitSignInForm(data) {
    console.log(data);         // eslint-disable-line no-console
    this.props.userLoginRequest(data.email, data.password);
  }

  handleAuth(data) {
    console.log(data);          // eslint-disable-line no-console
    this.setState({authEmail: data.email, authPass: data.password});
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

        <div className="auth registration-xs">
          <h3 className="registration-xs-title">Sign in to Validbook</h3>

          <Form
            onValidSubmit={this.onSubmitSignInForm}
            onInvalidSubmit={this.invalid}
            rowClassName={[{'form-group': false}, {row: false}, 'registration-wrap-form']}
              >
            <FormSignIn
              email_value={this.email_value}
              password_value={this.password_value}
              />

            <input className="registration-btn registration-btn-sign-up" type="submit" defaultValue="Sign In"/>
            <Link to="/account/password-recovery/" className="registration-forgot">Forgot password?</Link>
          </Form>

          <div className="easy-divider">
            <span>or</span>
          </div>

          <FacebookLogin
            class="registration-btn registration-btn-fb"
            socialId={this.state.facebook_id}
            language="en_US"
            scope="public_profile,email"
            responseHandler={this.responseFacebook}
            xfbml={true}
            version="v2.5"
            buttonText="Continue with Facebook"
            />
          <InformationFooter />
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  userLoginRequest: PropTypes.func
};

export default Auth;
