import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import Helmet from 'react-helmet';
import {
  getStory,
  getStoryId,
  like as likePostInStoryDetails,
  createComment as createCommentInStoryDetails
} from '../redux/modules/story';
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
  getStoryId,
  likePostInStoryDetails,
  createCommentInStoryDetails
})

export default class StoryDetailsContainer extends Component {
  constructor() {
    super();
    this.like = this.like.bind(this);
    this.createComment = this.createComment.bind(this);
  }

  like(id) {
    this.props.likePostInStoryDetails(id, 'storyPage');
  }

  createComment(entity_id, content, parent_id, user) {
    this.props.createCommentInStoryDetails(entity_id, content, parent_id, user, 'storyPage');
  }

  render() {
    const {singleStory, authorizedUser, requestedUser} = this.props;
    return (
      <div style={{width: '500px', margin: '0 auto', paddingTop: '20px'}}>
        <Helmet
          title={'Validbook - Story Page'}
          meta={[
            {name: 'twitter:card', content: 'summary'},
            {name: 'twitter:site', content: '@nytimesbits'},
            {name: 'twitter:title', content: 'Small test twitter'},
            {name: 'twitter:description', content: 'Small description test twitter'},
            {name: 'twitter:image', content: 'https://farm6.staticflickr.com/5510/14338202952_93595258ff_z.jpg'},
            {name: 'twitter:creator', content: '@nickbilton'},
            // { property: 'og:url', content: 'http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/'},
            // { property: 'og:title', content: 'React Validbook' },
            // { property: 'og:description', content: 'In the early days, Twitter grew so quickly that it was almost impossible' },
            // { property: 'og:image', content: 'https://farm6.staticflickr.com/5510/14338202952_93595258ff_z.jpg' },
          ]}
        />
        {singleStory && singleStory.map(story => (
          <Post
            likeFunc={this.like}
            story={story}
            key={story.id}
            // showMoreCommentsFunc={this.showMoreComments}
            authorizedUser={authorizedUser}
            requestedUser={requestedUser}
            createCommentFunc={this.createComment}
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
