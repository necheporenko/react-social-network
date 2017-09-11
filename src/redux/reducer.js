// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { loadingBarReducer } from 'react-redux-loading-bar';
import form from './modules/form';
import channel from './modules/channel';
import story from './modules/story';
import user from './modules/user';
import follow from './modules/follow';
import book from './modules/book';
import profile from './modules/profile';
import search from './modules/search';
import document from './modules/document';

export default function createReducers(asyncReducers) {
  return {
    reduxAsyncConnect,
    online: (v = true) => v,
    routing: routerReducer,
    loadingBar: loadingBarReducer,
    forms: form,
    channel,
    story,
    user,
    follow,
    book,
    profile,
    search,
    document,
    ...asyncReducers
  };
}
