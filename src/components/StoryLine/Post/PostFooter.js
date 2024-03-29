import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Textarea from 'react-textarea-autosize';
import {ShareButtons} from 'react-share';
import {Modal, Tooltip, OverlayTrigger, ButtonToolbar, DropdownButton} from 'react-bootstrap';
import {like as likePost, viewMoreComments} from '../../../redux/modules/story';
import LogStory from '../../Popup/Log';

const {FacebookShareButton, TwitterShareButton} = ShareButtons;

@connect((state) => ({
  creatingNewComment: state.story.creatingNewComment,
  path: state.routing.locationBeforeTransitions.pathname,
}), {
  likePost,
  viewMoreComments,
})

class PostFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      parent_id: 0,
      showReply: false,
      showComment: false,
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.loadLikeInfo = this.loadLikeInfo.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.reply = this.reply.bind(this);
    this.replyComments = this.replyComments.bind(this);
    this.openCommentBlock = this.openCommentBlock.bind(this);
    // this.showMoreComments = this.showMoreComments.bind(this);
  }

  // componentWillUpdate(nextProps, nextState) {}

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.creatingNewComment === this.props.creatingNewComment) {
      this.setState({showReply: false});
      return true;
    }
    return true;
  }

  Close() {
    this.setState({showModal: false});
  }

  Open() {
    this.setState({showModal: true});
  }

  openCommentBlock() {
    this.setState({showComment: true});
  }

  loadLikeInfo(people_list) {
    const {authorizedUser} = this.props;
    const friends = [];
    let result;
    const is_Friend = people_list.some(people => people.user.is_friend);
    const is_Owner = people_list.some(people => people.user.id === authorizedUser.id);
    const is_Not_Owner = people_list.every(people => people.user.id !== authorizedUser.id);

    if (is_Owner && !is_Friend) {
      if (people_list.length - 1 === 0) {
        people_list.map(people => {
          if (people.user.id === authorizedUser.id) {
            result = people.user.fullName;
          }
        });
      } else {
        const arrPeople = people_list.length - 1;
        result = `You and ${arrPeople} ${arrPeople === 1 ? 'other' : 'others'}`;
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
          const arrPeople = people_list.length - qtyFriend - 1;
          result = `You, ${friends.slice(0, qtyFriend)} and ${arrPeople} ${arrPeople === 1 ? 'other' : 'others'}`;
        }
      } else if (people_list.length - 1 === 0) {
        result = friends[0];
      } else {
        const arrPeople = people_list.length - qtyFriend;
        result = `${friends.slice(0, qtyFriend)} and ${arrPeople} ${arrPeople === 1 ? 'other' : 'others'}`;
      }
    } else if (is_Not_Owner && !is_Friend) {
      result = people_list.length;
    }
    return result;
  }

  handleKeyPress(event) {
    const {createCommentFunc, authorizedUser, id} = this.props;
    const {parent_id} = this.state;
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      // console.log('comment.js', this.props.id, event.target.value, this.state.parent_id, this.props.authorizedUser.id);
      createCommentFunc(id, event.target.value, parent_id, authorizedUser);
      event.target.value = '';
    }
  }

  reply(id) {
    // if (this.state.showReply) {
    //   this.setState({ parent_id: 0, showReply: !this.state.showReply });
    // } else {
    //   this.setState({ parent_id: id, showReply: !this.state.showReply });
    // }
    this.setState({parent_id: id, showReply: !this.state.showReply});
  }

  replyComments(comments) {
    const arrResult = [];
    let right = 0;

    function treeOfComments(comments) {
      comments && comments.map(comment => {
        // console.log(comment.js)
        // comment.js.rightParent = 0;
        if (comment.rightParent) {
          comment.right = comment.rightParent;
          right = comment.rightParent;
        } else if (comment.parent_id === 0) {
          right = 0;
          comment.right = 0;
        } else {
          comment.right = right;
        }

        arrResult.push(comment);

        if (comment.children) {
          right += 27;
          if (comment.children.length > 1) {
            comment.children.map(item => item.rightParent = right);
          }
          treeOfComments(comment.children);
        }
      });
    }

    treeOfComments(comments);
    return arrResult.map((comment, index) => (
      comment.hidden
        ?
        <div className={'comment' + (comment.right > 0 ? ' comment-reply' : '')} key={comment.id} style={{marginLeft: comment.right}}>
          <i className="replied-arrow"/>
          <img
            src={comment.user.avatar32}
            style={{
              width: comment.right > 0 ? '20px' : '32px',
              minWidth: comment.right > 0 ? '20px' : '32px',
              height: comment.right > 0 ? '20px' : '32px',
            }}
          />
          <div onClick={() => this.props.showReplyFunc(comment.id)} className="text-block collapsed-reply" style={{width: `calc(100% - ${comment.right}px)`, marginTop: '2px'}}>
            <p>{`${comment.user.first_name} ${comment.user.last_name} replied · ${comment.counts.reply} ${comment.counts.reply === 1 ? 'Reply' : 'Replies'} `}</p>
          </div>
        </div>
        :
      <div className={'comment' + (comment.right > 0 ? ' comment-reply' : '')} key={comment.id} style={{marginLeft: comment.right}}>
        <img
          src={comment.user.avatar32}
          style={{
            width: comment.right > 0 ? '20px' : '32px',
            minWidth: comment.right > 0 ? '20px' : '32px',
            height: comment.right > 0 ? '20px' : '32px',
          }}
        />
        <div className="text-block" style={{width: `calc(100% - ${comment.right}px)`}}>
          <p><Link>{`${comment.user.first_name} ${comment.user.last_name}`}</Link>{comment.content}</p>
          <span className="reply" onClick={() => this.reply(comment.id)}>Reply</span>
          <span> · </span>
          <span className="date">{comment.date}</span>

          {/* REPLY COMMENT */}
          {this.state.parent_id === comment.id &&
          <div
            className="reply-comment"
            style={{display: this.state.showReply ? 'flex' : 'none', width: `calc(100% - ${comment.right}px)`}}
          >
            <img src={this.props.authorizedUser.avatar32} alt=""/>
            <Textarea
              placeholder="Write a reply..."
              onKeyDown={this.handleKeyPress}
            />
          </div>
          }

        </div>
        <ButtonToolbar>
          <DropdownButton className="profileMenu-btn" title={''} id={comment.id} noCaret pullRight>
            <li>
              <p>Edit Comment</p>
            </li>
            <li>
              <p>Delete Comment</p>
            </li>
            <li>
              <p>Report Comment</p>
            </li>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    ));
    // return arrResult.map((comment, index) => (
    //   <div className={'comment' + (comment.right > 0 ? ' comment-reply' : '')} key={comment.id} style={{marginLeft: comment.right}}>
    //     <img
    //       src={comment.user.avatar32}
    //       style={{
    //         width: comment.right > 0 ? '20px' : '32px',
    //         minWidth: comment.right > 0 ? '20px' : '32px',
    //         height: comment.right > 0 ? '20px' : '32px',
    //       }}
    //     />
    //     <div className="text-block" style={{width: `calc(100% - ${comment.right}px)`}}>
    //       <p><Link>{`${comment.user.first_name} ${comment.user.last_name}`}</Link>9999</p>
    //     </div>
    //   </div>
    // ));
  }

  render() {
    const {likes, id, comments, post, authorizedUser, paginationComment, counts, path, showReplies} = this.props;
    const {showComment} = this.state;

    const tooltipLike = (
      <Tooltip id="tooltipLike" arrowOffsetLeft={10}>
        {likes.people_list && likes.people_list.map((people) => (
          <div key={people.user.id}>{people.user.fullName}</div>
        ))}
      </Tooltip>
    );

    return (
      <div>
        <div className="post-footer">
          {/*<div className="post-like post-like-active" onClick={() => this.like(id)}>*/}
          <div
            className={!likes.is_liked ? 'post-like' : 'post-like post-like-active'}
            onClick={() => this.props.likeFunc(id)}>
            <i className="post-action-icon"/>
            <span>Like</span>
          </div>
          <div className="post-comment" onClick={() => this.openCommentBlock()}>
            <i className="post-action-icon"/>
            <span>Comment</span>
          </div>
          <div className="post-log">
            <i className="post-action-icon"/>
            <span>Relog</span>
            <LogStory
              storyID={id}
            />
          </div>
          <div className="post-share">
            <div className="wrapper" style={{position: 'relative'}}>
              <i className="post-action-icon"/>
              <span>Share</span>
              <div className="list-of-social-share">
                <FacebookShareButton
                  url={`http://futurama11001111.validbook.org/story/${id}`}
                  quote={post.replace(/<[^>]*>?/g, '')}
                  // picture="https://s3-us-west-2.amazonaws.com/dev.validbook/story-images/2017/10/06/53/OG6yDqhq8fygl51XoUK2jTFzamF_-N3-.jpg"
                  // picture={`${String(window.location)}/${exampleImage}`}
                  className="Demo__some-network__share-button"
                >
                  <div className="share-facebook"><i className="fa fa-facebook" aria-hidden="true"/></div>
                </FacebookShareButton>

                <TwitterShareButton
                  url={`http://futurama11001111.validbook.org/story/${id}`}
                  title={post.replace(/<[^>]*>?/g, '')}
                  // title={`Adding the Tweet button to your website | Справочный центр Твиттера http://futurama11001111.validbook.org/story/${id} с помощью @necheporenko_v`}
                  // picture="https://s3-us-west-2.amazonaws.com/dev.validbook/story-images/2017/10/06/53/OG6yDqhq8fygl51XoUK2jTFzamF_-N3-.jpg"
                  className="Demo__some-network__share-button"
                >
                  <div className="share-twitter"><i className="fa fa-twitter" aria-hidden="true"/></div>
                </TwitterShareButton>
              </div>
            </div>
          </div>
        </div>

        <div className="post-lc">
          <div className="post-like-field" onClick={this.Open} style={{display: likes.qty !== 0 ? 'block' : 'none'}}>
            <i className="post-action-icon"/>
            <OverlayTrigger placement="top" overlay={tooltipLike} id="tooltipLike" arrowOffsetLeft={200}>
              <span>
                {this.loadLikeInfo(likes.people_list)}
              </span>
            </OverlayTrigger>
          </div>

          <div
            className="post-comment-field"
            style={{display: (!showComment && (path === '/' && comments.length === 0)) ? 'none' : 'block'}}
          >
            <div className="comments">
              {(comments.length !== counts.comments && counts.comments > 3) &&
              <div
                className="show-more-comments"
                onClick={() => this.props.showMoreCommentsFunc(id, paginationComment)}
              >
                <p>{`View ${counts.comments - comments.length} more ${counts.comments - comments.length === 1 ? 'comment' : 'comments'}`}</p>
                <p style={{color: '#90949d'}}>{`${comments.length} of ${counts.comments}`}</p>
              </div>
              }
              {this.replyComments(comments)}
              {/*{ comments && comments.map((comment.js) => this.replyComments(comment.js))}*/}
              {/*<div className="comment.js" key={comment.js.id}>*/}
              {/*<img src="http://devianmbanks.validbook.org/cdn/1/avatar/32x32.jpg?t=1498552347" alt=""/>*/}
              {/*<div className="text-block">*/}
              {/*<p><Link>{`${comment.js.user.first_name} ${comment.js.user.last_name}`}</Link>{comment.js.content}</p>*/}
              {/*<span className="reply" onClick={() => this.reply(comment.js.id)}>Reply</span><span> · </span><span className="date">{comment.js.date}</span>*/}
              {/*</div>*/}
              {/*<ButtonToolbar>*/}
              {/*<DropdownButton className="profileMenu-btn" title={''} id={comment.js.id} noCaret pullRight >*/}
              {/*<li>*/}
              {/*<p>Edit Comment</p>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*<p>Delete Comment</p>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*<p>Report Comment</p>*/}
              {/*</li>*/}
              {/*</DropdownButton>*/}
              {/*</ButtonToolbar>*/}
              {/*{this.replyComments(comment.js)}*/}
              {/*</div>*/}

              {/*<div className="comment.js" style={{paddingLeft: '30px'}}>*/}
              {/*<img src="http://devianmbanks.validbook.org/cdn/1/avatar/32x32.jpg?t=1498552347" alt=""/>*/}
              {/*<div className="text-block">*/}
              {/*<p><Link>User1 User2</Link>random text</p>*/}
              {/*<span className="reply">Reply</span><span> · </span><span className="date">10 Jul 2017</span>*/}
              {/*</div>*/}
              {/*<ButtonToolbar>*/}
              {/*<DropdownButton className="profileMenu-btn" title={''} id={7} noCaret pullRight >*/}
              {/*<li>*/}
              {/*<p>Edit Comment</p>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*<p>Delete Comment</p>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*<p>Report Comment</p>*/}
              {/*</li>*/}
              {/*</DropdownButton>*/}
              {/*</ButtonToolbar>*/}
              {/*</div>*/}
              {/*<div className="comment.js" style={{paddingLeft: '60px'}}>*/}
              {/*<img src="http://devianmbanks.validbook.org/cdn/1/avatar/32x32.jpg?t=1498552347" alt=""/>*/}
              {/*<div className="text-block">*/}
              {/*<p><Link>User1 User2</Link>random text</p>*/}
              {/*<span className="reply">Reply</span><span> · </span><span className="date">10 Jul 2017</span>*/}
              {/*</div>*/}
              {/*<ButtonToolbar>*/}
              {/*<DropdownButton className="profileMenu-btn" title={''} id={7} noCaret pullRight >*/}
              {/*<li>*/}
              {/*<p>Edit Comment</p>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*<p>Delete Comment</p>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*<p>Report Comment</p>*/}
              {/*</li>*/}
              {/*</DropdownButton>*/}
              {/*</ButtonToolbar>*/}
              {/*</div>*/}
              {/*<div className="comment.js" style={{paddingLeft: '90px'}}>*/}
              {/*<img src="http://devianmbanks.validbook.org/cdn/1/avatar/32x32.jpg?t=1498552347" alt=""/>*/}
              {/*<div className="text-block">*/}
              {/*<p><Link>User1 User2</Link>random text</p>*/}
              {/*<span className="reply">Reply</span><span> · </span><span className="date">10 Jul 2017</span>*/}


              {/*/!*  REPLY COMMENT *!/*/}


              {/*<div className="reply-comment.js">*/}
              {/*<img src="http://devianmbanks.validbook.org/cdn/1/avatar/32x32.jpg?t=1498552347" alt=""/>*/}
              {/*<Textarea*/}
              {/*placeholder="Write a reply..."*/}
              {/*onKeyDown={this.handleKeyPress}*/}
              {/*/>*/}
              {/*</div>*/}

              {/*</div>*/}
              {/*<ButtonToolbar>*/}
              {/*<DropdownButton className="profileMenu-btn" title={''} id={7} noCaret pullRight >*/}
              {/*<li>*/}
              {/*<p>Edit Comment</p>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*<p>Delete Comment</p>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*<p>Report Comment</p>*/}
              {/*</li>*/}
              {/*</DropdownButton>*/}
              {/*</ButtonToolbar>*/}
              {/*</div>*/}
              {/*<div className="comment.js" style={{paddingLeft: '120px'}}>*/}
              {/*<img src="http://devianmbanks.validbook.org/cdn/1/avatar/32x32.jpg?t=1498552347" alt=""/>*/}
              {/*<div className="text-block">*/}
              {/*<p><Link>User1 User2</Link>random textrandom textrandom</p>*/}
              {/*<span className="reply">Reply</span><span> · </span><span className="date">10 Jul 2017</span>*/}
              {/*</div>*/}
              {/*<ButtonToolbar>*/}
              {/*<DropdownButton className="profileMenu-btn" title={''} id={7} noCaret pullRight >*/}
              {/*<li>*/}
              {/*<p>Edit Comment</p>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*<p>Delete Comment</p>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*<p>Report Comment</p>*/}
              {/*</li>*/}
              {/*</DropdownButton>*/}
              {/*</ButtonToolbar>*/}
              {/*</div>*/}
              {/*<div className="comment.js" style={{paddingLeft: '150px'}}>*/}
              {/*<img src="http://devianmbanks.validbook.org/cdn/1/avatar/32x32.jpg?t=1498552347" alt=""/>*/}
              {/*<div className="text-block">*/}
              {/*<p><Link>User1 User2</Link>random textrandom textrandom </p>*/}
              {/*<span className="reply">Reply</span><span> · </span><span className="date">10 Jul 2017</span>*/}
              {/*</div>*/}
              {/*<ButtonToolbar>*/}
              {/*<DropdownButton className="profileMenu-btn" title={''} id={7} noCaret pullRight >*/}
              {/*<li>*/}
              {/*<p>Edit Comment</p>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*<p>Delete Comment</p>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*<p>Report Comment</p>*/}
              {/*</li>*/}
              {/*</DropdownButton>*/}
              {/*</ButtonToolbar>*/}
              {/*</div>*/}
              {/*<div className="comment.js" style={{paddingLeft: '180px'}}>*/}
              {/*<img src="http://devianmbanks.validbook.org/cdn/1/avatar/32x32.jpg?t=1498552347" alt=""/>*/}
              {/*<div className="text-block">*/}
              {/*<p><Link>User1 User2</Link>random textrandom</p>*/}
              {/*<span className="reply">Reply</span><span> · </span><span className="date">10 Jul 2017</span>*/}
              {/*</div>*/}
              {/*<ButtonToolbar>*/}
              {/*<DropdownButton className="profileMenu-btn" title={''} id={7} noCaret pullRight >*/}
              {/*<li>*/}
              {/*<p>Edit Comment</p>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*<p>Delete Comment</p>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*<p>Report Comment</p>*/}
              {/*</li>*/}
              {/*</DropdownButton>*/}
              {/*</ButtonToolbar>*/}
              {/*</div>*/}
            </div>

            <div className="new-comment">
              <img src={this.props.authorizedUser.avatar32} alt=""/>
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
            {likes.people_list.map((people) => (
              <div key={people.user.id} className="people-like-card">
                <Link to={people.user.slug}>
                  <img src={people.user.avatar}/>
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

PostFooter.propTypes = {
  likes: PropTypes.object,
  id: PropTypes.number,
  createComment: PropTypes.func,
  post: PropTypes.string,
  likeFunc: PropTypes.func,
  comments: PropTypes.array,
  authorizedUser: PropTypes.object,
  creatingNewComment: PropTypes.bool,
  showMoreCommentsFunc: PropTypes.func,
  paginationComment: PropTypes.number,
  counts: PropTypes.object,
};

export default PostFooter;
