import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {getUser} from '../redux/modules/user';
import {load as loadBookTree, clearBookTree, getBooks, showSubBooksCurrentBook} from '../redux/modules/book';
import Books from '../components/Books';

@connect((state) => ({
  requestedUser: state.user.requestedUser,
  bookTreeArr: state.book.bookTreeArr,
  path: state.routing.locationBeforeTransitions.pathname,
  loaded: state.book.loaded,
  subBooksArr: state.book.subBooksArr,
}), {
  getUser,
  loadBookTree,
  clearBookTree,
  getBooks,
  showSubBooksCurrentBook,
})

export default class BooksContainer extends Component {
  componentDidMount() {
    const {path, requestedUser} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));

    if (findSlug !== requestedUser.slug) {
      this.props.clearBookTree();
      this.props.getUser(findSlug);
    }

    this.props.loadBookTree(findSlug);
    this.props.getBooks(findSlug);
  }

  render() {
    const {requestedUser, router, bookTreeArr, loaded, fixedBlocks, subBooksArr, getBooks, showSubBooksCurrentBook} = this.props;

    return (
      <div>
        <Helmet
          title={`${requestedUser.first_name} ${requestedUser.last_name} - Books`}
        />
        <Books
          bookTreeArr={bookTreeArr}
          requestedUser={requestedUser}
          loaded={loaded}
          history={router}
          subBooksArr={subBooksArr}
          fixedBlocks={fixedBlocks}
          getBooks={getBooks}
          showSubBooksCurrentBook={showSubBooksCurrentBook}
        />
      </div>
    );
  }
}

BooksContainer.propTypes = {
  requestedUser: PropTypes.object,
  bookTreeArr: PropTypes.array,
  loadBookTree: PropTypes.func,
  clearBookTree: PropTypes.func,
  loaded: PropTypes.object,
  getUser: PropTypes.func,
  path: PropTypes.string,
};
