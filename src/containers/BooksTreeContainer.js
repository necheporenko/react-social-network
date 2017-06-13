import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Link } from 'react-router';
import BooksTree from '../components/BooksTree/index';
import { create as createBook, load as loadBookTree } from '../redux/modules/book';
import '../components/BooksTree/index.scss';

// @asyncConnect([{
//   promise: ({ store: { dispatch, getState } }) => {
//     const promises = [];
//     return Promise.all(promises);
//   }
// }])

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
}), {
  loadBookTree,
  createBook,
})

export default class BooksTreeContainer extends Component {
  render() {
    const { slug } = this.props.authorizedUser;

    return (
      <div className="bookstree">
        <div className={this.props.infoBlocksTop}>
          <div className="bookstree-title"><Link to={`/${slug}/books`}>BOOKS</Link></div>
          <BooksTree
            bookTreeArr={this.props.bookTreeArr}
          />
          {/*<AddBook*/}
            {/*// loadBookTree={this.props.loadBookTree}*/}
            {/*// createBook={this.props.createBook}*/}
          {/*/>*/}
          {this.props.children}
        </div>
      </div>
    );
  }
}

BooksTreeContainer.propTypes = {
  children: PropTypes.element,
  infoBlocksTop: PropTypes.string,
  authorizedUser: PropTypes.object,
  bookTreeArr: PropTypes.array,
  loadBookTree: PropTypes.func,
  createBook: PropTypes.func,
};
