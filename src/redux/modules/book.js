import dataURItoBlob from '../../constants/dataURItoBlob';
import {likeStory, likeStorySuccess} from '../../constants/like';
import {createNewComment, createNewCommentSuccess} from '../../constants/comment';
const LOAD_BOOKTREE = 'LOAD_BOOKTREE';
const LOAD_BOOKTREE_SUCCESS = 'LOAD_BOOKTREE_SUCCESS';
const LOAD_BOOKTREE_FAIL = 'LOAD_BOOKTREE_FAIL';
const SHOW_BOOK = 'SHOW_BOOK';
const SHOW_BOOK_SUCCESS = 'SHOW_BOOK_SUCCESS';
const SHOW_BOOK_FAIL = 'SHOW_BOOK_FAIL';
const SHOW_NEXT_BOOK = 'SHOW_NEXT_BOOK';
const SHOW_NEXT_BOOK_SUCCESS = 'SHOW_NEXT_BOOK_SUCCESS';
const SHOW_NEXT_BOOK_FAIL = 'SHOW_NEXT_BOOK_FAIL';
const CREATE_BOOK = 'CREATE_BOOK';
const CREATE_BOOK_SUCCESS = 'CREATE_BOOK_SUCCESS';
const CREATE_BOOK_FAIL = 'CREATE_BOOK_FAIL';
const EDIT_BOOK = 'EDIT_BOOK';
const EDIT_BOOK_SUCCESS = 'EDIT_BOOK_SUCCESS';
const EDIT_BOOK_FAIL = 'EDIT_BOOK_FAIL';
const MOVE_BOOK = 'MOVE_BOOK';
const MOVE_BOOK_SUCCESS = 'MOVE_BOOK_SUCCESS';
const MOVE_BOOK_FAIL = 'MOVE_BOOK_FAIL';
const GET_ARR_CHECKBOX = 'GET_ARR_CHECKBOX';
const LIKE_STORY = 'LIKE_STORY';
const LIKE_STORY_SUCCESS = 'LIKE_STORY_SUCCESS';
const LIKE_STORY_FAIL = 'LIKE_STORY_FAIL';
const UPLOAD_BOOK_COVER = 'UPLOAD_BOOK_COVER';
const UPLOAD_BOOK_COVER_SUCCESS = 'UPLOAD_BOOK_COVER_SUCCESS';
const UPLOAD_BOOK_COVER_FAIL = 'UPLOAD_BOOK_COVER_FAIL';
const CLEAR_BOOKSTORIES = 'CLEAR_BOOKSTORIES';
const CLEAR_BOOKTREE = 'CLEAR_BOOKTREE';
const UPLOAD_BOOK_COVER_BASE64 = 'UPLOAD_BOOK_COVER_BASE64';
const VIEW_MORE_COMMENTS = 'VIEW_MORE_COMMENTS';
const VIEW_MORE_COMMENTS_SUCCESS = 'VIEW_MORE_COMMENTS_SUCCESS';
const VIEW_MORE_COMMENTS_FAIL = 'VIEW_MORE_COMMENTS_FAIL';
// const SAVE_CURRENT_BOOK_SLUG = 'SAVE_CURRENT_BOOK_SLUG';
const SHOW_SUBBOKS_CURRENT_BOOK = 'SHOW_SUBBOKS_CURRENT_BOOK';
const GET_BOOKS = 'GET_BOOKS';
const GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS';
const GET_BOOKS_FAIL = 'GET_BOOKS_FAIL';
const CREATE_NEW_COMMENT = 'CREATE_NEW_COMMENT';
const CREATE_NEW_COMMENT_SUCCESS = 'CREATE_NEW_COMMENT_SUCCESS';
const CREATE_NEW_COMMENT_FAIL = 'CREATE_NEW_COMMENT_FAIL';
const CREATE_STORY = 'CREATE_STORY';
const CREATE_STORY_SUCCESS = 'CREATE_STORY_SUCCESS';
const CREATE_STORY_FAIL = 'CREATE_STORY_FAIL';

