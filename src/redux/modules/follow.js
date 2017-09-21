const FOLLOW_USER = 'FOLLOW_USER';
const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
const FOLLOW_USER_FAIL = 'FOLLOW_USER_FAIL';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
const UNFOLLOW_USER_FAIL = 'UNFOLLOW_USER_FAIL';
export const LOAD_PEOPLE_FOLLOWING = 'LOAD_PEOPLE_FOLLOWING';
export const LOAD_PEOPLE_FOLLOWING_SUCCESS = 'LOAD_PEOPLE_FOLLOWING_SUCCESS';
export const LOAD_PEOPLE_FOLLOWING_FAIL = 'LOAD_PEOPLE_FOLLOWING_FAIL';
export const LOAD_PEOPLE_FOLLOWERS = 'LOAD_PEOPLE_FOLLOWERS';
export const LOAD_PEOPLE_FOLLOWERS_SUCCESS = 'LOAD_PEOPLE_FOLLOWERS_SUCCESS';
export const LOAD_PEOPLE_FOLLOWERS_FAIL = 'LOAD_PEOPLE_FOLLOWERS_FAIL';
export const LOAD_PEOPLE_SUGGESTED = 'LOAD_PEOPLE_SUGGESTED';
export const LOAD_PEOPLE_SUGGESTED_SUCCESS = 'LOAD_PEOPLE_SUGGESTED_SUCCESS';
export const LOAD_PEOPLE_SUGGESTED_FAIL = 'LOAD_PEOPLE_SUGGESTED_FAIL';
const LOAD_PEOPLE_ALL = 'LOAD_PEOPLE_ALL';
const LOAD_PEOPLE_ALL_SUCCESS = 'LOAD_PEOPLE_ALL_SUCCESS';
const LOAD_PEOPLE_ALL_FAIL = 'LOAD_PEOPLE_ALL_FAIL';
const LOAD_WHO_TO_FOLLOW_PEOPLE = 'LOAD_WHO_TO_FOLLOW_PEOPLE';
const LOAD_WHO_TO_FOLLOW_PEOPLE_SUCCESS = 'LOAD_WHO_TO_FOLLOW_PEOPLE_SUCCESS';
const LOAD_WHO_TO_FOLLOW_PEOPLE_FAIL = 'LOAD_WHO_TO_FOLLOW_PEOPLE_FAIL';
const LOAD_USER_PEOPLE = 'LOAD_USER_PEOPLE';
const LOAD_USER_PEOPLE_SUCCESS = 'LOAD_USER_PEOPLE_SUCCESS';
const LOAD_USER_PEOPLE_FAIL = 'LOAD_USER_PEOPLE_FAIL';
const CLEAR_PEOPLE_BLOCK = 'CLEAR_PEOPLE_BLOCK';


const initialState = {
  following: [],
  followers: [],
  suggested: [],
  people: [],
  peopleAll: [],
  loaded: {
    loadedFollowing: false,
    loadedFollowers: false,
    loadedSuggested: false,
    loadedPeopleBlock: false,
  },
  over: {
    overFollowing: false,
    overFollowers: false,
    overSuggested: false,
  },
  whoToFollowList: [],
};

