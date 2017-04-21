import request from 'superagent';
import Cookies from 'js-cookie';

export const FETCH_USERS = 'GET_USERS';
export const ADD_NEW_USER = 'ADD_NEW_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';

const apiURL = 'http://api.validbook.org/v1';

export function saveUserList(users) {
  return {
    type: FETCH_USERS,
    users
  };
}

export function addUser(firstName, lastName, email, password) {
  return {
    type: ADD_NEW_USER,
    firstName,
    lastName,
    email,
    password
  };
}

export function deleteUser(id) {
  return {
    type: DELETE_USER,
    id
  };
}

export function updateUser(id, user) {
  return {
    type: UPDATE_USER,
    id,
    user
  };
}

export function userLogin(id, email, token, first_name, last_name) {
  return {
    type: LOGIN_REQUEST,
    id,
    email,
    token,
    first_name,
    last_name
  };
}

export function userSignOut() {
  window.location.pathname = '/';
  Cookies.remove('_u');
  return {
    type: USER_LOGOUT
  };
}

export function userInfo(info) {
  return {
    type: USER_INFO_REQUEST,
    info
  };
}

export function userLoginRequest(email, password) {
  return (dispatch) => {
    const user = Cookies.get('_u') ? JSON.parse(Cookies.get('_u')) : null;
    if (user) {
      const { id, email, token, first_name, last_name } = user;
      dispatch(userLogin(id, email, token, first_name, last_name));
      return;
    }

    return request
      .post(`${apiURL}/auth/login`)
      .type('form')
      .send({
        email,
        password
      })
      .end((err, res) => {
        if (err || !res.ok) {
          console.log('User authentification error:', err);         // eslint-disable-line no-console
        } else {
          const resp = res.body;

          return request
            .get(`${apiURL}/user?id=${resp.id}`)
            .end((err, response) => {
              if (err || !res.ok) {
                console.log('Error in getting user info', err);    // eslint-disable-line no-console
              } else {
                const { first_name, last_name } = response.body.data;
                Cookies.set('_u', {
                  id: resp.id,
                  email: resp.email,
                  token: resp.token,
                  first_name: first_name,
                  last_name: last_name
                },
                { expires: 30 });
                dispatch(userLogin(resp.id, resp.email, resp.token, first_name, last_name));
              }
            });
        }
      });
  };
}

export function userInfoRequest(id) {
  return (dispatch) => {
    return request
      .get(`${apiURL}/user?id=${id}`)
      .end((err, res) => {
        if (err || !res.ok) {
          console.log('Error in getting user info', err);          // eslint-disable-line no-console
        } else {
          dispatch(userInfo(res.body));
        }
      });
  };
}

export function userRegisterRequest(firstName, lastName, email, password) {
  return (dispatch) => {
    return request
      .post(`${apiURL}/registration`)
      .type('form')
      .send({
        first_name: firstName,
        last_name: lastName,
        email,
        password
      })
      .end((err, res) => {
        if (err || !res.ok) {
          console.log('Error in registration:', err);               // eslint-disable-line no-console
        } else {
          console.log('yay got ' + JSON.stringify(res.body));       // eslint-disable-line no-console
          dispatch(addUser(res.body));
        }
      });
  };
}


/*export function fetchUsers() {

  return (dispatch) => {
    return request
      .get(`${apiURL}/users`)
      .end((err, res) => {
        if (err || !res.ok) {
          console.log('Oh no! error in fetchUsers');                   // eslint-disable-line no-console
        } else {
          console.log('yay got ' + JSON.stringify(res.body));          // eslint-disable-line no-console
          dispatch(saveUserList(res.body));
        }
      });
  };
}*/

/*export function updateUserRequest(id, user) {
  return (dispatch) => {
    return request
      .put(`${apiURL}/users${id}`)
      .send({ user })
      .end((err, res) => {
        if (err || !res.ok) {
          console.log('Oh no! error');                                 // eslint-disable-line no-console
        } else {
          console.log('yay got ' + JSON.stringify(res.body));          // eslint-disable-line no-console
          dispatch(updateUser(id, user));
        }
      });
  };
}*/

/*export function deleteUserRequest(id) {
  return (dispatch) => {
    return request
      .del(`${apiURL}/users${id}`)
      .end((err, res) => {
        if (err || !res.ok) {
          console.log('Oh no! error');                                  // eslint-disable-line no-console
        } else {
          console.log('yay got ' + JSON.stringify(res.body));           // eslint-disable-line no-console
          dispatch(deleteUser(id));
        }
      });
  };
}*/


/* ============
   | REDUCER  |
   ============ */

const initialState = {
  usersArr: [],
  newUser: {},
  isAuthenticated: false,
  userInfo: {
    id: null,
    token: null,
    email: null,
    first_name: '',
    last_name: ''
  }
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS: {
      const { users } = action;
      const newUsers = [...state.usersArr, ...users];

      return {
        ...state,
        usersArr: newUsers
      };
    }
    //todo: FIX firtsName & lastName
    case LOGIN_REQUEST: {
      const userInfo = {
        id: action.id,
        token: action.token,
        email: action.email,
        first_name: action.first_name,
        last_name: action.last_name
      };

      return {
        ...state,
        userInfo,
        isAuthenticated: !!action.token
      };
    }

    case USER_LOGOUT: {
      return {
        ...state,
        userInfo: {},
        isAuthenticated: false
      };
    }
   // case ADD_NEW_USER: {
   //   // Add user to usersArr
   // }
   // case DELETE_USER: {
   //   // Delete user from usersArr
   // }
    default:
      return state;
  }
}
