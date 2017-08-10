const LOAD_SHOW_USER_STORIES = 'LOAD_SHOW_USER_STORIES';
const LOAD_SHOW_USER_STORIES_SUCCESS = 'LOAD_SHOW_USER_STORIES_SUCCESS';
const LOAD_SHOW_USER_STORIES_FAIL = 'LOAD_SHOW_USER_STORIES_FAIL';
const LOAD_NEXT_SHOW_USER_STORIES = 'LOAD_NEXT_SHOW_USER_STORIES';
const LOAD_NEXT_SHOW_USER_STORIES_SUCCESS = 'LOAD_NEXT_SHOW_USER_STORIES_SUCCESS';
const LOAD_NEXT_SHOW_USER_STORIES_FAIL = 'LOAD_NEXT_SHOW_USER_STORIES_FAIL';
const CREATE_STORY = 'CREATE_STORY';
const CREATE_STORY_SUCCESS = 'CREATE_STORY_SUCCESS';
const CREATE_STORY_FAIL = 'CREATE_STORY_FAIL';
const CLEAR_PAGINATION = 'CLEAR_PAGINATION';
const LIKE_STORY = 'LIKE_STORY';
const LIKE_STORY_SUCCESS = 'LIKE_STORY_SUCCESS';
const LIKE_STORY_FAIL = 'LIKE_STORY_FAIL';
const RELOG_STORY = 'RELOG_STORY';
const RELOG_STORY_SUCCESS = 'RELOG_STORY_SUCCESS';
const RELOG_STORY_FAIL = 'RELOG_STORY_FAIL';
const SET_VISIBILITY_STORY = 'SET_VISIBILITY_STORY';
const SET_VISIBILITY_STORY_SUCCESS = 'SET_VISIBILITY_STORY_SUCCESS';
const SET_VISIBILITY_STORY_FAIL = 'SET_VISIBILITY_STORY_FAIL';
const GET_STORY = 'GET_STORY';
const GET_STORY_SUCCESS = 'GET_STORY_SUCCESS';
const GET_STORY_FAIL = 'GET_STORY_FAIL';
const DELETE_STORY = 'DELETE_STORY';
const DELETE_STORY_SUCCESS = 'DELETE_STORY_SUCCESS';
const DELETE_STORY_FAIL = 'DELETE_STORY_FAIL';
const PIN_STORY = 'PIN_STORY';
const PIN_STORY_SUCCESS = 'PIN_STORY_SUCCESS';
const PIN_STORY_FAIL = 'PIN_STORY_FAIL';
const CREATE_NEW_COMMENT = 'CREATE_NEW_COMMENT';
const CREATE_NEW_COMMENT_SUCCESS = 'CREATE_NEW_COMMENT_SUCCESS';
const CREATE_NEW_COMMENT_FAIL = 'CREATE_NEW_COMMENT_FAIL';
const UPDATE_COMMENT = 'UPDATE_COMMENT';
const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
const UPDATE_COMMENT_FAIL = 'UPDATE_COMMENT_FAIL';
const DELETE_COMMENT = 'DELETE_COMMENT';
const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_FAIL = 'DELETE_COMMENT_FAIL';
const CLEAR_STORIES = 'CLEAR_STORIES';


const initialState = {
  isAuthenticated: false,
  loaded: false,
  storiesArr: [],
  singleStory: {},
  over: false,
  paginationStory: 1,
  creatingNewComment: false,
};

