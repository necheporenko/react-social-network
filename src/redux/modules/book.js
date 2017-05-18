export const LOAD_BOOKTREE = 'LOAD_BOOKTREE';
export const LOAD_BOOKTREE_SUCCESS = 'LOAD_BOOKTREE_SUCCESS';
export const LOAD_BOOKTREE_FAIL = 'LOAD_BOOKTREE_FAIL';
export const CREATE_BOOK = 'CREATE_BOOK';
export const CREATE_BOOK_SUCCESS = 'CREATE_BOOK_SUCCESS';
export const CREATE_BOOK_FAIL = 'CREATE_BOOK_FAIL';

const initialState = {
  bookTreeArr: [],
  loaded: false,
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
        loaded: action.result.status === 'success' && true,
        bookTreeArr: action.result.data,
      };
    case LOAD_BOOKTREE_FAIL:
      console.log('LOAD_BOOKTREE_FAIL:', action.result);
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        bookTreeArr: []
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


export function load(user_slug) {
  console.log('REDUCERR IN BOOOOOOOOOK', user_slug);
  return {
    types: [LOAD_BOOKTREE, LOAD_BOOKTREE_SUCCESS, LOAD_BOOKTREE_FAIL],
    promise: (client) => client.get('/book/tree', { params: { user_slug }})
  };
}

export function create(name, id) {
  return {
    types: [CREATE_BOOK, CREATE_BOOK_SUCCESS, CREATE_BOOK_FAIL],
    promise: (client) => client.post('/book', { data: { name, id }})
  };
}
