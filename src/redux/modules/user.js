import dataURItoBlob from '../../constants/dataURItoBlob';
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
const UPLOAD_AVATAR_BASE64 = 'UPLOAD_AVATAR_BASE64';
const UPLOAD_USER_COVER_BASE64 = 'UPLOAD_USER_COVER_BASE64';
const SAVE_PROFILE = 'SAVE_PROFILE';
const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';
const SAVE_PROFILE_FAIL = 'SAVE_PROFILE_FAIL';
export const OPEN_SOCKET = 'OPEN_SOCKET';
const GET_USER_PROFILE = 'GET_USER_PROFILE';
const GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS';
const GET_USER_PROFILE_FAIL = 'GET_USER_PROFILE_FAIL';

const initialState = {
  isAuthenticated: false,
  authorizedUser: {},
  requestedUser: {},
  requestedUserProfile: {},
  loaded: false,
  uploadingImageImage: false,
  userProfile: {}
};

export default function signReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        authorizedUser: action.result.data,
        isAuthenticated: true
        // isAuthenticated: !!action.result.data.access_token
      };
    case LOGIN_FAIL:
      console.log('LOGIN_FAIL:', action.result);
      return {
        ...state,
        loading: false,
        authorizedUser: null,
        loginError: action.error,
        isAuthenticated: false
      };

    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        authorizedUser: action.result.data,
        isAuthenticated: true
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        authorizedUser: {},
        isAuthenticated: false
      };

    case REGISTER:
      return {
        ...state,
        registeringIn: true,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registeringIn: false,
        loading: false,
        authorizedUser: action.result.data,
        isAuthenticated: !!action.result.data.access_token
      };
    case REGISTER_FAIL:
      return {
        ...state,
        authorizedUser: null,
        isAuthenticated: false,
        registeringIn: false,
        loading: false,
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
        authorizedUser: {},
        isAuthenticated: false,
        requestedUser: {},
        loading: false,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error,
        authorizedUser: null,
        isAuthenticated: false,
        loading: false,
      };

    case LOGIN_FB:
      return {
        ...state,
        loggingFB: true,
        loaded: false
      };
    case LOGIN_FB_SUCCESS:
      return {
        ...state,
        loggingFB: false,
        loaded: true,
        authorizedUser: action.result.data,
        isAuthenticated: true
      };
    case LOGIN_FB_FAIL:
      console.log('LOGIN_FB_FAIL:', action.result);
      return {
        ...state,
        loggingFB: false,
        authorizedUser: null,
        loginError: action.error,
        isAuthenticated: false
      };

    case SHOW_USER:
      const preUser = Object.assign({}, state.requestedUser, {
        cover: null,
        avatar32: null,
        avatar230: null,
        first_name: null,
        last_name: null,
        id: null,
      });
      return {
        ...state,
        loadingUser: true,
        requestedUser: action.user_slug !== state.requestedUser.slug ? preUser : state.requestedUser,
      };
    case SHOW_USER_SUCCESS:
      return {
        ...state,
        loadingUser: false,
        requestedUser: action.result.data,
      };
    case SHOW_USER_FAIL:
      return {
        ...state,
        loadingUser: false,
        requestedUser: {}
      };

    case GET_USER_PROFILE:
      return {
        ...state,
        requestedUserProfile: state.requestedUser.slug !== action.slug ? {} : state.requestedUserProfile,
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        requestedUserProfile: action.result.data,
      };
    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        requestedUserProfile: {},
        error: action.errors,
      };

    case FOLLOW_REQUESTED_USER:
      return {
        ...state,
      };
    case FOLLOW_REQUESTED_USER_SUCCESS:
      const followRequestedUser = Object.assign({}, state.requestedUser, {
        is_follow: true
      });
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
      const unfollowRequestedUser = Object.assign({}, state.requestedUser, {
        is_follow: false
      });
      return {
        ...state,
        requestedUser: unfollowRequestedUser,
      };
    case UNFOLLOW_REQUESTED_USER_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case UPLOAD_USER_COVER: {
      return {
        ...state,
        uploadingImage: true,
      };
    }
    case UPLOAD_USER_COVER_SUCCESS: {
      const updateUserCoverImg = Object.assign({}, state.requestedUser, {
        cover: action.result.data
      });

      return {
        ...state,
        uploadingImage: false,
        requestedUser: updateUserCoverImg,
      };
    }
    case UPLOAD_USER_COVER_FAIL: {
      return {
        ...state,
        uploadingImage: false,
        error: action.error,
      };
    }

    case UPLOAD_AVATAR: {
      return {
        ...state,
        uploadingImage: true,
      };
    }
    case UPLOAD_AVATAR_SUCCESS: {
      const updateAvatar = Object.assign({}, state.authorizedUser, {
        avatar230: action.result.data.avatar230,
        avatar32: action.result.data.avatar32
      });

      return {
        ...state,
        uploadingImage: false,
        authorizedUser: updateAvatar,
      };
    }
    case UPLOAD_AVATAR_FAIL: {
      return {
        ...state,
        uploadingImage: false,
        error: action.error,
      };
    }

    case UPLOAD_AVATAR_BASE64: {
      const updateAvatarBase64 = Object.assign({}, state.authorizedUser, {
        avatar230: action.avatarBase64
      });
      // const updateAvatarBase64 = state.authorizedUser;
      // updateAvatarBase64.avatar230 = action.avatarBase64;

      return {
        ...state,
        authorizedUser: updateAvatarBase64
      };
    }

    case UPLOAD_USER_COVER_BASE64: {
      const updateUserCoverBase64 = Object.assign({}, state.authorizedUser, {
        cover: action.userCoverBase64
      });
      // const updateUserCoverBase64 = state.authorizedUser;
      // updateUserCoverBase64.cover = action.userCoverBase64;

      return {
        ...state,
        authorizedUser: updateUserCoverBase64
      };
    }

    case SAVE_PROFILE:
      return {
        ...state,
        saved: false,
      };
    case SAVE_PROFILE_SUCCESS:
      // const userProfile = Object.assign({}, state.requestedUserProfile, {
      //   profile: action.profile,
      //   first_name: action.profile.first_name,
      //   last_name: action.profile.last_name,
      //   slug: action.result.data.slug
      // });

      return {
        ...state,
        saved: true,
        requestedUserProfile: action.result.data
      };
    case SAVE_PROFILE_FAIL:
      return {
        ...state,
        saved: false,
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
    promise: (client) => client.get('/users/authorized-user')
  };
}

