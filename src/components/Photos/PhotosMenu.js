import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './index.scss';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
}), {})

export default class PhotosMenu extends Component {
  render() {
    const { slug } = this.props.authorizedUser;

    return (
      <div className="sidebar">
        <ul>
          {/* <Link onlyActiveOnIndex={true} to={link + '/photos'} activeClassName="active"> */}
          <Link onlyActiveOnIndex={true} to={`/${slug}/photos`} activeClassName="active">
            <li>All Photos</li>
          </Link>
          {/*<Link onlyActiveOnIndex={true} to={`/${slug}/photos/external`} activeClassName="active">*/}
          {/*<li>External</li>*/}
          {/*</Link>*/}
          <Link onlyActiveOnIndex={true} to={`/${slug}/photos/profile`} activeClassName="active">
            <li>Profile Pictures</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`/${slug}/photos/covers`} activeClassName="active">
            <li>Covers Photos</li>
          </Link>
        </ul>
        <p style={{padding: '10px 10px 10px 30px', color: '#8f8f8f'}}>Photos from books:</p>
      </div>
    );
  }
}

PhotosMenu.propTypes = {
  authorizedUser: PropTypes.object,
};
