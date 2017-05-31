import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Sbox from './Sbox';
import Post from './Post';
import './index.scss';


@connect((state) => ({
  over: state.book.over,
  pagination: state.book.pagination,
  book_slug: state.book.book_slug
}), {})

export default class BookStream extends Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
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

  render() {
    const { bookStories } = this.props;
    return (
      <div className="stream">
        <Sbox
          authorizedUser={this.props.authorizedUser}
          createStory={this.props.createStory}
          reloadStream={this.reloadStreamBook}
        />
        <InfiniteScroll
          loadMore={this.load}
          hasMore={true}
          threshold={50}
        >
          {bookStories && bookStories.map((story) => (
            <Post
              key={story.id}
              post={story.text}
              user={story.user}
              created={story.created}
              images={story.images}
            />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

BookStream.propTypes = {
  authorizedUser: PropTypes.object,
  createStory: PropTypes.func,
  bookStories: PropTypes.array,
  over: PropTypes.bool,
  nextBookStories: PropTypes.func,
  book_slug: PropTypes.string,
  pagination: PropTypes.number
};