import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AddBook from '../components/BooksTree/addBook';
import Demo from '../components/BooksTree/index';
import '../components/BooksTree/index.scss';

@connect((state) => ({
  user: state.sign.user,
}), {})

export default class BooksTreeContainer extends Component {
  render() {
    const { slug } = this.props.user;

    return (
      <div className="bookstree">
        <div className={this.props.infoBlocksTop}>
          <div className="bookstree-title"><Link to={`/${slug}/books`}>BOOKS</Link></div>
          <Demo />
          <AddBook />
          {this.props.children}
        </div>
      </div>
    );
  }
}

BooksTreeContainer.propTypes = {
  children: PropTypes.element,
  infoBlocksTop: PropTypes.string,
  user: PropTypes.object,
};
