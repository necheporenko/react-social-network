import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import './index.scss';

class PhotosMenu extends Component {
  render() {
    // const { first_name, last_name } = this.props.userInfo;
    // const link = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;

    return (
      <div className="sidebar">
        <ul>
          {/* <Link onlyActiveOnIndex={true} to={link + '/photos'} activeClassName="active"> */}
          <Link onlyActiveOnIndex={true} to={'/photos'} activeClassName="active">
            <li>Original</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={'/photos/external'} activeClassName="active">
            <li>External</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={'/photos/covers'} activeClassName="active">
            <li>Covers</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={'/photos/profile'} activeClassName="active">
            <li>Profile</li>
          </Link>
        </ul>
      </div>
    );
  }
}

// PhotosMenu.propTypes = {
//   userInfo: PropTypes.object,
// };

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
  };
}

export default connect(mapStateToProps, null)(PhotosMenu);
