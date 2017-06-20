const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOAD = 'LOAD';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAIL = 'LOAD_FAIL';
const LOGOUT = 'LOGOUT';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'LOGOUT_FAIL';
const REGISTER = 'REGISTER';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAIL = 'REGISTER_FAIL';
const LOGIN_FB = 'LOGIN_FB';
const LOGIN_FB_SUCCESS = 'LOGIN_FB_SUCCESS';
const LOGIN_FB_FAIL = 'LOGIN_FB_FAIL';
const SHOW_USER = 'SHOW_USER';
const SHOW_USER_SUCCESS = 'SHOW_USER_SUCCESS';
const SHOW_USER_FAIL = 'SHOW_USER_FAIL';
const FOLLOW_REQUESTED_USER = 'FOLLOW_REQUESTED_USER';
const FOLLOW_REQUESTED_USER_SUCCESS = 'FOLLOW_REQUESTED_USER_SUCCESS';
const FOLLOW_REQUESTED_USER_FAIL = 'FOLLOW_REQUESTED_USER_FAIL';
const UNFOLLOW_REQUESTED_USER = 'UNFOLLOW_REQUESTED_USER';
const UNFOLLOW_REQUESTED_USER_SUCCESS = 'UNFOLLOW_REQUESTED_USER_SUCCESS';
const UNFOLLOW_REQUESTED_USER_FAIL = 'UNFOLLOW_REQUESTED_USER_FAIL';
const UPLOAD_USER_COVER = 'UPLOAD_USER_COVER';
const UPLOAD_USER_COVER_SUCCESS = 'UPLOAD_USER_COVER_SUCCESS';
const UPLOAD_USER_COVER_FAIL = 'UPLOAD_USER_COVER_FAIL';
const UPLOAD_AVATAR = 'UPLOAD_AVATAR';
const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS';
const UPLOAD_AVATAR_FAIL = 'UPLOAD_AVATAR_FAIL';

const initialState = {
  isAuthenticated: false,
  authorizedUser: null,
  requestedUser: {},
  loaded: false
};

export default function signReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      console.log('LOGIN:', action);
      return {
        ...state,
        loading: true,
        loggingIn: true,
        loaded: false
      };
    case LOGIN_SUCCESS:
      // console.log('LOGIN_SUCCESS:', action.result);
      return {
        ...state,
        loggingIn: false,
        loaded: true,
        authorizedUser: action.result.data,
        // isAuthenticated: !!action.result.data.access_token
      };
    case LOGIN_FAIL:
      console.log('LOGIN_FAIL:', action.result);
      return {
        ...state,
        loggingIn: false,
        authorizedUser: null,
        loginError: action.error
      };

    case LOAD:
      // console.log('LOAD:', action);
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      // console.log('LOAD_SUCCESS:', action);
      return {
        ...state,
        loading: false,
        loaded: true,
        authorizedUser: action.result.data,
        // isAuthenticated: !!action.result.data.access_token,
        isAuthenticated: true
      };
    case LOAD_FAIL:
      console.log('LOAD_FAIL:', action);
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        authorizedUser: null,
        isAuthenticated: false
      };

    case REGISTER:
      return {
        ...state,
        registeringIn: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registeringIn: false,
        authorizedUser: action.result.data,
        isAuthenticated: !!action.result.data.access_token
      };
    case REGISTER_FAIL:
      return {
        ...state,
        authorizedUser: null,
        isAuthenticated: false,
        registeringIn: false,
        registerError: action.error
      };

    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        authorizedUser: null,
        isAuthenticated: false
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error,
        authorizedUser: null,
        isAuthenticated: false
      };

    case LOGIN_FB:
      console.log('LOGIN_FB:', action);
      return {
        ...state,
        loggingFB: true,
        loaded: false
      };
    case LOGIN_FB_SUCCESS:
      console.log('LOGIN_FB_SUCCESS:', action.result);
      return {
        ...state,
        loggingFB: false,
        loaded: true,
        authorizedUser: action.result.data,
        // isAuthenticated: action.result.data.access_token && true
      };
    case LOGIN_FB_FAIL:
      console.log('LOGIN_FB_FAIL:', action.result);
      return {
        ...state,
        loggingFB: false,
        authorizedUser: null,
        loginError: action.error,
        // isAuthenticated: false
      };

    case SHOW_USER:
      console.log('SHOW_USER:', action);
      return {
        ...state,
        loadingUser: true,
      };
    case SHOW_USER_SUCCESS:
      console.log('SHOW_USER_SUCCESS:', action.result);
      return {
        ...state,
        loadingUser: false,
        requestedUser: action.result.data,
      };
    case SHOW_USER_FAIL:
      console.log('SHOW_USER_FAIL:', action.result);
      return {
        ...state,
        loadingUser: false,
        requestedUser: null
      };

    case FOLLOW_REQUESTED_USER:
      return {
        ...state,
      };
    case FOLLOW_REQUESTED_USER_SUCCESS:
      const followRequestedUser = Object.assign(state.requestedUser);
      followRequestedUser.isFollowing = true;
      return {
        ...state,
        requestedUser: followRequestedUser,
      };
    case FOLLOW_REQUESTED_USER_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case UNFOLLOW_REQUESTED_USER:
      return {
        ...state,
      };
    case UNFOLLOW_REQUESTED_USER_SUCCESS:
      const unfollowRequestedUser = Object.assign(state.requestedUser);
      unfollowRequestedUser.isFollowing = false;
      console.log('unfollowRequestedUser after', unfollowRequestedUser)
      return {
        ...state,
        // requestedUser: {
        //   isFollowing: false
        // },
        requestedUser: unfollowRequestedUser,
      };
    case UNFOLLOW_REQUESTED_USER_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case UPLOAD_USER_COVER:
      return {
        ...state,
        uploading: true,
      };
    case UPLOAD_USER_COVER_SUCCESS:
      const updateUserCoverImg = state.authorizedUser;
      updateUserCoverImg.cover = action.result.data.url;

      return {
        ...state,
        uploading: false,
        authorizedUser: updateUserCoverImg,
      };
    case UPLOAD_USER_COVER_FAIL:
      return {
        ...state,
        uploading: false,
        error: action.error,
      };

    case UPLOAD_AVATAR:
      return {
        ...state,
        uploading: true,
      };
    case UPLOAD_AVATAR_SUCCESS:
      const updateAvatar = state.authorizedUser;
      updateUserCoverImg.avatar230 = action.result.data.url;

      return {
        ...state,
        uploading: false,
        authorizedUser: updateAvatar,
      };
    case UPLOAD_AVATAR_FAIL:
      return {
        ...state,
        uploading: false,
        error: action.error,
      };

    default:
      return state;
  }
}


