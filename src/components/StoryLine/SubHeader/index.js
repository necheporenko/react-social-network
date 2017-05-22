import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './index.scss';

@connect((state) => ({
  activeUser: state.sign.activeUser
}), {})

class SubHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imageAvatar: 'http://devianmbanks.validbook.org/cdn/460/avatar/230x230.jpg?t=1486723970',
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
    // const { first_name, last_name } = this.props.user;
    const { first_name, last_name, slug, avatar_url } = this.props.activeUser;
    // const link = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;
    const { imageAvatar } = this.state;
    const { imageCover } = this.state;


    return (
      <div className="subHeader">
        <img src={imageCover} />
        <div className="wrapper">
          <div className="subHeader-userAvatar">
            <Link to={`/${slug}`}>
              <img src={avatar_url} />
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
        {/* <div className="subHeader-bg"></div> */}
      </div>
    );
  }
}

SubHeader.propTypes = {
  activeUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    slug: PropTypes.string,
    id: PropTypes.number
  })
};

export default SubHeader;
