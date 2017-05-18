import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { getUser, getUserSlug, isPolling } from '../redux/modules/sign';
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
  activeUser: state.sign.activeUser,
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
          activeUser={this.props.activeUser}
        />
        <Navigation
          activeUser={this.props.activeUser}
        />
        <Books
          bookTreeArr={this.props.bookTreeArr}
        />
      </div>
    );
  }
}

BooksContainer.propTypes = {
  activeUser: PropTypes.object
};
