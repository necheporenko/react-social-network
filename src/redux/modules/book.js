export const LOAD_BOOKTREE = 'LOAD_BOOKTREE';
export const LOAD_BOOKTREE_SUCCESS = 'LOAD_BOOKTREE_SUCCESS';
export const LOAD_BOOKTREE_FAIL = 'LOAD_BOOKTREE_FAIL';
export const SHOW_BOOK = 'SHOW_BOOK';
export const SHOW_BOOK_SUCCESS = 'SHOW_BOOK_SUCCESS';
export const SHOW_BOOK_FAIL = 'SHOW_BOOK_FAIL';
const SHOW_NEXT_BOOK = 'SHOW_NEXT_BOOK';
const SHOW_NEXT_BOOK_SUCCESS = 'SHOW_NEXT_BOOK_SUCCESS';
const SHOW_NEXT_BOOK_FAIL = 'SHOW_NEXT_BOOK_FAIL';
export const CREATE_BOOK = 'CREATE_BOOK';
export const CREATE_BOOK_SUCCESS = 'CREATE_BOOK_SUCCESS';
export const CREATE_BOOK_FAIL = 'CREATE_BOOK_FAIL';

const initialState = {
  bookTreeArr: [],
  bookStories: [],
  loaded: {
    loadedBookTree: false,
    loadedBookStories: false,
  },
  pagination: 1,
};

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BOOKTREE:
      console.log('LOAD_BOOKTREE:', action);
      return {
        ...state,
        loading: true,
      };
    case LOAD_BOOKTREE_SUCCESS:
      console.log('LOAD_BOOKTREE_SUCCESS:', action.result);
      return {
        ...state,
        loading: false,
        loaded: {
          loadedBookTree: action.result.status === 'success' && true,
        },
        bookTreeArr: action.result.data,
        pagination: 1,
        over: false,
      };
    case LOAD_BOOKTREE_FAIL:
      console.log('LOAD_BOOKTREE_FAIL:', action.result);
      return {
        ...state,
        loading: false,
        error: action.error,
        loaded: {
          loadedBookTree: false
        },
        bookTreeArr: []
      };

    case SHOW_BOOK:
      return {
        ...state,
        loading: {
          loadingBookStories: true
        }
      };
    case SHOW_BOOK_SUCCESS:
      return {
        ...state,
        loaded: {
          loadedBookStories: action.result.status === 'success' && true
        },
        // book_slug: action.book_slug,
        bookPage: {
          name: action.result.data.name,
          description: action.result.data.description,
        },
        book_slug: action.book_slug,
        bookStories: action.result.data.stories
      };
    case SHOW_BOOK_FAIL:
      return {
        ...state,
        loaded: {
          loadedBookStories: false
        },
        error: action.error,
        bookStories: []
      };

    case SHOW_NEXT_BOOK:
      return {
        ...state
      };
    case SHOW_NEXT_BOOK_SUCCESS:
      return {
        ...state,
        over: action.result.data.stories.length === 0 && true,
        bookStories: [...state.bookStories, ...action.result.data.stories],
        pagination: action.page + 1
      };
    case SHOW_NEXT_BOOK_FAIL:
      return {
        ...state
      };

    case CREATE_BOOK:
      return {
        ...state,
        creating: true
      };
    case CREATE_BOOK_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
      };
    case CREATE_BOOK_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
      };

    default:
      return state;
  }
}

export function getBookSlug(globalState) {
  const path = globalState.routing.locationBeforeTransitions.pathname;
  return path.substring(path.indexOf('/books/') + 7);                               //get book slug after '/books/'
}

export function load(user_slug) {
  return {
    types: [LOAD_BOOKTREE, LOAD_BOOKTREE_SUCCESS, LOAD_BOOKTREE_FAIL],
    promise: (client) => client.get('/book/tree', { params: { user_slug }})
  };
}

export function show(slug) {
  const book_slug = slug || '';
  return {
    types: [SHOW_BOOK, SHOW_BOOK_SUCCESS, SHOW_BOOK_FAIL],
    // book_slug,
    promise: (client) => client.get('/book', { params: { book_slug, page: 1 }}),
    book_slug
  };
}

export function next(slug, page) {
  const book_slug = slug || '';
  return {
    types: [SHOW_NEXT_BOOK, SHOW_NEXT_BOOK_SUCCESS, SHOW_NEXT_BOOK_FAIL],
    // book_slug,
    promise: (client) => client.get('/book', { params: { book_slug, page }}),
    page,
    book_slug
  };
}

export function create(name, parent_slug) {
  return {
    types: [CREATE_BOOK, CREATE_BOOK_SUCCESS, CREATE_BOOK_FAIL],
    promise: (client) => client.post('/book', { data: { name, parent_slug }})
  };
}
