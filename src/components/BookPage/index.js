import React, { Component, PropTypes } from 'react';
import { ButtonToolbar, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import { Form, RadioGroup } from 'formsy-react-components';
import BooksTreeContainer from '../../containers/BooksTreeContainer';
import Stream from '../StoryLine/Stream/index';
//import InfoBloks from '../StoryLine/InfoBlocks';
import Photos from '../StoryLine/InfoBlocks/Photos';
import SubHeader from '../StoryLine/SubHeader/index';
import './index.scss';

const radioOptions = [
       {value: 'a', label: 'only you'},
       {value: 'b', label: 'anyone'},
       {value: 'c', label: 'specific people'}
];

class BookPage extends Component {
  render() {
    return (
      <div>
        <SubHeader
          user={this.props.user}
        />
        <div className="navigation">
          <div className="navigation-wrap book-nav">
            <ul>
              <li>
                <Link>
                  Books
                </Link>
              </li>
              <li>
                <svg x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" focusable="false" fill="#7d7d7d">
                  <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
                </svg>
              </li>
              <li>
                <Link>
                  Name Book
                </Link>
              </li>
            </ul>
          </div>
        </div>


        <div className="book-page">
          <div className="storyLine">
            <div className="wrap-storyLine">
              <BooksTreeContainer />
              <Stream />
              <div className="infobloks">
                <div className="infobloks-book">
                  <div className="title-infoblocks-book">
                    <h5>Book</h5>
                    <div className="btn-following">Following <span></span></div>
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
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.users.user
  };
}

export default connect(mapStateToProps, null)(BookPage);
