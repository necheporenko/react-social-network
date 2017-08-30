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
      dropdownUserCover: false,
      currentUserCoverColor: '',
    };
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleCoverChange = this.handleCoverChange.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
    this.cleanInputAvatar = this.cleanInputAvatar.bind(this);
    this.cleanInputCover = this.cleanInputCover.bind(this);
    this.openConversation = this.openConversation.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.setCoverColor = this.setCoverColor.bind(this);
  }

  setCoverColor(color) {
    this.setState({currentUserCoverColor: color});
    this.props.uploadUserCover(null, color.substring(1));
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

    return (
      <div className="subHeader">
        <div
          className="imageCover"
          style={{
            backgroundColor: cover && cover.color ? `#${cover.color}` : '#fff',
            backgroundImage: cover && cover.picture ? `url(${cover.picture})` : null
          }}
        />
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
            <div tabIndex={0} onBlur={this.onBlur}>
              <i/>
              <div
                className="cover-btn" onClick={() => this.showDropdown()}
                style={{opacity: this.state.dropdownUserCover ? 1 : null}}
              >
                {/*<input type="file" onChange={(e) => this.handleCoverChange(e)} ref={el => this.inputCover = el}/>*/}
                <div style={{color: '#fff'}}><i/>Update Cover Photo</div>
              </div>
              <div className="cover-dropdown" style={{display: this.state.dropdownUserCover ? 'block' : 'none'}}>
                <div className="triangle"/>
                <ul>
                  <li style={{marginTop: '5px'}}>
                    <div className="wrapper-upload-cover">
                      <h5>Upload a photo</h5>
                      <input type="file" onChange={(e) => this.handleCoverChange(e)} ref={el => this.inputCover = el}/>
                    </div>
                  </li>
                  <hr/>
                  <li style={{fontSize: '12px'}}>
                    or set a color
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
          <div className="subHeader-userName">
            <Link to={`/${slug}`}>{first_name} {last_name}</Link>
          </div>
        </div>

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
