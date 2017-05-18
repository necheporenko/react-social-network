export const FOLLOW_USER = 'FOLLOW_USER';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAIL = 'FOLLOW_USER_FAIL';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAIL = 'UNFOLLOW_USER_FAIL';
export const LOAD_PEOPLE_FOLLOWING = 'LOAD_PEOPLE_FOLLOWING';
export const LOAD_PEOPLE_FOLLOWING_SUCCESS = 'LOAD_PEOPLE_FOLLOWING_SUCCESS';
export const LOAD_PEOPLE_FOLLOWING_FAIL = 'LOAD_PEOPLE_FOLLOWING_FAIL';
export const LOAD_PEOPLE_FOLLOWERS = 'LOAD_PEOPLE_FOLLOWERS';
export const LOAD_PEOPLE_FOLLOWERS_SUCCESS = 'LOAD_PEOPLE_FOLLOWERS_SUCCESS';
export const LOAD_PEOPLE_FOLLOWERS_FAIL = 'LOAD_PEOPLE_FOLLOWERS_FAIL';
export const LOAD_PEOPLE_SUGGESTED = 'LOAD_PEOPLE_SUGGESTED';
export const LOAD_PEOPLE_SUGGESTED_SUCCESS = 'LOAD_PEOPLE_SUGGESTED_SUCCESS';
export const LOAD_PEOPLE_SUGGESTED_FAIL = 'LOAD_PEOPLE_SUGGESTED_FAIL';


const initialState = {
  following: [],
  followers: [],
  suggested: [],
  loaded: {
    loadedFollowing: false,
    loadedFollowers: false,
    loadedSuggested: false,
  },
};

export default function followReducer(state = initialState, action) {
  switch (action.type) {
    case FOLLOW_USER:
      return {
        ...state,
        following: false,
      };
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        following: true,
      };
    case FOLLOW_USER_FAIL:
      return {
        ...state,
        following: false,
        error: action.error,
      };

    case UNFOLLOW_USER:
      return {
        ...state,
        unfollowing: false,
      };
    case UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        unfollowing: true,
      };
    case UNFOLLOW_USER_FAIL:
      return {
        ...state,
        unfollowing: false,
        error: action.error,
      };

    case LOAD_PEOPLE_FOLLOWING:
      return {
        ...state,
        loading: true
      };
    case LOAD_PEOPLE_FOLLOWING_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: {
          loadedFollowing: true
        },
        following: action.result.data,
      };
    case LOAD_PEOPLE_FOLLOWING_FAIL:
      return {
        ...state,
        loading: false,
        loaded: {
          loadedFollowing: false
        },
        error: action.error,
      };

    case LOAD_PEOPLE_FOLLOWERS:
      return {
        ...state,
        loading: true
      };
    case LOAD_PEOPLE_FOLLOWERS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: {
          loadedFollowers: true
        },
        followers: action.result.data,
      };
    case LOAD_PEOPLE_FOLLOWERS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: {
          loadedFollowers: false
        },
        error: action.error,
      };

    case LOAD_PEOPLE_SUGGESTED:
      return {
        ...state,
        loading: true
      };
    case LOAD_PEOPLE_SUGGESTED_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: {
          loadedSuggested: true
        },
        suggested: action.result.data,
      };
    case LOAD_PEOPLE_SUGGESTED_FAIL:
      return {
        ...state,
        loading: false,
        loaded: {
          loadedSuggested: false
        },
        error: action.error,
      };

    default:
      return state;
  }
}

export function isLoadedFollowing(globalState) {
  return globalState.follow && globalState.follow.loaded.loadedFollowing;
}

export function isLoadedFollowers(globalState) {
  return globalState.follow && globalState.follow.loaded.loadedFollowers;
}

export function isLoadedSuggested(globalState) {
  return globalState.follow && globalState.follow.loaded.loadedSuggested;
}

export function follow(id) {
  return {
    types: [FOLLOW_USER, FOLLOW_USER_SUCCESS, FOLLOW_USER_FAIL],
    promise: (client) => client.post('/follow/connect', { data: { user_id: id, channel_id: '' }})                       //todo:  add channel_id
  };
}

export function unfollow(id) {
  return {
    types: [UNFOLLOW_USER, UNFOLLOW_USER_SUCCESS, UNFOLLOW_USER_FAIL],
    promise: (client) => client.post('/follow/disconnect', { data: { user_id: id, channel_id: '' }})
  };
}

export function loadPeopleFollowing(slug) {
  const user_slug = slug || '';
  return {
    types: [LOAD_PEOPLE_FOLLOWING, LOAD_PEOPLE_FOLLOWING_SUCCESS, LOAD_PEOPLE_FOLLOWING_FAIL],
    promise: (client) => client.get('/people/following', { params: { user_slug }})
  };
}

export function loadPeopleFollowers(slug) {
  const user_slug = slug || '';
  return {
    types: [LOAD_PEOPLE_FOLLOWERS, LOAD_PEOPLE_FOLLOWERS_SUCCESS, LOAD_PEOPLE_FOLLOWERS_FAIL],
    promise: (client) => client.get('/people/followers', { params: { user_slug }})
  };
}

export function loadPeopleSuggested(slug) {
  const user_slug = slug || '';
  return {
    types: [LOAD_PEOPLE_SUGGESTED, LOAD_PEOPLE_SUGGESTED_SUCCESS, LOAD_PEOPLE_SUGGESTED_FAIL],
    promise: (client) => client.get('/people/suggested', { params: { user_slug }})
  };
}
