import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, NotFound } from 'containers';
import Auth from 'components/Registration/Auth';

import PhotosContainer from 'containers/PhotosContainer';
import PhotosCovers from 'components/Photos/PhotosCovers';
import PhotosExternal from 'components/Photos/PhotosExternal';
import PhotosProfile from 'components/Photos/PhotosProfile';
import Photos from 'components/Photos';

import PeopleContainer from 'containers/PeopleContainer';
import People from 'components/People';
import PeopleFollowers from 'components/People/PeopleFollowers';
import PeopleSuggested from 'components/People/PeopleSuggested';

import IndexContainer from 'containers/IndexContainer';

// eslint-disable-next-line import/no-dynamic-require
if (typeof System.import === 'undefined') System.import = module => Promise.resolve(require(module));

export default () => {
  return (
    <Route path="/" component={App}>
      {/* Home (main) route */}
      <IndexRoute component={IndexContainer} />

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

      <Route path="/people" component={PeopleContainer}>
        <IndexRoute component={People} />
        <Route path="followers" component={PeopleFollowers} />
        <Route path="suggested" component={PeopleSuggested} />
      </Route>

      {/* Catch all route */}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
