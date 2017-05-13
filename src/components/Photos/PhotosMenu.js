import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './index.scss';

@connect((state) => ({
  user: state.sign.user,
}), {})

export default class PhotosMenu extends Component {
  render() {
    const { slug } = this.props.user;

    return (
      <div className="sidebar">
        <ul>
          {/* <Link onlyActiveOnIndex={true} to={link + '/photos'} activeClassName="active"> */}
          <Link onlyActiveOnIndex={true} to={`/${slug}/photos`} activeClassName="active">
            <li>Original</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`/${slug}/photos/external`} activeClassName="active">
            <li>External</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`/${slug}/photos/covers`} activeClassName="active">
            <li>Covers</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`/${slug}/photos/profile`} activeClassName="active">
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
