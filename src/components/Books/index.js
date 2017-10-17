import React, {Component} from 'react';
import {Link} from 'react-router';
import BooksTreeContainer from '../../containers/BooksTreeContainer';
import InfiniteScroll from 'react-infinite-scroller';
import EditBook from '../../components/BooksTree/EditBook';
import AddBook from '../Popup/AddBook';
import Loader from '../Common/Loader';
import './index.scss';

const BookCard = ({book, history, requestedUser, getBooks}) => {
  const {name, key, cover, children, counts} = book;

  const onBookClick = (e) => {
    e.preventDefault();
  };

  const showSubBooks = (e, slug, book_slug) => {
    e.preventDefault();
    getBooks(slug, book_slug);
  };

  return (
    <Link to={`${location}/${key}`} className={counts && counts.sub_books > 0 ? 'book book-with-subbooks' : 'book'}>

      <div
        className="coverBook"
        style={{
          backgroundColor: cover && cover.color ? `#${cover.color}` : '#fff',
          backgroundImage: cover && cover.picture_small ? `url(${cover.picture_small})` : null
        }}
      />

      <div className="authorUser">
        <img src={requestedUser.avatar48} alt=""/>
      </div>

      <div onClick={onBookClick} className="book-edit">
        <EditBook
          book_name={name}
          book_slug={key}
        />
      </div>

      <div className="title-infoblocks-book">
        <div className="book-name">{name}</div>
        <div className="book-author">{`${requestedUser.first_name} ${requestedUser.last_name}`}</div>
      </div>

      {/*<div className="book-quantity">*/}
      {/*<span>2 subbooks</span>*/}
      {/*</div>*/}

      <div className="book-info">
        <ul>
          <li><span>{counts ? counts.followers : 0}</span><i className="followers-icon-sm"/></li>
          <li>·<span>{counts ? counts.stories : 0}</span><i className="stories-icon-sm"/></li>
          <li>·<span>{counts ? counts.images : 0}</span><i className="photos-icon-sm"/></li>
          <li className="subbooks-btn" onClick={(e) => showSubBooks(e, requestedUser.slug, key)}>
            ·<span>{counts ? counts.sub_books : 0}</span><i className="subbooks-icon-sm"/></li>
        </ul>
        {/*<hr />*/}
      </div>
      <div className="btn-following btn-following-book">
        <div>Following Book</div>
        <span/>
      </div>

      {/*<div className="book-description">*/}
      {/*<p>Description...</p>*/}
      {/*</div>*/}

      {/*<div className="book-subbooks">*/}
      {/*{bookTreeArr && bookTreeArr.length > 0 &&*/}
      {/*<BooksTreeContainer*/}
      {/*bookTreeArr={bookTreeArr}*/}
      {/*/>*/}
      {/*}*/}

      {/*{bookTreeArr && bookTreeArr.length === 0 &&*/}
      {/*<ul className="react-tree">*/}
      {/*<li className={`icon_${icon}`}>*/}
      {/*<div className="react-tree-item-label">*/}
      {/*<span className=" draggable " draggable="true">*/}
      {/*<Link to={`/${requestedUser.slug}/books/${book_slug}`}>{name}</Link>*/}
      {/*</span>*/}
      {/*</div>*/}
      {/*</li>*/}
      {/*</ul>*/}
      {/*}*/}
      {/*</div>*/}

    </Link>
  );
};

class Books extends Component {
  render() {
    const {bookTreeArr, requestedUser, loaded, history, fixedBlocks, subBooksArr, getBooks, showSubBooksCurrentBook} = this.props;
    const loader = <Loader/>;

    return (
      loaded.loadedBookTree &&
      <div className="books contents">
        <div
          className="sidebar-books"
          style={{
            position: fixedBlocks ? 'fixed' : null,
            top: fixedBlocks ? 118 : null
          }}>
          <div className="sidebar">
            <ul>
              {/*<Link*/}
              {/*onlyActiveOnIndex={true}*/}
              {/*to={`/${requestedUser.slug}/books`}*/}
              {/*activeClassName="active"*/}
              {/*onClick={() => getBooks(requestedUser.slug)}*/}
              {/*>*/}
              {/*<li>Primary Books</li>*/}
              {/*</Link>*/}
            </ul>
          </div>
          <BooksTreeContainer
            bookTreeArr={bookTreeArr}
            title="Primary Books"
          />
          {/*<div className="title-new-book" style={{marginLeft: '26px'}}>+ Create new book*/}
          {/*<AddBook/>*/}
          {/*</div>*/}

        </div>
        <div
          className="common-lists"
          style={{marginLeft: fixedBlocks ? 240 : null}}
        >
          {loaded.loadedBooks && subBooksArr[0].children.length > 0 && subBooksArr[0].name !== 'root' &&
          <div className="subbooks-title">{subBooksArr[0].name} > Subbooks</div>
          }
          <InfiniteScroll
            hasMore={true}
            threshold={50}
            loader={loader}
          >
            <div className="wrapper">
              {loaded.loadedBooks && subBooksArr[0].children.length > 0 && subBooksArr[0].children.map(book => (
                <BookCard
                  key={book.key}
                  book={book}
                  history={history}
                  requestedUser={requestedUser}
                  getBooks={getBooks}
                />
              ))}
            </div>
          </InfiniteScroll>

        </div>
      </div>
    );
  }
}

export default Books;
