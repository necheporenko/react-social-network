export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOAD = 'LOAD';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const LOAD_FAIL = 'LOAD_FAIL';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_FB = 'LOGIN_FB';
export const LOGIN_FB_SUCCESS = 'LOGIN_FB_SUCCESS';
export const LOGIN_FB_FAIL = 'LOGIN_FB_FAIL';
export const SHOW_USER = 'SHOW_USER';
export const SHOW_USER_SUCCESS = 'SHOW_USER_SUCCESS';
export const SHOW_USER_FAIL = 'SHOW_USER_FAIL';

const initialState = {
  isAuthenticated: false,
  authorizedUser: null,
  requestedUser: [],
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

    default:
      return state;
  }
}


export function isLoaded(globalState) {
  return globalState.sign && globalState.sign.isAuthenticated;
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
  console.log('slug in sign', slug);
  const user_slug = slug || '';
  return {
    types: [SHOW_USER, SHOW_USER_SUCCESS, SHOW_USER_FAIL],
    promise: (client) => client.get('/user/get', { params: { user_slug }})
  };
}

