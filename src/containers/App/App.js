import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
// import Helmet from 'react-helmet';
// import config from 'config';
import Header from '../../components/Header';
import { userLogin, userSignOut } from '../../redux/modules/user';

class App extends Component {

  componentWillMount() {
    const user = Cookies.get('_u') ? JSON.parse(Cookies.get('_u')) : null; // let
    if (user) {
      this.props.userLogin(user.id, user.email, user.token, user.first_name, user.last_name);
    }
  }

  componentWillReceiveProps() {
    // const path = this.props.children.props.router.location.pathname;
    // const { first_name, last_name } = this.props.userInfo;
    // const link = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        {/*<Helmet {...config.app.head} />*/}
        <div style={{ marginTop: '52px' }}>
          <Header
            user={this.props.userInfo}
            onSignOut={this.props.userSignOut}
          />
        </div>
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  //isAuthenticated: PropTypes.bool,
  userInfo: PropTypes.object,
  userLogin: PropTypes.func,
  userSignOut: PropTypes.func
};

function mapStateToProps(state) {
  return {
    //isAuthenticated: state.users.isAuthenticated,
    userInfo: state.users.userInfo
  };
}

export default connect(mapStateToProps, {
  userLogin,
  userSignOut
})(App);
