import {likeStory, likeStorySuccess} from '../../constants/like';
import {createNewComment, createNewCommentSuccess} from '../../constants/comment';
const LOAD_CHANNELS_LIST = 'LOAD_CHANNELS_LIST';
const LOAD_CHANNELS_LIST_SUCCESS = 'LOAD_CHANNELS_LIST_SUCCESS';
const LOAD_CHANNELS_LIST_FAIL = 'LOAD_CHANNELS_LIST_FAIL';
const LOAD_CHANNEL = 'LOAD_CHANNEL';
const LOAD_CHANNEL_SUCCESS = 'LOAD_CHANNEL_SUCCESS';
const LOAD_CHANNEL_FAIL = 'LOAD_CHANNEL_FAIL';
const LOAD_NEXT_CHANNEL_STORIES = 'LOAD_NEXT_CHANNEL_STORIES';
const LOAD_NEXT_CHANNEL_STORIES_SUCCESS = 'LOAD_NEXT_CHANNEL_STORIES_SUCCESS';
const LOAD_NEXT_CHANNEL_STORIES_FAIL = 'LOAD_NEXT_CHANNEL_STORIES_FAIL';
const CREATE_CHANNEL = 'CREATE_CHANNEL';
const CREATE_CHANNEL_SUCCESS = 'CREATE_CHANNEL_SUCCESS';
const CREATE_CHANNEL_FAIL = 'CREATE_CHANNEL_FAIL';
const HEADER_CHANNEL_NAME = 'HEADER_CHANNEL_NAME';
const LIKE_STORY = 'LIKE_STORY';
const LIKE_STORY_SUCCESS = 'LIKE_STORY_SUCCESS';
const LIKE_STORY_FAIL = 'LIKE_STORY_FAIL';
const VIEW_MORE_COMMENTS = 'VIEW_MORE_COMMENTS';
const VIEW_MORE_COMMENTS_SUCCESS = 'VIEW_MORE_COMMENTS_SUCCESS';
const VIEW_MORE_COMMENTS_FAIL = 'VIEW_MORE_COMMENTS_FAIL';
const CREATE_NEW_COMMENT = 'CREATE_NEW_COMMENT';
const CREATE_NEW_COMMENT_SUCCESS = 'CREATE_NEW_COMMENT_SUCCESS';
const CREATE_NEW_COMMENT_FAIL = 'CREATE_NEW_COMMENT_FAIL';
const CREATE_STORY = 'CREATE_STORY';
const CREATE_STORY_SUCCESS = 'CREATE_STORY_SUCCESS';
const CREATE_STORY_FAIL = 'CREATE_STORY_FAIL';
const SHOW_COMMENT = 'SHOW_COMMENT';
const SHOW_COMMENT_SUCCESS = 'SHOW_COMMENT_SUCCESS';
const SHOW_COMMENT_FAIL = 'SHOW_COMMENT_FAIL';


const initialState = {
  channelsArr: [],
  channelStories: [],
  loaded: {
    loadedChannelList: false,
    loadedChannelStories: false,
  },
  pagination: 2,
};

export default function channelReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CHANNELS_LIST:
      return {
        ...state,
        loading: {
          loadingChannelList: true
        }
      };
    case LOAD_CHANNELS_LIST_SUCCESS:
      return {
        ...state,
        loading: {
          loadingChannelList: false
        },
        loaded: {
          loadedChannelList: action.result.status === 'success' && true
        },
        over: false,
        channelsArr: action.result.data,
      };
    case LOAD_CHANNELS_LIST_FAIL:
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

    case LOAD_CHANNEL:
      return {
        ...state,
        loading: {
          loadingChannelStories: true
        }
      };
    case LOAD_CHANNEL_SUCCESS:
      const dataStories = action.result.data.stories;
      dataStories.map(story => {
        story.paginationComment = 1;
        story.comments.map(comment => {
          if (comment.children.length === 1) {
            comment.children[0].hidden = true;
          }
        });
      });

      return {
        ...state,
        loading: {
          loadingChannelStories: false
        },
        loaded: Object.assign({}, state.loaded, {loadedChannelStories: action.result.status === 'success'}),
        channel_slug: action.channel_slug,
        channelStories: dataStories,
      };
    case LOAD_CHANNEL_FAIL:
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
        loaded: Object.assign({}, state.loaded, {loadedChannelStories: action.result.status === 'success'}),
        over: action.result.data.stories.length === 0,
        channelStories: [...state.channelStories, ...action.result.data.stories],
        pagination: state.pagination + 1
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

    case LIKE_STORY: {
      return {
        ...state,
        liking: true,
        channelStories: likeStory(state.channelStories, action)
      };
    }
    case LIKE_STORY_SUCCESS: {
      return {
        ...state,
        liking: false,
        channelStories: likeStorySuccess(state.channelStories, action)
      };
    }
    case LIKE_STORY_FAIL: {
      return {
        ...state,
        liking: false,
        error: action.error,
      };
    }

    case VIEW_MORE_COMMENTS: {
      return {
        ...state,
      };
    }
    case VIEW_MORE_COMMENTS_SUCCESS: {
      const viewNextComments = state.channelStories.map(story => {
        if (story.id === action.entity_id) {
          return {
            ...story,
            comments: story.paginationComment === 1 ? action.result.data : [...action.result.data, ...story.comments],
            paginationComment: story.paginationComment + 1,
          };
        }
        return {
          ...story
        };
      });
      return {
        ...state,
        channelStories: viewNextComments
      };
    }
    case VIEW_MORE_COMMENTS_FAIL: {
      return {
        ...state,
      };
    }

    case CREATE_NEW_COMMENT: {
      return {
        ...state,
        creatingNewComment: false,
        channelStories: createNewComment(state.channelStories, action)
      };
    }
    case CREATE_NEW_COMMENT_SUCCESS: {
      return {
        ...state,
        creatingNewComment: true,
        channelStories: createNewCommentSuccess(state.channelStories, action)
      };
    }
    case CREATE_NEW_COMMENT_FAIL: {
      return {
        ...state,
        creatingNewComment: false,
      };
    }

    case CREATE_STORY:
      return {
        ...state,
        creating: true
      };
    case CREATE_STORY_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
        channelStories: [...action.result.data, ...state.channelStories]
      };
    case CREATE_STORY_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
      };

    case SHOW_COMMENT: {
      return {
        ...state,
      };
    }
    case SHOW_COMMENT_SUCCESS: {
      const viewReplies = state.channelStories.map(story => {
        if (story.id === action.result.data.entity_id) {
          const modifyComments = story.comments.map(comment => {
            if (comment.id === action.result.data.parent_id) {
              return {
                ...comment,
                children: action.result.data.parent.children,
              };
            }
            return {
              ...comment
            };
          });
          return {
            ...story,
            comments: modifyComments
          };
        }
        return {
          ...story
        };
      });
      return {
        ...state,
        channelStories: viewReplies
      };
    }
    case SHOW_COMMENT_FAIL: {
      return {
        ...state,
      };
    }

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

