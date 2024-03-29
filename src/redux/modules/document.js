const CREATE_DOCUMENT = 'CREATE_DOCUMENT';
const CREATE_DOCUMENT_SUCCESS = 'CREATE_DOCUMENT_SUCCESS';
const CREATE_DOCUMENT_FAIL = 'CREATE_DOCUMENT_FAIL';
const GET_BOX_TREE = 'GET_BOX_TREE';
const GET_BOX_TREE_SUCCESS = 'GET_BOX_TREE_SUCCESS';
const GET_BOX_TREE_FAIL = 'GET_BOX_TREE_FAIL';
const GET_BOX = 'GET_BOX';
const GET_BOX_SUCCESS = 'GET_BOX_SUCCESS';
const GET_BOX_FAIL = 'GET_BOX_FAIL';
const CREATE_BOX = 'CREATE_BOX';
const CREATE_BOX_SUCCESS = 'CREATE_BOX_SUCCESS';
const CREATE_BOX_FAIL = 'CREATE_BOX_FAIL';
const CREATE_DRAFT_HUMAN_CARD = 'CREATE_DRAFT_HUMAN_CARD';
const CREATE_DRAFT_HUMAN_CARD_SUCCESS = 'CREATE_DRAFT_HUMAN_CARD_SUCCESS';
const CREATE_DRAFT_HUMAN_CARD_FAIL = 'CREATE_DRAFT_HUMAN_CARD_FAIL';
const UPDATE_DRAFT_HUMAN_CARD = 'UPDATE_DRAFT_HUMAN_CARD';
const UPDATE_DRAFT_HUMAN_CARD_SUCCESS = 'UPDATE_DRAFT_HUMAN_CARD_SUCCESS';
const UPDATE_DRAFT_HUMAN_CARD_FAIL = 'UPDATE_DRAFT_HUMAN_CARD_FAIL';
const SEND_MESSAGE_FOR_SIGN = 'SEND_MESSAGE_FOR_SIGN';
const SEND_MESSAGE_FOR_SIGN_SUCCESS = 'SEND_MESSAGE_FOR_SIGN_SUCCESS';
const SEND_MESSAGE_FOR_SIGN_FAIL = 'SEND_MESSAGE_FOR_SIGN_FAIL';
const VERIFY_HUMAN_CARD = 'VERIFY_HUMAN_CARD';
const VERIFY_HUMAN_CARD_SUCCESS = 'VERIFY_HUMAN_CARD_SUCCESS';
const VERIFY_HUMAN_CARD_FAIL = 'VERIFY_HUMAN_CARD_FAIL';
const GET_HUMAN_CARD = 'GET_HUMAN_CARD';
const GET_HUMAN_CARD_SUCCESS = 'GET_HUMAN_CARD_SUCCESS';
const GET_HUMAN_CARD_FAIL = 'GET_HUMAN_CARD_FAIL';
const CLEAR_HUMAN_CARD = 'CLEAR_HUMAN_CARD';
const GET_DRAFT_HUMAN_CARD = 'GET_DRAFT_HUMAN_CARD';
const GET_DRAFT_HUMAN_CARD_SUCCESS = 'GET_DRAFT_HUMAN_CARD_SUCCESS';
const GET_DRAFT_HUMAN_CARD_FAIL = 'GET_DRAFT_HUMAN_CARD_FAIL';
const EMPTY_DRAFT_HUMAN_CARD = 'EMPTY_DRAFT_HUMAN_CARD';
const CLEAR_BOX = 'CLEAR_BOX';
const DELETE_DOCUMENT = 'DELETE_DOCUMENT';
const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
const DELETE_DOCUMENT_FAIL = 'DELETE_DOCUMENT_FAIL';
const RENAME_DOCUMENT = 'RENAME_DOCUMENT';
const RENAME_DOCUMENT_SUCCESS = 'RENAME_DOCUMENT_SUCCESS';
const RENAME_DOCUMENT_FAIL = 'RENAME_DOCUMENT_FAIL';
const MOVE_DOCUMENT_TO = 'MOVE_DOCUMENT_TO';
const MOVE_DOCUMENT_TO_SUCCESS = 'MOVE_DOCUMENT_TO_SUCCESS';
const MOVE_DOCUMENT_TO_FAIL = 'MOVE_DOCUMENT_TO_FAIL';

