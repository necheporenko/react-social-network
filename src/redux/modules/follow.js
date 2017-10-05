import axios from 'axios';
const FOLLOW_USER = 'FOLLOW_USER';
const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
const FOLLOW_USER_FAIL = 'FOLLOW_USER_FAIL';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
const UNFOLLOW_USER_FAIL = 'UNFOLLOW_USER_FAIL';
const LOAD_PEOPLE_FOLLOWING = 'LOAD_PEOPLE_FOLLOWING';
const LOAD_PEOPLE_FOLLOWING_SUCCESS = 'LOAD_PEOPLE_FOLLOWING_SUCCESS';
const LOAD_PEOPLE_FOLLOWING_FAIL = 'LOAD_PEOPLE_FOLLOWING_FAIL';
const LOAD_PEOPLE_FOLLOWERS = 'LOAD_PEOPLE_FOLLOWERS';
const LOAD_PEOPLE_FOLLOWERS_SUCCESS = 'LOAD_PEOPLE_FOLLOWERS_SUCCESS';
const LOAD_PEOPLE_FOLLOWERS_FAIL = 'LOAD_PEOPLE_FOLLOWERS_FAIL';
const LOAD_PEOPLE_SUGGESTED = 'LOAD_PEOPLE_SUGGESTED';
const LOAD_PEOPLE_SUGGESTED_SUCCESS = 'LOAD_PEOPLE_SUGGESTED_SUCCESS';
const LOAD_PEOPLE_SUGGESTED_FAIL = 'LOAD_PEOPLE_SUGGESTED_FAIL';
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
const FILTER_WHO_TO_FOLLOW_PEOPLE = 'FILTER_WHO_TO_FOLLOW_PEOPLE';
const LOAD_NEXT_PEOPLE_ALL = 'LOAD_NEXT_PEOPLE_ALL';
const LOAD_NEXT_PEOPLE_ALL_SUCCESS = 'LOAD_NEXT_PEOPLE_ALL_SUCCESS';
const LOAD_NEXT_PEOPLE_ALL_FAIL = 'LOAD_NEXT_PEOPLE_ALL_FAIL';
const LOAD_NEXT_FOLLOWING = 'LOAD_NEXT_FOLLOWING';
const LOAD_NEXT_FOLLOWING_SUCCESS = 'LOAD_NEXT_FOLLOWING_SUCCESS';
const LOAD_NEXT_FOLLOWING_FAIL = 'LOAD_NEXT_FOLLOWING_FAIL';
const LOAD_NEXT_FOLLOWERS = 'LOAD_NEXT_FOLLOWERS';
const LOAD_NEXT_FOLLOWERS_SUCCESS = 'LOAD_NEXT_FOLLOWERS_SUCCESS';
const LOAD_NEXT_FOLLOWERS_FAIL = 'LOAD_NEXT_FOLLOWERS_FAIL';
const LOAD_NEXT_SUGGESTED = 'LOAD_NEXT_SUGGESTED';
const LOAD_NEXT_SUGGESTED_SUCCESS = 'LOAD_NEXT_SUGGESTED_SUCCESS';
const LOAD_NEXT_SUGGESTED_FAIL = 'LOAD_NEXT_SUGGESTED_FAIL';