export function getAuthUserSlug(globalState) {
  return globalState.user.authorizedUser.slug;
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
    types: [LOAD_CHANNELS_LIST, LOAD_CHANNELS_LIST_SUCCESS, LOAD_CHANNELS_LIST_FAIL],
    promise: (client) => client.get('/channels')
  };
}

export function loadNext(slug, page) {
  const channel_slug = slug || 'mashup';
  return {
    types: [LOAD_NEXT_CHANNEL_STORIES, LOAD_NEXT_CHANNEL_STORIES_SUCCESS, LOAD_NEXT_CHANNEL_STORIES_FAIL],
    promise: (client) => client.get(`/channels/${channel_slug}`, { params: { page }}),
    page
  };
}

export function show(slug) {
  const channel_slug = slug || 'mashup';
  return {
    types: [LOAD_CHANNEL, LOAD_CHANNEL_SUCCESS, LOAD_CHANNEL_FAIL],
    channel_slug,
    promise: (client) => client.get(`/channels/${channel_slug}`)
  };
}

export function create(name, description) {
  return {
    types: [CREATE_CHANNEL, CREATE_CHANNEL_SUCCESS, CREATE_CHANNEL_FAIL],
    promise: (client) => client.post('/channels', { data: { name, description }})
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

export function like(story_id) {
  return {
    types: [LIKE_STORY, LIKE_STORY_SUCCESS, LIKE_STORY_FAIL],
    story_id,
    promise: (client) => client.post('/like/story', { data: { story_id }})
  };
}

export function viewMoreComments(entity_id, paginationComment) {
  return {
    types: [VIEW_MORE_COMMENTS, VIEW_MORE_COMMENTS_SUCCESS, VIEW_MORE_COMMENTS_FAIL],
    promise: (client) => client.get('/comments/story', {params: {page: paginationComment, entity_id}}),
    entity_id
  };
}

export function createComment(entity_id, content, parent_id, user) {
  return {
    types: [CREATE_NEW_COMMENT, CREATE_NEW_COMMENT_SUCCESS, CREATE_NEW_COMMENT_FAIL],
    promise: (client) => client.post('/comments', {
      data: {
        entity: 'story',
        entity_id,  //story id
        content,    //text
        parent_id,  //default 0
        created_by: user.id  //auth_id
      }
    }),
    entity: 'story',
    entity_id,
    content,
    parent_id,
    created_by: user.id,
    user,
  };
}

export function createStory(data, books, files) {
  const formData = new FormData();
  formData.append('description', data);
  formData.append('books', JSON.stringify(books));
  Object.keys(files).forEach((key) => {
    const file = files[key];
    formData.append('file[]', file);
  });
  return {
    types: [CREATE_STORY, CREATE_STORY_SUCCESS, CREATE_STORY_FAIL],
    promise: (client) => client.post('/stories', {
      data: formData
    })
  };
}

export function showReplies(id) {
  return {
    types: [SHOW_COMMENT, SHOW_COMMENT_SUCCESS, SHOW_COMMENT_FAIL],
    promise: (client) => client.get(`/comments/${id}`)
  };
}
