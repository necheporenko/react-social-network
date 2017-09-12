import React from 'react';
import {IndexRoute, Route, IndexRedirect} from 'react-router';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/user';
import App from 'containers/App/App';
import IndexContainer from 'containers/IndexContainer';
import UserContainer from 'containers/UserContainer';
import BooksContainer from 'containers/BooksContainer';
import PhotosContainer from 'containers/PhotosContainer';
import PhotosCovers from 'components/Photos/PhotosCovers';
import PhotosExternal from 'components/Photos/PhotosExternal';
import PhotosProfile from 'components/Photos/PhotosProfile';
import Photos from 'components/Photos';
import PeopleContainer from 'containers/PeopleContainer';
import People from 'components/People';
import PeopleFollowing from 'components/People/PeopleFollowing';
import PeopleFollowers from 'components/People/PeopleFollowers';
import PeopleSuggested from 'components/People/PeopleSuggested';
import DocumentsContainer from 'containers/DocumentsContainer';
import Box from 'components/Documents';
import TokensPrivate from 'components/Documents/TokensPrivate';
import Wallet from 'components/Documents/Wallet';
import Inbox from 'components/Documents/Inbox';
import NewDocument from 'components/Documents/NewDocument';
import MessagesContainer from 'containers/MessagesContainer';
import Messages from 'components/Messages';
import NewMessage from 'components/Messages/NewMessage';
import ProfileContainer from 'containers/ProfileContainer';
import Profile from 'components/Information&Profile/Profile';
import Password from 'components/Information&Profile/Profile/Password';
import Privacy from 'components/Information&Profile/Profile/Privacy';
import Notifications from 'components/Information&Profile/Profile/Notifications';
import DeleteAccount from 'components/Information&Profile/Profile/DeleteAccount';
import About from 'components/Information&Profile/Information/About';
import Contacts from 'components/Information&Profile/Information/Contacts';
import TermsOfService from 'components/Information&Profile/Information/TermsOfService';
import NotificationList from 'components/Information&Profile/NotificationList';
import Easy from 'components/Registration/Easy';
import Recovery from 'components/Registration/Recovery';
import Auth from 'components/Registration/Auth';
import Unsubscribe from 'components/Registration/Unsubscribe';
import SearchContainer from 'containers/SearchContainer';
import Search from 'components/Search';
import SearchPeople from 'components/Search/SearchPeople';
import SearchBooks from 'components/Search/SearchBooks';
import SearchLatest from 'components/Search/SearchLatest';
import SearchChannels from 'components/Search/SearchChannels';
import SearchPhotos from 'components/Search/SearchPhotos';
import SearchThings from 'components/Search/SearchThings';
import SearchTokens from 'components/Search/SearchTokens';
import SearchStories from 'components/Search/SearchStories';
import EngagementContainer from 'components/Registration/Engagement';
import BookPage from 'components/BookPage';
import Story from 'containers/StoryDetailsContainer';
import NotFoundPage from 'components/NotFoundPage/NotFoundPage';

// eslint-disable-next-line import/no-dynamic-require
if (typeof System.import === 'undefined') System.import = module => Promise.resolve(require(module));

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      if (!isAuthLoaded(store.getState())) {
        // oops, not logged in, so can't be here!
        replace('/account/auth');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth, checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={IndexContainer}/>
      <Route path="/channel/:channelName" component={IndexContainer}/>

      <Route path="users" getComponent={() => System.import('./containers/Users')}/>

      {/*<Route path="/bookpage" component={BookPage} />*/}

      <Route path="/engagement" component={EngagementContainer}/>

      <Route path="/messages" component={MessagesContainer} onEnter={requireLogin}>
        <IndexRoute component={Messages}/>
        {/*<IndexRedirect to="new" />*/}
        <Route path="new" component={NewMessage}/>
        <Route path=":conversationID" component={Messages}/>
      </Route>

      <Route path="/settings" component={ProfileContainer} onEnter={requireLogin}>
        <IndexRedirect to="profile"/>
        <Route path="profile" component={Profile}/>
        <Route path="password" component={Password}/>
        <Route path="notifications" component={Notifications}/>
        <Route path="privacy" component={Privacy}/>
        <Route path="delete-account" component={DeleteAccount}/>
      </Route>

      <Route path="/contacts" component={Contacts}/>
      <Route path="/terms-of-service" component={TermsOfService}/>
      <Route path="/about" component={About}/>
      <Route path="/account/auth" component={Auth}/>
      <Route path="/registration/easy" component={Easy}/>
      <Route path="/account/password-recovery" component={Recovery}/>
      <Route path="/unsubscribe" component={Unsubscribe}/>
      <Route path="/notifications" component={NotificationList} onEnter={requireLogin}/>

      <Route path="/search" component={SearchContainer}>
        <IndexRoute component={Search}/>
        <Route path="people" component={SearchPeople}/>
        <Route path="books" component={SearchBooks}/>
        <Route path="photos" component={SearchPhotos}/>
        <Route path="Box" component={SearchTokens}/>
        <Route path="channels" component={SearchChannels}/>
        <Route path="latest" component={SearchLatest}/>
        <Route path="stories" component={SearchStories}/>
        <Route path="things" component={SearchThings}/>
      </Route>

      <Route path="/story/:id" component={Story}/>

      <Route path="/:userName" component={UserContainer}/>

      <Route path="/:userName/books" component={BooksContainer}/>
      <Route path="/:userName/books/:bookName" component={BookPage}/>

      <Route path="/:userName/people" component={PeopleContainer}>
        <IndexRoute component={People}/>
        <Route path="following" component={PeopleFollowing}/>
        <Route path="followers" component={PeopleFollowers}/>
        <Route path="suggested" component={PeopleSuggested} onEnter={requireLogin}/>
      </Route>

      <Route path="/:userName/documents/document" component={NewDocument}/>
      <Route path="/:userName/documents/:box/:document" component={NewDocument}/>
      <Route path="/:userName/documents" component={DocumentsContainer}>
        <IndexRoute component={Box}/>
        <Route path="inbox" component={Inbox} onEnter={requireLogin}/>
        <Route path="wallet" component={Wallet}/>
        <Route path="private" component={TokensPrivate}/>
        <Route path="/:userName/documents(/:box)" component={Box}/>
      </Route>

      <Route path="/:userName/photos" component={PhotosContainer}>
        <IndexRoute component={Photos}/>
        <Route path="external" component={PhotosExternal}/>
        <Route path="covers" component={PhotosCovers}/>
        <Route path="profile" component={PhotosProfile}/>
      </Route>

      {/* Catch all route */}
      <Route path="*" component={NotFoundPage} status={404}/>
    </Route>
  );
};