export function isLoaded(globalState) {
  return globalState.user && globalState.user.isAuthenticated;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/user')
  };
}

export function register(email, password, first_name, last_name) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post('/registration', { data: { email, password, first_name, last_name }})
  };
}

export function login(email, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/auth/login', { data: { email, password }})
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.post('/auth/logout')
  };
}

export function loginSocial(provider, avatar, token) {
  return {
    types: [LOGIN_FB, LOGIN_FB_SUCCESS, LOGIN_FB_FAIL],
    promise: (client) => client.post('/auth/connect', { data: { provider, avatar, token }})
  };
}

export function getUserSlug(globalState) {
  const path = globalState.routing.locationBeforeTransitions.pathname;
  console.log('PATH in reducer getUserSlug:', path);
  // const getSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
  return path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));     // get user slug in pathname between / or after first /

  // function isPolling(getSlug) {
  //   return getSlug === 'ws' ? false : true;
  // }
  //
  // isPolling(getSlug);
}

export function isPolling(globalState) {
  const path = globalState.routing.locationBeforeTransitions.pathname;
  return path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght)) === 'ws';
}

export function getUser(slug) {
  console.log('slug in user', slug);
  const user_slug = slug || '';
  return {
    types: [SHOW_USER, SHOW_USER_SUCCESS, SHOW_USER_FAIL],
    promise: (client) => client.get('/user/get', { params: { user_slug }})
  };
}

export function followRequestedUser(user_id) {
  return {
    types: [FOLLOW_REQUESTED_USER, FOLLOW_REQUESTED_USER_SUCCESS, FOLLOW_REQUESTED_USER_FAIL],
    promise: (client) => client.post('/follow/connect', { data: { user_id, channel_id: '' }})
  };
}

export function unfollowRequestedUser(user_id) {
  return {
    types: [UNFOLLOW_REQUESTED_USER, UNFOLLOW_REQUESTED_USER_SUCCESS, UNFOLLOW_REQUESTED_USER_FAIL],
    promise: (client) => client.post('/follow/disconnect', { data: { user_id, channel_id: '' }})
  };
}

export function uploadUserCover(img) {
  return {
    types: [UPLOAD_USER_COVER, UPLOAD_USER_COVER_SUCCESS, UPLOAD_USER_COVER_FAIL],
    promise: (client) => client.post('/upload/user-cover', { data: { img }})
  };
}

export function uploadAvatar(img) {
  return {
    types: [UPLOAD_AVATAR, UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_FAIL],
    promise: (client) => client.post('/upload/avatar', { data: { img }})
  };
}
