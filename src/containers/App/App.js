import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import config from 'config';
import {asyncConnect} from 'redux-connect';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {getChannelName} from '../../redux/modules/channel';
import {logout as logoutUser, isLoaded as isAuthLoaded, load as loadAuth} from '../../redux/modules/user';
import {getCountSeenNotification} from '../../redux/modules/profile';
import Header from '../../components/Header';
import MinHeader from '../../components/Header/MinHeader';

// @asyncConnect([{
//   promise: ({store: { dispatch, getState }}) => {
//     // const promises = [];
//     // const getCurrentUser = !isAuthLoaded(getState())
//     // ? dispatch(loadAuth()).then(() => getState().auth.user).catch(() => null)
//     // : Promise.resolve(getState().auth.user);
//
//     // promises.push(getCurrentUser.then((currentUser) => {
//     //   const listsPromises = [];
//     //
//     //   if (currentUser && !isAppsLoaded(getState())) {
//     //     listsPromises.push(dispatch(loadApps(currentUser)));
//     //   }
//
//     //   return Promise.all(listsPromises);
//     // }));
//
//     // if (!isAuthLoaded(getState())) {
//     //   promises.push(dispatch(loadAuth(getState().user.id)));
//     // }
//     // return Promise.all(promises);
//
//     // isStoriesLoaded(getState()) {
//     //   return dispatch(userLogin(5, "ne4eporenko.v+1@gmail.com", "7BrEtFPoc2JGx04tgpKPLsqV9AfRIXfV", "Sonic", "Sega"));
//     // }
//   }
// }])

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    const path = state.routing.locationBeforeTransitions.pathname;
    // console.log('<!======  loadAuth ========!>', isAuthLoaded(getState()));
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
      // console.log('<!======  loadAuth2 ========!>', isAuthLoaded(getState()));
    }
    // else if (!isCountSeenNotification(getState())) {
    //   promises.push(dispatch(getCountSeenNotification(authUserState(getState()))));
    // }
    (path.indexOf('/story/') < 0) && dispatch(showLoading());
    promises.push(dispatch(getChannelName(getState())));

    return Promise.all(promises);
  }
}])

@connect((state) => ({
  isAuthenticated: state.user.isAuthenticated,
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
  locationBeforeTransitions: state.routing.locationBeforeTransitions,
  loadedPage: state.reduxAsyncConnect.loaded,
  bubbleCommon: state.profile.bubbleCommon,
}), ({
  logoutUser,
  hideLoading,
  getCountSeenNotification
}))

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.hideLoading();
    this.props.isAuthenticated && this.props.getCountSeenNotification(this.props.authorizedUser.id);
    this.favicon = document.getElementById('favicon');
  }

  componentDidUpdate() {
    if (this.props.loadedPage) {
      this.props.hideLoading();
    }

    if (this.props.bubbleCommon > 0) {
      this.favicon.href = '/favicon-active.ico';
    } else {
      this.favicon.href = '/favicon.ico';
    }
  }

  render() {
    const {children, bubbleCommon} = this.props;

    return (
      <div className="App">
        <Helmet
          titleTemplate={bubbleCommon > 0 ? `(${bubbleCommon}) %s` : '%s'}
          {...config.app.head}
        />

        {this.props.isAuthenticated &&
        <div style={{marginTop: '52px'}}>
          <Header
            authorizedUser={this.props.authorizedUser}
            logoutUser={this.props.logoutUser}
          />
        </div>
        }

        {!this.props.isAuthenticated && this.props.locationBeforeTransitions.pathname !== '/' &&
        <div style={{marginTop: '52px'}}>
          <MinHeader/>
        </div>
        }
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  isAuthenticated: PropTypes.bool,
  authorizedUser: PropTypes.object,
  locationBeforeTransitions: PropTypes.object,
  logoutUser: PropTypes.func,
  hideLoading: PropTypes.func,
  loadedPage: PropTypes.bool,
  bubbleCommon: PropTypes.number,
  getCountSeenNotification: PropTypes.func,
  // userLogin: PropTypes.func,
  // userSignOut: PropTypes.func
};

export default App;
