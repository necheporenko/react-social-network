import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { FacebookLogin } from 'react-facebook-login-component';
import { Form } from 'formsy-react-components';
import FormSignIn from '../FormSignIn';
import InformationFooter from '../../Information&Profile/Information/InformationFooter';
import { login as loginUser, loginSocial, openWebsocket } from '../../../redux/modules/user';
import { show as showChannel, load as loadChannels } from '../../../redux/modules/channel';
import { loadWhoToFollow } from '../../../redux/modules/follow';
import { load as loadBookTree } from '../../../redux/modules/book';
import MinHeader from '../../Header/MinHeader';
import './index.scss';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
}), {
  loginUser,
  loginSocial,
  showChannel,
  loadChannels,
  loadBookTree,
  loadWhoToFollow,
  openWebsocket
})

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facebook_id: '281599312011088' //got from validbook.org
    };
    this.onSubmitSignInForm = this.onSubmitSignInForm.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  onSubmitSignInForm(data) {
    this.props.loginUser(data.email, data.password)
      .then(() => this.props.openWebsocket())
      .then(() => this.props.showChannel())
      .then(() => this.props.loadWhoToFollow())
      .then(() => this.props.loadBookTree(this.props.authorizedUser.slug))
      .then(() => this.props.loadChannels(this.props.authorizedUser.slug))
      .then(browserHistory.push('/'));
  }


  responseFacebook(response) {
    this.props.loginSocial('facebook', response.picture.data.url, response.accessToken)
      .then(() => this.props.openWebsocket())
      .then(() => this.props.showChannel())
      .then(() => this.props.loadChannels(this.props.authorizedUser.slug))
      .then(() => this.props.loadBookTree(this.props.authorizedUser.slug))
      .then(() => this.props.loadWhoToFollow());
  }

  invalid() {
    console.log('error');       // eslint-disable-line no-console
  }

  render() {
    return (
      <div>
        <Helmet title="Sign in to Validbook"/>
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
  authorizedUser: PropTypes.object,
  loginUser: PropTypes.func,
  openWebsocket: PropTypes.func,
  loginSocial: PropTypes.func,
  showChannel: PropTypes.func,
  loadChannels: PropTypes.func,
  loadBookTree: PropTypes.func,
  loadWhoToFollow: PropTypes.func
};
