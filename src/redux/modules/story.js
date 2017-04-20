import request from 'superagent';
import Cookies from 'js-cookie';

export const CREATE_STORY = 'CREATE_STORY';

const apiURL = 'http://api.validbook.org/v1/story';

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
      .post(`${apiURL}?access-token=${token}`)
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
    default:
      return state;
  }
}
