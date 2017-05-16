export const LOAD_CHANNELS = 'LOAD_CHANNELS';
export const LOAD_CHANNELS_SUCCESS = 'LOAD_CHANNELS_SUCCESS';
export const LOAD_CHANNELS_FAIL = 'LOAD_CHANNELS_FAIL';
export const SHOW_CHANNEL = 'SHOW_CHANNEL';
export const SHOW_CHANNEL_SUCCESS = 'SHOW_CHANNEL_SUCCESS';
export const SHOW_CHANNEL_FAIL = 'SHOW_CHANNEL_FAIL';
export const CREATE_CHANNEL = 'CREATE_CHANNEL';
export const CREATE_CHANNEL_SUCCESS = 'CREATE_CHANNEL_SUCCESS';
export const CREATE_CHANNEL_FAIL = 'CREATE_CHANNEL_FAIL';


const initialState = {
  channelsArr: [],
  channelStories: [],
  loaded: {
    loadedChannelList: false,
    loadedChannelStories: false,
  },
};

export default function channelReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CHANNELS:
      return {
        ...state,
        loading: {
          loadingChannelList: true
        }
      };
    case LOAD_CHANNELS_SUCCESS:
      return {
        ...state,
        loading: {
          loadingChannelList: false
        },
        loaded: {
          loadedChannelList: action.result.status === 'success' && true
        },
        channelsArr: action.result.data,
      };
    case LOAD_CHANNELS_FAIL:
      return {
        ...state,
        loading: {
          loadingChannelList: false
        },
        loaded: {
          loadedChannelList: false
        },
        error: action.error,
        channelsArr: []
      };

    case SHOW_CHANNEL:
      return {
        ...state,
        loading: {
          loadingChannelStories: true
        }
      };
    case SHOW_CHANNEL_SUCCESS:
      return {
        ...state,
        loading: {
          loadingChannelStories: false
        },
        loaded: {
          loadedChannelStories: action.result.status === 'success' && true
        },
        channelStories: action.result.data.stories,
      };
    case SHOW_CHANNEL_FAIL:
      return {
        ...state,
        loading: {
          loadingChannelStories: false
        },
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
  const path = globalState.routing.locationBeforeTransitions.pathname;
  return path === '/' || path === '/channel/mashup' ?
    ''
    :
    globalState.routing.locationBeforeTransitions.pathname.substring(9);        // get slug in pathname after /channel/
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
