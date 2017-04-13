import React, { Component, PropTypes } from 'react';
import Demo from './Tree/index';
import AddBook from './addBook';
import './index.scss';

class BooksTree extends Component {
  render() {
    return (
      <div className="bookstree">
        <div className={this.props.infoBlocksTop}>
          <div className="bookstree-title"><a href="#">BOOKS</a></div>
          <Demo />
          <AddBook />
          {this.props.children}
        </div>
      </div>
    );
  }
}

BooksTree.propTypes = {
  children: PropTypes.element,
  infoBlocksTop: PropTypes.string
};

export default BooksTree;
