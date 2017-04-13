import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { App, Home, NotFound } from 'containers';
import Auth from 'components/Registration/Auth';
import PhotosContainer from 'containers/PhotosContainer';
import PhotosCovers from 'components/Photos/PhotosCovers';
import PhotosExternal from 'components/Photos/PhotosExternal';
import PhotosProfile from 'components/Photos/PhotosProfile';
import Photos from 'components/Photos';
import getRoutesUtils from 'utils/routes';

// eslint-disable-next-line import/no-dynamic-require
if (typeof System.import === 'undefined') System.import = module => Promise.resolve(require(module));

export default store => {
  const {
    injectReducerAndRender,
    permissionsComponent
  } = getRoutesUtils(store);

  /* Permissions */

  const isAuthenticated = UserAuthWrapper({
    authSelector: state => state.auth.user,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsAuthenticated'
  });


  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      {/* Home (main) route */}
      <IndexRoute component={Home} />


      {/* need delete this */}
      <Route {...permissionsComponent(isAuthenticated)()}>
        <Route
          path="chatFeathers"
          getComponent={() => injectReducerAndRender(
            { chat: System.import('./redux/modules/chat') },
            System.import('./containers/ChatFeathers/ChatFeathers')
          )}
        />
      </Route>


      <Route path="chat" getComponent={() => System.import('./containers/Chat/Chat')} />

      <Route path="users" getComponent={() => System.import('./containers/Users')} />

      {/* <Route path="notification" component={Notification} /> */}
      <Route path="notification" getComponent={() => System.import('./containers/Notification')} />

      <Route path="/auth" component={Auth} />

      <Route path="/photos" component={PhotosContainer}>
        <IndexRoute component={Photos} />
        <Route path="external" component={PhotosExternal} />
        <Route path="covers" component={PhotosCovers} />
        <Route path="profile" component={PhotosProfile} />
      </Route>

      {/* Catch all route */}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
