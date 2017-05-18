import React, { Component } from 'react';
//import StackGrid, { transition, easings } from "react-stack-grid";
import StackGrid from 'react-stack-grid';
import BookTree from '../../containers/BooksTreeContainer';
//import {BOOKS} from '../../constants/books';
import './index.scss';

const TestBook = () => {
  return (
    <div className="book">
      <div className="title-infoblocks-book">
        <h5>Book</h5>
      </div>
      <div className="book-info">
        <ul className="book-info-list">
          <li className="book-icon-visibility"></li>
          <li className="book-icon-stories">5</li>
          <li className="book-icon-subbooks">3</li>
          <li className="book-icon-followers">1</li>
        </ul>
        <hr />
      </div>
      <div className="book-description">
        <p>Description...</p>
      </div>
      <div className="book-quantity">
        <span>2 subbooks</span>
      </div>
      <div className="book-subbooks">
        <BookTree />
      </div>
      <div className="book-btn">Edit</div>
    </div>
  );
};

class Books extends Component {
  render() {
    return (
      <div className="books contents">
        <div className="sidebar-books">
          <BookTree
            bookTreeArr={this.props.bookTreeArr}
          />
        </div>

        <div className="wrapper">
          <StackGrid
            //monitorImagesLoaded
            columnWidth={180}
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

            {/* <div key="key1">Item 1</div>
            <div key="key2">Item 2</div>
            <div key="key3">Item 3</div> */}

            {/* {BOOKS.map((book, index) => (
            <div key={index} className="book">
              <div className="book-title">{book.title}</div>
              <div className="book-content">{book.content}</div>
              <div className="book-btn">Edit</div>
            </div>
          ))} */}

            <TestBook />
            <TestBook />
            <TestBook />
            <TestBook />
            <TestBook />
            <TestBook />
            <TestBook />
            <TestBook />
            <TestBook />
            <TestBook />
            <TestBook />

          </StackGrid>
        </div>
      </div>
    );
  }
}

export default Books;