export function register(email, password, first_name, last_name) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post('/registration', {data: {email, password, first_name, last_name}})
  };
}

export function login(email, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/auth/login', {data: {email, password}})
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
    promise: (client) => client.post('/auth/connect', {data: {provider, avatar, token}})
  };
}

export function getAuthSlug(globalState) {
  return globalState.user.authorizedUser && globalState.user.authorizedUser.slug;
}

export function getUserSlug(globalState) {
  const path = globalState.routing.locationBeforeTransitions.pathname;
  console.log('PATH in reducer Function getUserSlug(test):', path);
  return path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));     // get user slug in pathname between / or after first /
}

export function getUser(slug) {
  const user_slug = slug || '';
  return {
    types: [SHOW_USER, SHOW_USER_SUCCESS, SHOW_USER_FAIL],
    promise: (client) => client.get(`/users/${user_slug}/requested-user`),
    user_slug
  };
}

export function getUserProfile(slug) {
  return {
    types: [GET_USER_PROFILE, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAIL],
    promise: (client) => client.get(`/users/${slug}/profile`),
    slug
  };
}

export function followRequestedUser(user_id) {
  return {
    types: [FOLLOW_REQUESTED_USER, FOLLOW_REQUESTED_USER_SUCCESS, FOLLOW_REQUESTED_USER_FAIL],
    promise: (client) => client.post('/follows/simple-user-follow', {data: {user_id}})
  };
}

export function unfollowRequestedUser(user_id) {
  return {
    types: [UNFOLLOW_REQUESTED_USER, UNFOLLOW_REQUESTED_USER_SUCCESS, UNFOLLOW_REQUESTED_USER_FAIL],
    promise: (client) => client.post('/follows/simple-user-unfollow', {data: {user_id}})
  };
}

export function uploadUserCover(picture, color, name) {
  const formData = new FormData();
  if (picture) { formData.append('file', dataURItoBlob(picture), name); }
  formData.append('color', color);
  return {
    types: [UPLOAD_USER_COVER, UPLOAD_USER_COVER_SUCCESS, UPLOAD_USER_COVER_FAIL],
    promise: (client) => client.post('/upload/user-cover', {data: formData})
  };
}

export function uploadUserCoverBase64(userCoverBase64) {
  return {
    type: UPLOAD_USER_COVER_BASE64,
    userCoverBase64
  };
}

export function uploadAvatar(picture, name) {
  const formData = new FormData();
  formData.append('file', dataURItoBlob(picture), name);
  return {
    types: [UPLOAD_AVATAR, UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_FAIL],
    promise: (client) => client.post('/upload/avatar', {data: formData})
  };
}

export function uploadAvatarBase64(avatarBase64) {
  return {
    type: UPLOAD_AVATAR_BASE64,
    avatarBase64
  };
}

export function save(profile) {
  return {
    types: [SAVE_PROFILE, SAVE_PROFILE_SUCCESS, SAVE_PROFILE_FAIL],
    profile,
    promise: (client) => client.post('/engagment/profile', {data: profile})
  };
}

export function openWebsocket() {
  return {
    type: OPEN_SOCKET
  };
}
