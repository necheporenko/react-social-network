import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { login as loginUser, load as loadAuth, register as registerUser, loginSocial, isLoaded } from '../redux/modules/user';
import { showActiveForm } from '../redux/modules/form';
import { isLoadedChannelList, isLoadedChannelStories, create as createChannel,
  show as showChannel, load as loadChannels, isMashUp, loadNext as loadNextChannelStories, getAuthUserSlug } from '../redux/modules/channel';
import { load as loadBookTree } from '../redux/modules/book';
import { create as createStory } from '../redux/modules/story';
import { loadWhoToFollow } from '../redux/modules/follow';
import NewUser from '../components/Registration/Main';
import MainPage from '../components/MainPage';


@asyncConnect([{
  promise: ({ store: { dispatch, getState }}) => {
    const promises = [];

    if (isLoaded(getState())) {
      if (!isLoadedChannelStories(getState())) {
        promises.push(dispatch(showChannel(isMashUp(getState()))));
      }
      if (!isLoadedChannelList(getState())) {
        promises.push(dispatch(loadChannels(getAuthUserSlug(getState()))));
      }
      promises.push(dispatch(loadBookTree()));
      promises.push(dispatch(loadWhoToFollow()));
    }

    return Promise.all(promises);
  }
}])


@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  isAuthenticated: state.user.isAuthenticated,
  loading: state.user.loading,
  authEmail: state.user.authEmail,
  authPass: state.user.authPass,
  activeForm: state.forms.activeForm,
  channelsArr: state.channel.channelsArr,
  channelStories: state.channel.channelStories,
  bookTreeArr: state.book.bookTreeArr,
  whoToFollowList: state.follow.whoToFollowList,
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
  loadNextChannelStories,
  loadBookTree,
  loadWhoToFollow,
  getAuthUserSlug
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
            bookTreeArr={this.props.bookTreeArr}
            whoToFollowList={this.props.whoToFollowList}
          />
        }
        {!this.props.isAuthenticated &&
          <NewUser
            authorizedUser={this.props.authorizedUser}
            activeForm={this.props.activeForm}
            showActiveForm={this.props.showActiveForm}
            loginUser={this.props.loginUser}
            loadAuth={this.props.loadAuth}
            registerUser={this.props.registerUser}
            loginSocial={this.props.loginSocial}
            loading={this.props.loading}
            showChannel={this.props.showChannel}
            loadChannels={this.props.loadChannels}
            loadBookTree={this.props.loadBookTree}
            loadWhoToFollow={this.props.loadWhoToFollow}
          />
        }
      </div>
    );
  }
}

IndexContainer.propTypes = {
  isAuthenticated: PropTypes.bool,            //user
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
  bookTreeArr: PropTypes.array,               //book
  loadBookTree: PropTypes.func,
  whoToFollowList: PropTypes.array,           //follow
  loadWhoToFollow: PropTypes.func
};
