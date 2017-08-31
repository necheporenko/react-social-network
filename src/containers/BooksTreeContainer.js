import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {create as createBook, load as loadBookTree} from '../redux/modules/book';
import BooksTree from '../components/BooksTree/index';
import AddBook from '../components/Popup/AddBook';
import '../components/BooksTree/index.scss';

@connect((state) => ({
  requestedUser: state.user.requestedUser,
  loaded: state.book.loaded,
}), {
  loadBookTree,
  createBook,
})

export default class BooksTreeContainer extends Component {
  render() {
    const {slug} = this.props.requestedUser;
    const {loaded, title} = this.props;

    return (
      <div className="bookstree">
        {loaded.loadedBookTree &&
        <div className={this.props.booksTreeTop}>
          <div className="bookstree-title"><span className="booktree-icon"/><Link to={`/${slug}/books`}>{title}</Link>
            <div className="title-new-book" style={{marginLeft: '10px', marginTop: '2px'}}>+ Create new book
              <AddBook/>
            </div>

          </div>
          <BooksTree
            bookTreeArr={this.props.bookTreeArr}
          />
          {/*<AddBook*/}
          {/*// loadBookTree={this.props.loadBookTree}*/}
          {/*// createBook={this.props.createBook}*/}
          {/*/>*/}
        </div>
        }
      </div>
    );
  }
}

BooksTreeContainer.propTypes = {
  loaded: PropTypes.object,
  booksTreeTop: PropTypes.string,
  requestedUser: PropTypes.object,
  bookTreeArr: PropTypes.array,
  // loadBookTree: PropTypes.func,
  // createBook: PropTypes.func,
};


BooksTreeContainer.defaultProps = {
  title: 'BOOKS'
};
