// import { connect } from 'react-redux';
// import { asyncConnect } from 'redux-connect';
// import { getUser, getUserSlug } from '../redux/modules/user';
//
// export default function getSlug() {
//   @asyncConnect([{
//     promise: ({ store: { dispatch, getState } }) => {
//       const promises = [];
//
//       promises.push(dispatch(getUser(getUserSlug(getState()))));
//
//       return Promise.all(promises);
//     }
//   }])
//
//   @connect((state) => ({
//     requestedUser: state.user.requestedUser
//   }), {
//     getUser,
//     getUserSlug,
//   })
// }
