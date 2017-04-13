import React, { Component, PropTypes } from 'react';
//import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import config from 'config';
// import Header from '../../components/Header';

export default class App extends Component {

  componentWillReceiveProps() {
  }


  render() {
    const { children } = this.props;

    return (
      <div>
        <Helmet {...config.app.head} />
        <div style={{ marginTop: '52px' }}>
          {/* <Header
              //user={this.props.userInfo}
              //onSignOut={this.props.userSignOut}
            /> */}
        </div>
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};
