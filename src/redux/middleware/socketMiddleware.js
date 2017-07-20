import { socketUserNotification, socketGetMessage, socketLastMessage } from '../../redux/modules/profile';

export default function socketMiddleware() {
  const onMessage = (ws, store) => evt => {
    //Parse the JSON message received on the websocket
    const msg = JSON.parse(evt.data);
    const currentState = store.getState();

    // store.dispatch(socketUserNotification(msg));
    // console.log(msg);

    switch (msg.type) {
      // case 'notification-like':
      //   if (currentState.user.authorizedUser.id !== msg.user.id) {
      //     store.dispatch(socketUserNotification(msg));
      //     console.log('muhahaha', currentState.user.authorizedUser.id);
      //   }
      //   break;
      case 'message':
        console.log('msg:', msg.conversation_id, currentState.profile.conversation.conversation_id);
        if (currentState.profile.conversation.conversation_id === msg.conversation_id) {
          store.dispatch(socketGetMessage(msg));
        } else if (currentState.profile.conversation.conversation_id !== msg.conversation_id) {
          store.dispatch(socketLastMessage(msg));
        }
        break;

      default:
        console.log(`Received unknown message type: '${msg.type}'`);
        break;
    }
  };

  return store => next => action => {
    const currentState = store.getState();
    switch (action.type) {
      case 'PERSIST':
        if (currentState.user.authorizedUser.id) {
          const socket = new WebSocket(`ws://api.validbook.org:8000/?user=${currentState.user.authorizedUser.id}`);
          // socket = new WebSocket('ws://sandbox.kaazing.net/echo');
          console.log('this is store', currentState.user.authorizedUser);
          global.socket = socket;
          socket.onopen = function () {
            console.log('Connection established!');
          };
          socket.onmessage = onMessage(socket, store);
        }

        break;

      default:
        return next(action);
    }
  };
}
