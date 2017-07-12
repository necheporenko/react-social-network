import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Form, RadioGroup } from 'formsy-react-components';
import { ButtonToolbar, DropdownButton } from 'react-bootstrap';
import { getUser, getUserSlug } from '../../redux/modules/user';
import { create as createBook, load as loadBookTree, show as showBookStories, next as nextBookStories, getBookSlug } from '../../redux/modules/book';
import BooksTreeContainer from '../../containers/BooksTreeContainer';
import BookStream from '../StoryLine/Stream/BookStream';
import Photos from '../StoryLine/InfoBlocks/Photos';
import SubHeader from '../StoryLine/SubHeader/index';
import NavigationBookPage from '../Navigation/NavigationBookPage';
import './index.scss';

const radioOptions = [
       {value: 'a', label: 'only you'},
       {value: 'b', label: 'anyone'},
       {value: 'c', label: 'specific people'}
];

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(getUser(getUserSlug(getState()))));
    promises.push(dispatch(loadBookTree(getUserSlug(getState()))));
    promises.push(dispatch(showBookStories(getBookSlug(getState()))));
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
  bookTreeArr: state.book.bookTreeArr,
  bookStories: state.book.bookStories,
  bookPageName: state.book.bookPage.name,
  book_slug: state.book.book_slug,
}), {
  nextBookStories,
  showBookStories
})

export default class BookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    const scrollTop = e.srcElement.body.scrollTop;
    //console.log(scrollTop);
    this.setState({ scrollTop: scrollTop });
  }

  render() {
    const { scrollTop } = this.state;
    const scroll = () => {
      let Nav;
      let booksTreeTop;
      let displayUser;

      if (scrollTop <= 275) {
        Nav = 'navigation';
        booksTreeTop = 'wrapper';
        displayUser = 'navigation-infouser-none';
      } else {
        Nav = 'navigation navigation-fixed';
        booksTreeTop = 'wrapper wrapper-fixed';
        displayUser = 'navigation-infouser';
      }
      const result = { booksTree: booksTreeTop, show: displayUser, posTop: Nav };
      return result;
    };
    const chooseScroll = scroll();
    const bookPageName = this.props.bookPageName;
    const { slug, first_name, last_name, avatar32 } = this.props.requestedUser;
    return (
      <div>
        <SubHeader
          requestedUser={this.props.requestedUser}
        />
        <div className={chooseScroll.posTop}>
          <div className="navigation-wrap book-nav">
            <ul>
              <li><Link to={`/${slug}/books`}>Books</Link></li>
              <li>
                <svg x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" focusable="false" fill="#7d7d7d">
                  <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
                </svg>
              </li>
              <li>
                <Link to={`/${slug}/${bookPageName}`}>
                  {bookPageName}
                </Link>
              </li>
            </ul>
          </div>
          <NavigationBookPage
            userName={`${first_name} ${last_name}`}
            avatar32={avatar32}
            link={`/${slug}`}
            displayUser={chooseScroll.show}
          />
        </div>


        <div className="book-page">
          <div className="storyLine">
            <div className="wrap-storyLine">

              <BooksTreeContainer
                bookTreeArr={this.props.bookTreeArr}
                booksTreeTop={chooseScroll.booksTree}
              />
              <BookStream
                authorizedUser={this.props.authorizedUser}
                requestedUser={this.props.requestedUser}
                book_slug={this.props.book_slug}
                bookStories={this.props.bookStories}
                nextBookStories={this.props.nextBookStories}
                showBookStories={this.props.showBookStories}
              />

              <div className="infobloks">
                <div className="infobloks-book">
                  <div className="title">
                    <h5>{bookPageName}</h5>
                    <div className="btn-following">Following <span></span></div>
                  </div>
                  <div className="book-info">
                    <ul>
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

                  </div>

                  <div className="book-settings">
                    <div className="book-settings-access">

                      <i></i>
                      <ButtonToolbar>
                        <DropdownButton className="bootstrap-pure-btn" title="Access settings" >

                          <Form
                            rowClassName={[{'form-group': false}, {row: false}]}
                              >
                            <RadioGroup
                              name="radioGrp1"
                              value="b"
                              label="Who can see that book exists?"
                              labelClassName={[{'col-sm-3': false}, 'book-list-label']}
                              elementWrapperClassName={[{'col-sm-9': false}, 'book-element-wrapper']}
                              options={radioOptions}
                                />
                            <RadioGroup
                              name="radioGrp1"
                              value="b"
                              label="Who can see that book exists?"
                              labelClassName={[{'col-sm-3': false}, 'book-list-label']}
                              elementWrapperClassName={[{'col-sm-9': false}, 'book-element-wrapper']}
                              options={radioOptions}
                                />
                          </Form>

                        </DropdownButton>
                      </ButtonToolbar>

                    </div>
                    <div className="book-settings-edit">
                      <a href="#">
                        <i></i>
                        Edit book
                      </a>
                    </div>
                  </div>

                </div>
                <Photos />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BookPage.propTypes = {
  authorizedUser: PropTypes.object,
  requestedUser: PropTypes.object,
  bookTreeArr: PropTypes.array,
};
