import request from 'superagent';
import Cookies from 'js-cookie';
import { apiURL } from '../../constants/apiURL';

export const CREATE_STORY = 'CREATE_STORY';
export const SHOW_USER_STORIES = 'SHOW_USER_STORIES';


export function createStory(description) {
  return (dispatch) => {
    dispatch({
      type: CREATE_STORY,
      description,
      book_ids: [1]
    });
  };
}

export function createStoryRequest(description) {
  return (dispatch) => {
    const cookie = JSON.parse(Cookies.get('_u'));
    const { token } = cookie;
    return request
      .post(`${apiURL}/story?access-token=${token}`)
      .send({
        description,
        book_ids: [1]
      })
      .end((err, res) => {
        if (err || res.body.status === 'error') {
          console.log('createChannelRequest error:', err); // eslint-disable-line no-console
        } else {
          dispatch(createStory(res.body.data.description));
          console.log(`Yeah! ${JSON.stringify(res.body)}`);
        }
      });
  };
}


export function showUserStories(stories) {
  return (dispatch) => {
    dispatch({
      type: SHOW_USER_STORIES,
      stories
    });
  };
}

export function showUserStoriesRequest() {
  return (dispatch) => {
    const cookie = JSON.parse(Cookies.get('_u'));
    const { token, id } = cookie;
    return request
      .get(`${apiURL}/user/stories?access-token=${token}`)
      .query({ user_id: id })
      .end((err, res) => {
        if (err || res.body.status === 'error') {
          console.log('showUserStoriesRequest error:', err); // eslint-disable-line no-console
        } else {
          dispatch(showUserStories(res.body.data));
          console.log(`Yeah! ${JSON.stringify(res.body)}`);
        }
      });
  };
}


//REDUCER

const initialState = {
  storiesArr: [
    {
      book_ids: [1],
      description: 'Desc'
    },
    {
      book_ids: [2],
      description: 'Test Test Test'
    }
  ]
};

export default function storyReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_STORY: {
      const { book_ids, description } = action;
      const newStories = [...[{ book_ids: book_ids, description: description }], ...state.storiesArr];

      return {
        ...state,
        storiesArr: newStories
      };
    }

    case SHOW_USER_STORIES: {
      const newStories = [...action.stories, ...state.storiesArr];

      return {
        ...state,
        storiesArr: newStories
      };
    }

    default:
      return state;
  }
}
