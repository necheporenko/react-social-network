import React, {Component, PropTypes} from 'react';
import BooksTreeContainer from '../../containers/BooksTreeContainer';
import Stream from './Stream/index';
import InfoBloks from './InfoBlocks/index';
// import PeoplePhotos from './InfoBlocks/PeoplePhotos';
import './index.scss';

// let documentHeight;

class StoryLine extends Component {
  render() {
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

    return (
      <div className="storyLine">
        <div className="wrap-storyLine">
          <div
            style={{
              top: fixedBlocks ? 116 : null,
              position: fixedBlocks ? 'fixed' : null,
              width: 320
              // left: 'calc(50% + 275px)',
              // left: '160px',
              // top: fixedBlocks ? 115 : 354 - scrollTop,
              // position: 'fixed',
            }}
            ref={(c) => this.infoBlock = c}
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
            style={{ marginLeft: fixedBlocks ? 320 : null }}
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
