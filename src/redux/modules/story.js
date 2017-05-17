export const LOAD_SHOW_USER_STORIES = 'LOAD_SHOW_USER_STORIES';
export const LOAD_SHOW_USER_STORIES_SUCCESS = 'LOAD_SHOW_USER_STORIES_SUCCESS';
export const LOAD_SHOW_USER_STORIES_FAIL = 'LOAD_SHOW_USER_STORIES_FAIL';
export const CREATE_STORY = 'CREATE_STORY';
export const CREATE_STORY_SUCCESS = 'CREATE_STORY_SUCCESS';
export const CREATE_STORY_FAIL = 'CREATE_STORY_FAIL';

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
    case LOAD_SHOW_USER_STORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: action.result.status === 'success' && true,       // or just true
        storiesArr: action.result.data,
      };
    case LOAD_SHOW_USER_STORIES_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        storiesArr: []
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

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.story && globalState.story.loaded;
}

export function load(slug) {
  const user_slug = slug || '';
  return {
    types: [LOAD_SHOW_USER_STORIES, LOAD_SHOW_USER_STORIES_SUCCESS, LOAD_SHOW_USER_STORIES_FAIL],
    promise: (client) => client.get('/user/stories', { params: { user_slug }})
    // promise: (client) => client.get('/user/stories', { params: { user_id: id }})
  };
}

export function create(description) {
  const book_ids = [1];                                                                                                  //todo add dynamic id of book
  return {
    types: [CREATE_STORY, CREATE_STORY_SUCCESS, CREATE_STORY_FAIL],
    promise: (client) => client.post('/story', { data: { description, book_ids }})
  };
}
