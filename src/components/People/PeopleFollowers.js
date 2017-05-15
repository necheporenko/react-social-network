import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { loadPeopleFollowers, isLoadedFollowers } from '../../redux/modules/follow';
import PeopleMenu from './PeopleMenu';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (!isLoadedFollowers(getState())) {
      promises.push(dispatch(loadPeopleFollowers()));
    }
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  suggested: state.follow.suggested,
}), {
  loadPeopleFollowers,
  isLoadedFollowers,
})

class PeopleFollowers extends Component {
  render() {
    const { followers } = this.props;

    return (
      <div className="people contents">

        <PeopleMenu />

        <div className="common-lists people-lists">
          <div className="wrapper">

            {followers && followers.map((people) => (
              <div key={people.id} className="people-card">
                <a href="#">
                  <img src="http://devianmbanks.validbook.org/cdn/460/avatar/90x90.jpg?t=1486723970" />
                  <div>{`${people.first_name} ${people.last_name}`}</div>
                </a>
                <div className="btn-following">Follow <span></span></div>
              </div>
            ))}

          </div>
        </div>
      </div>
    );
  }
}

PeopleFollowers.propTypes = {
  followers: PropTypes.array,
  // followUser: PropTypes.func,
};

export default PeopleFollowers;