export default function followReducer(state = initialState, action) {
  switch (action.type) {
    case FOLLOW_USER:
      return {
        ...state,
        follow: false,
      };
    case FOLLOW_USER_SUCCESS:
      let followFollowing;
      let followInWhoToFollowList;
      // console.log('action.choiceFollow FOLLOW_USER_SUCCESS', action.choiceFollow);

      switch (action.choiceFollow) {
        case 'whoToFollow':
          followInWhoToFollowList = state.whoToFollowList.map((user) => {
            if (user.id === action.user_id) {
              return {
                ...user,
                isFollowing: true
              };
            }
            return {
              ...user
            };
          });
          break;
        case 'people':
          followFollowing = Object.assign({}, state.following, {
            users: state.following.users.map((user) => {
              if (user.id === action.user_id) {
                return {
                  ...user,
                  isFollowing: true
                };
              }
              return {
                ...user
              };
            })
          });
          break;

        default:
          console.log('choiceFollow not found');
      }
      return {
        ...state,
        follow: true,
        following: followFollowing || state.following,
        whoToFollowList: followInWhoToFollowList || state.whoToFollowList
      };
    case FOLLOW_USER_FAIL:
      console.log('FOLLOW_USER_FAIL', action.error);
      return {
        ...state,
        follow: false,
        error: action.error,
      };

    case UNFOLLOW_USER:
      return {
        ...state,
        unfollow: false,
      };
    case UNFOLLOW_USER_SUCCESS:
      let unfollowFollowing;
      let unfollowInWhoToFollowList;
      console.log('action.choiceFollow UNFOLLOW_USER_SUCCESS', action.choiceFollow);

      switch (action.choiceFollow) {
        case 'whoToFollow':
          unfollowInWhoToFollowList = state.whoToFollowList.map((user) => {
            if (user.id === action.user_id) {
              return {
                ...user,
                isFollowing: false
              };
            }
            return {
              ...user
            };
          });
          break;
        case 'people':
          unfollowFollowing = Object.assign({}, state.following, {
            users: state.following.users.map((user) => {
              if (user.id === action.user_id) {
                return {
                  ...user,
                  isFollowing: false
                };
              }
              return {
                ...user
              };
            })
          });
          break;
        default:
          console.log('choiceUnfollow not found');
      }

      return {
        ...state,
        unfollow: true,
        following: unfollowFollowing || state.foconstllowing,
        whoToFollowList: unfollowInWhoToFollowList || state.whoToFollowList
      };
    case UNFOLLOW_USER_FAIL:
      console.log('UNFOLLOW_USER_FAIL', action.error);
      return {
        ...state,
        unfollow: false,
        error: action.error,
      };

    case LOAD_PEOPLE_FOLLOWING:
      return {
        ...state,
        loading: true
      };
    case LOAD_PEOPLE_FOLLOWING_SUCCESS:
      let loaded = Object.assign({}, state.loaded, {
        loadedFollowing: true,
      });

      return {
        ...state,
        loading: false,
        loaded,
        following: action.result.data,
      };
    case LOAD_PEOPLE_FOLLOWING_FAIL:
      loaded = Object.assign({}, state.loaded, {
        loadedFollowing: false,
      });

      return {
        ...state,
        loading: false,
        loaded,
        error: action.error,
      };

    case LOAD_PEOPLE_FOLLOWERS:
      return {
        ...state,
        loading: true
      };
    case LOAD_PEOPLE_FOLLOWERS_SUCCESS:
      loaded = Object.assign({}, state.loaded, {
        loadedFollowers: true,
      });

      return {
        ...state,
        loading: false,
        loaded,
        followers: action.result.data,
      };
    case LOAD_PEOPLE_FOLLOWERS_FAIL:
      loaded = Object.assign({}, state.loaded, {
        loadedFollowers: false,
      });

      return {
        ...state,
        loading: false,
        loaded,
        error: action.error,
      };

    case LOAD_PEOPLE_SUGGESTED:
      return {
        ...state,
        loading: true
      };
    case LOAD_PEOPLE_SUGGESTED_SUCCESS:
      loaded = Object.assign({}, state.loaded, {
        loadedSuggested: true,
      });

      return {
        ...state,
        loading: false,
        loaded,
        suggested: action.result.data,
      };
    case LOAD_PEOPLE_SUGGESTED_FAIL:
      loaded = Object.assign({}, state.loaded, {
        loadedSuggested: false,
      });

      return {
        ...state,
        loading: false,
        loaded: {
          loadedSuggested: false
        },
        error: action.error,
      };

    case LOAD_PEOPLE_ALL:
      return {
        ...state,
        loading: true
      };
    case LOAD_PEOPLE_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        peopleAll: action.result.data,
      };
    case LOAD_PEOPLE_ALL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case LOAD_WHO_TO_FOLLOW_PEOPLE:
      return {
        ...state,
        loading: true
      };
    case LOAD_WHO_TO_FOLLOW_PEOPLE_SUCCESS:
      return {
        ...state,
        loading: false,
        whoToFollowList: action.result.data,
      };
    case LOAD_WHO_TO_FOLLOW_PEOPLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case LOAD_USER_PEOPLE:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USER_PEOPLE_SUCCESS:
      loaded = Object.assign({}, state.loaded, {
        loadedPeopleBlock: true,
      });

      return {
        ...state,
        loading: false,
        loaded,
        people: action.result.data,
      };
    case LOAD_USER_PEOPLE_FAIL:
      loaded = Object.assign({}, state.loaded, {
        loadedPeopleBlock: false,
      });

      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case CLEAR_PEOPLE_BLOCK:
      loaded = Object.assign({}, state.loaded, {
        loadedPeopleBlock: false,
        loadedFollowing: false,
        loadedFollowers: false
      });
      return {
        ...state,
        loaded
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

export function clearPeopleBlock() {
  return {
    type: CLEAR_PEOPLE_BLOCK
  };
}

export function follow(user_id, choiceFollow) {
  return {
    types: [FOLLOW_USER, FOLLOW_USER_SUCCESS, FOLLOW_USER_FAIL],
    user_id,
    choiceFollow,
    promise: (client) => client.post('/follows/simple-user-follow', { data: { user_id, channel_id: '' }})                       //todo:  add channel_id
  };
}

export function unfollow(user_id, choiceFollow) {
  console.log('Choice of follow', choiceFollow);
  return {
    types: [UNFOLLOW_USER, UNFOLLOW_USER_SUCCESS, UNFOLLOW_USER_FAIL],
    user_id,
    choiceFollow,
    promise: (client) => client.post('/follows/simple-user-unfollow', { data: { user_id, channel_id: '' }})
  };
}

export function loadPeopleAll(slug) {
  const user_slug = slug || '';
  return {
    types: [LOAD_PEOPLE_ALL, LOAD_PEOPLE_ALL_SUCCESS, LOAD_PEOPLE_ALL_FAIL],
    promise: (client) => client.get('/people/all', {params: {user_slug}})
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

export function loadWhoToFollow() {
  return {
    types: [LOAD_WHO_TO_FOLLOW_PEOPLE, LOAD_WHO_TO_FOLLOW_PEOPLE_SUCCESS, LOAD_WHO_TO_FOLLOW_PEOPLE_FAIL],
    promise: (client) => client.get('/follows/who-to-follow')
  };
}

export function loadUserPeople(slug) {
  const user_slug = slug || '';
  return {
    types: [LOAD_USER_PEOPLE, LOAD_USER_PEOPLE_SUCCESS, LOAD_USER_PEOPLE_FAIL],
    promise: (client) => client.get('/people/block', { params: { user_slug }})
  };
}
