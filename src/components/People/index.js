import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {getUserSlug} from '../../redux/modules/user';
import {
  isLoadedFollowing,
  follow as followUser,
  unfollow as unfollowUser,
  loadPeopleAll
} from '../../redux/modules/follow';
import PeopleMenu from './PeopleMenu';
import './index.scss';

@connect((state) => ({
  following: state.follow.following,
  requestedUser: state.user.requestedUser,
  path: state.routing.locationBeforeTransitions.pathname,
  peopleAll: state.follow.peopleAll,
}), {
  isLoadedFollowing,
  followUser,
  unfollowUser,
  getUserSlug,
  loadPeopleAll
})

class People extends Component {
  constructor(props) {
    super(props);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }

  componentDidMount() {
    const {path} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    this.props.loadPeopleAll(findSlug);

    // if (findSlug !== requestedUser.slug) {
    //   this.props.loadPeopleFollowing(findSlug);
    // }
  }

  follow(id) {
    this.props.followUser(id, 'people');
    // .then(() => this.props.loadPeopleFollowing());
  }

  unfollow(id) {
    this.props.unfollowUser(id, 'people');
    // .then(() => this.props.loadPeopleFollowing());
  }

  render() {
    const {peopleAll} = this.props;

    return (
      <div className="people contents">

        <PeopleMenu/>

        <div className="common-lists people-lists">
          <div className="wrapper">

            {peopleAll && peopleAll.map(people => (
              <div key={people.id} className="people-card">
                <Link to={`/${people.slug}`}>
                  <img src={people.avatar}/>
                  <div>{`${people.first_name} ${people.last_name}`}</div>
                </Link>
                <div
                  className="btn-following"
                  onClick={
                    !people.is_follow ?
                      () => {
                        this.follow(people.id);
                      }
                      :
                      () => {
                        this.unfollow(people.id);
                      }
                  }>
                  <div>
                    {!people.is_follow ? 'Follow' : 'Following'}
                  </div>
                  <span/>
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>
    );
  }
}

People.propTypes = {
  peopleAll: PropTypes.array,
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
  loadPeopleAll: PropTypes.func,
  path: PropTypes.string,
  requestedUser: PropTypes.object,
};

export default People;
