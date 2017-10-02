import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {showActivePeopleTab} from '../../../redux/modules/form';

@connect((state) => ({
  loaded: state.follow.loaded,
}), {
  showActivePeopleTab,
})

export default class Peoples extends Component {
  render() {
    const {people, following, followers, loaded, requestedUser} = this.props;

    return (
      loaded.loadedPeopleBlock &&
      <div className="infoblocks-peoples">
        <div>
          <div className="title-infoblocks">
            <span className="peoples-icon"/>
            <div>
              <div>
                <Link to={`/${requestedUser.slug}/people`}>
                  People
                </Link>
              </div>
              <i style={{color: '#999', fontSize: '14px', lineHeight: '22px'}}>·</i>
              <div>
                <Link to={`/${requestedUser.slug}/people/following`} style={{color: '#999', fontSize: '14px'}}>
                  Following<span>{` ${following.count}`}</span>
                </Link>
              </div>
              <i style={{color: '#999', fontSize: '14px', lineHeight: '22px'}}>·</i>
              <div>
                <Link to={`/${requestedUser.slug}/people/followers`} style={{color: '#999', fontSize: '14px'}}>
                  Followers<span>{` ${followers.count}`}</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="people-gallery">
            {people && people.map((friend) => (
              <div className="people-avatar" key={friend.id}>
                <Link to={`/${friend.slug}`}>
                  <img src={friend.avatar}/>
                  <div className="people-avatar-user-name">{`${friend.first_name} ${friend.last_name}`}</div>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }
}

Peoples.propTypes = {
  loaded: PropTypes.object,
  people: PropTypes.array,
  followers: PropTypes.shape({
    count: PropTypes.string,
    users: PropTypes.array
  }),
  following: PropTypes.shape({
    count: PropTypes.string,
    users: PropTypes.array
  }),
  requestedUser: PropTypes.object,
};
