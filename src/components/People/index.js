import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {getUserSlug} from '../../redux/modules/user';
import {
  isLoadedFollowing,
  follow as followUser,
  unfollow as unfollowUser,
  loadPeopleAll,
  getNextPeople
} from '../../redux/modules/follow';
import PeopleMenu from './PeopleMenu';
import Loader from '../Common/Loader';
import UserItem from './UserItem';
import './index.scss';

@connect((state) => ({
  pagination: state.follow.pagination.allPeople,
  following: state.follow.following,
  requestedUser: state.user.requestedUser,
  path: state.routing.locationBeforeTransitions.pathname,
  peopleAll: state.follow.peopleAll,
  slug: state.user.requestedUser.slug,
  over: state.follow.over.allPeople,
  loaded: state.follow.loaded.loadedAllPeople
}), {
  isLoadedFollowing,
  followUser,
  unfollowUser,
  getUserSlug,
  loadPeopleAll,
  getNextPeople
})

class People extends Component {
  constructor(props) {
    super(props);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    const {path} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    this.props.loadPeopleAll(findSlug);
  }
  
  load() {
    if (!this.props.over) {
      this.props.getNextPeople(this.props.slug, this.props.pagination);
    }
  }

  follow(id) {
    this.props.followUser(id, 'peopleAll');
  }

  unfollow(id) {
    this.props.unfollowUser(id, 'peopleAll');
  }

  render() {
    const {peopleAll, loaded, over, fixedBlocks} = this.props;
    const loader = <Loader/>;
    console.log('people', peopleAll);

    return (
      <div className="people contents">

        <PeopleMenu
          fixedBlocks={fixedBlocks}
        />

        <div 
          className="common-lists people-lists" 
          style={{marginLeft: fixedBlocks ? 240 : null}}
        >
          {loaded &&
            <InfiniteScroll
              loadMore={this.load}
              hasMore={true}
              threshold={50}
              loader={over ? null : loader}
            >
              <div className="wrapper">
                {peopleAll && peopleAll.map(user => (
                  <UserItem
                    key={user.id}
                    user={user}
                    unfollowUserHandler={this.unfollow}
                    followUserHandler={this.follow}
                  />
                ))}
              </div>
            </InfiniteScroll>
          }
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
