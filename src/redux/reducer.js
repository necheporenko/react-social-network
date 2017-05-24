// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import form from './modules/form';
import channel from './modules/channel';
import story from './modules/story';
import sign from './modules/sign';
import follow from './modules/follow';
import book from './modules/book';
import profile from './modules/profile';

export default function createReducers(asyncReducers) {
  return {
    reduxAsyncConnect,
    online: (v = true) => v,
    routing: routerReducer,
    forms: form,
    // users: user,
    channel,
    story,
    sign,
    follow,
    book,
    profile,
    ...asyncReducers
  };
}
