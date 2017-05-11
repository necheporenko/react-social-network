import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
// import { userRegisterRequest, userLoginRequest, userLogin, login as loginUser, isLoaded as isAuthLoaded, load as loadAuth } from '../redux/modules/user';
import { login as loginUser, load as loadAuth, register as registerUser } from '../redux/modules/sign';
import { showActiveForm } from '../redux/modules/form';
import { createChannelRequest } from '../redux/modules/channel';
import { createStoryRequest, showUserStoriesRequest,
  isLoaded as isStoriesLoaded, load as loadStories } from '../redux/modules/story';
import NewUser from '../components/Registration/Main';
import MainPage from '../components/MainPage';

// @asyncConnect([{
//   promise: ({store: { dispatch, getState }}) => {
//     // if (!isStoriesLoaded(getState())) {
//     //   return dispatch(loadStories(getState().user.id));
//     //   return dispatch(loadStories(2));
//     // }
//   }
//
//   // const promises = []
//   // const getCurrentUser = !isAuthLoaded(getState())
//   //   ? dispatch(loadAuth()).then(() => getState().auth.user).catch(() => null)
//   //   : Promise.resolve(getState().auth.user)
//   //
//   // promises.push(getCurrentUser.then((currentUser) => {
//   // const listsPromises = []
//   //
//   // if (currentUser && !isAppsLoaded(getState())) {
//   //   listsPromises.push(dispatch(loadApps(currentUser)))
//   // }
//   //
//   // return Promise.all(listsPromises)
// }])

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
  createStoryRequest,
  // showUserStoriesRequest
})

export default class IndexContainer extends Component {
  render() {
    return (
      <div>
        {this.props.isAuthenticated &&
          <div>
            <MainPage
              user={this.props.user}
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
          <button onClick={() => this.props.loadStories()}>load</button>
        </div>
        {!this.props.isAuthenticated &&
          <div>
            <NewUser
              activeForm={this.props.activeForm}
              showActiveForm={this.props.showActiveForm}
              // userLoginRequest={this.props.userLoginRequest}
              // userRegisterRequest={this.props.userRegisterRequest}
              loginUser={this.props.loginUser}
              loadAuth={this.props.loadAuth}
              loadStories={this.props.loadStories}
              registerUser={this.props.registerUser}
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
  user: PropTypes.object,

  showActiveForm: PropTypes.func,
  activeForm: PropTypes.string,

  // userLoginRequest: PropTypes.func,
  // userRegisterRequest: PropTypes.func,

  createChannelRequest: PropTypes.func,
  channelsArr: PropTypes.array,

  createStoryRequest: PropTypes.func,
  showUserStoriesRequest: PropTypes.func,
  storiesArr: PropTypes.array,

  loginUser: PropTypes.func,
  loadAuth: PropTypes.func,
  loadStories: PropTypes.func,
  registerUser: PropTypes.func
};


// function mapStateToProps(state) {
//   return {
//     // users: state.users.usersArr,
//     // isAuthenticated: state.users.isAuthenticated,
//     // user: state.users.user,
//     activeForm: state.forms.activeForm,
//
//     // authEmail: state.users.authEmail,
//     // authPass: state.users.authPass,
//
//     channelsArr: state.channel.channelsArr,
//
//     // storiesArr: state.story.storiesArr
//   };
// }
//
// export default connect(mapStateToProps, {
//   // userRegisterRequest,
//   showActiveForm,
//   // userLoginRequest,
//   // userLogin,
//   createChannelRequest,
//   // createStoryRequest,
//   // showUserStoriesRequest,
//   // loginUser
// })(IndexContainer);
