import request from 'superagent';
import Cookies from 'js-cookie';
import { apiURL } from '../../constants/apiURL';

export const CREATE_CHANNEL = 'CREATE_CHANNEL';

export function createChannel(name, description) {
  return (dispatch) => {
    dispatch({
      type: CREATE_CHANNEL,
      name,
      description
    });
  };
}

export function createChannelRequest(name, description) {
  return (dispatch) => {
    const cookie = JSON.parse(Cookies.get('_u'));
    const { token } = cookie;
    return request
      .post(`${apiURL}/channel?access-token=${token}`)
      .send({
        name,
        description
      })
      .end((err, res) => {
        if (err || res.body.status === 'error') {
          console.log('createChannelRequest error:', err); // eslint-disable-line no-console
        } else {
          dispatch(createChannel(res.body.data.name, res.body.data.id));
          console.log(`Yeah! ${JSON.stringify(res.body)}`);
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
      const newChannels = [...state.channelsArr, ...[{ name: name, description: description }]];

      return {
        ...state,
        channelsArr: newChannels
      };
    }
    default:
      return state;
  }
}
