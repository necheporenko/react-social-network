import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { like as likePostBook } from '../../../redux/modules/book';
import Sbox from './Sbox';
import Post from './Post';
import './index.scss';


@connect((state) => ({
  over: state.book.over,
  pagination: state.book.pagination,
  book_slug: state.book.book_slug,
  isAuthenticated: state.user.isAuthenticated,
}), {
  likePostBook
})

export default class BookStream extends Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.like = this.like.bind(this);
    this.reloadStreamBook = this.reloadStreamBook.bind(this);
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

  render() {
    const { bookStories, authorizedUser, requestedUser, isAuthenticated } = this.props;
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
      <div className="stream">
        { isAuthenticated && authorizedUser.id === requestedUser.id &&
          <Sbox
            authorizedUser={this.props.authorizedUser}
            createStory={this.props.createStory}
            reloadStream={this.reloadStreamBook}
          />
        }
        <InfiniteScroll
          loadMore={this.load}
          hasMore={true}
          threshold={50}
          loader={loader}
        >
          {bookStories && bookStories.map((story) => (
            <Post
              key={story.id}
              id={story.id}
              post={story.text}
              user={story.user}
              created={story.created}
              images={story.images}
              likes={story.likes}
              books={story.books}
              likeFunc={this.like}
            />
          ))}
        </InfiniteScroll>
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
};
