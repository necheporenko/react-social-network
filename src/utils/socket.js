// import { connect } from 'react-redux';
// import { createStore } from 'redux';
import { socketUserNotification } from '../redux/modules/profile';


// @connect((state) => ({}), {
//   socketUsetNotification
// })

export default function sockets() {
  socket.onmessage = function (result) {
    const json = JSON.parse(result.data);
    console.log('  ==== SOCKET:', 'Type:', json.type, 'Body:', json);
    // console.log(store.getState());

    switch (json.type) {
      case 'notification':
        console.log('muhahaha');
        socketUserNotification(json);
        break;

      default:
        console.log('error unknown socket type');
    }
  };
}

// let store = createStore(sockets);

