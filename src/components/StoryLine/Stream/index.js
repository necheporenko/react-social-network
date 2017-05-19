import React, { Component, PropTypes } from 'react';
// import InfiniteScroll from 'redux-infinite-scroll';
// import InfiniteScroll from 'react-infinite-scroller';
import Sbox from './Sbox';
import Post from './Post';
import './index.scss';

let page = 1;

class Stream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingMore: false,
    };
    this.load = this.load.bind(this);
  }

  load() {
    page++;
    console.log('loading More');
    // this.setState({loadingMore: false})
      // .then(() => {
        this.props.loadNextStories('vad-vad', page);
        // this.setState({loadingMore: false});
      // });
  }

  // _loadMore() {
  //   console.log('loading More');
  //   this.setState({loadingMore: true}, () => {
  //     // CB emulates an ajax request
  //     this.setState({
  //       numOfItems: this.state.numOfItems + 40,
  //       loadingMore: false
  //     })
  //   })
  // }

  render() {
    const { storiesArr } = this.props;
    const loader = <div className="loader">Loading ...</div>;

    return (
      <div className="stream">
        <Sbox
          user={this.props.user}
          createStory={this.props.createStory}
          loadStories={this.props.loadStories}
        />

        {/*<InfiniteScroll*/}
          {/*loadMore={this.load()}*/}
          {/*hasMore={this.state.loadingMore}*/}
          {/*// loadingMore={this.state.loadingMore}*/}
          {/*// showLoader={true}*/}
          {/*threshold={50}*/}
          {/*loader={loader}*/}

        {/*// The number of pixels from the bottom that the scroll bar must reach in order to trigger loadMore.*/}
          {/*// containerHeight={200}*/}
          {/*// animateItems={true}*/}
          {/*// items={this._createData()}*/}
        {/*>*/}

          {storiesArr && storiesArr.map((story) => (
            <Post
              key={story.id}
              post={story.text}
              user={story.user}
              created={story.created}
            />
          ))}

          <button onClick={() => this.load()}>GET NEXT STORIES</button>

        {/*</InfiniteScroll>*/}

      </div>
    );
  }
}

Stream.propTypes = {
  user: PropTypes.object,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
  loadNextStories: PropTypes.func,
};

export default Stream;
