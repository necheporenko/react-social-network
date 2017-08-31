import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {follow as followUser, unfollow as unfollowUser} from '../../../redux/modules/follow';
import './index.scss';

@connect((state) => ({}), {
  followUser,
  unfollowUser,
})

export default class FollowBlock extends Component {
  constructor(props) {
    super(props);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }

  follow(id) {
    this.props.followUser(id, 'whoToFollow');
  }

  unfollow(id) {
    this.props.unfollowUser(id, 'whoToFollow');
  }

  render() {
    const {whoToFollowList} = this.props;

    return (
      whoToFollowList.length > 0 &&
      <div className="follow-block" style={{marginBottom: '20px'}}>
        <div className="wrapper">
          <h3 className="title">Who to follow</h3>

          {whoToFollowList && whoToFollowList.map((people) => (
            <div key={people.id} className="follow-people">
              <Link to={`/${people.slug}`} className="follow-people-link-img">
                <img src={people.avatar}/>
              </Link>
              <div className="follow-people-text">
                <div className="follow-people-text-user">
                  <Link to={`/${people.slug}`}>{`${people.first_name} ${people.last_name}`}</Link>
                </div>
                <div
                  className="follow-people-text-btn"
                  onClick={
                    !people.isFollowing ?
                      () => {
                        this.follow(people.id);
                      }
                      :
                      () => {
                        this.unfollow(people.id);
                      }
                  }>
                  {!people.isFollowing ? 'Follow' : 'Following'}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    );
  }
}

FollowBlock.propTypes = {
  whoToFollowList: PropTypes.array,
};
