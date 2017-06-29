import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import { Modal, Tooltip, OverlayTrigger, ButtonToolbar, DropdownButton } from 'react-bootstrap';
import { like as likePost, setVisibilityStory } from '../../../redux/modules/story';
import Log from '../../Popup/Log';

@connect((state) => ({
}), {
  likePost,
  setVisibilityStory
})

// class MyTooltip {
//   render() {
//     const { style: left, top } = this.props;
//
//     return (<Tooltip {...this.props} id="tooltipLike1" style={{ left: left - 300, top: top + 15 }}>Hello</Tooltip>);
//   }
// }

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.loadLikeInfo = this.loadLikeInfo.bind(this);
    this.loadBookInfo = this.loadBookInfo.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.chooseLoudnessIcon = this.chooseLoudnessIcon.bind(this);
    this.chooseVisibilityIcon = this.chooseVisibilityIcon.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
  }

  Close() {
    this.setState({ showModal: false });
  }
  Open() {
    this.setState({ showModal: true });
  }

  loadLikeInfo(people_list) {
    const friends = [];
    let result;
    const is_Friend = people_list.some(people => people.user.is_friend);
    const is_Owner = people_list.some(people => people.user.is_owner);
    const is_Not_Owner = people_list.every(people => !people.user.is_owner);

    if (is_Owner && !is_Friend) {
      if (people_list.length - 1 === 0) {
        people_list.map(people => {
          if (people.user.is_owner) {
            result = people.user.fullName;
          }
        });
      } else {
        result = `You and ${people_list.length - 1} others`;
      }
    } else if (is_Friend) {
      people_list.map(people => {
        if (people.user.is_friend) {
          friends.push(` ${people.user.fullName}`);
        }
        return friends;
      });

      const qtyFriend = friends[1] ? 2 : 1;

      if (is_Owner) {
        if (people_list.length - qtyFriend - 1 === 0) {
          result = `You and ${friends.slice(0, qtyFriend)}`;
        } else {
          result = `You, ${friends.slice(0, qtyFriend)} and ${people_list.length - qtyFriend - 1} others`;
        }
      } else if (people_list.length - 1 === 0) {
        result = friends[0];
      } else {
        result = `${friends.slice(0, qtyFriend)} and ${people_list.length - qtyFriend} others`;
      }
    } else if (is_Not_Owner && !is_Friend) {
      result = people_list.length;
    }
    return result;
  }

  loadBookInfo(books) {
    const arrBooks = [];
    const countBooks = books.length;
    let result;

    if (countBooks > 1) {
      books.map((book) => (
        arrBooks.push(` ${book.name}`)
      ));
      result = `${countBooks} books: ${arrBooks.join(', ')}`;
    } else {
      books.map((book) => (
        result = book.name
      ));
    }
    return result;
  }

  handleKeyPress(event) {
    if (event.keyCode === 13) {
      alert('Enter clicked!!!');
    }
    console.log('key', event.key);
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

  chooseVisibilityIcon(visibility) {
    switch (visibility) {
      case 'public':
        return 'public_icon';
      case 'private':
        return 'private_icon';
      case 'custom':
        return 'custom_icon';

      default:
        console.error('chooseVisibilityIcon empty');
    }
  }

  setVisibility(visibility_type, story_id) {
    console.log('setVisibility11111', visibility_type, story_id);
    this.props.setVisibilityStory(visibility_type, story_id);
  }


  render() {
    const { fullName, slug, avatar } = this.props.user;
    const { date, post, images, id, books, likes, loudness, visibility } = this.props;

    // const tooltip = (props) => (
    //
    //   <Tooltip id={props.id}>
    //     { likes.people_list.map((people) => (
    //       <div>{people.user.fullName}</div>
    //     ))}
    //   </Tooltip>
    // );

    // tooltip.id = 'test';
    const tooltipLike = (
      <Tooltip id="tooltipLike" arrowOffsetLeft={10} >
        { likes.people_list.map((people) => (
          <div key={people.user.id}>{people.user.fullName}</div>
        ))}
      </Tooltip>
    );

    const tooltipBooks = (
      <Tooltip id="tooltipBooks" arrowOffsetLeft={'10%'} placement="left" positionLeft="333" >
        <div>Story location:</div>
        { books.map((book) => (
          <div key={book.id}>{book.name}</div>
        ))}
      </Tooltip>
    );

    return (
      <div className="post post-appear ">
        {/* ===========
            Post Header
            =========== */}
        <div className="post-header">

          <div className="wrap-post-user-avatar">
            <Link to={`/${slug}`}><img className="post-user-avatar" src={avatar} /></Link>
          </div>

          <div className="wrap-post-user-info">
            <div className="post-user-name">
              <Link to={`/${slug}`}>{fullName}</Link>
            </div>
            <div className="post-details">
              <div className="post-details-date">{date.created}
                <div className="block-additional-date">
                  <div>{`Created on: ${date.exactCreated}`}</div>
                  <div>{`Started on: ${date.startedOn}`}</div>
                  <div>{ date.completedOn && `Completed on: ${date.completedOn}`}</div>
                </div>
              </div>
              <div className="post-delimiter"><span> · </span></div>
              <div className="post-details-loud-icon"><span className={this.chooseLoudnessIcon(loudness)} /></div>
              <div className="post-delimiter"><span> · </span></div>
              <div className="post-details-visibility">
                <div className="post-details-visibility-icon">
                  <span className={this.chooseVisibilityIcon(visibility.status)}/>
                </div>
                <div className="post-details-visibility-menu">
                  {/* <i className="caret"></i> */}
                  <ButtonToolbar>
                    <DropdownButton className="profileMenu-btn" title={''} id={3} pullRight>
                      <div className="sbox-visibility">
                        <ul>
                          <li>
                            <div>
                              <input type="checkbox" name="public_visibility_story" id="public_visibility_story"
                                     checked={visibility.status === 'public'} onChange={() => this.setVisibility('public', id)}/>
                              <label htmlFor={'public_visibility_story'}><span/></label>
                              <i className="public_icon"/>
                              <p>Public</p>
                            </div>
                          </li>
                          <li>
                            <div>
                              <input type="checkbox" name="private_visibility_story" id="private_visibility_story"
                                     checked={visibility.status === 'private'} onChange={() => this.setVisibility('private', id)}/>
                              <label htmlFor={'private_visibility_story'}><span/></label>
                              <i className="private_icon"/>
                              <p>Private</p>
                            </div>
                          </li>
                          <li>
                            <div>
                              <input type="checkbox" name="custom_visibility_story" id="custom_visibility_story"
                                     checked={visibility.status === 'custom'} onChange={() => this.setVisibility('custom', id)}/>
                              <label htmlFor={'custom_visibility_story'}><span/></label>
                              <i className="custom_icon"/>
                              <p>Custom</p>
                            </div>
                          </li>
                          <li>
                            <div>
                              <input type="checkbox" name="reset_visibility_story" id="reset_visibility_story"
                                     checked={false} onChange={this.handleCheckVisibility}/>
                              <label htmlFor={'reset_visibility_story'}><span/></label>
                              <i className="reset_icon"/>
                              <p>Reset as per visibility of books</p>
                            </div>
                          </li>
                          <span className="divider" />
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
                <OverlayTrigger placement="top" overlay={tooltipBooks} id="tooltipBooks" >
                  <span>
                    {this.loadBookInfo(books)}
                  </span>
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
              <DropdownButton className="profileMenu-btn" title={''} id={4} noCaret pullRight >
                <Link><li>Pin story</li></Link>
                <hr/>
                <Link><li>Story Details</li></Link>
                <Link><li>Delete Story</li></Link>
              </DropdownButton>
            </ButtonToolbar>
          </div>
        </div>

        {/* ===========
            Post Content
            =========== */}
        <div className="post-content">
          <div className="wrap-post-content">
            <div
              className="post-content-type-text"
              dangerouslySetInnerHTML={{__html: post}}
            />

            {/*<div className="post-content-type-text">
              <p>Математический горизонт, в первом приближении, вызывает перигей. Движение, несмотря на внешние воздействия, последовательно. В связи с этим нужно подчеркнуть, что высота вращает первоначальный популяционный индекс. Это можно записать следующим образом: V = 29.8 * sqrt(2/r – 1/a) км/сек, где юлианская дата многопланово колеблет ионный хвост. Конечно, нельзя не принять во внимание тот факт, что натуральный логарифм прекрасно притягивает межпланетный Южный Треугольник.</p>
              <p>Космогоническая гипотеза Шмидта позволяет достаточно просто объяснить эту нестыковку, однако соединение выслеживает вращательный большой круг небесной сферы. Часовой угол иллюстрирует натуральный логарифм, при этом плотность Вселенной в 3 * 10 в 18-й степени раз меньше, с учетом некоторой неизвестной добавки скрытой массы. Звезда оценивает далекий Млечный Путь, а время ожидания ответа составило бы 80 миллиардов лет.</p>
            </div> */}
            {/*{ images && images.map}*/}

            { images &&
              <div className="post-content-type-image">
                <img src={images[0]}/>
              </div>
            }

            {/*<div className="post-content-type-link">
              <a href="#">
                <div className="link-preview-image">
                  <img src="http://devianmbanks.validbook.org/cdn/stories-images/706/498.jpg" alt="" />
                </div>
                <div className="wrap-link-preview">
                  <div className="link-preview-title">Photo by Alberto Restifo | Unsplash</div>
                  <div className="link-preview-description">A free high-resolution photo of snow, mountain, cold, frozen and blue by Alberto Restifo, taken with an Sony DSLR-A900</div>
                  <div className="link-preview-url">unsplash.com</div>
                </div>
              </a>
            </div>

            <div className="post-content-type-link-short">
              <a href="#">
                <div className="wrap-content-type-link-short">
                  <div className="link-preview-image-short">
                    <img src="http://validbook.org/cdn/stories-images/657/168.jpg" alt="" />
                  </div>
                  <div className="wrap-link-preview-short">
                    <div className="link-preview-title">Photo by Alberto Restifo | Unsplash</div>
                    <div className="link-preview-description">A free high-resolution photo of snow, mountain, cold, frozen and blue by Alberto Restifo, taken with an Sony DSLR-A900</div>
                    <div className="link-preview-url">unsplash.com</div>
                  </div>
                </div>
              </a>
            </div>

            <div className="post-content-type-gallery">
              <div className="content-gallery-image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/AEI66HEQ25.jpg" alt/>
              </div>
              <div className="content-gallery-image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/280h/TXHI5TTAYX.jpg" alt/>
              </div>
              <div className="content-gallery-image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/280h/P84KG21CDH.jpg" alt/>
              </div>
              <div className="content-gallery-image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/280h/DYNEU4SJQ5.jpg" alt/>
              </div>
              <div className="content-gallery-image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/280h/FYZBN8FDKT.jpg" alt/>
              </div>
            </div>*/}

          </div>
        </div>

        {/* ===========
            Post Footer
            =========== */}
        <div className="post-footer">
          {/*<div className="post-like post-like-active" onClick={() => this.like(id)}>*/}
          <div className={!likes.is_liked ? 'post-like' : 'post-like post-like-active'} onClick={() => this.props.likeFunc(id)}>
            <i className="post-action-icon" />
            <span>Like</span>
          </div>
          <div className="post-comment">
            <i className="post-action-icon" />
            <span>Comment</span>
          </div>
          <div className="post-log">
            <i className="post-action-icon" />
            <span>Log</span>
            <Log
              storyID={id}
            />
          </div>
          <div className="post-share">
            <i className="post-action-icon" />
            <span>Share</span>

            <div className="list-of-social-share">

            </div>
          </div>
        </div>

        <div className="post-lc" style={{display: (likes.qty === 0) ? 'none' : 'block'}}>
          <div className="post-like-field" onClick={this.Open}>
            <i className="post-action-icon" />
            <OverlayTrigger placement="top" overlay={tooltipLike} id="tooltipLike" arrowOffsetLeft={200} >
              <span>
                {this.loadLikeInfo(likes.people_list)}
              </span>
            </OverlayTrigger>
          </div>

          <div className="post-comment-field">
            <div className="comments">
              <div className="comment">
                <img src="http://devianmbanks.validbook.org/cdn/1/avatar/32x32.jpg?t=1498552347" alt=""/>
                <div className="text-block">
                  <p>
                    <Link>Vadim Necheporenko</Link>
                    Validbook is a user controlled, not for profit enterprise. The mission of Validbook is to make cooperation between people, physical objects and virtual entities more effective and efficient by making cooperation more transparent, free and reliable.
                  </p>
                  <span className="reply">Reply</span><span> · </span><span className="date">7 Jun 2017</span>
                </div>
              </div>

              <div className="comment">
                <img src="http://devianmbanks.validbook.org/cdn/1/avatar/32x32.jpg?t=1498552347" alt=""/>
                <div className="text-block">
                  <p>
                    <Link>Vadim Necheporenko</Link>
                    Validbook is a user controlled, not for profit enterprise. The mission of Validbook is to make cooperation between people, physical objects and virtual entities more effective and efficient by making cooperation more transparent, free and reliable.
                  </p>
                  <span className="reply">Reply</span><span> · </span><span className="date">7 Jun 2017</span>
                </div>
              </div>
            </div>

            <div className="new-comment">
              <img src="http://devianmbanks.validbook.org/cdn/1/avatar/32x32.jpg?t=1498552347" alt=""/>
              <Textarea
                placeholder="Write a comment..."
                onKeyDown={this.handleKeyPress}
              />
            </div>
          </div>
        </div>

        <Modal className="modal-likes" show={this.state.showModal} onHide={this.Close}>
          <Modal.Header closeButton>
            <span>All {likes.qty}</span>
          </Modal.Header>

          <Modal.Body>
            { likes.people_list.map((people) => (
              <div key={people.user.id} className="people-like-card">
                <Link to={people.user.slug}>
                  <img src={people.user.avatar} />
                  <div>{people.user.fullName}</div>
                </Link>
              </div>
            ))}
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object,
  likes: PropTypes.object,
  post: PropTypes.string,
  date: PropTypes.object,
  id: PropTypes.number,
  images: PropTypes.array,
  books: PropTypes.array,
  loudness: PropTypes.object,
  visibility: PropTypes.object,
  likeFunc: PropTypes.func,
};
