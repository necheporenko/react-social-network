export const FOLLOW_USER = 'FOLLOW_USER';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAIL = 'FOLLOW_USER_FAIL';
export const LOAD_PEOPLE_SUGGESTED = 'LOAD_PEOPLE_SUGGESTED';
export const LOAD_PEOPLE_SUGGESTED_SUCCESS = 'LOAD_PEOPLE_SUGGESTED_SUCCESS';
export const LOAD_PEOPLE_SUGGESTED_FAIL = 'LOAD_PEOPLE_SUGGESTED_FAIL';


const initialState = {
  // people: {
  //   suggested: [],
  //   followers: [],
  //   following: []
  // },
  suggested: [],
  loaded: false,
};

export default function followReducer(state = initialState, action) {
  switch (action.type) {
    case FOLLOW_USER:
      console.log('FOLLOW_USER:', action);
      return {
        ...state,

      };
    case FOLLOW_USER_SUCCESS:
      console.log('FOLLOW_USER_SUCCESS:', action.result);
      return {
        ...state,

      };
    case FOLLOW_USER_FAIL:
      console.log('FOLLOW_USER_FAIL:', action.result);
      return {
        ...state,

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
        // people: {
        //   suggested: action.result.data,
        // }
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

export function loadPeopleSuggested() {
  return {
    types: [LOAD_PEOPLE_SUGGESTED, LOAD_PEOPLE_SUGGESTED_SUCCESS, LOAD_PEOPLE_SUGGESTED_FAIL],
    promise: (client) => client.get('/people/suggested')
  };
}
