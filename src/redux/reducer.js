// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
// import user from './modules/user';
import form from './modules/form';
import channel from './modules/channel';
import story from './modules/story';
import sign from './modules/sign';

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
    ...asyncReducers
  };
}
