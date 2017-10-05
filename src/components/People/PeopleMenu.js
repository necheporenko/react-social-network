import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import './index.scss';

@connect((state) => ({
  requestedUser: state.user.requestedUser,
  authorizedUserId: state.user.authorizedUser.id
}), {})

export default class PeopleMenu extends Component {
  render() {
    const {fixedBlocks, authorizedUserId} = this.props;
    const {slug} = this.props.requestedUser;
    const requestedUserId = this.props.requestedUser.id;

    return (
      <div 
        className="sidebar people-nav"
        style={{
          position: fixedBlocks ? 'fixed' : null,
          top: fixedBlocks ? 118 : null
      }}>
        <ul>
          <Link onlyActiveOnIndex={true} to={`/${slug}/people`} activeClassName="active">
            <li>All people</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`/${slug}/people/following`} activeClassName="active">
            <li>Following</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={`/${slug}/people/followers`} activeClassName="active">
            <li>Followers</li>
          </Link>
          {authorizedUserId === requestedUserId &&
            <Link onlyActiveOnIndex={true} to={`/${slug}/people/suggested`} activeClassName="active">
              <li>Find People</li>
            </Link>
          }
        </ul>
      </div>
    );
  }
}

PeopleMenu.propTypes = {
  requestedUser: PropTypes.object,
  authorizedUserId: PropTypes.object
};
