import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { loadPeopleSuggested, isLoadedSuggested, follow as followUser } from '../../redux/modules/follow';
import PeopleMenu from './PeopleMenu';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (!isLoadedSuggested(getState())) {
      promises.push(dispatch(loadPeopleSuggested()));
    }
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  suggested: state.follow.suggested,
}), {
  loadPeopleSuggested,
  isLoadedSuggested,
  followUser,
})


class PeopleSuggested extends Component {
  constructor(props) {
    super(props);
    this.follow = this.follow.bind(this);
  }

  follow(id) {
    this.props.followUser(id);
  }

  render() {
    const { suggested } = this.props;

    return (
      <div className="people contents">

        <PeopleMenu />

        <div className="common-lists people-lists">
          <div className="wrapper">

            {suggested && suggested.map((people) => (
              <div key={people.id} className="people-card">
                <a href="#">
                  <img src="http://devianmbanks.validbook.org/cdn/460/avatar/90x90.jpg?t=1486723970" />
                  <div>{`${people.first_name} ${people.last_name}`}</div>
                </a>
                <div className="btn-following" onClick={() => this.follow(`${people.id}`)}>Follow <span></span></div>
              </div>
            ))}

          </div>
        </div>
      </div>
    );
  }
}
PeopleSuggested.propTypes = {
  suggested: PropTypes.array,
  followUser: PropTypes.func,
};

export default PeopleSuggested;