const initialState = {
  following: [],
  followers: [],
  suggested: [],
  people: [],
  peopleAll: [],
  loaded: {
    loadedAllPeople: false,
    loadedFollowing: false,
    loadedFollowers: false,
    loadedSuggested: false,
    loadedPeopleBlock: false,
  },
  pagination: {
    allPeople: 2,
    following: 2,
    followers: 2,
    suggested: 2,
  },
  over: {
    allPeople: false,
    following: false,
    followers: false,
    suggested: false,
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
                is_follow: true
              };
            }
            return {
              ...user
            };
          });
          break;
          
        case 'peopleAll':
          followFollowing = state[action.choiceFollow].map(user => {
            if (user.id === action.user_id) {
              return Object.assign({}, user, {is_follow: true});
            }

            return user;
          });
          break;

        default:
          followFollowing = Object.assign({}, state[action.choiceFollow], {
            users: state[action.choiceFollow].users.map((user) => {
              if (user.id === action.user_id) {
                return Object.assign({}, user, {is_follow: true});
              }
              return user;
            })
          });
      }
      return {
        ...state,
        follow: true,
        whoToFollowList: followInWhoToFollowList || state.whoToFollowList,
        [action.choiceFollow]: followFollowing || state[action.choiceFollow]
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

      switch (action.choiceFollow) {
        case 'whoToFollow':
          unfollowInWhoToFollowList = state.whoToFollowList.map((user) => {
            if (user.id === action.user_id) {
              return {
                ...user,
                is_follow: false
              };
            }
            return {
              ...user
            };
          });
          break;
        
        case 'peopleAll':
          unfollowFollowing = state[action.choiceFollow].map(user => {
            if (user.id === action.user_id) {
              return Object.assign({}, user, {is_follow: false});
            }

            return user;
          });
          break;
          

        default:
          unfollowFollowing = Object.assign({}, state[action.choiceFollow], {
            users: state[action.choiceFollow].users.map((user) => {
              if (user.id === action.user_id) {
                return Object.assign({}, user, {is_follow: false});
              }

              return user;
            })
          });
      }

      return {
        ...state,
        unfollow: true,
        whoToFollowList: unfollowInWhoToFollowList || state.whoToFollowList,
        [action.choiceFollow]: unfollowFollowing || state[action.choiceFollow]
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
        loadedFollowing: true
      });

      return {
        ...state,
        loading: false,
        loaded,
        over: Object.assign({}, state.over, {following: action.result.data.users.length === 0}),
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
        over: Object.assign({}, state.over, {followers: action.result.data.users.length === 0}),
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
        over: Object.assign({}, state.over, {suggested: action.result.data.length === 0}),
        suggested: {
          users: action.result.data
        }
      };
    case LOAD_PEOPLE_SUGGESTED_FAIL:
      loaded = Object.assign({}, state.loaded, {
        loadedSuggested: false,
      });

      return {
        ...state,
        loading: false,
        loaded,
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
        loaded: Object.assign({}, state.loaded, {loadedAllPeople: true}),
        over: Object.assign({}, state.over, {allPeople: action.result.data.length === 0}),
        peopleAll: action.result.data
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

    case FILTER_WHO_TO_FOLLOW_PEOPLE: {
      let newFollowUser = null;
      const whoToFollowUserIds = state.whoToFollowList.map(user => user.id);

      for (let i = 0; i < action.payload.whoToFollowList.length; i++) {
        const item = action.payload.whoToFollowList[i];
        if (!whoToFollowUserIds.includes(item.id)) {
          newFollowUser = item;
          break;
        }
      }

      if (state.whoToFollowList.length === 3 && newFollowUser) {
        return Object.assign({}, state, {
          whoToFollowList: state.whoToFollowList.map(user => {
            if (user.id === action.payload.id) {
              return newFollowUser;
            }

            return user;
          })
        });
      }

      return Object.assign({}, state, {
        whoToFollowList: state.whoToFollowList.filter(user => user.id !== action.payload.id)
      });
    }

    case LOAD_NEXT_PEOPLE_ALL:
      return {
        ...state,
        loading: true
      };

    case LOAD_NEXT_PEOPLE_ALL_SUCCESS:
      return {
        ...state,
        loding: false,
        over: Object.assign({}, state.over, {allPeople: action.result.data.length === 0}),
        pagination: Object.assign({}, state.pagination, {allPeople: state.pagination.allPeople + 1}),
        peopleAll: state.peopleAll.concat(action.result.data),
        loaded: Object.assign({}, state.loaded, {loadedAllPeople: true})
      };
    
    // case LOAD_NEXT_PEOPLE_ALL_FAIL:
    //   return {
    //     ...state,

    //   }

    case LOAD_NEXT_FOLLOWING:
      return {
        ...state,
        loading: true
      };

    case LOAD_NEXT_FOLLOWING_SUCCESS:
      return {
        ...state,
        loding: false,
        over: Object.assign({}, state.over, {following: action.result.data.users.length === 0}),
        pagination: Object.assign({}, state.pagination, {following: state.pagination.following + 1}),
        following: Object.assign({}, state.following, {users: [...state.following.users, ...action.result.data.users]}),
        loaded: Object.assign({}, state.loaded, {loadedFollowing: true})
      };

    // case LOAD_NEXT_FOLLOWING_FAIL:
    //   return {
    //     ...state
    //   }

    case LOAD_NEXT_FOLLOWERS:
      return {
        ...state,
        loading: true
      };

    case LOAD_NEXT_FOLLOWERS_SUCCESS:
      return {
        ...state,
        loding: false,
        over: Object.assign({}, state.over, {followers: action.result.data.users.length === 0}),
        pagination: Object.assign({}, state.pagination, {followers: state.pagination.followers + 1}),
        followers: Object.assign({}, state.followers, {users: [...state.followers.users, ...action.result.data.users]}),
        loaded: Object.assign({}, state.loaded, {loadedFollowers: true})
      };

    // case LOAD_NEXT_FOLLOWERS_FAIL:
    //   return {
    //     ...state
    //   };

    case LOAD_NEXT_SUGGESTED:
      return {
        ...state,
        loading: true
      };
      
    case LOAD_NEXT_SUGGESTED_SUCCESS:
      return {
        ...state,
        loding: false,
        over: Object.assign({}, state.over, {suggested: action.result.data.length === 0}),
        pagination: Object.assign({}, state.pagination, {suggested: state.pagination.suggested + 1}),
        suggested: Object.assign({}, state.suggested, {users: [...state.suggested.users, ...action.result.data]}),
        loaded: Object.assign({}, state.loaded, {loadedSuggested: true})
      };

    // case LOAD_NEXT_SUGGESTED_FAIL:
    //   return {
    //     ...state
    //   };

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

// TODO handle errors
export function filterWhoToFollowUsers(id) {
  return dispatch => {
    return axios('http://api-test.validbook.org/v1/follows/who-to-follow?access_token=Z4EQzHw1sIHAWToNaZNRASeArH2gCGER')
      .then(response => {
        if (response.data && response.data.data) {
          dispatch({
            type: FILTER_WHO_TO_FOLLOW_PEOPLE,
            payload: {
              whoToFollowList: response.data.data,
              id
            }
          });
        }
      });
  };
}

export const getNextPeople = (user_slug, pagination) => {
  return {
    types: [LOAD_NEXT_PEOPLE_ALL, LOAD_NEXT_PEOPLE_ALL_SUCCESS, LOAD_NEXT_PEOPLE_ALL_FAIL],
    promise: (client) => client.get('/people/all', {params: {page: pagination, user_slug}})
  };
};

export const getNextFollowing = (user_slug, pagination) => {
  return {
    types: [LOAD_NEXT_FOLLOWING, LOAD_NEXT_FOLLOWING_SUCCESS, LOAD_NEXT_FOLLOWING_FAIL],
    promise: (client) => client.get('/people/following', {params: {page: pagination, user_slug}})
  };
};

export const getNextFollowers = (user_slug, pagination) => {
  return {
    types: [LOAD_NEXT_FOLLOWERS, LOAD_NEXT_FOLLOWERS_SUCCESS, LOAD_NEXT_FOLLOWERS_FAIL],
    promise: (client) => client.get('/people/followers', {params: {page: pagination, user_slug}})
  };
};

export const getNextSuggested = (user_slug, pagination) => {
  return {
    types: [LOAD_NEXT_SUGGESTED, LOAD_NEXT_SUGGESTED_SUCCESS, LOAD_NEXT_SUGGESTED_FAIL],
    promise: (client) => client.get('/people/suggested', {params: {page: pagination, user_slug}})
  };
};
