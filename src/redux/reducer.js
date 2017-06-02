// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { loadingBarReducer } from 'react-redux-loading-bar';
import form from './modules/form';
import channel from './modules/channel';
import story from './modules/story';
import sign from './modules/sign';
import follow from './modules/follow';
import book from './modules/book';
import profile from './modules/profile';
import search from './modules/search';

export default function createReducers(asyncReducers) {
  return {
    reduxAsyncConnect,
    online: (v = true) => v,
    routing: routerReducer,
    loadingBar: loadingBarReducer,
    forms: form,
    channel,
    story,
    sign,
    follow,
    book,
    profile,
    search,
    ...asyncReducers
  };
}
