import React, {Component, PropTypes} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {getUserSlug} from '../../redux/modules/user';
import {
  getNextFollowers,
  loadPeopleFollowers,
  isLoadedFollowers,
  follow as followUser,
  unfollow as unfollowUser
} from '../../redux/modules/follow';
import PeopleMenu from './PeopleMenu';
import Loader from '../Common/Loader';
import './index.scss';

@connect((state) => ({
  pagination: state.follow.pagination.followers,
  followers: state.follow.followers,
  requestedUser: state.user.requestedUser,
  path: state.routing.locationBeforeTransitions.pathname,
  slug: state.user.requestedUser.slug,
  over: state.follow.over.followers,
  loaded: state.follow.loaded.loadedFollowers
}), {
  getNextFollowers,
  loadPeopleFollowers,
  isLoadedFollowers,
  followUser,
  unfollowUser,
  getUserSlug,
})

class PeopleFollowers extends Component {
  constructor() {
    super();
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    const {path} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    this.props.loadPeopleFollowers(findSlug);
  }

  follow(id) {
    this.props.followUser(id, 'followers');
  }

  unfollow(id) {
    this.props.unfollowUser(id, 'followers');
  }

  load() {
    const {over, slug, pagination, getNextFollowers} = this.props;

    if (!over) {
      getNextFollowers(slug, pagination);
    }
  }

  render() {
    const {followers, loaded, over, fixedBlocks} = this.props;
    const loader = <Loader marginTop="10px"/>;

    return (
      <div className="people contents">
        <PeopleMenu
          fixedBlocks={fixedBlocks}
        />
        <div 
          className="common-lists people-lists"
          style={{marginLeft: fixedBlocks ? 240 : null}}
        >
          {loaded 
            ? <InfiniteScroll
              loadMore={this.load}
              hasMore={true}
              threshold={50}
              loader={over ? null : loader}
            >
              <div className="wrapper">
                {followers.users && followers.users.map((people) => (
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

PeopleFollowers.propTypes = {
  followers: PropTypes.array,
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
  loadPeopleFollowers: PropTypes.func,
  path: PropTypes.string,
  requestedUser: PropTypes.object,
};

export default PeopleFollowers;