export default function storyReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SHOW_USER_STORIES:
      return {
        ...state,
        loading: true
      };
    case LOAD_SHOW_USER_STORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: action.result.status === 'success' && true,       // or just true
        storiesArr: action.result.data,
        paginationStory: 1,
      };
    case LOAD_SHOW_USER_STORIES_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        storiesArr: []
      };

    case LOAD_NEXT_SHOW_USER_STORIES:
      return {
        ...state,
        loading: true
      };
    case LOAD_NEXT_SHOW_USER_STORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: action.result.status === 'success' && true,       // or just true
        over: action.result.data.length === 0 && true,
        storiesArr: [...state.storiesArr, ...action.result.data],
        paginationStory: action.paginationStory + 1,
      };
    case LOAD_NEXT_SHOW_USER_STORIES_FAIL:
      console.log('LOAD_NEXT_SHOW_USER_STORIES_FAIL', action.error);
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        storiesArr: [],
        over: true
      };

    case CREATE_STORY:
      return {
        ...state,
        creating: true
      };
    case CREATE_STORY_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
      };
    case CREATE_STORY_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
      };

    case CLEAR_PAGINATION: {
      return {
        ...state,
        over: false,
      };
    }

    case LIKE_STORY: {
      return {
        ...state,
        liking: true
      };
    }
    case LIKE_STORY_SUCCESS: {
      const notification = action.result.data.notification;
      if (notification) {
        notification.type = 'notification-like';
        socket.send(JSON.stringify(notification));
      }

      const likedStory = state.storiesArr.map((story) => {
        if (story.id === action.story_id) {
          return {
            ...story,
            likes: action.result.data.likes,
          };
        }
        return {
          ...story
        };
      });
      return {
        ...state,
        liking: false,
        storiesArr: likedStory
      };
    }
    case LIKE_STORY_FAIL: {
      return {
        ...state,
        liking: false,
        error: action.error,
      };
    }

    case RELOG_STORY: {
      return {
        ...state,
        reloging: true,
      };
    }
    case RELOG_STORY_SUCCESS: {
      return {
        ...state,
        reloging: false,
      };
    }
    case RELOG_STORY_FAIL: {
      return {
        ...state,
        reloging: false,
      };
    }

    case SET_VISIBILITY_STORY: {
      return {
        ...state,
        setting_visibility: true,
      };
    }
    case SET_VISIBILITY_STORY_SUCCESS: {
      const visibilityStory = state.storiesArr.map((story) => {
        if (story.id === action.story_id) {
          const visibilityObject = Object.assign(story);
          visibilityObject.status = action.visibility_type;
          return {
            ...story,
            visibility: visibilityObject
          };
        }
        return {
          ...story
        };
      });
      return {
        ...state,
        setting_visibility: false,
        storiesArr: visibilityStory
      };
    }
    case SET_VISIBILITY_STORY_FAIL: {
      return {
        ...state,
        setting_visibility: false,
      };
    }

    case GET_STORY:
      return {
        ...state,
        getting: true
      };
    case GET_STORY_SUCCESS:
      return {
        ...state,
        getting: false,
        singleStory: action.result.data,
      };
    case GET_STORY_FAIL:
      return {
        ...state,
        getting: false,
      };

    case DELETE_STORY: {
      return {
        ...state,
        deleting: true,
      };
    }
    case DELETE_STORY_SUCCESS: {
      return {
        ...state,
        deleting: false,
      };
    }
    case DELETE_STORY_FAIL: {
      return {
        ...state,
        deleting: false,
      };
    }

    case PIN_STORY: {
      return {
        ...state,
        pin: true,
      };
    }
    case PIN_STORY_SUCCESS: {
      return {
        ...state,
        pin: false,
      };
    }
    case PIN_STORY_FAIL: {
      return {
        ...state,
        pin: false,
      };
    }

    case CREATE_NEW_COMMENT: {
      return {
        ...state,
        creatingNewComment: false,
      };
    }
    case CREATE_NEW_COMMENT_SUCCESS: {
      let fn;
      const receivedComment = action.result.data;

      const addNewComment = state.storiesArr.map(story => {
        if (story.id === action.entity_id) {
          const searchComment = story.comments;

          if (receivedComment.parent_id === 0) {
            return {
              ...story,
              comments: [...story.comments, receivedComment]
            };
          }

          fn = function fnComments(searchComment) {
            searchComment.map(comment => {
              if (comment.id === receivedComment.parent_id) {
                const newComment = Object.assign(comment);

                if (newComment.children === null) {
                  newComment.children = [];
                  newComment.children.push(receivedComment);
                } else {
                  newComment.children.push(receivedComment);
                }

                return {
                  ...story,
                  comments: [...story.comments, newComment]
                };
              }

              if (comment.children) {
                fn(comment.children);
              }
            });
          };
          fn(searchComment);
        }
        return {
          ...story,
        };
      });
      console.log(addNewComment);
      return {
        ...state,
        creatingNewComment: true,
        storiesArr: addNewComment,
      };
    }
    case CREATE_NEW_COMMENT_FAIL: {
      return {
        ...state,
        creatingNewComment: false,
      };
    }

    case UPDATE_COMMENT: {
      return {
        ...state,
        pin: true,
      };
    }
    case UPDATE_COMMENT_SUCCESS: {
      return {
        ...state,
        pin: false,
      };
    }
    case UPDATE_COMMENT_FAIL: {
      return {
        ...state,
        pin: false,
      };
    }

    case DELETE_COMMENT: {
      return {
        ...state,
        pin: true,
      };
    }
    case DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        pin: false,
      };
    }
    case DELETE_COMMENT_FAIL: {
      return {
        ...state,
        pin: false,
      };
    }

    case CLEAR_STORIES:
      return {
        ...state,
        storiesArr: []
      };

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.story && globalState.story.loaded;
}

