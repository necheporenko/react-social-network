import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

@connect((state) => ({
  friends: state.profile.friends,
}), {})


export default class Peoples extends Component {
  render() {
    const { friends } = this.props;

    return (
      <div className="infoblocks-peoples">
        <div className="title-infoblocks">
          <a href="#"><span className="peoples-icon"></span> People · <span>{friends && friends.length}</span></a>
        </div>
        <div className="people-gallery">
          {friends && friends.map((friend) => (
            <div className="people-avatar">
              <Link key={friend.id} to={`/${friend.slug}`}>
                <img src={friend.avatar}/>
                <div className="people-avatar-user-name">{`${friend.first_name} ${friend.last_name}`}</div>
              </Link>
            </div>
            ))}
        </div>
      </div>
    );
  }
}

Peoples.propTypes = {
  friends: PropTypes.array,
};
