import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import NavigationUserInfo from './NavigationUserInfo';
import './index.scss';

let savePositionTop;

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
}), {})

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: null
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.saveScroll = this.saveScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.saveScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }


  handleScroll(e) {
    const scrollTop = document.documentElement.scrollTop || (e.target || e.srcElement).body.scrollTop;
    savePositionTop = scrollTop;
    this.setState({scrollTop});
  }

  saveScroll() {
    // console.log(`saveScroll:${savePositionTop}`);
    this.setState({scrollTop: savePositionTop});
  }

  render() {
    const {first_name, last_name, slug, avatar32, isFollowing, id} = this.props.requestedUser;
    const {scrollTop} = this.state;

    const chooseNav = () => {
      let Nav;
      let displayUser;

      if (scrollTop <= 275 || !scrollTop) {
        Nav = 'navigation';
        displayUser = 'navigation-infouser-none';
      } else {
        Nav = 'navigation navigation-fixed';
        displayUser = 'navigation-infouser';
      }
      const result = {posTop: Nav, show: displayUser};
      return result;
    };

    const navigation = chooseNav();

    return (
      <div className={navigation.posTop} style={{boxShadow: id ? '0 2px 4px 0 rgba(0, 0, 0, 0.1)' : 'none'}}>
        <div className="navigation-wrap">
          <Link
            to={`/${slug}`}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Storyline
          </Link>
          <Link
            to={`/${slug}/books`}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Books
          </Link>
          <Link
            to={`/${slug}/people`}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            People
          </Link>
          <Link
            to={`/${slug}/photos`}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Photos
          </Link>
          <Link
            to={`/${slug}/documents`}
            onlyActiveOnIndex={true}
            activeClassName="active"
          >
            Documents
          </Link>
        </div>

        {this.props.requestedUser.id &&
        <div>
          {this.props.authorizedUser.id !== this.props.requestedUser.id &&
          <div
            className="btn-following btn-message"
            onClick={() => this.openConversation(id, this.props.requestedUser)}
          >
            <Link // to="/messages/new"
            >
              <div><i/>Chat</div>
            </Link>
          </div>
          }
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
            <span/>
          </div>
        </div>
        }
        {/* {showName &&
          <NavigationInfoUser
            userName={`${first_name} ${last_name}`}
            link={link}
            displayUser={navigation.show}
          />
        } */}
        <NavigationUserInfo
          userName={`${first_name} ${last_name}`}
          avatar32={avatar32}
          link={`/${slug}`}
          displayUser={navigation.show}
        />
      </div>

    );
  }
}

Navigation.propTypes = {
  requestedUser: PropTypes.object,
};