const initialState = {
  boxes: [],
  box: {
    documents: []
  },
  humanCard: null,
  draftHumanCard: null,
  emptyDraftHumanCard: null
};

export default function documentReducer(state = initialState, action) {
  switch (action.type) {
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

    case GET_BOX:
      return {
        ...state,
      };
    case GET_BOX_SUCCESS:
      return {
        ...state,
        box: action.result.data,
      };
    case GET_BOX_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case CREATE_BOX:
      return {
        ...state,
        creating: true
      };
    case CREATE_BOX_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
        box: Object.assign({}, state.box, {
          children: state.box.children.concat(action.result.data)
        })
      };
    case CREATE_BOX_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
        error: action.error,
      };

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


    case CREATE_DRAFT_HUMAN_CARD:
      return {
        ...state,
        creating: true
      };
    case CREATE_DRAFT_HUMAN_CARD_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
        draftHumanCard: action.result.data
      };
    case CREATE_DRAFT_HUMAN_CARD_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
        error: action.error,
      };

    case UPDATE_DRAFT_HUMAN_CARD:
      return {
        ...state,
        creating: true
      };
    case UPDATE_DRAFT_HUMAN_CARD_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
        draftHumanCard: action.result.data
      };
    case UPDATE_DRAFT_HUMAN_CARD_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
        error: action.error,
      };

    case SEND_MESSAGE_FOR_SIGN:
      return {
        ...state,
      };
    case SEND_MESSAGE_FOR_SIGN_SUCCESS:
      return {
        ...state,
      };
    case SEND_MESSAGE_FOR_SIGN_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case VERIFY_HUMAN_CARD:
      return {
        ...state,
      };
    case VERIFY_HUMAN_CARD_SUCCESS:
      return {
        ...state,
      };
    case VERIFY_HUMAN_CARD_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case GET_HUMAN_CARD:
      return {
        ...state,
      };
    case GET_HUMAN_CARD_SUCCESS:
      const hc = action.result.data;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', hc.url, false);
      xhr.send();
      const humanCard = Object.assign(hc, {
        markdown: xhr.responseText
      });

      return {
        ...state,
        humanCard,
      };
    case GET_HUMAN_CARD_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case CLEAR_HUMAN_CARD:
      return {
        ...state,
        humanCard: null,
        draftHumanCard: null,
        emptyDraftHumanCard: null
      };

    // case GET_DRAFT_HUMAN_CARD:
    //   return {
    //     ...state
    //   }

    case GET_DRAFT_HUMAN_CARD_SUCCESS:
      return {
        ...state,
        draftHumanCard: action.result.data
      };

    case EMPTY_DRAFT_HUMAN_CARD:
      return {
        ...state,
        emptyDraftHumanCard: true
      };

    case CLEAR_BOX:
      return {
        ...state,
        box: {}
      };

    case DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        box: Object.assign({}, state.box, {
          documents: state.box.documents.filter(document => document.id !== action.document_id)
        })
      };

    case RENAME_DOCUMENT_SUCCESS:
      return {
        ...state,
        box: Object.assign({}, state.box, {
          documents: state.box.documents.map(document => {
            if (document.id === action.document_id) {
              return action.result.data;
            }

            return document;
          })
        })
      };

    default:
      return state;
  }
}


export function createDocument(box_slug, user_id, title, file) {
  return {
    types: [CREATE_DOCUMENT, CREATE_DOCUMENT_SUCCESS, CREATE_DOCUMENT_FAIL],
    promise: (client) => client.post('/documents', {data: {box_slug, user_id, title, content: file, is_encrypted: 0, hash: ''}})
  };
}

export function createBox(name, parent_id) {
  console.log(arguments);
  return {
    types: [CREATE_BOX, CREATE_BOX_SUCCESS, CREATE_BOX_FAIL],
    promise: (client) => client.post('/boxes', {data: {name, parent_id, description: ''}})
  };
}

