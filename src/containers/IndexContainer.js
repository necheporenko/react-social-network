import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { userRegisterRequest, userLoginRequest, userLogin, login as loginUser, isLoaded as isAuthLoaded, load as loadAuth } from '../redux/modules/user';
import { showActiveForm } from '../redux/modules/form';
import { createChannelRequest } from '../redux/modules/channel';
// import { createStoryRequest, showUserStoriesRequest,
//   isLoaded as isStoriesLoaded, load as loadStories } from '../redux/modules/story';
import NewUser from '../components/Registration/Main';
import MainPage from '../components/MainPage';

@asyncConnect([{
  promise: ({store: { dispatch, getState }}) => {
    // if (!isStoriesLoaded(getState())) {
    //   return dispatch(loadStories(getState().userInfo.id));
    //   return dispatch(loadStories(2));
    // }
  }

  // const promises = []
  // const getCurrentUser = !isAuthLoaded(getState())
  //   ? dispatch(loadAuth()).then(() => getState().auth.user).catch(() => null)
  //   : Promise.resolve(getState().auth.user)
  //
  // promises.push(getCurrentUser.then((currentUser) => {
  // const listsPromises = []
  //
  // if (currentUser && !isAppsLoaded(getState())) {
  //   listsPromises.push(dispatch(loadApps(currentUser)))
  // }
  //
  // return Promise.all(listsPromises)
}])

@connect((state) => ({
  stories: state.story.storiesArr,
  userInfo: state.users.userInfo,
}), { loginUser, loadAuth})

class IndexContainer extends Component {
  render() {
    return (
      <div>
        {this.props.isAuthenticated &&
          <div>
            <MainPage
              userInfo={this.props.userInfo}
              channelsArr={this.props.channelsArr}
              createChannelRequest={this.props.createChannelRequest}
              storiesArr={this.props.storiesArr}
              createStoryRequest={this.props.createStoryRequest}
              showUserStoriesRequest={this.props.showUserStoriesRequest}
            />
          </div>
        }
        <div>
          asdd
          <button onClick={() => this.props.loadStories(this.props.userInfo.id)}>load</button>
        </div>
        {!this.props.isAuthenticated &&
          <div>
            <NewUser
              activeForm={this.props.activeForm}
              showActiveForm={this.props.showActiveForm}
              userLoginRequest={this.props.userLoginRequest}
              userRegisterRequest={this.props.userRegisterRequest}
              loginUser={this.props.loginUser}
              loadAuth={this.props.loadAuth}
            />
          </div>
        }
      </div>
    );
  }
}

IndexContainer.propTypes = {
  // users: PropTypes.array,
  // fetchUsers: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  userInfo: PropTypes.object,

  showActiveForm: PropTypes.func,
  activeForm: PropTypes.string,

  userLoginRequest: PropTypes.func,
  userRegisterRequest: PropTypes.func,

  createChannelRequest: PropTypes.func,
  channelsArr: PropTypes.array,

  createStoryRequest: PropTypes.func,
  showUserStoriesRequest: PropTypes.func,
  storiesArr: PropTypes.array
};

function mapStateToProps(state) {
  return {
    users: state.users.usersArr,
    isAuthenticated: state.users.isAuthenticated,
    userInfo: state.users.userInfo,
    activeForm: state.forms.activeForm,

    authEmail: state.users.authEmail,
    authPass: state.users.authPass,

    channelsArr: state.channel.channelsArr,

    storiesArr: state.story.storiesArr
  };
}

export default connect(mapStateToProps, {
  userRegisterRequest,
  showActiveForm,
  userLoginRequest,
  userLogin,
  createChannelRequest,
  // createStoryRequest,
  // showUserStoriesRequest,
  // loginUser
})(IndexContainer);
