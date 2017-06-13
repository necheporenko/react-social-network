import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { getUser, getUserSlug, isPolling } from '../redux/modules/user';
import { create as createBook, load as loadBookTree } from '../redux/modules/book';
import Navigation from '../components/Navigation';
import Books from '../components/Books';
import SubHeader from '../components/StoryLine/SubHeader';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    promises.push(dispatch(getUser(getUserSlug(getState()))));
    promises.push(dispatch(loadBookTree(getUserSlug(getState()))));

    return Promise.all(promises);
  }
}])

@connect((state) => ({
  requestedUser: state.user.requestedUser,
  bookTreeArr: state.book.bookTreeArr,
}), {
  getUser,
  getUserSlug,
  loadBookTree,
})

export default class BooksContainer extends Component {
  render() {
    return (
      <div>
        <SubHeader
          requestedUser={this.props.requestedUser}
        />
        <Navigation
          requestedUser={this.props.requestedUser}
        />
        <Books
          bookTreeArr={this.props.bookTreeArr}
          requestedUser={this.props.requestedUser}
        />
      </div>
    );
  }
}

BooksContainer.propTypes = {
  requestedUser: PropTypes.object
};
