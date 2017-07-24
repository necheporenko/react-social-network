import { socketUserNotification, socketGetMessage, socketLastMessage } from '../../redux/modules/profile';

export default function socketMiddleware() {
  const onMessage = (ws, store) => evt => {
    //Parse the JSON message received on the websocket
    const msg = JSON.parse(evt.data);
    const currentState = store.getState();

    switch (msg.type) {
      case 'message':
        console.log('msg:', msg.conversation_id, currentState.profile.conversation.conversation_id);
        if (currentState.profile.conversation.conversation_id === msg.conversation_id) {
          store.dispatch(socketGetMessage(msg));
        } else if (currentState.profile.conversation.conversation_id !== msg.conversation_id) {
          store.dispatch(socketLastMessage(msg));
        }
        break;
      case 'notification':
        store.dispatch(socketUserNotification(msg));
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
          // console.log('this is store', currentState.user.authorizedUser);
          global.socket = socket;
          socket.onopen = () => console.log('Connection established!');
          socket.onmessage = onMessage(socket, store);
        }
        break;

      default:
        return next(action);
    }
  };
}