const initialState = {
  bookTreeArr: [],
  bookStories: [],
  arrCheckbox: [],
  loaded: {
    loadedBookTree: false,
    loadedBookStories: false,
    loadedBooks: false
  },
  pagination: 2,
  uploading: false,
  bookPage: {},
  subBooksArr: [],
};

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BOOKTREE:
      return {
        ...state,
        loading: true,
      };
    case LOAD_BOOKTREE_SUCCESS:
      let loaded = Object.assign({}, state.loaded, {
        loadedBookTree: true,
      });

      return {
        ...state,
        loading: false,
        loaded,
        bookTreeArr: action.result.data,
        over: false,
      };
    case LOAD_BOOKTREE_FAIL:
      loaded = Object.assign({}, state.loaded, {
        loadedBookTree: false,
      });

      return {
        ...state,
        loading: false,
        error: action.error,
        loaded,
        bookTreeArr: []
      };

    case SHOW_BOOK:
      const preBook = Object.assign({}, state.bookPage, {
        name: null,
        description: null,
        cover: {},
        counters: {
          stories: 0,
          sub_books: 0,
          follows_book: 0,
          knockers: 0,
        },
        slug: null,
      });

      return {
        ...state,
        loading: {
          loadingBookStories: true
        },
        bookPage: action.book_slug !== state.bookPage.slug ? preBook : state.bookPage,
        // bookStories: [],
      };
    case SHOW_BOOK_SUCCESS:
      loaded = Object.assign({}, state.loaded, {
        loadedBookStories: true,
      });

      const dataStories = action.result.data.stories;
      dataStories.map(story => story.paginationComment = 2);

      return {
        ...state,
        loaded,
        bookPage: action.result.data,
        book_slug: action.book_slug,
        bookStories: dataStories,
        bookSettings: action.result.data.settings,
      };
    case SHOW_BOOK_FAIL:
      loaded = Object.assign({}, state.loaded, {
        loadedBookStories: false,
      });

      return {
        ...state,
        loaded,
        error: action.error,
        bookStories: []
      };

    case SHOW_NEXT_BOOK:
      return {
        ...state
      };
    case SHOW_NEXT_BOOK_SUCCESS:
      return {
        ...state,
        over: action.result.data.stories.length === 0 && true,
        bookStories: [...state.bookStories, ...action.result.data.stories],
        pagination: action.page + 1
      };
    case SHOW_NEXT_BOOK_FAIL:
      return {
        ...state
      };

    case CREATE_BOOK:
      return {
        ...state,
        creating: true
      };
    case CREATE_BOOK_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
      };
    case CREATE_BOOK_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
      };

    case EDIT_BOOK:
      return {
        ...state,
        editing: true
      };
    case EDIT_BOOK_SUCCESS:
      return {
        ...state,
        editing: false,
        edited: true,
      };
    case EDIT_BOOK_FAIL:
      return {
        ...state,
        editing: false,
        edited: false,
      };

    case MOVE_BOOK:
      return {
        ...state,
        moving: true,
      };
    case MOVE_BOOK_SUCCESS:
      return {
        ...state,
        moving: false,
        moved: true,
      };
    case MOVE_BOOK_FAIL:
      return {
        ...state,
        moving: false,
        moved: false,
      };

    case GET_ARR_CHECKBOX:
      const newArrCheckbox = action.checkbox.slice();
      return {
        ...state,
        arrCheckbox: newArrCheckbox
      };

    case LIKE_STORY: {
      return {
        ...state,
        liking: true,
        bookStories: likeStory(state.bookStories, action)
      };
    }
    case LIKE_STORY_SUCCESS: {
      return {
        ...state,
        liking: false,
        bookStories: likeStorySuccess(state.bookStories, action)
      };
    }
    case LIKE_STORY_FAIL: {
      return {
        ...state,
        liking: false,
        error: action.error,
      };
    }

    case UPLOAD_BOOK_COVER:
      return {
        ...state,
        uploading: true,
      };
    case UPLOAD_BOOK_COVER_SUCCESS:
      const updateBookCoverImg = Object.assign({}, state.bookPage, {
        cover: action.result.data
      });

      return {
        ...state,
        uploading: false,
        bookPage: updateBookCoverImg,
      };
    case UPLOAD_BOOK_COVER_FAIL:
      return {
        ...state,
        uploading: false,
        error: action.error,
      };

    case UPLOAD_BOOK_COVER_BASE64: {
      const updateBookCoverBase64 = Object.assign({}, state.bookPage, {
        cover: action.bookCoverBase64
      });
      // const updateUserCoverBase64 = state.authorizedUser;
      // updateUserCoverBase64.cover = action.userCoverBase64;

      return {
        ...state,
        bookPage: updateBookCoverBase64
      };
    }

    case CLEAR_BOOKSTORIES:
      return {
        ...state,
        bookStories: []
      };

    case CLEAR_BOOKTREE:
      loaded = Object.assign({}, state.loaded, {
        loadedBookTree: false,
      });

      return {
        ...state,
        bookTreeArr: [],
        loaded
      };

    case VIEW_MORE_COMMENTS: {
      return {
        ...state,
      };
    }
    case VIEW_MORE_COMMENTS_SUCCESS: {
      const viewNextComments = state.bookStories.map(story => {
        if (story.id === action.entity_id) {
          return {
            ...story,
            comments: [...action.result.data, ...story.comments],
            paginationComment: story.paginationComment + 1,
            counts: {
              comments: story.counts.comments - 4
            },
          };
        }
        return {
          ...story
        };
      });
      return {
        ...state,
        bookStories: viewNextComments
      };
    }
    case VIEW_MORE_COMMENTS_FAIL: {
      return {
        ...state,
      };
    }

    case SHOW_SUBBOKS_CURRENT_BOOK: {
      return {
        ...state,
        subBooksArr: action.subbooks
      };
    }

    case GET_BOOKS: {
      return {
        ...state,
      };
    }
    case GET_BOOKS_SUCCESS: {
      loaded = Object.assign({}, state.loaded, {
        loadedBooks: true,
      });
      return {
        ...state,
        subBooksArr: action.result.data,
        loaded
      };
    }
    case GET_BOOKS_FAIL: {
      loaded = Object.assign({}, state.loaded, {
        loadedBooks: false,
      });
      return {
        ...state,
        loaded
      };
    }

    case CREATE_NEW_COMMENT: {
      return {
        ...state,
        creatingNewComment: false,
        bookStories: createNewComment(state.bookStories, action)
      };
    }
    case CREATE_NEW_COMMENT_SUCCESS: {
      return {
        ...state,
        creatingNewComment: true,
        bookStories: createNewCommentSuccess(state.bookStories, action)
      };
    }
    case CREATE_NEW_COMMENT_FAIL: {
      return {
        ...state,
        creatingNewComment: false,
      };
    }

    case CREATE_STORY:
      return {
        ...state,
        creating: true
      };
    case CREATE_STORY_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
        bookStories: [...action.result.data, ...state.bookStories]
      };
    case CREATE_STORY_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
      };


    default:
      return state;
  }
}

