import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './index.scss';

class PhotosMenu extends Component {
  render() {
    const { first_name, last_name } = this.props.user;
    const link = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;

    return (
      <div className="sidebar">
        <ul>
          {/* <Link onlyActiveOnIndex={true} to={link + '/photos'} activeClassName="active"> */}
          <Link onlyActiveOnIndex={true} to={`${link}/photos`} activeClassName="active">
            <li>Original</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`${link}/photos/external`} activeClassName="active">
            <li>External</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`${link}/photos/covers`} activeClassName="active">
            <li>Covers</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`${link}/photos/profile`} activeClassName="active">
            <li>Profile</li>
          </Link>
        </ul>
      </div>
    );
  }
}

PhotosMenu.propTypes = {
  user: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.sign.user,
  };
}

export default connect(mapStateToProps, null)(PhotosMenu);
