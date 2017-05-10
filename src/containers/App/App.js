import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import Helmet from 'react-helmet';
import config from 'config';
import { asyncConnect } from 'redux-connect';
import Header from '../../components/Header';
// import { userLogin, userSignOut, isLoaded as isAuthLoaded, load as loadAuth, } from '../../redux/modules/user';
import { logout as logoutUser, isLoaded as isAuthLoaded, load as loadAuth } from '../../redux/modules/sign';

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
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  isAuthenticated: state.sign.isAuthenticated,
  user: state.sign.user
}), {
  logoutUser
})

class App extends Component {

  /*componentWillMount() {
    const user = Cookies.get('_u') ? JSON.parse(Cookies.get('_u')) : null; // let
    if (user) {
      console.log(user.id, user.email, user.token, user.first_name, user.last_name);
      this.props.userLogin(user.id, user.email, user.token, user.first_name, user.last_name);
    }
  }*/

  componentWillReceiveProps() {
    // const path = this.props.children.props.router.location.pathname;
    // const { first_name, last_name } = this.props.user;
    // const link = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <Helmet {...config.app.head} />
        {this.props.isAuthenticated &&
          <div style={{ marginTop: '52px' }}>
            <Header
              user={this.props.user}
              logoutUser={this.props.logoutUser}
              // onSignOut={this.props.userSignOut}
            />
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
  user: PropTypes.object,
  logoutUser: PropTypes.func
  // userLogin: PropTypes.func,
  // userSignOut: PropTypes.func
};

// function mapStateToProps(state) {
//   return {
//     isAuthenticated: state.sign.isAuthenticated,
//     user: state.sign.user
//   };
// }
//
// export default connect(mapStateToProps, {
//   // userLogin,
//   // userSignOut
// })(App);

export default App;
