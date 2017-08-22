import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import Helmet from 'react-helmet';
import {Form, RadioGroup} from 'formsy-react-components';
import {ButtonToolbar, DropdownButton} from 'react-bootstrap';
import {getUser, getUserSlug} from '../../redux/modules/user';
import {
  create as createBook,
  load as loadBookTree,
  show as showBookStories,
  next as nextBookStories,
  getBookSlug
} from '../../redux/modules/book';
import BooksTreeContainer from '../../containers/BooksTreeContainer';
import BookStream from '../StoryLine/Stream/BookStream';
import Photos from '../StoryLine/InfoBlocks/Photos';
import SubHeader from '../StoryLine/SubHeader/index';
import NavigationBookPage from '../Navigation/NavigationBookPage';
import EditBook from '../Popup/EditBook';
import './index.scss';

const radioOptions = [
  {value: '0', label: 'only you'},
  {value: '1', label: 'anyone'},
  {value: '2', label: 'specific people'}
];

const radioOptions2 = [
  {value: '0', label: 'only you'},
  {value: '1', label: 'specific people'}
];

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
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
  bookPage: state.book.bookPage,
  book_slug: state.book.book_slug,
  bookSettings: state.book.bookSettings,
}), {
  nextBookStories,
  showBookStories
})

export default class BookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      settings: this.props.bookSettings,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleSaveSettings = this.handleSaveSettings.bind(this);
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
    this.setState({scrollTop: scrollTop});
  }

  handleSaveSettings(options, index) {
    const newSettings = this.state.settings;
    newSettings[`${options}`] = index;

    this.setState({
      settings: newSettings
    });

    console.log(this.state.settings);
  }

  render() {
    const {scrollTop} = this.state;
    const scroll = () => {
      let Nav;
      let booksTreeTop;
      let displayUser;

      if (scrollTop <= 275) {
        Nav = 'navigation ';
        booksTreeTop = 'wrapper';
        displayUser = 'navigation-infouser';
      } else {
        Nav = 'navigation navigation-fixed';
        booksTreeTop = 'wrapper wrapper-fixed';
        displayUser = 'navigation-infouser';
      }
      const result = {booksTree: booksTreeTop, show: displayUser, posTop: Nav};
      return result;
    };
    const chooseScroll = scroll();
    const {name, description} = this.props.bookPage;
    const {slug, first_name, last_name, avatar32} = this.props.requestedUser;

    const radioAccessSettings = [
      {
        label: 'Who can see the content of the book?',
        type: 'can_see_content',
        radio: ['only you', 'anyone', 'specific people'],
        selectedOptions: this.state.settings.can_see_content
      },
      {
        label: 'Who can add stories to the book?',
        type: 'can_add_stories',
        radio: ['only you', 'anyone', 'specific people'],
        selectedOptions: this.state.settings.can_add_stories
      },
      {
        label: 'Who can delete stories from the book?',
        type: 'can_delete_stories',
        radio: ['only you', 'anyone', 'specific people'],
        selectedOptions: this.state.settings.can_delete_stories
      },
      {
        label: 'Who can manage access settings to the book??',
        type: 'can_manage_settings',
        radio: ['only you', 'specific people'],
        selectedOptions: this.state.settings.can_manage_settings
      }
    ];

    return (
      <div>
        <Helmet title={`${first_name} ${last_name} - Books - ${name}`}/>
        <SubHeader
          requestedUser={this.props.requestedUser}
          bookPage={true}
        />
        <div className={chooseScroll.posTop}>
          <div className="navigation-wrap book-nav">
            <ul>
              <li><Link to={`/${slug}/books`}>Books</Link></li>
              <li>
                <svg x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" focusable="false" fill="#7d7d7d">
                  <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                </svg>
              </li>
              <li>
                <Link to={`/${slug}/${name}`}>
                  {name}
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
              <div className="infobloks"
                // style={{marginLeft: '70px'}}
              >
                <div className="infobloks-book">
                  <div className="title">
                    <h5>{name}</h5>
                    <div className="btn-following">Following <span/></div>
                  </div>
                  <div className="book-info">
                    <ul>
                      <li className="book-icon-visibility"></li>
                      <li className="book-icon-stories">5</li>
                      <li className="book-icon-subbooks">3</li>
                      <li className="book-icon-followers">1</li>
                    </ul>
                    <hr/>
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
                      <i/>
                      <ButtonToolbar>
                        <DropdownButton className="bootstrap-pure-btn" title="Access settings">
                          <div>
                            <form>
                              {radioAccessSettings.map((element, index) => (
                                <div className="wrapper-block-radio" style={{padding: '4px 0'}}>
                                  <div className="block-radio">
                                    <div>{element.label}</div>
                                    <div>{element.radio.map((radioInput, indexRadio) => (
                                      <div>
                                        <input
                                          type="radio" value={element.type} name={index} id={`${indexRadio}${index}`}
                                          checked={element.selectedOptions === indexRadio}
                                          onChange={(event) => this.handleSaveSettings(event.target.value, indexRadio)}
                                        />
                                        <label htmlFor={`${indexRadio}${index}`}><span/><p>{radioInput}</p></label>
                                      </div>
                                    ))}
                                    </div>
                                  </div>
                                  {element.selectedOptions === element.radio.length - 1 &&
                                  <input type="text" placeholder="Type name or email address"/>
                                  }
                                </div>
                              ))}
                            </form>
                          </div>
                        </DropdownButton>
                      </ButtonToolbar>

                    </div>
                    <div className="book-settings-edit">
                      <EditBook
                        book_name={name}
                        book_description={description}
                        bookTreeArr={this.props.bookTreeArr}
                        bookSettings={this.props.bookSettings}
                      />
                    </div>
                  </div>

                </div>

                {/*<Photos/>*/}

              </div>
              <BookStream
                authorizedUser={this.props.authorizedUser}
                requestedUser={this.props.requestedUser}
                book_slug={this.props.book_slug}
                bookStories={this.props.bookStories}
                nextBookStories={this.props.nextBookStories}
                showBookStories={this.props.showBookStories}
              />
              <BooksTreeContainer
                bookTreeArr={this.props.bookTreeArr}
                booksTreeTop={chooseScroll.booksTree}
              />

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
  bookSettings: PropTypes.object,
};
