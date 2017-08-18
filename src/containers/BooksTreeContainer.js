import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import BooksTree from '../components/BooksTree/index';
import {create as createBook, load as loadBookTree} from '../redux/modules/book';
import '../components/BooksTree/index.scss';

@connect((state) => ({
  requestedUser: state.user.requestedUser,
}), {
  loadBookTree,
  createBook,
})

export default class BooksTreeContainer extends Component {
  render() {
    console.log('Booktree');
    const {slug} = this.props.requestedUser;

    return (
      <div className="bookstree">
        <div className={this.props.booksTreeTop}>
          {this.props.bookTreeArr.length > 0 &&
          <div className="bookstree-title"><Link to={`/${slug}/books`}>BOOKS</Link></div>}
          <BooksTree
            bookTreeArr={this.props.bookTreeArr}
          />
          {/*<AddBook*/}
          {/*// loadBookTree={this.props.loadBookTree}*/}
          {/*// createBook={this.props.createBook}*/}
          {/*/>*/}
          {/*{this.props.children}*/}
        </div>
      </div>
    );
  }
}

BooksTreeContainer.propTypes = {
  // children: PropTypes.element,
  booksTreeTop: PropTypes.string,
  requestedUser: PropTypes.object,
  bookTreeArr: PropTypes.array,
  // loadBookTree: PropTypes.func,
  // createBook: PropTypes.func,
};
