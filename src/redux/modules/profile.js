const GET_NOTIFICATION_SETTINGS = 'GET_NOTIFICATION_SETTINGS';
const GET_NOTIFICATION_SETTINGS_SUCCESS = 'GET_NOTIFICATION_SETTINGS_SUCCESS';
const GET_NOTIFICATION_SETTINGS_FAIL = 'GET_NOTIFICATION_SETTINGS_FAIL';
const SET_NOTIFICATION_SETTINGS = 'SET_NOTIFICATION_SETTINGS';
const SET_NOTIFICATION_SETTINGS_SUCCESS = 'SET_NOTIFICATION_SETTINGS_SUCCESS';
const SET_NOTIFICATION_SETTINGS_FAIL = 'SET_NOTIFICATION_SETTINGS_FAIL';
const GET_USER_NOTIFICATIONS = 'GET_USER_NOTIFICATIONS';
const GET_USER_NOTIFICATIONS_SUCCESS = 'GET_USER_NOTIFICATIONS_SUCCESS';
const GET_USER_NOTIFICATIONS_FAIL = 'GET_USER_NOTIFICATIONS_FAIL';
const SOCKET_SEND_USER_NOTIFICATION = 'SOCKET_SEND_USER_NOTIFICATION';
// const SOCKET_SEND_USER_NOTIFICATION_SUCCESS = 'SOCKET_SEND_USER_NOTIFICATION_SUCCESS';
// const SOCKET_SEND_USER_NOTIFICATION_FAIL = 'SOCKET_SEND_USER_NOTIFICATION_FAIL';
const GET_CONVERSATION = 'GET_CONVERSATION';
const GET_CONVERSATION_SUCCESS = 'GET_CONVERSATION_SUCCESS';
const GET_CONVERSATION_FAIL = 'GET_CONVERSATION_FAIL';
const GET_CONVERSATION_LIST = 'GET_CONVERSATION_LIST';
const GET_CONVERSATION_LIST_SUCCESS = 'GET_CONVERSATION_LIST_SUCCESS';
const GET_CONVERSATION_LIST_FAIL = 'GET_CONVERSATION_LIST_FAIL';
const CREATE_MESSAGE = 'CREATE_MESSAGE';
const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE_SUCCESS';
const CREATE_MESSAGE_FAIL = 'CREATE_MESSAGE_FAIL';
const CLEAR_CONVERSATION = 'CLEAR_CONVERSATION';
const DELETE_CONVERSATION = 'DELETE_CONVERSATION';
const DELETE_CONVERSATION_SUCCESS = 'DELETE_CONVERSATION_SUCCESS';
const DELETE_CONVERSATION_FAIL = 'DELETE_CONVERSATION_FAIL';
const SOCKET_GET_MESSAGE = 'SOCKET_GET_MESSAGE';
const SOCKET_LAST_MESSAGE = 'SOCKET_LAST_MESSAGE';

