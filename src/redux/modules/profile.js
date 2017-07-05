const SAVE_PROFILE = 'SAVE_PROFILE';
const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';
const SAVE_PROFILE_FAIL = 'SAVE_PROFILE_FAIL';
const LOAD_PROFILE = 'LOAD_PROFILE';
const LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE_SUCCESS';
const LOAD_PROFILE_FAIL = 'LOAD_PROFILE_FAIL';
const LOAD_USER_FRIENDS = 'LOAD_USER_FRIENDS';
const LOAD_USER_FRIENDS_SUCCESS = 'LOAD_USER_FRIENDS_SUCCESS';
const LOAD_USER_FRIENDS_FAIL = 'LOAD_USER_FRIENDS_FAIL';

const GET_NOTIFICATION_SETTINGS = 'GET_NOTIFICATION_SETTINGS';
const GET_NOTIFICATION_SETTINGS_SUCCESS = 'GET_NOTIFICATION_SETTINGS_SUCCESS';
const GET_NOTIFICATION_SETTINGS_FAIL = 'GET_NOTIFICATION_SETTINGS_FAIL';
const SET_NOTIFICATION_SETTINGS = 'SET_NOTIFICATION_SETTINGS';
const SET_NOTIFICATION_SETTINGS_SUCCESS = 'SET_NOTIFICATION_SETTINGS_SUCCESS';
const SET_NOTIFICATION_SETTINGS_FAIL = 'SET_NOTIFICATION_SETTINGS_FAIL';

const initialState = {
  notificationSettings: {},
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATION_SETTINGS:
      return {
        ...state,
        gettingNotification: true,
      };
    case GET_NOTIFICATION_SETTINGS_SUCCESS:
      return {
        ...state,
        gettingNotification: false,
        notificationSettings: action.result.data
      };
    case GET_NOTIFICATION_SETTINGS_FAIL:
      return {
        ...state,
        gettingNotification: false,
        error: action.error,
      };


    case SET_NOTIFICATION_SETTINGS:
      return {
        ...state,
        settingNotification: true,
      };
    case SET_NOTIFICATION_SETTINGS_SUCCESS:
      const newNotificationSettings = Object.assign(state.notificationSettings);
      switch (action.place) {
        case 'settings':
          newNotificationSettings.settings = action.settings;
          break;
        case 'updates':
          newNotificationSettings.updates = action.settings;
          break;

        default:
          console.log('error');
      }
      return {
        ...state,
        settingNotification: false,
        notificationSettings: newNotificationSettings
      };
    case SET_NOTIFICATION_SETTINGS_FAIL:
      return {
        ...state,
        settingNotification: false,
        error: action.error,
      };

    case LOAD_PROFILE:
      return {
        ...state,
        loaded: false,
      };
    case LOAD_PROFILE_SUCCESS:
      // console.log('LOAD_PROFILE_SUCCESS', action.result.data);
      return {
        ...state,
        loaded: true,
        userProfile: action.result.data
      };
    case LOAD_PROFILE_FAIL:
      return {
        ...state,
        loaded: false,
        error: action.error,
      };

    case LOAD_USER_FRIENDS:
      return {
        ...state,
        loading: true
      };
    case LOAD_USER_FRIENDS_SUCCESS:
      return {
        ...state,
        loading: false,
        friends: action.result.data,
      };
    case LOAD_USER_FRIENDS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export function getNotificationSettings() {
  return {
    types: [GET_NOTIFICATION_SETTINGS, GET_NOTIFICATION_SETTINGS_SUCCESS, GET_NOTIFICATION_SETTINGS_FAIL],
    promise: (client) => client.get('/notifications/view-settings')
  };
}

// export function setNotificationSettings() {
//   return {
//     types: [GET_NOTIFICATION_SETTINGS, GET_NOTIFICATION_SETTINGS_SUCCESS, GET_NOTIFICATION_SETTINGS_FAIL],
//     promise: (client) => client.post('/notifications/settings', { data: { something }})
//   };
// }

export function setNotificationSettings(settings, place) {
  console.log('setNotificationSettings', settings, place);
  return {
    type: SET_NOTIFICATION_SETTINGS_SUCCESS,
    settings,
    place
  };
}

export function load(slug) {
  const user_slug = slug || '';
  return {
    types: [LOAD_PROFILE, LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAIL],
    promise: (client) => client.get('/user/profile', { params: { user_slug }})
  };
}

export function loadUserFriends(slug) {
  const user_slug = slug || '';
  return {
    types: [LOAD_USER_FRIENDS, LOAD_USER_FRIENDS_SUCCESS, LOAD_USER_FRIENDS_FAIL],
    promise: (client) => client.get('/people/block', { params: { user_slug }})
  };
}
