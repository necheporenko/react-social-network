export const FOLLOW_USER = 'FOLLOW_USER';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAIL = 'FOLLOW_USER_FAIL';
export const LOAD_PEOPLE_FOLLOWING = 'LOAD_PEOPLE_FOLLOWING';
export const LOAD_PEOPLE_FOLLOWING_SUCCESS = 'LOAD_PEOPLE_FOLLOWING_SUCCESS';
export const LOAD_PEOPLE_FOLLOWING_FAIL = 'LOAD_PEOPLE_FOLLOWING_FAIL';
export const LOAD_PEOPLE_SUGGESTED = 'LOAD_PEOPLE_SUGGESTED';
export const LOAD_PEOPLE_SUGGESTED_SUCCESS = 'LOAD_PEOPLE_SUGGESTED_SUCCESS';
export const LOAD_PEOPLE_SUGGESTED_FAIL = 'LOAD_PEOPLE_SUGGESTED_FAIL';


const initialState = {
  following: [],
  suggested: [],
  loaded: false,
};

export default function followReducer(state = initialState, action) {
  switch (action.type) {
    case FOLLOW_USER:
      console.log('FOLLOW_USER:', action);
      return {
        ...state,
        following: false,

      };
    case FOLLOW_USER_SUCCESS:
      console.log('FOLLOW_USER_SUCCESS:', action.result);
      return {
        ...state,
        following: true,
      };
    case FOLLOW_USER_FAIL:
      console.log('FOLLOW_USER_FAIL:', action.result);
      return {
        ...state,
        following: false,
        error: action.error,
      };

    case LOAD_PEOPLE_FOLLOWING:
      // console.log('LOAD_PEOPLE_SUGGESTED:', action);
      return {
        ...state,
        loading: true
      };
    case LOAD_PEOPLE_FOLLOWING_SUCCESS:
      // console.log('FLOAD_PEOPLE_SUGGESTED_SUCCESS:', action.result);
      return {
        ...state,
        loading: false,
        loaded: true,
        following: action.result.data,
      };
    case LOAD_PEOPLE_FOLLOWING_FAIL:
      // console.log('LOAD_PEOPLE_SUGGESTED_FAIL:', action.result);
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };

    case LOAD_PEOPLE_SUGGESTED:
      console.log('LOAD_PEOPLE_SUGGESTED:', action);
      return {
        ...state,
        loading: true
      };
    case LOAD_PEOPLE_SUGGESTED_SUCCESS:
      console.log('FLOAD_PEOPLE_SUGGESTED_SUCCESS:', action.result);
      return {
        ...state,
        loading: false,
        loaded: true,
        suggested: action.result.data,
      };
    case LOAD_PEOPLE_SUGGESTED_FAIL:
      console.log('LOAD_PEOPLE_SUGGESTED_FAIL:', action.result);
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.sign && globalState.follow.loaded;
}

export function follow(id) {
  return {
    types: [FOLLOW_USER, FOLLOW_USER_SUCCESS, FOLLOW_USER_FAIL],
    promise: (client) => client.post('/follow/connect', { data: { user_id: id, channel_id: 1 }})
  };
}

export function loadPeopleFollowing() {
  return {
    types: [LOAD_PEOPLE_FOLLOWING, LOAD_PEOPLE_FOLLOWING_SUCCESS, LOAD_PEOPLE_FOLLOWING_FAIL],
    promise: (client) => client.get('/people/following')
  };
}

export function loadPeopleSuggested() {
  return {
    types: [LOAD_PEOPLE_SUGGESTED, LOAD_PEOPLE_SUGGESTED_SUCCESS, LOAD_PEOPLE_SUGGESTED_FAIL],
    promise: (client) => client.get('/people/suggested')
  };
}
