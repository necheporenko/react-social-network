import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { login as loginUser, load as loadAuth, register as registerUser, loginSocial } from '../redux/modules/sign';
import { showActiveForm } from '../redux/modules/form';
import { isLoadedChannelList, isLoadedChannelStories, create as createChannel, show as showChannel, load as loadChannels, isMashUp } from '../redux/modules/channel';
import { isLoaded as isLoadedStories, create as createStory, load as loadStories } from '../redux/modules/story';
import NewUser from '../components/Registration/Main';
import MainPage from '../components/MainPage';


@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    // if (!isLoadedStories(getState())) {
    //   promises.push(dispatch(loadStories()));
    // }

    if (!isLoadedChannelStories(getState())) {
      console.log('isMashUppppppppppppppppppp', isMashUp(getState()));
      promises.push(dispatch(showChannel(isMashUp(getState()))));
    }

    if (!isLoadedChannelList(getState())) {
      promises.push(dispatch(loadChannels()));
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
  channelStories: state.channel.channelStories,
  storiesArr: state.story.storiesArr
}), {
  loginUser,
  loginSocial,
  loadAuth,
  registerUser,
  showActiveForm,
  loadStories,
  isLoadedStories,
  createStory,
  showChannel,
  isLoadedChannelList,
  createChannel,
  loadChannels,
})

export default class IndexContainer extends Component {
  render() {
    return (
      <div>
        {this.props.isAuthenticated &&
          <MainPage
            user={this.props.user}
            // storiesArr={this.props.storiesArr}
            createStory={this.props.createStory}
            // loadStories={this.props.loadStories}
            channelsArr={this.props.channelsArr}
            loadChannels={this.props.loadChannels}
            showChannel={this.props.showChannel}
            createChannel={this.props.createChannel}
            channelStories={this.props.channelStories}
          />
        }
        <div>
          <button onClick={() => console.log(this.getState())}>CLICK</button>
        </div>
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
            showChannel={this.props.showChannel}
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
  createChannel: PropTypes.func,              //channel
  loadChannels: PropTypes.func,
  showChannel: PropTypes.func,
  channelsArr: PropTypes.array,
  channelStories: PropTypes.array,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
};
