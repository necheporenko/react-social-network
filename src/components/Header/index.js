import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import Logo from './Logo';
import SearchField from './SearchField';
import UserButtons from './UserButtons';
import './index.scss';

@connect((state) => ({
  header_channel_name: state.channel.header_channel_name,
  notifications: state.profile.notifications,
  loadingBar: state.loadingBar,
  authorizedUser: state.user.authorizedUser,
}), {})

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isMob: false,
      // sidebarOpen: false,
      //
      // docked1: false,
      // docked2: false,
      // open1: false,
      // open2: false,
      // transitions: true,
      // touch: true,
      // shadow: true,
      // touchHandleWidth: 20,
      // dragToggleDistance: 30,
    };
    // this.isMobile = this.isMobile.bind(this);
    // this.onSetOpen1 = this.onSetOpen1.bind(this);
    // this.onSetOpen2 = this.onSetOpen2.bind(this);
    // this.menuButtonClick1 = this.menuButtonClick1.bind(this);
    // this.menuButtonClick2 = this.menuButtonClick2.bind(this);
  }
  //
  // componentWillMount() {
  //   this.isMobile();
  // }
  // componentDidMount() {
  //   this.isMobile();
  // }

  // onSetOpen1(open1) {
  //  this.setState({open1: open1});
  // }
  // onSetOpen2(open2) {
  //  this.setState({open2: open2});
  // }
  //
  // menuButtonClick1(e) {
  //   e.preventDefault();
  //   this.onSetOpen1(!this.state.open1);
  // }
  // menuButtonClick2(e) {
  //   e.preventDefault();
  //   this.onSetOpen2(!this.state.open2);
  // }

  // isMobile() {
  //   if(window.innerWidth <= 991) {
  //    this.setState({ "isMob": true });
  //    console.log("it's a mobile");
  //  } else {
  //    this.setState({ "isMob": false });
  //    console.log("it's a desktop");
  //  }
  // }

  render() {
    // const testSideBar =
    //     <div style={{padding: '16px', height: '100%', backgroundColor: 'white', width: '270px'}}>
    //       <ul>
    //         <li>Random text</li>
    //         <li>Random text</li>
    //         <li>Random text</li>
    //         <li>Random text</li>
    //         <li>Random text</li>
    //         <li>Random text</li>
    //       </ul>
    //     </div>;
    //
    // const LeftPanelSideBar =
    //   <div style={{padding: '16px', height: '100%', backgroundColor: 'white', width: '270px'}}>
    //     <Channels />
    //   </div>;

    return (
      <div className="header">
        {/* {this.state.isMob &&
          <div style={{width: '35px'}}></div>
        } */}
        <div className="wrap-loadingBar" style={{opacity: this.props.loadingBar}}>
          <LoadingBar style={{ backgroundColor: '#2887D2', height: '2px', top: 0, left: 0, transition: 'transform 300ms ease 0s' }} />
        </div>

        <Logo />
        { this.props.header_channel_name &&
          <div className="channel-name">
            {this.props.header_channel_name}
          </div>
        }
        <SearchField />
        <UserButtons
          // onSignIn={this.props.onSignIn}
          // onSignOut={this.props.onSignOut}
          logoutUser={this.props.logoutUser}
          authorizedUser={this.props.authorizedUser}
          notifications={this.props.notifications}
        />

        {/* {this.state.isMob &&
          <div className="mobile-sidebar">
            <Sidebar
               sidebar={LeftPanelSideBar}
               docked={this.state.docked1}
               sidebarClassName={'custom-sidebar-class'}
               open={this.state.open1}
               touch={this.state.touch}
               shadow={this.state.shadow}
               pullRight={false}
               touchHandleWidth={this.state.touchHandleWidth}
               dragToggleDistance={this.state.dragToggleDistance}
               transitions={this.state.transitions}
               onSetOpen={this.onSetOpen1}
               styles={{
                        root: {
                          position: 'fixed',
                          right: '95%',
                          overflow: 'visible'
                        }
                      }}
            >
              {!this.state.docked1 &&
                <div className="left-arrow" onClick={this.menuButtonClick1}></div>
              }
            </Sidebar>
          </div>
        } */}


        {/* {this.state.isMob &&
          <div className="mobile-sidebar">
            <Sidebar
               sidebar={testSideBar}
               docked={this.state.docked2}
               sidebarClassName={'custom-sidebar-class'}
               open={this.state.open2}
               touch={this.state.touch}
               shadow={this.state.shadow}
               pullRight={true}
               touchHandleWidth={this.state.touchHandleWidth}
               dragToggleDistance={this.state.dragToggleDistance}
               transitions={this.state.transitions}
               onSetOpen={this.onSetOpen2}
               styles={{
                        root: {
                          position: 'fixed',
                          left: '95%',
                          overflow: 'visible'
                        }
                      }}
            >
              {!this.state.docked2 &&
                <div className="right-arrow" onClick={this.menuButtonClick2}></div>
              }
          </Sidebar>
        </div>
        } */}


        {this.props.children}
      </div>
    );
  }
}

Header.propTypes = {
  children: PropTypes.element,
  // onSignIn: PropTypes.func,
  // onSignOut: PropTypes.func,
  authorizedUser: PropTypes.object,
  logoutUser: PropTypes.func,
};

export default Header;
