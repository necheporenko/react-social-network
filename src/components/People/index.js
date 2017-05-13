import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { loadPeopleFollowing, isLoaded as isPeopleLoaded } from '../../redux/modules/follow';
import PeopleMenu from './PeopleMenu';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (!isPeopleLoaded(getState())) {
      promises.push(dispatch(loadPeopleFollowing()));
    }
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  following: state.follow.following,
}), {
  loadPeopleFollowing,
  isPeopleLoaded,
})

class People extends Component {
  render() {
    const { following } = this.props;

    return (
      <div className="people contents">

        <PeopleMenu />

        <div className="common-lists people-lists">
          <div className="wrapper">

            {following && following.map((people) => (
              <div key={people.id} className="people-card">
                <a href="#">
                  <img src="http://devianmbanks.validbook.org/cdn/460/avatar/90x90.jpg?t=1486723970" />
                  <div>{`${people.first_name} ${people.last_name}`}</div>
                </a>
                <div className="btn-following" onClick={() => this.follow(`${people.id}`)}>Unfollow <span></span></div>
              </div>
            ))}

          </div>
        </div>
      </div>
    );
  }
}

People.propTypes = {
  following: PropTypes.array,
};

export default People;