export function clearStories() {
  return {
    type: CLEAR_STORIES
  };
}

export function load(user_slug) {
  return {
    types: [LOAD_SHOW_USER_STORIES, LOAD_SHOW_USER_STORIES_SUCCESS, LOAD_SHOW_USER_STORIES_FAIL],
    promise: (client) => client.get(`/users/${user_slug}/stories`)
  };
}

export function loadNext(user_slug, paginationStory) {
  return {
    types: [LOAD_NEXT_SHOW_USER_STORIES, LOAD_NEXT_SHOW_USER_STORIES_SUCCESS, LOAD_NEXT_SHOW_USER_STORIES_FAIL],
    promise: (client) => client.get(`/users/${user_slug}/stories`, { params: { page: paginationStory } }),
    paginationStory
  };
}

export function create(description, books, in_storyline, loud_type, visibility_type) {
  in_storyline = in_storyline ? 1 : 0;
  const in_channels = loud_type.in_channels;
  const in_books = loud_type.in_books;
  const users_ids = [];
  return {
    types: [CREATE_STORY, CREATE_STORY_SUCCESS, CREATE_STORY_FAIL],
    promise: (client) => client.post('/stories', { data: {
      description,
      books,
      in_storyline,
      in_channels,
      in_books,
      visibility_type,
      users_ids
    }})
  };
}

export function deleteStory(id) {
  return {
    types: [DELETE_STORY, DELETE_STORY_SUCCESS, DELETE_STORY_FAIL],
    promise: (client) => client.del(`/stories/${id}`)
  };
}

export function like(story_id) {
  return {
    types: [LIKE_STORY, LIKE_STORY_SUCCESS, LIKE_STORY_FAIL],
    story_id,
    promise: (client) => client.post('/like/story', { data: { story_id }})
  };
}

export function clearPagination() {
  return {
    type: CLEAR_PAGINATION
  };
}

export function relogStory(story_id, books) {
  return {
    types: [RELOG_STORY, RELOG_STORY_SUCCESS, RELOG_STORY_FAIL],
    promise: (client) => client.post('/story/relog', { data: { story_id, books }})
  };
}

export function setVisibilityStory(visibility_type, story_id) {
  return {
    types: [SET_VISIBILITY_STORY, SET_VISIBILITY_STORY_SUCCESS, SET_VISIBILITY_STORY_FAIL],
    visibility_type,
    story_id,
    promise: (client) => client.post('/stories/visibility', { data: { visibility_type, story_id }})
  };
}

export function getStory(id) {
  return {
    types: [GET_STORY, GET_STORY_SUCCESS, GET_STORY_FAIL],
    promise: (client) => client.get(`/stories/${id}`)
  };
}

export function getStoryId(globalState) {
  const path = globalState.routing.locationBeforeTransitions.pathname;
  return path.substring(path.indexOf('/story/') + 7);     // get story ID after /story/ in path
}

export function pinStory(pins, id) {
  console.log(pins);
  return {
    types: [PIN_STORY, PIN_STORY_SUCCESS, PIN_STORY_FAIL],
    promise: (client) => client.post(`/stories/pin/${id}`, { data: { pins }})
  };
}

export function createComment(entity_id, content, parent_id, created_by) {
  return {
    types: [CREATE_NEW_COMMENT, CREATE_NEW_COMMENT_SUCCESS, CREATE_NEW_COMMENT_FAIL],
    entity_id,    //story id
    promise: (client) => client.post('/comments', { data: {
      entity: 'story',
      entity_id,  //story id
      content,    //text
      parent_id,  //default 0
      created_by  //auth_id
    }})
  };
}

export function updateComment(id, content) {
  return {
    types: [UPDATE_COMMENT, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_FAIL],
    promise: (client) => client.patch(`/comments/${id}`, { data: { content }})
  };
}

export function deleteComment(id) {
  return {
    types: [DELETE_COMMENT, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAIL],
    promise: (client) => client.del(`/comments/${id}`)
  };
}

