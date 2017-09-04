import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {Tooltip, OverlayTrigger, ButtonToolbar, DropdownButton} from 'react-bootstrap';
import {setVisibilityStory, deleteStory, pinStory} from '../../../redux/modules/story';
import DeleteStory from '../../Popup/DeleteStory';
import PinStory from '../../Popup/PinStory';

@connect((state) => ({}), {
  setVisibilityStory,
  deleteStory,
  pinStory,
})

class PostHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loadBookInfo = this.loadBookInfo.bind(this);
    this.chooseLoudnessIcon = this.chooseLoudnessIcon.bind(this);
    this.chooseLoudnessTooltip = this.chooseLoudnessTooltip.bind(this);
    this.chooseVisibilityIcon = this.chooseVisibilityIcon.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
  }

  loadBookInfo(books) {
    const countBooks = books.length;
    let result;

    if (countBooks > 1) {
      result = (<p>{countBooks} books: {books.map((book) => (
        <Link to={`/${this.props.user.slug}/books/${book.slug}`} key={book.id}>{book.name}</Link>)
      )}</p>);
    } else {
      books.map((book) => (
        result = <p><Link to={`/${this.props.user.slug}/books/${book.slug}`} key={book.id}>{book.name}</Link></p>
      ));
    }
    return result;
  }

  chooseLoudnessIcon(loudness) {
    if (!loudness.inChannels && !loudness.inBooks) {
      return 'quiet_log_icon';
    } else if (loudness.inChannels && loudness.inBooks) {
      return 'loud_log_icon';
    } else if (!loudness.inChannels && loudness.inBooks) {
      return 'loud_book_icon';
    }
  }

  chooseLoudnessTooltip(loudness) {
    if (!loudness.inChannels && !loudness.inBooks) {
      return 'Story did not appear in the channels';
    } else if (loudness.inChannels && loudness.inBooks) {
      return 'Story appeared in the channels of your followers';
    } else if (!loudness.inChannels && loudness.inBooks) {
      return 'Story appeared in the channels of book followers';
    }
  }

  chooseVisibilityIcon(visibility) {
    switch (visibility) {
      case 0:
        return 'public_icon';
      case 1:
        return 'private_icon';
      case 2:
        return 'custom_icon';

      default:
        console.error('chooseVisibilityIcon empty');
    }
  }

  setVisibility(visibility_type, story_id) {
    this.props.setVisibilityStory(visibility_type, story_id);
  }

  render() {
    const {fullName, slug, avatar} = this.props.user;
    const {authorizedUser, date, visibility, loudness, id, books} = this.props;

    const tooltipBooks = (
      <Tooltip id="tooltipBooks" arrowOffsetLeft={'10%'} placement="left" positionLeft="333">
        <div>Story location:</div>
        {books.map((book) => (
          <div key={book.id}>{book.name}</div>
        ))}
      </Tooltip>
    );

    return (
      <div className="post-header">

        <div className="wrap-post-user-avatar">
          <Link to={`/${slug}`}><img className="post-user-avatar" src={avatar}/></Link>
        </div>

        <div className="wrap-post-user-info">
          <div className="post-user-name">
            <Link to={`/${slug}`}>{fullName}</Link>
          </div>
          <div className="post-details">
            <div className="post-details-date">{date.created}
              <div className="block-additional block-additional-date">
                <div>{`Created on: ${date.exactCreated}`}</div>
                {/*<div>{`Started on: ${date.startedOn}`}</div>*/}
                {/*<div>{date.completedOn && `Completed on: ${date.completedOn}`}</div>*/}
              </div>
            </div>

            {authorizedUser.slug === slug &&
            <div className="post-delimiter" style={{display: 'flex'}}><span> · </span>
              <div className="post-details-loud-icon">
                <span className={this.chooseLoudnessIcon(loudness)}/>
                <div className="block-additional block-additional-loud">{this.chooseLoudnessTooltip(loudness)}</div>
              </div>
            </div>
            }
            <div className="post-delimiter"><span> · </span></div>
            <div className="post-details-visibility">
              <div className="post-details-visibility-icon">
                <span className={this.chooseVisibilityIcon(visibility.value)}/>
              </div>
              <div className="post-details-visibility-menu">
                {/* <i className="caret"></i> */}
                <ButtonToolbar>
                  <DropdownButton className="profileMenu-btn" title={''} id={3} pullRight>
                    <div className="sbox-visibility">
                      <ul>
                        <li>
                          <div onClick={() => this.setVisibility(0, id)}>
                            <input
                              type="checkbox" name="public_visibility_story" id="public_visibility_story"
                              checked={visibility.value === 0}/> {/*not defaultChecked*/}
                            <label htmlFor={'public_visibility_story'}><span/></label>
                            <div>
                              <i className="public_icon"/>
                              <p>Public</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div onClick={() => this.setVisibility(1, id)}>
                            <input
                              type="checkbox" name="private_visibility_story" id="private_visibility_story"
                              checked={visibility.value === 1}/>
                            <label htmlFor={'private_visibility_story'}><span/></label>
                            <div>
                              <i className="private_icon"/>
                              <p>Private</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div onClick={() => this.setVisibility(2, id)}>
                            <input
                              type="checkbox" name="custom_visibility_story" id="custom_visibility_story"
                              checked={visibility.value === 2}/>
                            <label htmlFor={'custom_visibility_story'}><span/></label>
                            <div>
                              <i className="custom_icon"/>
                              <p>Custom</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div>
                            <input
                              type="checkbox" name="reset_visibility_story" id="reset_visibility_story"
                              checked={false} onChange={this.handleCheckVisibility}/>
                            <label htmlFor={'reset_visibility_story'}><span/></label>
                            <div>
                              <i className="reset_icon"/>
                              <p>Reset as per visibility of books</p>
                            </div>
                          </div>
                        </li>
                        <span className="divider"/>
                        <li>
                          <div>
                            <p>History of Story Visibility</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </DropdownButton>
                </ButtonToolbar>
              </div>
            </div>

            <div className="post-delimiter"><span> · </span></div>
            <div className="post-details-location">
              <OverlayTrigger placement="top" overlay={tooltipBooks} id="tooltipBooks">
                <div>{this.loadBookInfo(books)}</div>
              </OverlayTrigger>

              {/*{this.loadBookInfo(books)}*/}
              {/*<div className="myTooltip" onClick={(e) => console.log('helllo', e)}>*/}
              {/*<div className="myTooltip-arrow"></div>*/}
              {/*<div className="myTooltip-inner">*/}
              {/*<div>Story location:</div>*/}
              {/*{ books.map((book) => (*/}
              {/*<div key={book.id}>{book.name}</div>*/}
              {/*))}*/}
              {/*</div>*/}
              {/*</div>*/}
            </div>

          </div>
        </div>

        <div className="wrap-post-story-dropdown">
          <ButtonToolbar>
            <DropdownButton className="profileMenu-btn" title={''} id={4} noCaret pullRight>
              <Link>
                <li>Pin story
                  <div className="wrapper-popup-story">
                    <PinStory
                      pinStory={this.props.pinStory}
                      books={books}
                      id={id}
                    />
                  </div>
                </li>

              </Link>
              <hr/>
              <Link to={`/story/${id}`}>
                <li>Story Details</li>
              </Link>

              <Link>
                <li>Delete Story
                  <div className="wrapper-popup-story">
                    <DeleteStory
                      deleteStory={this.props.deleteStory}
                      id={id}
                    />
                  </div>
                </li>
              </Link>
            </DropdownButton>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

PostHeader.propTypes = {
  authorizedUser: PropTypes.object,
  user: PropTypes.object,
  setVisibilityStory: PropTypes.func,
  pinStory: PropTypes.func,
  deleteStory: PropTypes.func,
  books: PropTypes.array,
  loudness: PropTypes.object,
  visibility: PropTypes.object,
  date: PropTypes.object,
  id: PropTypes.number,
};

export default PostHeader;
