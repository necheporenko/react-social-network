import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './index.scss';

@connect((state) => ({
  user: state.sign.user,
}), {})

export default class PeopleMenu extends Component {
  render() {
    const { slug } = this.props.user;

    return (
      <div className="sidebar people-nav">
        <ul>
          <Link onlyActiveOnIndex={true} to={`/${slug}/people`} activeClassName="active">
            <li>Following</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`/${slug}/people/followers`} activeClassName="active">
            <li>Followers</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`/${slug}/people/suggested`} activeClassName="active">
            <li>Suggested</li>
          </Link>
        </ul>
      </div>
    );
  }
}

PeopleMenu.propTypes = {
  user: PropTypes.object,
};
