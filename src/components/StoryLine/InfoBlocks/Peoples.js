import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { showActivePeopleTab } from '../../../redux/modules/form';

@connect((state) => ({
  activePeopleTab: state.forms.activePeopleTab,
}), {
  showActivePeopleTab,
})


export default class Peoples extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'people'
    };

    this.showPeopleTab = this.showPeopleTab.bind(this);
  }

  showPeopleTab(tab) {
    this.setState({ activeTab: tab });
    this.props.showActivePeopleTab(tab);
  }

  render() {
    const { friends, following, followers } = this.props;

    return (
      <div className="infoblocks-peoples">
        <div className="title-infoblocks">
          <span className="peoples-icon"></span>
          <div>
            <div
              className={this.state.activeTab === 'people' ? 'people-tab-active' : ''}
              onClick={() => this.showPeopleTab('people')}
            >
              People
            </div>
            |
            <div
              className={this.state.activeTab === 'following' ? 'people-tab-active' : ''}
              onClick={() => { this.showPeopleTab('following'); }}
            >
              Following<span >{` ${following.count}`}</span>
            </div>
            |
            <div
              className={this.state.activeTab === 'followers' ? 'people-tab-active' : ''}
              onClick={() => { this.showPeopleTab('followers'); }}
            >
              Followers<span>{` ${followers.count}`}</span>
            </div>
          </div>
        </div>
        { this.props.activePeopleTab === 'people' &&
          <div className="people-gallery">
            {friends && friends.map((friend) => (
              <div className="people-avatar" key={friend.id}>
                <Link to={`/${friend.slug}`}>
                  <img src={friend.avatar}/>
                  <div className="people-avatar-user-name">{`${friend.first_name} ${friend.last_name}`}</div>
                </Link>
              </div>
            ))}
          </div>
        }
        { this.props.activePeopleTab === 'following' &&
          <div className="people-gallery">
            {following.users && following.users.map((friend) => (
              <div className="people-avatar" key={friend.id}>
                <Link to={`/${friend.slug}`}>
                  <img src={friend.avatar}/>
                  <div className="people-avatar-user-name">{`${friend.first_name} ${friend.last_name}`}</div>
                </Link>
              </div>
            ))}
          </div>
        }

        { this.props.activePeopleTab === 'followers' &&
          <div className="people-gallery">
            {followers.users && followers.users.map((friend) => (
              <div className="people-avatar" key={friend.id} >
                <Link to={`/${friend.slug}`}>
                  <img src={friend.avatar}/>
                  <div className="people-avatar-user-name">{`${friend.first_name} ${friend.last_name}`}</div>
                </Link>
              </div>
            ))}
          </div>
        }
      </div>
    );
  }
}

Peoples.propTypes = {
  friends: PropTypes.array,
  followers: PropTypes.object,
  following: PropTypes.object,
  activePeopleTab: PropTypes.string,
  showActivePeopleTab: PropTypes.func,
};
