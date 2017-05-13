// export const FOLLOW_USER = 'FOLLOW_USER';
// export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
// export const FOLLOW_USER_FAIL = 'FOLLOW_USER_FAIL';
// export const LOAD_PEOPLE_SUGGESTED = 'LOAD_PEOPLE_SUGGESTED';
// export const LOAD_PEOPLE_SUGGESTED_SUCCESS = 'LOAD_PEOPLE_SUGGESTED_SUCCESS';
// export const LOAD_PEOPLE_SUGGESTED_FAIL = 'LOAD_PEOPLE_SUGGESTED_FAIL';
//
//
// const initialState = {
//   suggested: [],
//   followers: [],
//   following: [],
//
//   loaded: false,
// };
//
// export default function peopleReducer(state = initialState, action) {
//   switch (action.type) {
//
//     case LOAD_PEOPLE_SUGGESTED:
//       console.log('LOAD_PEOPLE_SUGGESTED:', action);
//       return {
//         ...state,
//         loading: true
//       };
//     case LOAD_PEOPLE_SUGGESTED_SUCCESS:
//       console.log('FLOAD_PEOPLE_SUGGESTED_SUCCESS:', action.result);
//       return {
//         ...state,
//         loading: false,
//         loaded: true,
//
//       };
//     case LOAD_PEOPLE_SUGGESTED_FAIL:
//       console.log('LOAD_PEOPLE_SUGGESTED_FAIL:', action.result);
//       return {
//         ...state,
//         loading: false,
//         loaded: false,
//         error: action.error,
//
//       };
//
//     default:
//       return state;
//   }
// }
