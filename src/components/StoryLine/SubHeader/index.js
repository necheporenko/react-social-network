import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { followRequestedUser, unfollowRequestedUser } from '../../../redux/modules/user';
import { showPopUp } from '../../../redux/modules/form';
import ChangeCoverImage from '../../Popup/ChangeCoverImage';
import ChangeAvatar from '../../Popup/ChangeAvatar';
import './index.scss';

// let newImageAvatar = this.props.requestedUser.avatar230;

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
  visible: state.forms.visible,
  currentImage: state.forms.currentImage,
  activePopUp: state.forms.activePopUp,
}), {
  followRequestedUser,
  unfollowRequestedUser,
  showPopUp
})

class SubHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imageAvatar: this.props.requestedUser.avatar230,
      imageCover: this.props.requestedUser.cover,
    };
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleCoverChange = this.handleCoverChange.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
    this.updateUserCover = this.updateUserCover.bind(this);
    this.updateUserAvatar = this.updateUserAvatar.bind(this);
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
        // imageCover: reader.result
      });
      this.props.showPopUp(true, reader.result, 'ChangeCoverImage');
    };
    reader.readAsDataURL(file);
  }

  followUser(id) {
    this.props.followRequestedUser(id);
  }

  unfollowUser(id) {
    this.props.unfollowRequestedUser(id);
  }

  updateUserCover(img) {
    this.setState({
      imageCover: img
    });
  }

  updateUserAvatar(img) {
    console.log('NEW IMAGE', img);
    this.setState({
      imageAvatar: img
    });
    // newImageAvatar = img;
  }

  render() {
    // const { first_name, last_name } = this.props.authorizedUser;
    const { first_name, last_name, slug, isFollowing, id } = this.props.requestedUser;
    // const link = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;
    const { imageAvatar } = this.state;
    const { imageCover } = this.state;

    return (
      <div className="subHeader">
        {/*<div className="imageCover" style={{backgroundImage: `url(${imageCover})`}}>*/}
        <div className="imageCover">
          <img src={imageCover} />
        </div>
        <div className="wrapper">
          <div className="subHeader-userAvatar">
            <Link to={`/${slug}`}>
              <img src={imageAvatar} />
            </Link>
            <div className="subHeader-add">
              { this.props.authorizedUser.id === this.props.requestedUser.id &&
              <div>
                <input type="file" onChange={(e) => this.handleAvatarChange(e)}/>
                <a href="#">
                  <i></i>
                  Update Profile Picture
                </a>
              </div>
              }
            </div>
          </div>
          <div className="subHeader-cover">
            { this.props.authorizedUser.id === this.props.requestedUser.id &&
            <div>
              <i></i>
              <div className="cover-btn">
                <input type="file" onChange={(e) => this.handleCoverChange(e)}/>
                <a>
                  <i></i>
                  Update Cover Photo
                </a>
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
              () => {
                this.follow(id);
              }
              :
              () => {
                this.unfollow(id);
              }
          }>
          <div>
            {!isFollowing ? 'Follow' : 'Following'}
          </div>
          <span></span>
        </div>
        {/* <div className="subHeader-bg"></div> */}

        { this.props.activePopUp === 'ChangeCoverImage' &&
          <ChangeCoverImage
            showPopUp={this.props.showPopUp}
            visible={this.props.visible}
            currentImage={this.props.currentImage}
            updateUserCover={this.updateUserCover}
          />
        }
        { this.props.activePopUp === 'ChangeAvatar' &&
          <ChangeAvatar
            showPopUp={this.props.showPopUp}
            visible={this.props.visible}
            currentImage={this.props.currentImage}
            updateUserAvatar={this.updateUserAvatar}
          />
        }

      </div>
    );
  }
}

SubHeader.propTypes = {
  requestedUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    slug: PropTypes.string,
    id: PropTypes.number,
    avatar230: PropTypes.string,
    cover: PropTypes.string,
    isFollowing: PropTypes.boolean,
  }),
  authorizedUser: PropTypes.object,
  activePopUp: PropTypes.string,
  visible: PropTypes.bool,
  currentImage: PropTypes.string,
};

export default SubHeader;
