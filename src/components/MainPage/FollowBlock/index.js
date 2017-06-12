import React, { Component } from 'react';
import { Link } from 'react-router';
import './index.scss';

class FollowBlock extends Component {
  render() {
    const { whoToFollowList } = this.props;
    return (
      <div className="follow-block">
        <div className="wrapper">
          <h3 className="title">Who to follow</h3>

          { whoToFollowList && whoToFollowList.map((people) => (
            <div key={people.id} className="follow-people">
              <Link to={`/${people.slug}`} className="follow-people-link-img">
                <img src={people.avatar}/>
                <div className="people-avatar-user-name">{`${people.first_name} ${people.last_name}`}</div>
              </Link>
              <div className="follow-people-text">
                <div className="follow-people-text-user">
                  <Link to={`/${people.slug}`}>{`${people.first_name} ${people.last_name}`}</Link>
                </div>
                <div className="follow-people-text-btn">
                  <a href="#">Follow</a>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    );
  }
}

export default FollowBlock;
