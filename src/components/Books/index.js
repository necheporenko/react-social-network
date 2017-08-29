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
      <div className="coverBook" style={{background: `url(${requestedUser.cover})`}}/>
      {/*<div className="authorUser">*/}
      {/*<img src={requestedUser.avatar72} alt=""/>*/}
      {/*<h5>{`${requestedUser.first_name} ${requestedUser.last_name}`}</h5>*/}
      {/*</div>*/}

      <div className="title-infoblocks-book">
        <h5>{name}</h5>
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

      <div className="book-info">
        <ul className="book-info-list">
          <li className="book-icon-visibility"></li>
          <li className="book-icon-stories">5</li>
          <li className="book-icon-subbooks">3</li>
          <li className="book-icon-followers">1</li>
        </ul>
        {/*<hr />*/}
      </div>

      {/*<div className="book-description">*/}
      {/*<p>Description...</p>*/}
      {/*</div>*/}

      <div className="book-subbooks">
        {bookTreeArr && bookTreeArr.length > 0 &&
        <BooksTreeContainer
          bookTreeArr={bookTreeArr}
        />
        }

        {bookTreeArr && bookTreeArr.length === 0 &&
        <ul className="react-tree">
          <li className={`icon_${icon}`}>
            <div className="react-tree-item-label">
              <span className=" draggable " draggable="true">
                <Link to={`/${requestedUser.slug}/books/${book_slug}`}>{name}</Link>
              </span>
            </div>
          </li>
        </ul>
        }
      </div>

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
          <BooksTreeContainer
            bookTreeArr={bookTreeArr}
          />
          {/*<div className="title-new-book" style={{marginLeft: '26px'}}>+ Create new book*/}
          {/*<AddBook/>*/}
          {/*</div>*/}

        </div>

        <div className="wrapper">
          <StackGrid
            //monitorImagesLoaded
            columnWidth={300}
            duration={600}
            gutterWidth={10}
            gutterHeight={10}
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
