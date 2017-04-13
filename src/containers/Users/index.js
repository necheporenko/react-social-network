import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { isLoaded as isUsersLoaded, load as loadUsers } from 'redux/modules/users';
import { asyncConnect } from 'redux-connect';
import { push } from 'react-router-redux';

// import { IndexLink } from 'react-router';
// import { LinkContainer } from 'react-router-bootstrap';
// import Navbar from 'react-bootstrap/lib/Navbar';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';
// import Helmet from 'react-helmet';
// import { InfoBar } from 'components';
// import config from '../../config';
// import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isUsersLoaded(getState())) {
      promises.push(dispatch(loadUsers()));
    }

    return Promise.all(promises);
  }
}])

@connect(
  state => ({
    users: state.users.users
  })
)

export default class Users extends Component {

  render() {
    const {users} = this.props;

    return (
      <div>
        {users.length && (
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>First name</th>
                <th>Last name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
