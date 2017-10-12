import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {
  like as likePostBook,
  viewMoreComments as viewMoreCommentsBook,
  createComment as createCommentBook,
  createStory as createStoryBook,
} from '../../../redux/modules/book';
import Sbox from './Sbox';
import Post from '../Post/index';
import Loader from '../../Common/Loader';
import './index.scss';

@connect((state) => ({
  over: state.book.over,
  pagination: state.book.pagination,
  book_slug: state.book.book_slug,
  isAuthenticated: state.user.isAuthenticated,
  loaded: state.book.loaded,
}), {
  likePostBook,
  viewMoreCommentsBook,
  createCommentBook,
  createStoryBook,
})

export default class BookStream extends Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.like = this.like.bind(this);
    this.showMoreComments = this.showMoreComments.bind(this);
    this.reloadStreamBook = this.reloadStreamBook.bind(this);
    this.createComment = this.createComment.bind(this);
    this.createStory = this.createStory.bind(this);
  }

  load() {
    if (!this.props.over) {
      this.props.nextBookStories(this.props.book_slug, this.props.pagination);
    }
  }

  reloadStreamBook() {
    this.props.showBookStories(this.props.book_slug);
  }

  like(id) {
    this.props.likePostBook(id);
  }

  createComment(entity_id, content, parent_id, user) {
    this.props.createCommentBook(entity_id, content, parent_id, user);
  }

  createStory(data, arrCheckbox, files) {
    this.props.createStoryBook(data, arrCheckbox, files);
  }

  showMoreComments(id, paginationComment) {
    this.props.viewMoreCommentsBook(id, paginationComment);
  }

  render() {
    const {bookStories, authorizedUser, requestedUser, isAuthenticated, loaded} = this.props;
    const loader = (
      <div className="wrapper-loader">
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        </div>
      </div>
    );

    return (
      <div className="stream" style={{marginLeft: 0}}>
        {isAuthenticated && authorizedUser.id === requestedUser.id &&
        <Sbox
          authorizedUser={this.props.authorizedUser}
          createStoryFunc={this.createStory}
          reloadStream={this.reloadStreamBook}
        />
        }

        {loaded.loadedBookStories ?
          <InfiniteScroll
            loadMore={this.load}
            hasMore={true}
            threshold={50}
            loader={loader}
          >
            {bookStories && bookStories.map((story) => (
              <Post
                key={story.id}
                story={story}
                likeFunc={this.like}
                showMoreCommentsFunc={this.showMoreComments}
                authorizedUser={this.props.authorizedUser}
                requestedUser={this.props.requestedUser}
                createCommentFunc={this.createComment}
              />
            ))}
          </InfiniteScroll>
          :
          <Loader marginTop="52px"/>
        }
      </div>
    );
  }
}

BookStream.propTypes = {
  authorizedUser: PropTypes.object,
  requestedUser: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  createStory: PropTypes.func,
  bookStories: PropTypes.array,
  over: PropTypes.bool,
  nextBookStories: PropTypes.func,
  book_slug: PropTypes.string,
  pagination: PropTypes.number,
  likePostBook: PropTypes.func,
  showBookStories: PropTypes.func,
  viewMoreCommentsBook: PropTypes.func,
};
