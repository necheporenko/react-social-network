import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {create as createBook, load as loadBookTree} from '../redux/modules/book';
import BooksTree from '../components/BooksTree/index';
import Loader from '../components/Common/Loader';
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
    const {loaded} = this.props;

    return (
      <div className="bookstree">
        {loaded.loadedBookTree ?
          <div className={this.props.booksTreeTop}>
            <div className="bookstree-title"><Link to={`/${slug}/books`}>BOOKS</Link></div>
            <BooksTree
              bookTreeArr={this.props.bookTreeArr}
            />
            {/*<AddBook*/}
            {/*// loadBookTree={this.props.loadBookTree}*/}
            {/*// createBook={this.props.createBook}*/}
            {/*/>*/}
          </div>
          :
          <Loader marginTop="36px"/>
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
