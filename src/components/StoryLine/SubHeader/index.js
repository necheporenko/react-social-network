import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { followRequestedUser, unfollowRequestedUser } from '../../../redux/modules/user';
import { showPopUp } from '../../../redux/modules/form';
import ChangeCoverImage from '../../Popup/ChangeCoverImage';
import './index.scss';

@connect((state) => ({
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
      imageAvatar: 'http://devianmbanks.validbook.org/cdn/460/avatar200/230x230.jpg?t=1486723970',
      imageCover: this.props.requestedUser.cover,
    };
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleCoverChange = this.handleCoverChange.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
    this.updateUserCover = this.updateUserCover.bind(this);
  }

  handleAvatarChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imageAvatar: reader.result
      });
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
    console.log('NEW IMAGE', img);
    this.setState({
      imageCover: img
    });
  }

  render() {
    // const { first_name, last_name } = this.props.authorizedUser;
    const { first_name, last_name, slug, avatar200, isFollowing, id } = this.props.requestedUser;
    // const link = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;
    const { imageAvatar } = this.state;
    const { imageCover } = this.state;


    return (
      <div className="subHeader">
        <div className="imageCover" style={{backgroundImage: `url(${imageCover})`}}>
          {/*<img src={imageCover} />*/}
        </div>
        <div className="wrapper">
          <div className="subHeader-userAvatar">
            <Link to={`/${slug}`}>
              <img src={avatar200} />
            </Link>
            <div className="subHeader-add">
              <input type="file" onChange={(e) => this.handleAvatarChange(e)}/>
              <a href="#">
                <i></i>
                Update Profile Picture
              </a>
            </div>
          </div>
          <div className="subHeader-cover">
            <i></i>
            <div className="cover-btn">
              <input type="file" onChange={(e) => this.handleCoverChange(e)}/>
              <a>
                <i></i>
                Update Cover Photo
              </a>
            </div>
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
    avatar200: PropTypes.string,
    isFollowing: PropTypes.boolean,
  })
};

export default SubHeader;
