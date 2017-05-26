// import { connect } from 'react-redux';
// import { asyncConnect } from 'redux-connect';
// import { getUser, getUserSlug } from '../redux/modules/sign';
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
//     requestedUser: state.sign.requestedUser
//   }), {
//     getUser,
//     getUserSlug,
//   })
// }
