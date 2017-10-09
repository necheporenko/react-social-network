import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import Helmet from 'react-helmet';
import {getStory, getStoryId} from '../redux/modules/story';
import Post from '../components/StoryLine/Post/index';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    promises.push(dispatch(getStory(getStoryId(getState()))));
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  singleStory: state.story.singleStory,
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
}), {
  getStory,
  getStoryId
})

export default class StoryDetailsContainer extends Component {
  render() {
    const {singleStory, authorizedUser, requestedUser} = this.props;
    return (
      <div style={{width: '500px', margin: '0 auto', paddingTop: '20px'}}>
        <Helmet
          title={'Myy Title'}
          meta={[
          { name: 'twitter:card', content: 'summary' },
          { name: 'twitter:site', content: '@nytimesbits' },
          { name: 'twitter:creator', content: '@nickbilton' },
          { property: 'og:url', content: 'http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/'},
          { property: 'og:title', content: 'React Validbook' },
          { property: 'og:description', content: 'In the early days, Twitter grew so quickly that it was almost impossible' },
          { property: 'og:image', content: 'https://s3-us-west-2.amazonaws.com/dev.validbook/story-images/2017/10/06/53/OG6yDqhq8fygl51XoUK2jTFzamF_-N3-.jpg' },
          ]}
        >
        </Helmet>
        {singleStory && singleStory.map((story) => (
          <Post
            key={story.id}
            id={story.id}
            post={story.text}
            user={story.user}
            date={story.date}
            images={story.images}
            likes={story.likes}
            books={story.books}
            loudness={story.loudness}
            visibility={story.visibility}
            comments={story.comments}
            counts={story.counts}
            likeFunc={this.like}
            authorizedUser={authorizedUser}
            requestedUser={requestedUser}
          />
        ))}
      </div>
    );
  }
}

StoryDetailsContainer.propTypes = {
  singleStory: PropTypes.array,
  authorizedUser: PropTypes.object,
  requestedUser: PropTypes.object,
};
