import React, {Component, PropTypes} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {getUserSlug} from '../../redux/modules/user';
import {
  loadPeopleFollowing,
  getNextFollowing,
  isLoadedFollowing,
  follow as followUser,
  unfollow as unfollowUser
} from '../../redux/modules/follow';
import PeopleMenu from './PeopleMenu';
import Loader from '../Common/Loader';
import './index.scss';

@connect((state) => ({
  pagination: state.follow.pagination.following,
  following: state.follow.following,
  requestedUser: state.user.requestedUser,
  path: state.routing.locationBeforeTransitions.pathname,
  slug: state.user.requestedUser.slug,
  over: state.follow.over.following,
  loaded: state.follow.loaded.loadedFollowing
}), {
  loadPeopleFollowing,
  isLoadedFollowing,
  getNextFollowing,
  followUser,
  unfollowUser,
  getUserSlug,
})

class PeopleFollowing extends Component {
  constructor(props) {
    super(props);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    const {path} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    this.props.loadPeopleFollowing(findSlug);

    // if (findSlug !== requestedUser.slug) {
    //   this.props.loadPeopleFollowing(findSlug);
    // }
  }

  load() {
    const {over, slug, pagination, getNextFollowing} = this.props;
    if (!over) {
      console.log(over);
      getNextFollowing(slug, pagination);
    }
  }

  follow(id) {
    this.props.followUser(id, 'following');
  }

  unfollow(id) {
    this.props.unfollowUser(id, 'following');
  }

  render() {
    const {following, loaded, over} = this.props;
    const loader = <Loader marginTop="10px"/>;

    return (
      <div className="people contents">
        <PeopleMenu/>
        <div className="common-lists people-lists">
          {loaded 
            ? <InfiniteScroll
              loadMore={this.load}
              hasMore={true}
              threshold={50}
              loader={over ? null : loader}
            >
              <div className="wrapper">
                {following.users && following.users.map((people) => (
                  <div key={people.id} className="people-card">
                    <Link to={`/${people.slug}`}>
                      <img src={people.avatar}/>
                      <div>{`${people.first_name} ${people.last_name}`}</div>
                    </Link>
                    <div
                      className="btn-following"
                      onClick={people.is_follow 
                        ? () => this.unfollow(people.id)
                        : () => this.follow(people.id)
                      }>
                      <div>
                        {people.is_follow ? 'Following' : 'Follow'}
                      </div>
                      <span/>
                    </div>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
            : <Loader marginTop="52px"/>
          }
        </div>
      </div>
    );
  }
}

PeopleFollowing.propTypes = {
  following: PropTypes.array,
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
  loadPeopleFollowing: PropTypes.func,
  path: PropTypes.string,
  requestedUser: PropTypes.object,
};

export default PeopleFollowing;