export function load(user_slug) {
  return {
    types: [GET_BOX_TREE, GET_BOX_TREE_SUCCESS, GET_BOX_TREE_FAIL],
    promise: (client) => client.get('/boxes', {params: {user_slug}}),
  };
}

export function getBox(box_slug) {
  return {
    types: [GET_BOX, GET_BOX_SUCCESS, GET_BOX_FAIL],
    promise: (client) => client.get(`/boxes/${box_slug}`),
  };
}

export function createDraftHumanCard(full_name, user_id, public_address) {
  return {
    types: [CREATE_DRAFT_HUMAN_CARD, CREATE_DRAFT_HUMAN_CARD_SUCCESS, CREATE_DRAFT_HUMAN_CARD_FAIL],
    promise: (client) => client.post('/draft-human-card', {data: {full_name, user_id, public_address}}),
  };
}

export function updateDraftHumanCard(full_name, user_id, public_address, draft_id) {
  return {
    types: [CREATE_DRAFT_HUMAN_CARD, CREATE_DRAFT_HUMAN_CARD_SUCCESS, CREATE_DRAFT_HUMAN_CARD_FAIL],
    promise: (client) => client.patch(`/draft-human-card/${draft_id}`, {data: {full_name, user_id, public_address}}),
  };
}

export function sendMessageForSign(draft_id, message) {
  console.log(message);
  return {
    types: [CREATE_DRAFT_HUMAN_CARD, CREATE_DRAFT_HUMAN_CARD_SUCCESS, CREATE_DRAFT_HUMAN_CARD_FAIL],
    promise: (client) => client.patch(`/draft-human-card/${draft_id}/message-for-sign`, {data: {message}}),
  };
}

export function verifyHumanCard(draft_id, public_address, signature) {
  return {
    types: [VERIFY_HUMAN_CARD, VERIFY_HUMAN_CARD_SUCCESS, VERIFY_HUMAN_CARD_FAIL],
    promise: (client) => client.patch(`/draft-human-card/${draft_id}/verify`, {data: {public_address, signature}}),
  };
}

export function getHumanCard(public_address) {
  return {
    types: [GET_HUMAN_CARD, GET_HUMAN_CARD_SUCCESS, GET_HUMAN_CARD_FAIL],
    promise: (client) => client.get(`/human-card/${public_address}`)
  };
}

export function clearHumanCard() {
  return {
    type: CLEAR_HUMAN_CARD
  };
}

export const getDraftHumanCard = (id) => {
  return {
    types: [GET_DRAFT_HUMAN_CARD, GET_DRAFT_HUMAN_CARD_SUCCESS, GET_DRAFT_HUMAN_CARD_FAIL],
    promise: (client) => client.get(`/draft-human-card/${+id}`)
  };
};

export const emptyDraftHumanCard = () => {
  return {
    type: EMPTY_DRAFT_HUMAN_CARD
  };
};

export const clearBox = () => {
  return {
    type: CLEAR_BOX
  };
};

export const deleteDocument = (document_id) => {
  return {
    types: [DELETE_DOCUMENT, DELETE_DOCUMENT_SUCCESS, DELETE_DOCUMENT_FAIL],
    promise: (client) => client.del(`/documents/${document_id}`),
    document_id
  };
};

export const updateDocument = (document_id, title) => {
  return {
    types: [RENAME_DOCUMENT, RENAME_DOCUMENT_SUCCESS, RENAME_DOCUMENT_FAIL],
    promise: (client) => client.patch(`/documents/${document_id}`, {data: {title}}),
    document_id
  };
};

export const moveDocumnetToBox = (document_id, box_slug) => {
  return {
    types: [MOVE_DOCUMENT_TO, MOVE_DOCUMENT_TO_SUCCESS, MOVE_DOCUMENT_TO_FAIL],
    promise: (client) => client.patch(`/documents/${document_id}`, {data: {box_slug}}),
    document_id
  };
};