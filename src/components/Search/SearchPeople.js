import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { searchUser } from '../../redux/modules/search';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(searchUser(getState())));
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  query: state.search.query,
  foundUsers: state.search.foundUsers,
}), {
  searchUser
})

class SearchPeople extends Component {
  render() {
    const { foundUsers } = this.props;
    return (
      <div className="people page-bg">
        <div className="people-lists">
          <div className="wrapper" style={{marginTop: '25px'}}>

            {foundUsers && foundUsers.map((people) => (
              <div key={people.id} className="people-card">
                <Link to={`/${people.slug}`}>
                  <img src={people.avatar} />
                  <div>{`${people.first_name} ${people.last_name}`}</div>
                </Link>

                <div
                  className="btn-following"
                >
                  <div>
                    Following
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

export default SearchPeople;
