const CREATE_DOCUMENT = 'CREATE_DOCUMENT';
const CREATE_DOCUMENT_SUCCESS = 'CREATE_DOCUMENT_SUCCESS';
const CREATE_DOCUMENT_FAIL = 'CREATE_DOCUMENT_FAIL';
const GET_BOX_TREE = 'GET_BOX_TREE';
const GET_BOX_TREE_SUCCESS = 'GET_BOX_TREE_SUCCESS';
const GET_BOX_TREE_FAIL = 'GET_BOX_TREE_FAIL';

const initialState = {
  documents: [],
  boxes: [],
};

export default function documentReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_DOCUMENT:
      return {
        ...state,
        creating: true
      };
    case CREATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
      };
    case CREATE_DOCUMENT_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
        error: action.error,
      };

    case GET_BOX_TREE:
      return {
        ...state,
      };
    case GET_BOX_TREE_SUCCESS:
      return {
        ...state,
        boxes: action.result.data,
      };
    case GET_BOX_TREE_FAIL:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}


export function create(name, parent_slug) {
  return {
    types: [CREATE_DOCUMENT, CREATE_DOCUMENT_SUCCESS, CREATE_DOCUMENT_FAIL],
    promise: (client) => client.post('/documents', {data: {name, parent_slug}})
  };
}

export function load(user_slug) {
  return {
    types: [GET_BOX_TREE, GET_BOX_TREE_SUCCESS, GET_BOX_TREE_FAIL],
    promise: (client) => client.get('/boxes', {params: {user_slug}}),
  };
}
