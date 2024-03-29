import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Link } from 'react-router';
import AddBook from '../components/Popup/AddBook';
import BooksTreeForSbox from '../components/BooksTree/BookTreeForSbox';
import { create as createBook, load as loadBookTree } from '../redux/modules/book';
import '../components/BooksTree/index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  bookTreeArr: state.book.bookTreeArr,
}), {
  loadBookTree,
  createBook,
})

export default class BooksTreeForSboxContainer extends Component {
  render() {
    return (
      <div className="bookstree">
        <div className={this.props.infoBlocksTop}>
          <BooksTreeForSbox
            bookTreeArr={this.props.bookTreeArr}
          />
          <div className="title-new-book" style={{marginLeft: '26px'}}>+ Create new book
            <AddBook />
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

BooksTreeForSboxContainer.propTypes = {
  children: PropTypes.element,
  infoBlocksTop: PropTypes.string,
  authorizedUser: PropTypes.object,
  bookTreeArr: PropTypes.array,
};
