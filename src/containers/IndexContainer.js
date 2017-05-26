import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { login as loginUser, load as loadAuth, register as registerUser, loginSocial } from '../redux/modules/sign';
import { showActiveForm } from '../redux/modules/form';
import { isLoadedChannelList, isLoadedChannelStories, create as createChannel,
  show as showChannel, load as loadChannels, isMashUp, loadNext as loadNextChannelStories,
  clearPagination } from '../redux/modules/channel';
import { create as createStory } from '../redux/modules/story';
import NewUser from '../components/Registration/Main';
import MainPage from '../components/MainPage';


@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    if (!isLoadedChannelStories(getState())) {
      promises.push(dispatch(showChannel(isMashUp(getState()))));
    }
    // dispatch(clearPagination());
    if (!isLoadedChannelList(getState())) {
      promises.push(dispatch(loadChannels()));
    }

    return Promise.all(promises);
  }
}])


@connect((state) => ({
  authorizedUser: state.sign.authorizedUser,
  isAuthenticated: state.sign.isAuthenticated,
  loading: state.sign.loading,
  authEmail: state.sign.authEmail,
  authPass: state.sign.authPass,
  activeForm: state.forms.activeForm,
  channelsArr: state.channel.channelsArr,
  channelStories: state.channel.channelStories,
}), {
  loginUser,
  loginSocial,
  loadAuth,
  registerUser,
  showActiveForm,
  createStory,
  showChannel,
  isLoadedChannelList,
  createChannel,
  loadChannels,
  loadNextChannelStories
})

export default class IndexContainer extends Component {
  render() {
    return (
      <div>
        {this.props.isAuthenticated &&
          <MainPage
            authorizedUser={this.props.authorizedUser}
            createStory={this.props.createStory}
            channelsArr={this.props.channelsArr}
            loadChannels={this.props.loadChannels}
            showChannel={this.props.showChannel}
            createChannel={this.props.createChannel}
            channelStories={this.props.channelStories}
            loadNextChannelStories={this.props.loadNextChannelStories}
          />
        }
        {!this.props.isAuthenticated &&
          <NewUser
            activeForm={this.props.activeForm}
            showActiveForm={this.props.showActiveForm}
            loginUser={this.props.loginUser}
            loadAuth={this.props.loadAuth}
            registerUser={this.props.registerUser}
            loginSocial={this.props.loginSocial}
            loading={this.props.loading}
            showChannel={this.props.showChannel}
          />
        }
      </div>
    );
  }
}

IndexContainer.propTypes = {
  isAuthenticated: PropTypes.bool,            //sign
  authorizedUser: PropTypes.object,
  loginUser: PropTypes.func,
  loadAuth: PropTypes.func,
  registerUser: PropTypes.func,
  loginSocial: PropTypes.func,
  loading: PropTypes.bool,
  showActiveForm: PropTypes.func,             //form
  activeForm: PropTypes.string,
  createChannel: PropTypes.func,              //channel
  loadChannels: PropTypes.func,
  showChannel: PropTypes.func,
  channelsArr: PropTypes.array,
  channelStories: PropTypes.array,
  loadNextChannelStories: PropTypes.func,
  createStory: PropTypes.func,                //story
};
