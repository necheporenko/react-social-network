import request from 'superagent';
export const CREATE_CHANNEL = 'CREATE_CHANNEL';

const apiURL = 'http://api.validbook.org/v1/channel';

export function createChannel(name, description) {
  return (dispatch) => {
    dispatch({
      type: CREATE_CHANNEL,
      name,
      description
    });
  };
}

//need add token?
export function createChannelRequest(name, description) {
  return (dispatch) => {
    return request
      .post(apiURL)
      .send({
        name,
        description
      })
      .end((err, res) => {
        if (err || !res.ok) {
          console.log('createChannelRequest error:', err); // eslint-disable-line no-console
        } else {
          dispatch(createChannel(res.body.data.name, res.body.data.id));
          console.log('Yeah! ' + JSON.stringify(res.body));
      }
    });
  };
}

//REDUCER

const initialState = {
  channelsArr: [
    {
      name: 'First',
      description: 'Desc'
    },
    {
      name: 'Second',
      description: ''
    }
  ]
};

export default function channelReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CHANNEL: {
      const { name, description } = action;
      const newChannels = [...state.channelsArr, ...[{name: name}, {description: description}]];

      return {
        ...state,
        channelsArr: newChannels
      };
    }
    default:
      return state;
  }
}


//
// export default function channelReducer(state = [], action) {
//   switch (action.type) {
//     case CREATE_CHANNEL:
//       return [{
//         name: action.name,
//         description: action.description
//         },
//         ...state
//       ];
//
//     default:
//       return state;
//   }
// }
