import React, {Component, PropTypes} from 'react';
import BooksTreeContainer from '../../containers/BooksTreeContainer';
import Stream from './Stream/index';
import InfoBloks from './InfoBlocks/index';
// import PeoplePhotos from './InfoBlocks/PeoplePhotos';
import './index.scss';

class StoryLine extends Component {
  
  constructor() {
    super();

    this.state = {
      fixedTop: false,
      fixedBottom: false
    };
    this.getCoords = this.getCoords.bind(this);
    this.scrollTop = 0;
    this.topInfoBlock = 0;
  }

  getCoords() {
    const {fixedBlocks} = this.props;
    const {fixedBottom, fixedTop} = this.state;
    const elem = this.refs.infoblocks;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const box = elem.getBoundingClientRect();
    const topInfoBlock = box.top + scrollTop;


    if (fixedBlocks) {
      if (elem.style.position === 'absolute' && topInfoBlock - scrollTop >= 114) {
        this.setState({
          fixedTop: true
        });
      } else if (elem.style.position === 'absolute' && scrollTop - topInfoBlock >= 57) {
        this.setState({
          fixedBottom: true
        });
      } else if (elem.style.position === 'fixed' && this.scrollTop > scrollTop && fixedBottom) {
        this.setState({
          fixedBottom: false
        });
      } else if (elem.style.position === 'fixed' && this.scrollTop < scrollTop && fixedTop) {
        this.setState({
          fixedTop: false
        });
      }
    } else if (!fixedBlocks && fixedTop) {
      this.setState({
        fixedTop: false
      });
    }
    
    this.scrollTop = scrollTop;
    this.topInfoBlock = topInfoBlock;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.getCoords, false);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.getCoords);
  }
  render() {
    const {fixedTop, fixedBottom} = this.state;
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
      } else if (fixedBottom && !fixedTop) { 
        return -59; 
      } else if (!fixedTop && !fixedBottom && this.topInfoBlock && fixedBlocks) {
        return this.topInfoBlock;
      }
 
      return null; 
    };

    return (
      <div className="storyLine">
        <div className="wrap-storyLine">
          <div ref="infoblocks"
            style={{
              top: top(),
              position: !fixedTop && !fixedBottom ? 'absolute' : 'fixed',
              width: 320,
              //top: 116,
              //position: 'fixed'
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