const initialState = {
  notificationSettings: {},
  notifications: [],
  conversation: {},
  conversations: [],
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATION_SETTINGS:
      return {
        ...state,
        gettingNotification: true,
      };
    case GET_NOTIFICATION_SETTINGS_SUCCESS:
      return {
        ...state,
        gettingNotification: false,
        notificationSettings: action.result.data
      };
    case GET_NOTIFICATION_SETTINGS_FAIL:
      return {
        ...state,
        gettingNotification: false,
        error: action.error,
      };

    case SET_NOTIFICATION_SETTINGS: {
      return {
        ...state,
        settingNotification: true,
      };
    }
    case SET_NOTIFICATION_SETTINGS_SUCCESS: {
      const newNotificationSettings = Object.assign(state.notificationSettings);

      switch (action.notification_type) {
        case 'settings':
          newNotificationSettings.settings = action.settings;
          break;
        case 'updates':
          newNotificationSettings.updates = action.settings;
          break;

        default:
          console.log('error');
      }

      return {
        ...state,
        settingNotification: false,
        notificationSettings: newNotificationSettings
      };
    }
    case SET_NOTIFICATION_SETTINGS_FAIL: {
      return {
        ...state,
        settingNotification: false,
        error: action.error,
      };
    }

    case GET_USER_NOTIFICATIONS:
      return {
        ...state,
        gettingUserNotification: true,
      };
    case GET_USER_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        gettingUserNotification: false,
        notifications: action.result.data
      };
    case GET_USER_NOTIFICATIONS_FAIL:
      return {
        ...state,
        gettingUserNotification: false,
        error: action.error,
      };

    case SOCKET_SEND_USER_NOTIFICATION:
      return {
        ...state,
        socketUserNotification: true,
        notifications: [action.data, ...state.notifications]
      };

    case GET_CONVERSATION:
      return {
        ...state,
        gettingConversation: true,
      };
    case GET_CONVERSATION_SUCCESS:
      const newConversation = action.result.data;
      if (newConversation.receivers) {
        newConversation.receiversID = [];
        newConversation.receivers.map(receiver => {
          newConversation.receiversID.push(receiver.id);
        });
      }
      return {
        ...state,
        gettingConversation: false,
        conversation: newConversation
      };
    case GET_CONVERSATION_FAIL:
      return {
        ...state,
        gettingConversation: false,
        error: action.error,
      };

    case GET_CONVERSATION_LIST:
      return {
        ...state,
        gettingConversationList: true,
      };
    case GET_CONVERSATION_LIST_SUCCESS:
      const newConversations = action.result.data;
      newConversations.map(conversation => {
        conversation.receiversID = [];
        conversation.receivers.map(receiver => {
          conversation.receiversID.push(receiver);
        });
      });
      return {
        ...state,
        gettingConversationList: false,
        conversations: newConversations
      };
    case GET_CONVERSATION_LIST_FAIL:
      return {
        ...state,
        gettingConversationList: false,
        error: action.error,
      };

    case CREATE_MESSAGE:
      return {
        ...state,
        sendingMessage: true,
      };
    case CREATE_MESSAGE_SUCCESS:
      let newMessage;
      console.log('state.conversation', state.conversation);
      if (state.conversation.length === 0) {
        console.log('NO CONVERSATION');
        newMessage = {
          conversation_id: action.result.data.conversation_id,
          messages: [action.result.data]
        };
      } else {
        console.log('CONVERSATION');
        newMessage = Object.assign({}, state.conversation, {
          messages: [...state.conversation.messages, action.result.data]
        });
      }

      return {
        ...state,
        sendingMessage: false,
        conversation: newMessage
      };
    case CREATE_MESSAGE_FAIL:
      return {
        ...state,
        sendingMessage: false,
        error: action.error,
      };

    case CLEAR_CONVERSATION:
      return {
        ...state,
        conversation: [],
      };

    case SOCKET_GET_MESSAGE:
      const newSocketMessage = Object.assign({}, state.conversation, {
        messages: [...state.conversation.messages, action.msg]
      });
      return {
        ...state,
        conversation: newSocketMessage,
      };

    case SOCKET_LAST_MESSAGE:
      console.log('newSocketLastMessage');
      const newSocketLastMessage = state.conversations.map(conversation => {
        if (conversation.conversation_id === action.msg.conversation_id) {
          let conversationMessages = conversation.messages;
          conversationMessages = action.msg;
          return {
            ...conversation,
            messages: [conversationMessages]
          };
        }
        return {
          ...conversation
        };
      });
      return {
        ...state,
        conversations: newSocketLastMessage,
      };

    case DELETE_CONVERSATION:
      return {
        ...state,
        deletingConversation: true,
      };
    case DELETE_CONVERSATION_SUCCESS:
      return {
        ...state,
        deletingConversation: false,
      };
    case DELETE_CONVERSATION_FAIL:
      return {
        ...state,
        deletingConversation: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export function getConversationID(globalState) {
  const path = globalState.routing.locationBeforeTransitions.pathname;
  const id = path.substring(path.indexOf('/messages') + 10);
  if (id) {
    return id;
  } else {
    if (globalState.profile.conversations) {
      return globalState.profile.conversations[0].conversation_id;
    }
  }
}

export function cleanConversation() {
  return {
    type: CLEAR_CONVERSATION
  };
}

export function socketGetMessage(msg) {
  return {
    type: SOCKET_GET_MESSAGE,
    msg
  };
}

export function socketLastMessage(msg) {
  return {
    type: SOCKET_LAST_MESSAGE,
    msg
  };
}

export function getNotificationSettings() {
  return {
    types: [GET_NOTIFICATION_SETTINGS, GET_NOTIFICATION_SETTINGS_SUCCESS, GET_NOTIFICATION_SETTINGS_FAIL],
    promise: (client) => client.get('/notifications/settings')
  };
}

export function setNotificationSettings(settings, notification_type) {
  console.log('setNotificationSettings', settings, notification_type);
  return {
    types: [SET_NOTIFICATION_SETTINGS, SET_NOTIFICATION_SETTINGS_SUCCESS, SET_NOTIFICATION_SETTINGS_FAIL],
    // type: SET_NOTIFICATION_SETTINGS_SUCCESS,
    promise: (client) => client.post('/notifications/settings', { data: { settings, notification_type }}),
    settings,
    notification_type
  };
}

export function getUserNotifications() {
  return {
    types: [GET_USER_NOTIFICATIONS, GET_USER_NOTIFICATIONS_SUCCESS, GET_USER_NOTIFICATIONS_FAIL],
    promise: (client) => client.get('/notifications')
  };
}

export function socketUserNotification(data) {
  console.log('redux socketUserNotification', data);
  return {
    type: SOCKET_SEND_USER_NOTIFICATION,
    data
  };
}

export function getConversationByID(id) {
  return {
    types: [GET_CONVERSATION, GET_CONVERSATION_SUCCESS, GET_CONVERSATION_FAIL],
    promise: (client) => client.get(`/conversations/${id}`)
  };
}

export function getConversationByUser(user_ids) {
  console.log('user_ids', user_ids);
  return {
    types: [GET_CONVERSATION, GET_CONVERSATION_SUCCESS, GET_CONVERSATION_FAIL],
    promise: (client) => client.get('/conversations/by-users', { params: { user_ids }})
  };
}

export function getConversationList() {
  return {
    types: [GET_CONVERSATION_LIST, GET_CONVERSATION_LIST_SUCCESS, GET_CONVERSATION_LIST_FAIL],
    promise: (client) => client.get('/conversations')
  };
}

export function createMessage(text, conversation_id, receivers) {
  return {
    types: [CREATE_MESSAGE, CREATE_MESSAGE_SUCCESS, CREATE_MESSAGE_FAIL],
    promise: (client) => client.post('/messages', { data: { text, conversation_id, receivers }}),
  };
}
