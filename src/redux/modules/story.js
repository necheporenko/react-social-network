export const LOAD_SHOW_USER_STORIES = 'LOAD_SHOW_USER_STORIES';
export const LOAD_SUCCESS_SHOW_USER_STORIES = 'LOAD_SUCCESS_SHOW_USER_STORIES';
export const LOAD_FAIL_SHOW_USER_STORIES = 'LOAD_FAIL_SHOW_USER_STORIES';
export const CREATE = 'CREATE';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAIL = 'CREATE_FAIL';

const initialState = {
  isAuthenticated: false,
  loaded: false,
  storiesArr: []
};

export default function storyReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SHOW_USER_STORIES:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS_SHOW_USER_STORIES:
      console.log('LOAD_SUCCESS_SHOW_USER_STORIES', action);
      return {
        ...state,
        loading: false,
        loaded: action.result.status === 'success' && true,       // or just true
        storiesArr: action.result.data,
      };
    case LOAD_FAIL_SHOW_USER_STORIES:
      console.log('LOAD_FAIL_SHOW_USER_STORIES', action);
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        storiesArr: []
      };

    case CREATE:
      console.log('CREATE:', action);
      return {
        ...state,
        creating: true
      };
    case CREATE_SUCCESS:
      console.log('CREATE_SUCCESS:', action);
      return {
        ...state,
        creating: false,
        created: true,
      };
    case CREATE_FAIL:
      console.log('CREATE_FAIL:', action);
      return {
        ...state,
        creating: false,
        created: false,
      };

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.story && globalState.story.loaded;
}

export function load() {
  return {
    types: [LOAD_SHOW_USER_STORIES, LOAD_SUCCESS_SHOW_USER_STORIES, LOAD_FAIL_SHOW_USER_STORIES],
    promise: (client) => client.get('/user/stories')
    // promise: (client) => client.get('/user/stories', { params: { user_id: id }})
  };
}

export function create(description) {
  const book_ids = [1];                                                                                                  //todo add dynamic id of book
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post('/story', { data: { description, book_ids }})
  };
}