export function getBookSlug(globalState) {
  const path = globalState.routing.locationBeforeTransitions.pathname;
  return path.substring(path.indexOf('/books/') + 7);           //get book slug after '/books/'
}

export function clearBookStories() {
  return {
    type: CLEAR_BOOKSTORIES
  };
}

export function clearBookTree() {
  return {
    type: CLEAR_BOOKTREE
  };
}

export function load(user_slug) {
  return {
    types: [LOAD_BOOKTREE, LOAD_BOOKTREE_SUCCESS, LOAD_BOOKTREE_FAIL],
    promise: (client) => client.get('/books/tree', { params: { user_slug }}),
  };
}

export function show(slug) {
  const book_slug = slug || '';
  return {
    types: [SHOW_BOOK, SHOW_BOOK_SUCCESS, SHOW_BOOK_FAIL],
    promise: (client) => client.get(`/books/${book_slug}`, { params: { page: 1 }}),
    book_slug
  };
}

export function next(slug, page) {
  const book_slug = slug || '';
  return {
    types: [SHOW_NEXT_BOOK, SHOW_NEXT_BOOK_SUCCESS, SHOW_NEXT_BOOK_FAIL],
    promise: (client) => client.get(`/books/${book_slug}`, { params: { stories_page: page }}),
    page,
    book_slug
  };
}

