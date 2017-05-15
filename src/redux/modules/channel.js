// import request from 'superagent';
// import Cookies from 'js-cookie';
// import { apiURL } from '../../constants/apiURL';

// export const CREATE_CHANNEL = 'CREATE_CHANNEL';
export const LOAD_CHANNELS = 'LOAD_CHANNELS';
export const LOAD_CHANNELS_SUCCESS = 'LOAD_CHANNELS_SUCCESS';
export const LOAD_CHANNELS_FAIL = 'LOAD_CHANNELS_FAIL';
export const SHOW_CHANNEL = 'SHOW_CHANNEL';
export const SHOW_CHANNEL_SUCCESS = 'SHOW_CHANNEL_SUCCESS';
export const SHOW_CHANNEL_FAIL = 'SHOW_CHANNEL_FAIL';
export const CREATE_CHANNEL = 'CREATE_CHANNEL';
export const CREATE_CHANNEL_SUCCESS = 'CREATE_CHANNEL_SUCCESS';
export const CREATE_CHANNEL_FAIL = 'CREATE_CHANNEL_FAIL';

// export function createChannel(name, description) {
//   return (dispatch) => {
//     dispatch({
//       type: CREATE_CHANNEL,
//       name,
//       description
//     });
//   };
// }
//
// export function createChannelRequest(name, description) {
//   return (dispatch) => {
//     const cookie = JSON.parse(Cookies.get('_u'));
//     const { token } = cookie;
//     return request
//       .post(`${apiURL}/channel?access-token=${token}`)
//       .send({
//         name,
//         description
//       })
//       .end((err, res) => {
//         if (err || res.body.status === 'error') {
//           console.log('createChannelRequest error:', err); // eslint-disable-line no-console
//         } else {
//           dispatch(createChannel(res.body.data.name, res.body.data.id));
//           console.log(`Yeah! ${JSON.stringify(res.body)}`);
//         }
//       });
//   };
// }

//REDUCER

const initialState = {
  channelsArr: [],
  channelStories: [],
  loaded: {
    loadedChannelList: false,
    loadedChannelStories: false,
  },
  loading: false
};

export default function channelReducer(state = initialState, action) {
  switch (action.type) {
    // case CREATE_CHANNEL: {
    //   const { name, description } = action;
    //   const newChannels = [...state.channelsArr, ...[{ name: name, description: description }]];
    //
    //   return {
    //     ...state,
    //     channelsArr: newChannels
    //   };
    // }
    case LOAD_CHANNELS:
      return {
        ...state,
        loading: true
      };
    case LOAD_CHANNELS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: {
          loadedChannelList: action.result.status === 'success' && true
        },
        channelsArr: action.result.data,
      };
    case LOAD_CHANNELS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: {
          loadedChannelList: false
        },
        error: action.error,
        channelsArr: []
      };

    case SHOW_CHANNEL:
      return {
        ...state,
        loading: true
      };
    case SHOW_CHANNEL_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: {
          loadedChannelStories: action.result.status === 'success' && true
        },
        channelStories: action.result.data.stories,
      };
    case SHOW_CHANNEL_FAIL:
      return {
        ...state,
        loading: false,
        loaded: {
          loadedChannelStories: false
        },
        error: action.error,
        channelStories: []
      };

    case CREATE_CHANNEL:
      return {
        ...state,
        creating: true
      };
    case CREATE_CHANNEL_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
      };
    case CREATE_CHANNEL_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
      };

    default:
      return state;
  }
}

export function isLoadedChannelList(globalState) {
  return globalState.channel && globalState.channel.loaded.loadedChannelList;
}

export function isLoadedChannelStories(globalState) {
  return globalState.channel && globalState.channel.loaded.loadedChannelStories && globalState.channel.loading;
}

export function isMashUp(globalState) {
  return globalState.routing.locationBeforeTransitions.parthname === '/' || '/channel/mashup' ?
    ''
    :
    globalState.routing.locationBeforeTransitions.parthname.substring(9);
}

export function load() {
  return {
    types: [LOAD_CHANNELS, LOAD_CHANNELS_SUCCESS, LOAD_CHANNELS_FAIL],
    promise: (client) => client.get('/channel/list')
  };
}

export function show(slug) {
  const channel_slug = slug || '';
  return {
    types: [SHOW_CHANNEL, SHOW_CHANNEL_SUCCESS, SHOW_CHANNEL_FAIL],
    promise: (client) => client.get('/channel', { params: { channel_slug }})
  };
}

export function create(name, description) {
  return {
    types: [CREATE_CHANNEL, CREATE_CHANNEL_SUCCESS, CREATE_CHANNEL_FAIL],
    promise: (client) => client.post('/channel', { data: { name, description }})
  };
}
