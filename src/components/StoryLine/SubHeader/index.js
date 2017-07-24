import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Link } from 'react-router';
import { followRequestedUser, unfollowRequestedUser } from '../../../redux/modules/user';
import { showPopUp } from '../../../redux/modules/form';
import { uploadAvatar, uploadAvatarBase64, uploadUserCover, uploadUserCoverBase64, getUser, getUserSlug, } from '../../../redux/modules/user';
import ChangeCoverImage from '../../Popup/ChangeCoverImage';
import ChangeAvatar from '../../Popup/ChangeAvatar';
import './index.scss';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(getUser(getUserSlug(getState()))));
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
  isAuthenticated: state.user.isAuthenticated,
  visible: state.forms.visible,
  currentImage: state.forms.currentImage,
  activePopUp: state.forms.activePopUp,
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

  render() {
    const { first_name, last_name, slug, isFollowing, id, avatar230, cover } = this.props.requestedUser;

    return (
      <div className="subHeader">
        <div className="imageCover" style={{backgroundImage: `url(${cover})`}}/>
        <div className="wrapper">
          <div className="subHeader-userAvatar">
            <Link to={`/${slug}`}>
              <img src={avatar230} />
            </Link>
            <div className="subHeader-add">
              { this.props.isAuthenticated && this.props.authorizedUser.id === this.props.requestedUser.id &&
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
            { this.props.isAuthenticated && this.props.authorizedUser.id === this.props.requestedUser.id &&
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
        <div
          className="btn-following"
          onClick={
            !isFollowing ?
              () => this.followUser(id)
              :
              () => this.unfollowUser(id)
          }>
          <div>
            {!isFollowing ? 'Follow' : 'Following'}
          </div>
          <span/>
        </div>

        { this.props.activePopUp === 'ChangeCoverImage' &&
          <ChangeCoverImage
            showPopUp={this.props.showPopUp}
            visible={this.props.visible}
            currentImage={this.props.currentImage}
            uploadUserCover={this.props.uploadUserCover}
            uploadUserCoverBase64={this.props.uploadUserCoverBase64}
          />
        }

        { this.props.activePopUp === 'ChangeAvatar' &&
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
  showPopUp: PropTypes.func,
};
