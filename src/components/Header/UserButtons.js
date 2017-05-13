import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { ButtonToolbar, DropdownButton } from 'react-bootstrap';

const UserButtons = (props) => {
  const { slug, first_name } = props.user;
  const { logoutUser } = props;
  return (
    <nav className="header-navigation">
      <div className="extension">
        <button>Install extension</button>
      </div>

      <div className="icons">
        <div className="wrap-icon-search">
          <a href="#">
            <div className="icon-search"></div>
          </a>
        </div>
        <div className="wrap-icon-mail">
          <Link to="/messages">
            <div className="icon-mail"></div>
          </Link>
        </div>
        <div className="wrap-icon-bell">
          <ButtonToolbar>
            <DropdownButton className="bootstrap-pure-btn" bsStyle="default" title={''} id={1} noCaret pullRight >
              <div className="notification-box">
                <div>
                  <h4>Notifications</h4>
                  <a href="#">Mark as Read</a>
                </div>
                <hr/>
                <ul>
                  <li>
                    <div>
                      <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                      <h6><a href="#"><b>Name Surname</b></a>commented on your story</h6>
                    </div>
                    <p>21 Mar 2017</p>
                  </li>
                  <li>
                    <div>
                      <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                      <h6><a href="#"><b>Name Surname</b></a> liked your <a href=""> story</a></h6>
                    </div>
                    <p>21 Mar 2017</p>
                  </li>
                  <li>
                    <div>
                      <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
                      <h6><a href="#"><b>Name Surname</b></a>commented on your story</h6>
                    </div>
                    <p>21 Mar 2017</p>
                  </li>
                </ul>
                <div style={{ paddingTop: '7px' }}>
                  <Link to="/notifications">See all</Link>
                  <Link to="/settings/notifications">Settings</Link>
                </div>
              </div>
            </DropdownButton>
          </ButtonToolbar>
        </div>
      </div>

      <div className="infouser">
        <Link to={`/${slug}`}>
          <span>{first_name}</span>
          <img src="http://devianmbanks.validbook.org/cdn/460/avatar/32x32.jpg?t=1486723970" alt="" />
        </Link>
      </div>

      <div className="profile-menu">
        <ButtonToolbar>
          <DropdownButton className="bootstrap-pure-btn" bsStyle="default" title={''} id={2} noCaret pullRight >
            <Link to="/settings">Settings</Link>
            <Link to="/settings/privacy">Privacy Control Center</Link>
            <a onClick={logoutUser}>Sign out</a>
          </DropdownButton>
        </ButtonToolbar>
      </div>

    </nav>
  );
};

UserButtons.propTypes = {
  user: PropTypes.object,
  logoutUser: PropTypes.func
};

export default UserButtons;
