import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Form } from 'formsy-react-components';
import { FacebookLogin } from 'react-facebook-login-component';
import FormSignUp from './FormSignUp';
import FormSignIn from './FormSignIn';
import './index.scss';

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authEmail: '',
      authPass: '',
      facebook_id: '562706323765481' //got from validbook.org
    };

    this.onFormShow = this.onFormShow.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.onSubmitSignInForm = this.onSubmitSignInForm.bind(this);
    this.onSubmitRegisterForm = this.onSubmitRegisterForm.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  onFormShow(formName) {
    console.log(formName);
    this.props.showActiveForm(formName);
  }

  onSubmitSignInForm(data) {
    this.props.loginUser(data.email, data.password)
      .then(() => {
        // console.log('DATAAA:', data);
        return this.props.loadAuth();
      })
      .then(() => {
        return this.props.loadStories();
      });
  }

  onSubmitRegisterForm(data) {
    const { email, password, firstName, lastName } = data;
    this.props.registerUser(email, password, firstName, lastName);
  }

  handleAuth(data) {
    console.log(data);
    this.setState({ authEmail: data.email, authPass: data.password });
  }

  responseFacebook(response) {
    console.log('Facebook API login', response);
  }

  invalid() {
    console.log('error');
  }

  render() {
    return (
      <div>
        <div className="registration-bg">

          <div className="login-popup">
            <div className="title-cart">
              <span className="registration-logo">Validbook</span>
              <span className="registration-desc-logo">A tool to organize information,
                learn about something or someone, send and collect tokens</span>
            </div>

            <hr className="registration-line-desc"/>

            <div className="registration-content">
              <div className="registration-desc-site">
                <ul>
                  <li>Organize information about your interests, hobbies, work or anything else.</li>
                  <li>Create your universal digital identity to communicate with friends and other interesting people</li>
                  <li>Write, send and collect <span className="asterix"> tokens</span>.</li>
                </ul>
              </div>

              <div className="registration-forms">

                {this.props.activeForm === 'default' &&
                <div className="registration-form_default">
                  <FacebookLogin
                    class="registration-btn registration-btn-fb"
                    socialId={this.state.facebook_id}
                    language="en_US"
                    scope="public_profile,email"
                    fields="id,email,first_name,last_name,picture"
                    responseHandler={this.responseFacebook}
                    xfbml={true}
                    version="v2.5"
                    buttonText="Continue With Facebook"
                  />

                  <button className="registration-btn registration-btn-fb registration-btn-log-in" onClick={() => this.onFormShow('sign-in')}>Log In</button>
                  <div className="registration-wrap-info">
                    <span className="registration-link-sign-up" onClick={() => this.onFormShow('sign-up')}>Sign Up With Email</span>.
                    <span> By signing up you indicate that you have read and agreed to the </span>
                    <Link to="/terms-of-service">Terms of Service.</Link>
                  </div>
                </div>
                }

                {this.props.activeForm === 'sign-in' &&
                <div className="registration-form-sign-in">
                  <Form
                    onValidSubmit={this.onSubmitSignInForm}
                    onInvalidSubmit={this.invalid}
                    onChange={this.handleAuth}
                    rowClassName={[{'form-group': false}, {row: false}, 'registration-wrap-form']}
                  >
                    <FormSignIn
                      email_value={this.email_value}
                      password_value={this.password_value}
                      userLoginRequest={this.props.userLoginRequest}
                    />
                    {/* <Link to="/engagement">   */}
                    <input className="registration-btn registration-btn-sign-in" type="submit" value="Login"/>
                    {/* </Link> */}
                    <span className="registration-link registration-cancel" onClick={() => this.onFormShow('default')}>Cancel</span>
                    <Link to="/account/password-recovery/" className="registration-forgot">Forgot password?</Link>
                    <button className="registration-btn registration-btn-fb" type="submit">Sign In With Facebook</button>

                  </Form>
                </div>
                }

                {this.props.activeForm === 'sign-up' &&
                <div className="registration-form_sign_up">
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
                    <span className="registration-link registration-cancel" onClick={() => this.onFormShow('default')}>Cancel</span>
                  </Form>
                </div>
                }
              </div>
            </div>

            <hr className="registration-line-desc"/>

            <div className="registration-validbook-explanation">
              <p>Validbook is a universal platform for cooperation. It is a public utility controlled by the people
                of the Earth.
                Validbook is built on open source and open governance principles. Read more about the idea of
                Validbook in this </p>
              <Link to="http://www.slideshare.net/bohdanandriyiv/validbook-presentation-explainer">presentation</Link>.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

New.propTypes = {
  activeForm: PropTypes.string,
  showActiveForm: PropTypes.func,
  userLoginRequest: PropTypes.func,
  userRegisterRequest: PropTypes.func
};

export default New;
