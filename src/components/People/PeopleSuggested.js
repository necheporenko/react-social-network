import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { loadPeopleSuggested, isLoaded as isPeopleLoaded } from '../../redux/modules/follow';
import { PEOPLES_SUGGESTED } from '../../constants/peoples';
import PeopleMenu from './PeopleMenu';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (!isPeopleLoaded(getState())) {
      promises.push(dispatch(loadPeopleSuggested()));
    }
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  suggested: state.follow.suggested,
}), {
  loadPeopleSuggested,
  isPeopleLoaded
})

class PeopleSuggested extends Component {
  render() {
    const { suggested } = this.props;

    return (
      <div className="people contents">

        <PeopleMenu />

        <div className="common-lists people-lists">
          <div className="wrapper">

            {suggested && suggested.map((people, index) => (
              <div key={index} className="people-card">
                <a href="#">
                  <img src="http://devianmbanks.validbook.org/cdn/460/avatar/90x90.jpg?t=1486723970" />
                  <div>{people.first_name}</div>
                </a>
                <div className="btn-following">Following <span></span></div>
              </div>
            ))}

          </div>
        </div>
      </div>
    );
  }
}
PeopleSuggested.propTypes = {
  suggested: PropTypes.array
};

export default PeopleSuggested;
