export const LOAD_CHANNELS = 'LOAD_CHANNELS';
export const LOAD_CHANNELS_SUCCESS = 'LOAD_CHANNELS_SUCCESS';
export const LOAD_CHANNELS_FAIL = 'LOAD_CHANNELS_FAIL';
export const SHOW_CHANNEL = 'SHOW_CHANNEL';
export const SHOW_CHANNEL_SUCCESS = 'SHOW_CHANNEL_SUCCESS';
export const SHOW_CHANNEL_FAIL = 'SHOW_CHANNEL_FAIL';
export const CREATE_CHANNEL = 'CREATE_CHANNEL';
export const CREATE_CHANNEL_SUCCESS = 'CREATE_CHANNEL_SUCCESS';
export const CREATE_CHANNEL_FAIL = 'CREATE_CHANNEL_FAIL';
export const LOAD_NEXT_CHANNEL_STORIES = 'LOAD_NEXT_CHANNEL_STORIES';
export const LOAD_NEXT_CHANNEL_STORIES_SUCCESS = 'LOAD_NEXT_CHANNEL_STORIES_SUCCESS';
export const LOAD_NEXT_CHANNEL_STORIES_FAIL = 'LOAD_NEXT_CHANNEL_STORIES_FAIL';
const HEADER_CHANNEL_NAME = 'HEADER_CHANNEL_NAME';

const initialState = {
  channelsArr: [],
  channelStories: [],
  loaded: {
    loadedChannelList: false,
    loadedChannelStories: false,
  },
  pagination: 1,
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
        over: false,
        pagination: 1,
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
        channel_slug: action.channel_slug,
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

    case LOAD_NEXT_CHANNEL_STORIES:
      return {
        ...state,
        loading: true
      };
    case LOAD_NEXT_CHANNEL_STORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: action.result.status === 'success' && true,       // or just true
        over: action.result.data.stories.length === 0 && true,
        channelStories: [...state.channelStories, ...action.result.data.stories],
        pagination: action.page + 1
      };
    case LOAD_NEXT_CHANNEL_STORIES_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
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

    case HEADER_CHANNEL_NAME:
      return {
        ...state,
        header_channel_name: action.header_channel_name,
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
    globalState.routing.locationBeforeTransitions.pathname.substring(9);               // get slug in pathname after /channel/
}

export function load() {
  return {
    types: [LOAD_CHANNELS, LOAD_CHANNELS_SUCCESS, LOAD_CHANNELS_FAIL],
    promise: (client) => client.get('/channel/list')
  };
}


export function loadNext(slug, page) {
  const channel_slug = slug || '';
  return {
    types: [LOAD_NEXT_CHANNEL_STORIES, LOAD_NEXT_CHANNEL_STORIES_SUCCESS, LOAD_NEXT_CHANNEL_STORIES_FAIL],
    promise: (client) => client.get('/channel', { params: { channel_slug, page }}),
    page
  };
}

export function show(slug) {
  const channel_slug = slug || '';
  return {
    types: [SHOW_CHANNEL, SHOW_CHANNEL_SUCCESS, SHOW_CHANNEL_FAIL],
    channel_slug,
    promise: (client) => client.get('/channel', { params: { channel_slug }})
  };
}

export function create(name, description) {
  return {
    types: [CREATE_CHANNEL, CREATE_CHANNEL_SUCCESS, CREATE_CHANNEL_FAIL],
    promise: (client) => client.post('/channel', { data: { name, description }})
  };
}

export function getChannelName(globalState) {
  const path = globalState.routing.locationBeforeTransitions.pathname;
  let header_channel_name;

  if (path.indexOf('channel') === 1) {
    const channelName = path.substring(9);
    header_channel_name = channelName[0].toUpperCase() + channelName.substring(1);
  } else if (path === '/') {
    header_channel_name = 'Mashup';
  } else {
    header_channel_name = false;
  }

  return {
    type: HEADER_CHANNEL_NAME,
    header_channel_name
  };
}
