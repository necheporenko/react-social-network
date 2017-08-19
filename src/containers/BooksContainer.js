import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {getUser} from '../redux/modules/user';
import {load as loadBookTree, clearBookTree} from '../redux/modules/book';
import Navigation from '../components/Navigation';
import Books from '../components/Books';
import SubHeader from '../components/StoryLine/SubHeader';

@connect((state) => ({
  requestedUser: state.user.requestedUser,
  bookTreeArr: state.book.bookTreeArr,
  path: state.routing.locationBeforeTransitions.pathname,
  loaded: state.book.loaded,
}), {
  getUser,
  loadBookTree,
  clearBookTree
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
  }

  render() {
    const {requestedUser} = this.props;

    return (
      <div>
        <Helmet
          title={`${requestedUser.first_name} ${requestedUser.last_name} - Books`}
        />
        <SubHeader
          requestedUser={this.props.requestedUser}
        />
        <Navigation
          requestedUser={this.props.requestedUser}
        />
        <Books
          bookTreeArr={this.props.bookTreeArr}
          requestedUser={this.props.requestedUser}
          loaded={this.props.loaded}
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
