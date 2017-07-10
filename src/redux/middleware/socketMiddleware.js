import { socketUserNotification } from '../../redux/modules/profile';

export default function socketMiddleware() {
  const onMessage = (ws, store) => evt => {
    //Parse the JSON message received on the websocket
    const msg = JSON.parse(evt.data);
    const currentState = store.getState();

    switch (msg.type) {
      case 'notification-like':
        if (currentState.user.authorizedUser.id !== msg.user.id) {
          store.dispatch(socketUserNotification(msg));
          console.log('muhahaha', currentState.user.authorizedUser.id);
        }
        break;

      default:
        console.log(`Received unknown message type: '${msg.type}'`);
        break;
    }
  };

  return store => next => action => {
    switch (action.type) {
      case 'PERSIST':
        const socket = new WebSocket('ws://api.validbook.org:8000');
        // socket = new WebSocket('ws://sandbox.kaazing.net/echo');
        global.socket = socket;
        socket.onopen = function () {
          console.log('Connection established!');
        };
        socket.onmessage = onMessage(socket, store);

        break;

      default:
        return next(action);
    }
  };
}
