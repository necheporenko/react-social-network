import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { userRegisterRequest, userLoginRequest, userLogin } from '../redux/modules/user';
import { showActiveForm } from '../redux/modules/form';
import { createChannelRequest } from '../redux/modules/channel';
import NewUser from '../components/Registration/Main';
import MainPage from '../components/MainPage';

class IndexContainer extends Component {

  render() {
    return (
      <div>
        {this.props.isAuthenticated &&
          <div>
            <MainPage
              userInfo={this.props.userInfo}
              channelsArr={this.props.channelsArr}
              createChannelRequest={this.props.createChannelRequest}
            />
          </div>
        }
        {this.props.isAuthenticated === false &&
          <div>
            <NewUser
              activeForm={this.props.activeForm}
              showActiveForm={this.props.showActiveForm}
              userLoginRequest={this.props.userLoginRequest}
              userRegisterRequest={this.props.userRegisterRequest}
            />
          </div>
        }
      </div>
    );
  }
}

IndexContainer.propTypes = {
  // users: PropTypes.array,
  // fetchUsers: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  userInfo: PropTypes.object,

  showActiveForm: PropTypes.func,
  activeForm: PropTypes.string,

  userLoginRequest: PropTypes.func,
  userRegisterRequest: PropTypes.func,

  createChannelRequest: PropTypes.func,
  channelsArr: PropTypes.array
};

function mapStateToProps(state) {
  return {
    users: state.users.usersArr,
    isAuthenticated: state.users.isAuthenticated,
    userInfo: state.users.userInfo,
    activeForm: state.forms.activeForm,

    authEmail: state.users.authEmail,
    authPass: state.users.authPass,

    channelsArr: state.channel.channelsArr
  };
}

export default connect(mapStateToProps, {
  userRegisterRequest,
  showActiveForm,
  userLoginRequest,
  userLogin,
  createChannelRequest
})(IndexContainer);
