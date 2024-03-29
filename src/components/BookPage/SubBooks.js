import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
// import {Form, RadioGroup} from 'formsy-react-components';
// import {ButtonToolbar, DropdownButton} from 'react-bootstrap';
import {getUser} from '../../redux/modules/user';
import {
  create as createBook,
  load as loadBookTree,
  show as showBookStories,
  next as nextBookStories,
  // getBookSlug,
  upload as uploadBookCover,
  uploadBookCoverBase64,
  getBooks
} from '../../redux/modules/book';
import {showPopUp} from '../../redux/modules/form';
import BooksTreeContainer from '../../containers/BooksTreeContainer';
import BookStream from '../StoryLine/Stream/BookStream';
// import Photos from '../StoryLine/InfoBlocks/Photos';
// import SubHeader from '../StoryLine/SubHeader/index';
import NavigationBookPage from '../Navigation/NavigationBookPage';
import EditBook from '../Popup/EditBook';
import ChangeBookCoverImage from '../Popup/ChangeBookCoverImage';
import './index.scss';

// const radioOptions = [
//   {value: '0', label: 'only you'},
//   {value: '1', label: 'anyone'},
//   {value: '2', label: 'specific people'}
// ];
//
// const radioOptions2 = [
//   {value: '0', label: 'only you'},
//   {value: '1', label: 'specific people'}
// ];

// @asyncConnect([{
//   promise: ({store: {dispatch, getState}}) => {
//     const promises = [];
//     promises.push(dispatch(getUser(getUserSlug(getState()))));
//     promises.push(dispatch(loadBookTree(getUserSlug(getState()))));
//     promises.push(dispatch(showBookStories(getBookSlug(getState()))));
//     return Promise.all(promises);
//   }
// }])

const coverColors = [
  '#e53936',
  '#eb3f79',
  '#a900f1',
  '#7d56c2',
  '#5b6ab1',
  '#1d87e3',
  '#029ae5',
  '#00abcf',
  '#00887b',
  '#378d3c',
  '#679e38',
  '#f8a724',
  '#ff6f41',
  '#8c6d63',
  '#778f9c',
  '#414141'
];

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
  isAuthenticated: state.user.isAuthenticated,
  bookTreeArr: state.book.bookTreeArr,
  bookStories: state.book.bookStories,
  bookPage: state.book.bookPage,
  book_slug: state.book.book_slug,
  bookSettings: state.book.bookSettings,
  path: state.routing.locationBeforeTransitions.pathname,
  activePopUp: state.forms.activePopUp,
  visible: state.forms.visible,
  currentImage: state.forms.currentImage,
  subBooksArr: state.book.subBooksArr,
  loaded: state.book.loaded,
}), {
  getUser,
  loadBookTree,
  nextBookStories,
  showBookStories,
  showPopUp,
  uploadBookCoverBase64,
  uploadBookCover,
  getBooks,
})

