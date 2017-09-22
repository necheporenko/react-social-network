import React, {Component} from 'react';
import {Link} from 'react-router';
import StackGrid from 'react-stack-grid';
import BooksTreeContainer from '../../containers/BooksTreeContainer';
import EditBook from '../../components/BooksTree/EditBook';
import AddBook from '../Popup/AddBook';
import './index.scss';

const BookCard = ({name, bookTreeArr, book_slug, icon, requestedUser}) => {
  return (
    <div className="book">
      <div
        className="coverBook"
        style={{
          backgroundColor: requestedUser.cover && requestedUser.cover.color ? `#${requestedUser.cover.color}` : '#fff',
          backgroundImage: requestedUser.cover && requestedUser.cover.picture ? `url(${requestedUser.cover.picture})` : null
        }}
      />
      <div className="authorUser">
        <img src={requestedUser.avatar32} alt=""/>
      </div>

      <div className="title-infoblocks-book">
        <h5>{name}</h5>
        <h6 style={{margin: '5px 0', fontWeight: 400}}>{`${requestedUser.first_name} ${requestedUser.last_name}`}</h6>
      </div>

      <div className="book-edit">
        <i>
          <EditBook
            book_name={name}
            book_slug={book_slug}
          />
        </i>
      </div>

      {/*<div className="book-quantity">*/}
      {/*<span>2 subbooks</span>*/}
      {/*</div>*/}

      <div className="book-info" style={{margin: '5px 0'}}>
        <ul className="book-info-list" style={{marginLeft: '-3px'}}>
          <li><i className="infobook-icon-visibility"/><span>0</span><i className="stories-icon-sm"/>·</li>
          <li><span>0</span><i className="subbooks-icon-sm"/>·</li>
          <li><span>0</span><i className="followers-icon-sm"/>·</li>
          <li><span>0</span><i className="photos-icon-sm"/></li>
        </ul>
        {/*<hr />*/}
      </div>
      <div className="btn-following btn-following-book" style={{margin: '5px 0', left: '55px'}}>
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

    </div>
  );
};

class Books extends Component {
  render() {
    const {bookTreeArr, requestedUser, loaded} = this.props;

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

        <div className="wrapper">
          <StackGrid
            //monitorImagesLoaded
            columnWidth={210}
            duration={600}
            gutterWidth={20}
            gutterHeight={30}
            //easing={easings.cubicOut}
            //appearDelay={60}
            // appear={transition.appear}
            // appeared={transition.appeared}
            // enter={transition.enter}
            // entered={transition.entered}
            //leaved={transition.leaved}
          >
            {bookTreeArr[0].children.map((book) => (
              <BookCard
                key={book.key}
                name={book.name}
                book_slug={book.key}
                icon={book.icon}
                bookTreeArr={book.children}
                requestedUser={requestedUser}
              />
            ))
            }
          </StackGrid>
        </div>
      </div>
    );
  }
}

export default Books;
