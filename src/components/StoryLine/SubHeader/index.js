import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import {getConversationByUserPage} from '../../../redux/modules/profile';
import {showPopUp} from '../../../redux/modules/form';
import {
  uploadAvatar, uploadAvatarBase64, uploadUserCover, uploadUserCoverBase64, getUser, getUserSlug,
  followRequestedUser, unfollowRequestedUser
} from '../../../redux/modules/user';
import ChangeCoverImage from '../../Popup/ChangeCoverImage';
import ChangeAvatar from '../../Popup/ChangeAvatar';
import './index.scss';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
  isAuthenticated: state.user.isAuthenticated,
  visible: state.forms.visible,
  currentImage: state.forms.currentImage,
  activePopUp: state.forms.activePopUp,
  conversation: state.profile.conversation,
}), {
  followRequestedUser,
  unfollowRequestedUser,
  showPopUp,
  uploadAvatar,
  uploadAvatarBase64,
  uploadUserCover,
  uploadUserCoverBase64,
  getUser,
  getUserSlug,
  getConversationByUserPage,
})

export default class SubHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
    };
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleCoverChange = this.handleCoverChange.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
    this.cleanInputAvatar = this.cleanInputAvatar.bind(this);
    this.cleanInputCover = this.cleanInputCover.bind(this);
    this.openConversation = this.openConversation.bind(this);
  }

  handleAvatarChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
      });
      this.props.showPopUp(true, reader.result, 'ChangeAvatar');
      this.cleanInputAvatar();
    };
    reader.readAsDataURL(file);
  }

  handleCoverChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
      });
      this.props.showPopUp(true, reader.result, 'ChangeCoverImage');
      this.cleanInputCover();
    };
    reader.readAsDataURL(file);
  }

  followUser(id) {
    this.props.followRequestedUser(id);
  }

  unfollowUser(id) {
    this.props.unfollowRequestedUser(id);
  }

  cleanInputAvatar() {
    this.inputAvatar.value = '';
  }

  cleanInputCover() {
    this.inputCover.value = '';
  }

  openConversation(id, user) {
    Promise.resolve(this.props.getConversationByUserPage(id, user))
      .then(value => {
        if (value.data.conversation_id) {
          console.log(1);
          browserHistory.push(`/messages/${value.data.conversation_id}`);
        } else {
          console.log(0);
          browserHistory.push('/messages/new');
        }
      });
  }

  render() {
    const {first_name, last_name, slug, is_follow, id, avatar250, cover} = this.props.requestedUser;
    const {bookPage} = this.props;

    return (
      <div className="subHeader">
        <div className="imageCover" style={{backgroundColor: '#fff', backgroundImage: `url(${cover})`}}/>
        {!bookPage &&
        <div className="wrapper">

          <div className="subHeader-userAvatar">
            <Link to={`/${slug}`} style={{boxShadow: id ? '0px 1px 3px 0px rgba(0, 0, 0, 0.15)' : 'none'}}>
              {avatar250 && <img src={avatar250}/>}
            </Link>

            <div className="subHeader-add">
              {this.props.isAuthenticated && this.props.authorizedUser.id === this.props.requestedUser.id &&
              <div>
                <input type="file" onChange={(e) => this.handleAvatarChange(e)} ref={(el) => this.inputAvatar = el}/>
                <a href="#">
                  <i/>
                  Update Profile Picture
                </a>
              </div>
              }
            </div>
          </div>

          <div className="subHeader-cover">
            {this.props.isAuthenticated && this.props.authorizedUser.id === this.props.requestedUser.id &&
            <div>
              <i/>
              <div className="cover-btn">
                <input type="file" onChange={(e) => this.handleCoverChange(e)} ref={(el) => this.inputCover = el}/>
                <div style={{color: '#fff'}}><i/>Update Cover Photo</div>
              </div>
            </div>
            }
          </div>
          <div className="subHeader-userName">
            <Link to={`/${slug}`}>{first_name} {last_name}</Link>
          </div>
        </div>
        }

        {bookPage && null}
        {/*<div className="subHeader-bookName">*/}
        {/*<Link to={`/${slug}`}>Book Name</Link>*/}
        {/*</div>*/}


        {this.props.requestedUser.id &&
        <div>
          {this.props.authorizedUser.id !== this.props.requestedUser.id &&
          <div
            className="btn-following btn-message"
            onClick={() => this.openConversation(id, this.props.requestedUser)}
          >
            <Link // to="/messages/new"
            >
              <div><i/>Message</div>
            </Link>
          </div>
          }

          {/*<div*/}
          {/*className="btn-following"*/}
          {/*onClick={*/}
          {/*!is_follow ?*/}
          {/*() => this.followUser(id)*/}
          {/*:*/}
          {/*() => this.unfollowUser(id)*/}
          {/*}>*/}
          {/*<div>*/}
          {/*{!is_follow ? 'Follow' : 'Following'}*/}
          {/*</div>*/}
          {/*<span/>*/}
          {/*</div>*/}
        </div>
        }

        {this.props.activePopUp === 'ChangeCoverImage' &&
        <ChangeCoverImage
          showPopUp={this.props.showPopUp}
          visible={this.props.visible}
          currentImage={this.props.currentImage}
          uploadUserCover={this.props.uploadUserCover}
          uploadUserCoverBase64={this.props.uploadUserCoverBase64}
        />
        }

        {this.props.activePopUp === 'ChangeAvatar' &&
        <ChangeAvatar
          showPopUp={this.props.showPopUp}
          visible={this.props.visible}
          currentImage={this.props.currentImage}
          uploadAvatar={this.props.uploadAvatar}
          uploadAvatarBase64={this.props.uploadAvatarBase64}
        />
        }

      </div>
    );
  }
}

SubHeader.propTypes = {
  requestedUser: PropTypes.object,
  authorizedUser: PropTypes.object,
  uploadAvatar: PropTypes.func,
  uploadAvatarBase64: PropTypes.func,
  uploadUserCover: PropTypes.func,
  uploadUserCoverBase64: PropTypes.func,
  activePopUp: PropTypes.string,
  visible: PropTypes.bool,
  currentImage: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  followRequestedUser: PropTypes.func,
  unfollowRequestedUser: PropTypes.func,
  getConversationByUserPage: PropTypes.func,
  showPopUp: PropTypes.func,
};

SubHeader.defaultProps = {
  bookPage: false
};
