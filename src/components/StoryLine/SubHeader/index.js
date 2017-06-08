import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './index.scss';

@connect((state) => ({
  requestedUser: state.sign.requestedUser,

}), {})

class SubHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imageAvatar: 'http://devianmbanks.validbook.org/cdn/460/avatar200/230x230.jpg?t=1486723970',
      imageCover: 'http://devianmbanks.validbook.org/images/default-cover-img.jpg'
    };
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleCoverChange = this.handleCoverChange.bind(this);
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
        imageCover: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    // const { first_name, last_name } = this.props.authorizedUser;
    const { first_name, last_name, slug, avatar200 } = this.props.requestedUser;
    // const link = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;
    const { imageAvatar } = this.state;
    const { imageCover } = this.state;


    return (
      <div className="subHeader">
        <div className="imageCover">
          <img src={imageCover} />
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
          //   onClick={
          //     !people.isFollowing ?
          //       () => {
          //         this.follow(people.id);
          //       }
          //       :
          //       () => {
          //         this.unfollow(people.id);
          //       }
          //   }
        >
          {/*{!people.isFollowing ? 'Follow' : 'Following'}*/}
          Following
          <span></span>
        </div>
        {/* <div className="subHeader-bg"></div> */}
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
    avatar200: PropTypes.string
  })
};

export default SubHeader;
