const GET_QUERY = 'GET_QUERY';
const SEARCH_USER = 'SEARCH_USER';
const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS';
const SEARCH_USER_FAIL = 'SEARCH_USER_FAIL';
const SEARCH_BOOK = 'SEARCH_BOOK';
const SEARCH_BOOK_SUCCESS = 'SEARCH_BOOK_SUCCESS';
const SEARCH_BOOK_FAIL = 'SEARCH_BOOK_FAIL';
const SEARCH_STORY = 'SEARCH_STORY';
const SEARCH_STORY_SUCCESS = 'SEARCH_STORY_SUCCESS';
const SEARCH_STORY_FAIL = 'SEARCH_STORY_FAIL';
const CLEAR_USER_RESULT = 'CLEAR_USER_RESULT';
const SEARCH_NEXT_PEOPLE = 'SEARCH_NEXT_PEOPLE';
const SEARCH_NEXT_PEOPLE_SUCCESS = 'SEARCH_NEXT_PEOPLE_SUCCESS';
const SEARCH_NEXT_PEOPLE_FAIL = 'SEARCH_NEXT_PEOPLE_FAIL'

const initialState = {
  query: '',
  foundUsers: [],
  foundBooks: [],
  foundStories: [],
  pagination: 2,
  over: false
};

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUERY:
      return {
        ...state,
        query: action.query
      };

    case SEARCH_USER:
      return {
        ...state,
        searching: true,
        pagination: 2,
        over: false
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searching: false,
        foundUsers: action.result.data.users
      };
    case SEARCH_USER_FAIL:
      return {
        ...state,
        searching: false,
        error: action.error,
        foundUsers: []
      };

    case SEARCH_BOOK:
      return {
        ...state,
        searching: true,
      };
    case SEARCH_BOOK_SUCCESS:
      return {
        ...state,
        searching: false,
        foundBooks: action.result.data
      };
    case SEARCH_BOOK_FAIL:
      return {
        ...state,
        searching: false,
        error: action.error,
      };

    case SEARCH_STORY:
      return {
        ...state,
        searching: true,
      };
    case SEARCH_STORY_SUCCESS:
      return {
        ...state,
        searching: false,
        foundStories: action.result.data
      };
    case SEARCH_STORY_FAIL:
      return {
        ...state,
        searching: false,
        error: action.error,
      };

    case CLEAR_USER_RESULT:
      return {
        ...state,
        foundUsers: [],
      };


    case SEARCH_NEXT_PEOPLE:
      return {
        ...state
      };

    case SEARCH_NEXT_PEOPLE_SUCCESS:
      return {
        ...state,
        over: action.result.data.users.length === 0,
        foundUsers: [...state.foundUsers, ...action.result.data.users],
        pagination: state.pagination + 1
      };

    // case SEARCH_NEXT_PEOPLE_FAIL:
    //   return {
    //     ...state,
    //   };

    default:
      return state;
  }
}


export function getQuery(query) {
  return {
    type: GET_QUERY,
    query
  };
}

export function searchUser(globalState) {
  const q = globalState.search.query;
  return {
    types: [SEARCH_USER, SEARCH_USER_SUCCESS, SEARCH_USER_FAIL],
    promise: (client) => client.get('/search/users', { params: { q }})
  };
}

export function searchBook(globalState) {
  const q = globalState.search.query;
  return {
    types: [SEARCH_BOOK, SEARCH_BOOK_SUCCESS, SEARCH_BOOK_FAIL],
    promise: (client) => client.get('/search/books', { params: { q }})
  };
}

export function searchStory(globalState) {
  const q = globalState.search.query;
  return {
    types: [SEARCH_STORY, SEARCH_STORY_SUCCESS, SEARCH_STORY_FAIL],
    promise: (client) => client.get('/search/stories', { params: { q }})
  };
}

export function newSearchUser(str) {
  return {
    types: [SEARCH_USER, SEARCH_USER_SUCCESS, SEARCH_USER_FAIL],
    promise: (client) => client.get('/search/users', { params: { q: str }})
  };
}

export function clearUserResult() {
  return {
    type: CLEAR_USER_RESULT
  };
}

export const getNextUsers = (str, pagination) => {
  return {
    types: [SEARCH_NEXT_PEOPLE, SEARCH_NEXT_PEOPLE_SUCCESS, SEARCH_NEXT_PEOPLE_FAIL],
    promise: (client) => client.get('/search/users', { params: { q: str, page: pagination }})
  };
};

