import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { login as loginUser, load as loadAuth, register as registerUser, loginSocial } from '../redux/modules/sign';
import { showActiveForm } from '../redux/modules/form';
import { createChannelRequest } from '../redux/modules/channel';
import { create as createStory, isLoaded as isStoriesLoaded, load as loadStories } from '../redux/modules/story';
import NewUser from '../components/Registration/Main';
import MainPage from '../components/MainPage';


@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (!isStoriesLoaded(getState())) {
      promises.push(dispatch(loadStories()));
    }
    return Promise.all(promises);
  }
}])


@connect((state) => ({
  user: state.sign.user,
  isAuthenticated: state.sign.isAuthenticated,
  loading: state.sign.loading,
  authEmail: state.sign.authEmail,
  authPass: state.sign.authPass,
  activeForm: state.forms.activeForm,
  channelsArr: state.channel.channelsArr,
  storiesArr: state.story.storiesArr
}), {
  loginUser,
  loadAuth,
  registerUser,
  showActiveForm,
  createChannelRequest,
  loadStories,
  isStoriesLoaded,
  createStory,
  loginSocial
})

export default class IndexContainer extends Component {
  render() {
    return (
      <div>
        {this.props.isAuthenticated &&
          <MainPage
            user={this.props.user}
            storiesArr={this.props.storiesArr}
            createStory={this.props.createStory}
            loadStories={this.props.loadStories}
            channelsArr={this.props.channelsArr}
            createChannelRequest={this.props.createChannelRequest}
          />
        }
        {!this.props.isAuthenticated &&
          <NewUser
            activeForm={this.props.activeForm}
            showActiveForm={this.props.showActiveForm}
            loginUser={this.props.loginUser}
            loadAuth={this.props.loadAuth}
            loadStories={this.props.loadStories}
            registerUser={this.props.registerUser}
            loginSocial={this.props.loginSocial}
            loading={this.props.loading}
          />
        }
      </div>
    );
  }
}

IndexContainer.propTypes = {
  isAuthenticated: PropTypes.bool,            //sign
  user: PropTypes.object,
  loginUser: PropTypes.func,
  loadAuth: PropTypes.func,
  registerUser: PropTypes.func,
  loginSocial: PropTypes.func,
  loading: PropTypes.bool,
  showActiveForm: PropTypes.func,             //form
  activeForm: PropTypes.string,
  createChannelRequest: PropTypes.func,       //channel
  channelsArr: PropTypes.array,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
};