export function create(name, parent_slug) {
  return {
    types: [CREATE_BOOK, CREATE_BOOK_SUCCESS, CREATE_BOOK_FAIL],
    promise: (client) => client.post('/books', { data: { name, parent_slug }})
  };
}

export function edit(book_slug, name, description) {
  return {
    types: [CREATE_BOOK, CREATE_BOOK_SUCCESS, CREATE_BOOK_FAIL],
    promise: (client) => client.patch('/book', { data: { book_slug, name, description }})
  };
}

export function move(book_slug, book_parent_slug, book_before_slug) {
  return {
    types: [MOVE_BOOK, MOVE_BOOK_SUCCESS, MOVE_BOOK_FAIL],
    promise: (client) => client.post('/book/move', { data: { book_slug, book_parent_slug, book_before_slug }})
  };
}

export function getCheckboxOfBook(checkbox) {
  return {
    type: GET_ARR_CHECKBOX,
    checkbox
  };
}

export function like(story_id) {
  return {
    types: [LIKE_STORY, LIKE_STORY_SUCCESS, LIKE_STORY_FAIL],
    story_id,
    promise: (client) => client.post('/like/story', { data: { story_id }})
  };
}

export function upload(picture, color, book_id, name) {
  const formData = new FormData();
  if (picture) { formData.append('file', dataURItoBlob(picture), name); }
  formData.append('color', color);
  formData.append('book_id', book_id);
  return {
    types: [UPLOAD_BOOK_COVER, UPLOAD_BOOK_COVER_SUCCESS, UPLOAD_BOOK_COVER_FAIL],
    promise: (client) => client.post('/upload/book-cover', {data: formData})
  };
}

export function uploadBookCoverBase64(bookCoverBase64) {
  return {
    type: UPLOAD_BOOK_COVER_BASE64,
    bookCoverBase64
  };
}

export function viewMoreComments(entity_id, paginationComment) {
  return {
    types: [VIEW_MORE_COMMENTS, VIEW_MORE_COMMENTS_SUCCESS, VIEW_MORE_COMMENTS_FAIL],
    promise: (client) => client.get('/comments/story', {params: {page: paginationComment, entity_id}}),
    entity_id
  };
}

export const getNextBooks = (user_slug, pagination) => {
  return {
    types: [VIEW_MORE_COMMENTS, VIEW_MORE_COMMENTS_SUCCESS, VIEW_MORE_COMMENTS_FAIL],
    promise: (client) => client.get('/books', {params: {page: pagination, user_slug}})
  };
};

export function showSubBooksCurrentBook(subbooks) {
  return {
    type: SHOW_SUBBOKS_CURRENT_BOOK,
    subbooks
  };
}

export function getBooks(user_slug, book) {
  const book_slug = book || '';
  return {
    types: [GET_BOOKS, GET_BOOKS_SUCCESS, GET_BOOKS_FAIL],
    promise: (client) => client.get('/books', {params: {user_slug, book_slug}})
  };
}

export function createComment(entity_id, content, parent_id, user) {
  return {
    types: [CREATE_NEW_COMMENT, CREATE_NEW_COMMENT_SUCCESS, CREATE_NEW_COMMENT_FAIL],
    promise: (client) => client.post('/comments', {
      data: {
        entity: 'story',
        entity_id,  //story id
        content,    //text
        parent_id,  //default 0
        created_by: user.id  //auth_id
      }
    }),
    entity: 'story',
    entity_id,
    content,
    parent_id,
    created_by: user.id,
    user,
  };
}

export function createStory(data, books, files) {
  const formData = new FormData();
  formData.append('description', data);
  formData.append('books', JSON.stringify(books));
  Object.keys(files).forEach((key) => {
    const file = files[key];
    formData.append('file[]', file);
  });
  return {
    types: [CREATE_STORY, CREATE_STORY_SUCCESS, CREATE_STORY_FAIL],
    promise: (client) => client.post('/stories', {
      data: formData
    })
  };
}
