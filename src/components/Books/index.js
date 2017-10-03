import React, {Component} from 'react';
import {Link} from 'react-router';
import BooksTreeContainer from '../../containers/BooksTreeContainer';
import InfiniteScroll from 'react-infinite-scroller';
import EditBook from '../../components/BooksTree/EditBook';
import AddBook from '../Popup/AddBook';
import Loader from '../Common/Loader';
import './index.scss';

const BookCard = ({book, history, requestedUser}) => {
  const {name, key, cover, children} = book;

  const onBookClick = (e) => {
    e.preventDefault();
  };

  return (
    <Link to={`${location}/${key}`} className="book">

      <div
        className="coverBook"
        style={{
          backgroundColor: cover && cover.color ? `#${cover.color}` : '#fff',
          backgroundImage: cover && cover.picture ? `url(${cover.picture})` : null
        }}
      />

      <div className="authorUser">
        <img src={requestedUser.avatar32} alt=""/>
      </div>

      <div className="title-infoblocks-book">
        <div>
          <div className="book-name">{name}</div>
          <div className="book-author">{`${requestedUser.first_name} ${requestedUser.last_name}`}</div>
        </div>
        <div onClick={onBookClick} className="book-edit">
          <EditBook
            book_name={name}
            book_slug={key}
          />
        </div>
      </div>

      {/*<div className="book-quantity">*/}
      {/*<span>2 subbooks</span>*/}
      {/*</div>*/}

      <div className="book-info">
        <ul>
          <li><i className="infobook-icon-visibility"/><span>0</span><i className="stories-icon-sm"/>·</li>
          <li><span>{children ? children.length : 0}</span><i className="subbooks-icon-sm"/>·</li>
          <li><span>0</span><i className="followers-icon-sm"/>·</li>
          <li><span>0</span><i className="photos-icon-sm"/></li>
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
    const {bookTreeArr, requestedUser, loaded, history} = this.props;
    const loader = <Loader marginTop="10px"/>;

    return (
      loaded.loadedBookTree &&
      <div className="books contents">
        <div className="sidebar-books">
          <div className="sidebar">
            <ul>
              <Link onlyActiveOnIndex={true} to={`/${requestedUser.slug}/books`} activeClassName="active">
                <li>All books</li>
              </Link>
            </ul>
          </div>
          <BooksTreeContainer
            bookTreeArr={bookTreeArr}
            title="ALL BOOKS"
          />
          {/*<div className="title-new-book" style={{marginLeft: '26px'}}>+ Create new book*/}
          {/*<AddBook/>*/}
          {/*</div>*/}

        </div>
        <div className="common-lists">
          {true 
            ? <InfiniteScroll
              hasMore={true}
              threshold={50}
              loader={loader}
            >
              <div className="wrapper">
                {bookTreeArr[0].children.map(book => (
                  <BookCard
                    key={book.key}
                    book={book}
                    history={history}
                    requestedUser={requestedUser}
                  />
                ))}
              </div>
            </InfiniteScroll>
            : <Loader marginTop="52px"/>
          }
        </div>
      </div>
    );
  }
}

export default Books;