export default class SubBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSmallNavigation: false,
      // scrollTop: 0,
      // settings: this.props.bookSettings,
      file: '',
      dropdownUserCover: false,
      currentUserCoverColor: '',
      showSubbooks: true,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleSaveSettings = this.handleSaveSettings.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.setCoverColor = this.setCoverColor.bind(this);
    this.handleCoverChange = this.handleCoverChange.bind(this);
    this.zeroTop = this.zeroTop.bind(this);
    this.cleanInputCover = this.cleanInputCover.bind(this);
    this.showSubBooks = this.showSubBooks.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // console.log('<---- componentDidMount start');
    const {path, requestedUser} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    const bookSlug = path.substring(path.indexOf('/books/') + 7);
    // if (findSlug !== requestedUser.slug) {
    // this.clearState();
    this.props.getUser(findSlug)
      .then(this.props.loadBookTree(findSlug))
      .then(this.props.showBookStories(bookSlug))
      .then(this.props.getBooks(findSlug, bookSlug));
    // }
    // this.setState({
    //   settings: this.props.bookSettings
    // });
    // console.log('<---- componentDidMount end');
  }

  componentDidUpdate(prevProps) {
    const {path, requestedUser, bookPage} = this.props;
    if (prevProps.path !== path) {
      const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
      const bookSlug = path.substring(path.indexOf('/books/') + 7);
      if (bookSlug && (bookSlug !== bookPage.slug)) {
        this.props.getUser(findSlug)
          .then(this.props.loadBookTree(findSlug))
          .then(this.props.showBookStories(bookSlug))
          .then(this.props.getBooks(findSlug, bookSlug));
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const {showSmallNavigation} = this.state;

    if (scrollTop <= 236 && showSmallNavigation) {
      this.setState({showSmallNavigation: false});
    } else if (scrollTop > 236 && !showSmallNavigation) {
      this.setState({showSmallNavigation: true});
    }
  }

  handleSaveSettings(options, index) {
    const newSettings = this.state.settings;
    newSettings[`${options}`] = index;

    this.setState({
      settings: newSettings
    });

    console.log(this.state.settings);
  }

  handleCoverChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({file});
      const image = {
        name: file.name,
        url: reader.result
      };
      this.props.showPopUp(true, image, 'ChangeBookCoverImage');
      this.cleanInputCover();
    };
    reader.readAsDataURL(file);
  }

  cleanInputCover() {
    this.inputBookCover.value = '';
  }

  setCoverColor(color) {
    this.setState({currentUserCoverColor: color});
    this.props.uploadBookCover(null, color.substring(1), this.props.bookPage.id);
  }

  zeroTop() {
    window.scrollTo(0, 0);
  }

  onBlur(e) {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.setState({
          dropdownUserCover: false
        });
      }
    }, 0);
  }

  showDropdown() {
    this.setState({
      dropdownUserCover: !this.state.dropdownUserCover
    });
  }

  showSubBooks() {
    this.setState({showSubbooks: !this.state.showSubbooks});
    console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
  }

  render() {
    console.log(this.state);
    const {showSmallNavigation} = this.state;
    const scroll = () => {
      let Nav = 'navigation navigation-fixed';
      let booksTreeTop = 'wrapper wrapper-fixed';
      let displayUser = 'navigation-infouser';
      const infoblock = 'infobloks-book';
      let wrapperInfoBlock;

      if (!showSmallNavigation) {
        Nav = 'navigation navigation-bookpage';
        booksTreeTop = 'wrapper';
        displayUser = 'navigation-infouser navigation-infouser-book';
        // infoblock = 'infobloks-book';
      } else {
        Nav = 'navigation navigation-fixed navigation-bookpage-fixed';
        booksTreeTop = 'wrapper wrapper-bookpage-fixed';
        displayUser = 'navigation-infouser navigation-infouser-book-fixed';
        wrapperInfoBlock = 'wrapper-infoblock';
        // infoblock = 'infobloks-book infobloks-book-fixed';
      }
      const result = {booksTree: booksTreeTop, show: displayUser, posTop: Nav, infoblock, wrapperInfoBlock};
      return result;
    };
    const chooseScroll = scroll();
    const {name, description, settings, cover, counts} = this.props.bookPage;
    const book_slug = this.props.bookPage.slug;
    const {slug, first_name, last_name, avatar32} = this.props.requestedUser;
    const {subBooksArr, loaded} = this.props;
    const {showSubbooks} = this.state;

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

          {/*<div onClick={onBookClick} className="book-edit">*/}
          {/*<EditBook*/}
          {/*book_name={name}*/}
          {/*book_slug={key}*/}
          {/*/>*/}
          {/*</div>*/}

          <div className="title-infoblocks-book">
            <div className="book-name">{name}</div>
            <div className="book-author">{`${requestedUser.first_name} ${requestedUser.last_name}`}</div>
          </div>

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
        </Link>
      );
    };

    // const radioAccessSettings = [
    //   {
    //     label: 'Who can see the content of the book?',
    //     type: 'can_see_content',
    //     radio: ['only you', 'anyone', 'specific people'],
    //     selectedOptions: this.state.settings.can_see_content
    //   },
    //   {
    //     label: 'Who can add stories to the book?',
    //     type: 'can_add_stories',
    //     radio: ['only you', 'anyone', 'specific people'],
    //     selectedOptions: this.state.settings.can_add_stories
    //   },
    //   {
    //     label: 'Who can delete stories from the book?',
    //     type: 'can_delete_stories',
    //     radio: ['only you', 'anyone', 'specific people'],
    //     selectedOptions: this.state.settings.can_delete_stories
    //   },
    //   {
    //     label: 'Who can manage access settings to the book??',
    //     type: 'can_manage_settings',
    //     radio: ['only you', 'specific people'],
    //     selectedOptions: this.state.settings.can_manage_settings
    //   }
    // ];

    return (
      <div>
        <Helmet title={`${name} - ${first_name} ${last_name}`}/>
        {/*<SubHeader*/}
        {/*requestedUser={this.props.requestedUser}*/}
        {/*bookPage={true}*/}
        {/*/>*/}
        <div className="bookPage-1170">

          {book_slug &&
          <div
            className={chooseScroll.infoblock}
            style={{minHeight: '280px', maxHeight: '281px', width: '320px', marginBottom: 0}}>
            <div className="book-settings-edit">
              <EditBook
                book_name={name}
                book_description={description}
                bookTreeArr={this.props.bookTreeArr}
                bookSettings={this.props.bookSettings}
              />
            </div>

            <div className="title">
              <Link to={`/${slug}/books/${this.props.bookPage.slug}`}>{name}</Link>
            </div>

            {description !== '' &&
            <div className="book-description">
              {/*<div>Description bla blabla bla bla bla blablabla bla!</div>*/}
              <div>{description}</div>
            </div>
            }

            <div className="book-counter">
              <ul>
                <li style={{paddingLeft: 0}}><i className="infobook-icon-visibility"/> · <span>{counts.followers}</span><i
                  className="followers-icon-sm"/></li>
                <li>·<span>{counts.stories}</span><i className="stories-icon-sm"/></li>
                <li>·<span>{counts.images}</span><i className="photos-icon-sm"/></li>
                <li
                  className={counts && counts.sub_books > 0 ? 'book-counter-subbooks book-counter-with-subbooks' : 'book-counter-subbooks'}
                  onClick={() => this.showSubBooks()}
                >
                  ·<span>{counts.sub_books}</span><i className="subbooks-icon-sm"/>
                </li>

                {/*<div className="followers">*/}
                {/*<Link to={`/${slug}`} className="user">*/}
                {/*<img src={avatar32} alt={`${first_name} ${last_name}`}/>*/}
                {/*</Link>*/}
                {/*<Link to={`/${slug}`} className="user">*/}
                {/*<img src={avatar32} alt={`${first_name} ${last_name}`}/>*/}
                {/*</Link>*/}
                {/*<Link to={`/${slug}`} className="user">*/}
                {/*<img src={avatar32} alt={`${first_name} ${last_name}`}/>*/}
                {/*</Link>*/}
                {/*</div>*/}

                {/*<li><span>0</span> photos</li>*/}
                {/*<div className="photos">*/}
                {/*<img src={avatar32} alt={`${first_name} ${last_name}`}/>*/}
                {/*</div>*/}


                {/*<li><span>{counts.sub_books}</span> subbooks</li>*/}
                {/*<div>*/}
                {/*<p>Book 1</p>*/}
                {/*</div>*/}
              </ul>
              <div className="btn-following btn-following-book">
                <div>Following Book</div>
                <span/>
              </div>
              <footer>
                <hr style={{margin: '15px -15px 10px -20px'}}/>

                <Link to={`/${slug}`} className="user">
                  <img src={avatar32} alt={`${first_name} ${last_name}`}/>
                  <span>{`${first_name} ${last_name}`}</span>
                </Link>
              </footer>
              {/*<hr/>*/}
            </div>


            {/*<div className="book-quantity">*/}
            {/*<span>2 subbooks</span>*/}
            {/*</div>*/}

            {/*<div className="book-subbooks">*/}
            {/*Subbooks*/}
            {/*</div>*/}

            {/*<div className="book-settings">*/}
            {/*<div className="book-settings-access">*/}
            {/*<i/>*/}
            {/*<ButtonToolbar>*/}
            {/*<DropdownButton className="bootstrap-pure-btn" title="Access settings">*/}
            {/*<div>*/}
            {/*<form>*/}
            {/*{radioAccessSettings.map((element, index) => (*/}
            {/*<div className="wrapper-block-radio" style={{padding: '4px 0'}}>*/}
            {/*<div className="block-radio">*/}
            {/*<div>{element.label}</div>*/}
            {/*<div>{element.radio.map((radioInput, indexRadio) => (*/}
            {/*<div>*/}
            {/*<input*/}
            {/*type="radio" value={element.type} name={index} id={`${indexRadio}${index}`}*/}
            {/*checked={element.selectedOptions === indexRadio}*/}
            {/*onChange={(event) => this.handleSaveSettings(event.target.value, indexRadio)}*/}
            {/*/>*/}
            {/*<label htmlFor={`${indexRadio}${index}`}><span/><p>{radioInput}</p></label>*/}
            {/*</div>*/}
            {/*))}*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*{element.selectedOptions === element.radio.length - 1 &&*/}
            {/*<input type="text" placeholder="Type name or email address"/>*/}
            {/*}*/}
            {/*</div>*/}
            {/*))}*/}
            {/*</form>*/}
            {/*</div>*/}
            {/*</DropdownButton>*/}
            {/*</ButtonToolbar>*/}
            {/*</div>*/}
            {/*</div>*/}

            {this.props.activePopUp === 'ChangeBookCoverImage' &&
            <ChangeBookCoverImage
              showPopUp={this.props.showPopUp}
              visible={this.props.visible}
              currentImage={this.props.currentImage}
              uploadUserCover={this.props.uploadBookCover}
              uploadBookCoverBase64={this.props.uploadBookCoverBase64}
              bookPage={this.props.bookPage}
            />
            }

          </div>
          }

          <div
            className="subheader-bookpage"
            style={{
              backgroundColor: cover && cover.color ? `#${cover.color}` : '#fff',
              backgroundImage: cover && cover.picture_original ? `url(${cover.picture_original})` : null
            }}
          >
            <div className="subHeader-cover">
              {this.props.isAuthenticated && this.props.authorizedUser.id === this.props.requestedUser.id &&
              <div tabIndex={0} onBlur={this.onBlur}>
                <i/>
                <div
                  className="cover-btn" onClick={() => this.showDropdown()}
                  style={{opacity: this.state.dropdownUserCover ? 1 : null}}
                >
                  <div style={{color: '#fff'}}><i/>Update Cover Photo</div>
                </div>
                <div className="cover-dropdown" style={{display: this.state.dropdownUserCover ? 'block' : 'none'}}>
                  <div className="triangle"/>
                  <ul>
                    <li style={{marginTop: '5px'}}>
                      <div className="wrapper-upload-cover">
                        <h5>Upload a photo</h5>
                        <input type="file" onChange={(e) => this.handleCoverChange(e)}
                               ref={el => this.inputBookCover = el}/>
                      </div>
                    </li>
                    <hr/>
                    <li style={{fontSize: '12px'}}>or set a color
                      <div className="wrapper-colors">
                        {coverColors.map((color, index) => (
                          <div
                            key={index}
                            style={{backgroundColor: color}}
                            className={this.state.currentUserCoverColor === color ? 'active' : null}
                            onClick={() => this.setCoverColor(color)}
                          />
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              }
            </div>
          </div>
        </div>

        <div className={chooseScroll.posTop}>
          <NavigationBookPage
            userName={`${first_name} ${last_name}`}
            avatar32={avatar32}
            link={`/${slug}`}
            displayUser={chooseScroll.show}
          />

          <div className="navigation-wrap book-nav">
            <Link onClick={() => this.zeroTop()}>
              {name}
            </Link>
          </div>

          <div
            className="btn-following btn-following-book"
            // onClick={
            //   !isFollowing ?
            //     () => {
            //       this.follow(id);
            //     }
            //     :
            //     () => {
            //       this.unfollow(id);
            //     }
            // }
          >
            <div>
              Following Book
            </div>
            <span/>
          </div>
        </div>
        {/*</div>*/}


        <div className="book-page">
          <div className="storyLine">
            <div className="wrap-storyLine">
              <div className="infobloks">
                <div className={chooseScroll.wrapperInfoBlock}>
                  <div className="infobloks-book infobloks-book-others">
                    <div className="title-infoblocks" onClick={this.showSubBooks}>
                      <span className="subbooks-icon"/>
                      <a> Subbooks <span>· 0</span></a>
                    </div>
                    <div className="list-subbooks">
                      <ul>
                        {/*<li style={{marginTop: 0}}>0 subbooks</li>*/}
                        {loaded.loadedBooks && subBooksArr[0].children.length > 0 && subBooksArr[0].children.map(book => (
                          <li key={book.key}><Link to={`/${slug}/books/${book.key}`}><i/>{book.name}</Link></li>
                        ))}
                      </ul>
                      {/*<hr/>*/}
                    </div>
                  </div>

                  <div className="infobloks-book infobloks-book-others" style={{paddingBottom: 0}}>
                    <div className="title-infoblocks">
                      <span className="peoples-icon"/>
                      <a> Book Followers <span>· 0</span></a>
                    </div>
                    {/*<div className="book-counter">*/}
                    {/*<ul>*/}
                    {/*<li style={{marginTop: 0}}>0 followers</li>*/}
                    {/*<div className="followers">*/}
                    {/*<Link to={`/${slug}`} className="user">*/}
                    {/*<img src={avatar32} alt={`${first_name} ${last_name}`}/>*/}
                    {/*</Link>*/}
                    {/*<Link to={`/${slug}`} className="user">*/}
                    {/*<img src={avatar32} alt={`${first_name} ${last_name}`}/>*/}
                    {/*</Link>*/}
                    {/*<Link to={`/${slug}`} className="user">*/}
                    {/*<img src={avatar32} alt={`${first_name} ${last_name}`}/>*/}
                    {/*</Link>*/}
                    {/*</div>*/}
                    {/*</ul>*/}
                    {/*/!*<hr/>*!/*/}
                    {/*</div>*/}
                    <div className="photos-gallery books-followers-gallery">
                      <div className="photos-image">
                        <a href="#"><img src="//unsplash.it/800/600?image=20"/></a>
                      </div>
                      <div className="photos-image">
                        <a href="#"><img src="//unsplash.it/800/600?image=42"/></a>
                      </div>
                      <div className="photos-image">
                        <a href="#"><img src="//unsplash.it/800/600?image=48"/></a>
                      </div>
                      <div className="photos-image">
                        <a href="#"><img src="//unsplash.it/800/600?image=60"/></a>
                      </div>
                      <div className="photos-image">
                        <a href="#"><img src="//unsplash.it/800/600?image=7"/></a>
                      </div>
                      <div className="photos-image">
                        <a href="#"><img src="//unsplash.it/800/600?image=180"/></a>
                      </div>
                    </div>
                  </div>

                  <div className="infobloks-book infobloks-book-others" style={{paddingBottom: 0}}>
                    <div className="title-infoblocks">
                      <span className="photos-icon"/>
                      <a>Book Photos <span>· 0</span></a>
                    </div>
                    <div className="photos-gallery books-photos-gallery">
                      <div className="photos-image">
                        <a href="#"><img src="//unsplash.it/800/600?image=20"/></a>
                      </div>
                      <div className="photos-image">
                        <a href="#"><img src="//unsplash.it/800/600?image=42"/></a>
                      </div>
                      <div className="photos-image">
                        <a href="#"><img src="//unsplash.it/800/600?image=48"/></a>
                      </div>
                      <div className="photos-image">
                        <a href="#"><img src="//unsplash.it/800/600?image=60"/></a>
                      </div>
                      <div className="photos-image">
                        <a href="#"><img src="//unsplash.it/800/600?image=7"/></a>
                      </div>
                      <div className="photos-image">
                        <a href="#"><img src="//unsplash.it/800/600?image=180"/></a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>


              {showSubbooks
                ?
                <div className="bookpage-subbooks-card">
                  {subBooksArr[0].children.length > 0 && subBooksArr[0].children.map(book => (
                    <BookCard
                      key={book.key}
                      book={book}
                      history={history}
                      requestedUser={this.props.requestedUser}
                      getBooks={this.props.getBooks}
                    />
                  ))}
                </div>
                :
                <BookStream
                  authorizedUser={this.props.authorizedUser}
                  requestedUser={this.props.requestedUser}
                  book_slug={this.props.bookPage.slug}
                  bookStories={this.props.bookStories}
                  nextBookStories={this.props.nextBookStories}
                  showBookStories={this.props.showBookStories}
                />
              }

              <BooksTreeContainer
                bookTreeArr={this.props.bookTreeArr}
                booksTreeTop={chooseScroll.booksTree}
                title="ALL BOOKS"
              />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

SubBooks.propTypes = {
  authorizedUser: PropTypes.object,
  requestedUser: PropTypes.object,
  bookTreeArr: PropTypes.array,
  bookStories: PropTypes.array,
  bookSettings: PropTypes.object,
  visible: PropTypes.bool,
  currentImage: PropTypes.string,
  uploadBookCover: PropTypes.func,
  uploadBookCoverBase64: PropTypes.func,
  bookPage: PropTypes.object,
  showPopUp: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  showBookStories: PropTypes.func,
  nextBookStories: PropTypes.func,
};
