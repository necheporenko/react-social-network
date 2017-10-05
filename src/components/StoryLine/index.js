import React, {Component, PropTypes} from 'react';
import BooksTreeContainer from '../../containers/BooksTreeContainer';
import Stream from './Stream/index';
import InfoBloks from './InfoBlocks/index';
// import PeoplePhotos from './InfoBlocks/PeoplePhotos';
import './index.scss';

// let documentHeight;

class StoryLine extends Component {
  
  constructor() {
    super();

    this.state = {
      fixedTop: false,
      fixedBottom: false,
      scrollUp: null
    };
    this.getCoords = this.getCoords.bind(this);
    this.scrollTop = 0;
  }

  getCoords() {
    const {fixedBottom, fixedTop} = this.state;
    const elem = this.refs.infoblocks;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const box = elem.getBoundingClientRect();

    if (scrollTop > 410) {
      if (this.scrollTop > scrollTop && !fixedTop && box.y >= 116) {
        this.setState({
          fixedTop: true
        });
      } else if (!fixedBottom && this.scrollTop < scrollTop && box.y <= -59) {
        this.setState({
          fixedBottom: true
        });
      } else if (this.scrollTop > scrollTop && fixedBottom) {
        this.setState({
          fixedBottom: false,
          scrollUp: true,
          fixedTop: false
        });
      } else if (this.scrollTop < scrollTop && fixedTop) {
        this.setState({
          fixedBottom: false,
          scrollUp: false,
          fixedTop: false
        });
      }
    } else if (scrollTop <= 237 && this.state.fixedTop && box.y === 116) {
      this.setState({
        fixedTop: false,
        scrollUp: null
      });
    }
    
    this.scrollTop = scrollTop;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.getCoords, false);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.getCoords);
  }
  render() {
    const {fixedTop, fixedBottom, scrollUp} = this.state;
    const {
      requestedUser,
      requestedUserProfile,
      following,
      followers,
      people,
      bookTreeArr,
      authorizedUser,
      storiesArr,
      createStory,
      loadStories,
      loadNextStories,
      fixedBlocks,
      humanCard
    } = this.props;

    const top = () => {
      if (!fixedBottom && fixedTop) {
        return 116;
      } else if (!fixedBottom && scrollUp) {
        return this.scrollTop - 59;
      } else if (!fixedBottom && scrollUp === false) {
        return this.scrollTop + 116;
      }

      return null;
    };

    const bottom = () => {
      if (!fixedTop && fixedBottom) {
        return 0;
      }

      return null;
    };

    return (
      <div className="storyLine">
        <div className="wrap-storyLine">
          <div ref="infoblocks"
            style={{
              //top: fixedBottom ? -59 : (fixedTop ? 116 : this.scrollTop - 59),
              top: top(),
              position: !fixedTop && !fixedBottom ? 'absolute' : 'fixed',
              width: 320,
              // bottom: fixedTop ? null : (fixedBottom ? 0 : null)
              bottom: bottom()
              //bottom: fixedBlocks ? 0 : null
              // left: 'calc(50% + 275px)',
              // left: '160px',
              // top: fixedBlocks ? 115 : 354 - scrollTop,
              // position: 'fixed',
            }}
          >
            <InfoBloks
              requestedUser={requestedUser}
              requestedUserProfile={requestedUserProfile}
              following={following}
              followers={followers}
              people={people}
              humanCard={humanCard}
            />
          </div>
          <Stream
            style={{ marginLeft: !fixedBottom || !fixedTop ? 320 : null }}
            authorizedUser={authorizedUser}
            requestedUser={requestedUser}
            storiesArr={storiesArr}
            createStory={createStory}
            loadStories={loadStories}
            loadNextStories={loadNextStories}
          />
          {/*<PeoplePhotos*/}
          {/*requestedUser={this.props.requestedUser}*/}
          {/*following={this.props.following}*/}
          {/*followers={this.props.followers}*/}
          {/*people={this.props.people}*/}
          {/*/>*/}
          <div style={{width: '220px'}}>
            <BooksTreeContainer
              booksTreeTop={fixedBlocks ? 'wrapper wrapper-fixed' : 'wrapper'}
              requestedUser={requestedUser}
              bookTreeArr={bookTreeArr}
            />
          </div>
        </div>
      </div>
    );
  }
}

StoryLine.propTypes = {
  authorizedUser: PropTypes.object,
  requestedUser: PropTypes.object,
  requestedUserProfile: PropTypes.object,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
  loadNextStories: PropTypes.func,
  bookTreeArr: PropTypes.array,
  // userProfile: PropTypes.object,
  followers: PropTypes.shape({
    users: PropTypes.array
  }),
  following: PropTypes.shape({
    users: PropTypes.array
  }),
  people: PropTypes.array
};

export default StoryLine;
