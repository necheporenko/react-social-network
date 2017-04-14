import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Home, NotFound } from 'containers';
import Auth from 'components/Registration/Auth';
import PhotosContainer from 'containers/PhotosContainer';
// import { PhotosCovers, PhotosExternal, PhotosProfile } from 'components/Photos'; // in thia case - error
import PhotosCovers from 'components/Photos/PhotosCovers';
import PhotosExternal from 'components/Photos/PhotosExternal';
import PhotosProfile from 'components/Photos/PhotosProfile';
import Photos from 'components/Photos';

// eslint-disable-next-line import/no-dynamic-require
if (typeof System.import === 'undefined') System.import = module => Promise.resolve(require(module));

export default () => {
  return (
    <Route path="/" component={App}>
      {/* Home (main) route */}
      <IndexRoute component={Home} />

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
