import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AddBook from './addBook';
import Demo from './Tree/index';
import './index.scss';

class BooksTree extends Component {
  render() {
    const { first_name, last_name } = this.props.userInfo;
    const link = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;

    return (
      <div className="bookstree">
        <div className={this.props.infoBlocksTop}>
          <div className="bookstree-title"><Link to={`${link}/books`}>BOOKS</Link></div>
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
  infoBlocksTop: PropTypes.string,
  userInfo: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo
  };
}

export default connect(mapStateToProps, null)(BooksTree);
