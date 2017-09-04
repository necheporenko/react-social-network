import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {like as likePost, setVisibilityStory, deleteStory, pinStory, createComment} from '../../../redux/modules/story';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

@connect((state) => ({}), {
  likePost,
  setVisibilityStory,
  deleteStory,
  pinStory,
  createComment,
})

// class MyTooltip {
//   render() {
//     const { style: left, top } = this.props;
//
//     return (<Tooltip {...this.props} id="tooltipLike1" style={{ left: left - 300, top: top + 15 }}>Hello</Tooltip>);
//   }
// }

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {post, images} = this.props;

    // const tooltip = (props) => (
    //
    //   <Tooltip id={props.id}>
    //     { likes.people_list.map((people) => (
    //       <div>{people.user.fullName}</div>
    //     ))}
    //   </Tooltip>
    // );

    // tooltip.id = 'test';


    return (
      <div className="post post-appear ">

        {/* ===========
         Post Header
         =========== */}

        <PostHeader
          authorizedUser={this.props.authorizedUser}
          user={this.props.user}
          date={this.props.date}
          visibility={this.props.visibility}
          loudness={this.props.loudness}
          id={this.props.id}
          books={this.props.books}
        />

        {/* ===========
            Post Content
            =========== */}

        <div className="post-content">
          <div className="wrap-post-content">
            <div
              className="post-content-type-text"
              dangerouslySetInnerHTML={{__html: post}}
            />

            {/*<div className="post-content-type-text">
              <p>Математический горизонт, в первом приближении, вызывает перигей. Движение, несмотря на внешние воздействия, последовательно. В связи с этим нужно подчеркнуть, что высота вращает первоначальный популяционный индекс. Это можно записать следующим образом: V = 29.8 * sqrt(2/r – 1/a) км/сек, где юлианская дата многопланово колеблет ионный хвост. Конечно, нельзя не принять во внимание тот факт, что натуральный логарифм прекрасно притягивает межпланетный Южный Треугольник.</p>
              <p>Космогоническая гипотеза Шмидта позволяет достаточно просто объяснить эту нестыковку, однако соединение выслеживает вращательный большой круг небесной сферы. Часовой угол иллюстрирует натуральный логарифм, при этом плотность Вселенной в 3 * 10 в 18-й степени раз меньше, с учетом некоторой неизвестной добавки скрытой массы. Звезда оценивает далекий Млечный Путь, а время ожидания ответа составило бы 80 миллиардов лет.</p>
            </div> */}
            {/*{ images && images.map}*/}

            {images &&
            <div className="post-content-type-image">
              <img src={images[0]}/>
            </div>
            }

            {/*<div className="post-content-type-link">
              <a href="#">
                <div className="link-preview-image">
                  <img src="http://devianmbanks.validbook.org/cdn/stories-images/706/498.jpg" alt="" />
                </div>
                <div className="wrap-link-preview">
                  <div className="link-preview-title">Photo by Alberto Restifo | Unsplash</div>
                  <div className="link-preview-description">A free high-resolution photo of snow, mountain, cold, frozen and blue by Alberto Restifo, taken with an Sony DSLR-A900</div>
                  <div className="link-preview-url">unsplash.com</div>
                </div>
              </a>
            </div>

            <div className="post-content-type-link-short">
              <a href="#">
                <div className="wrap-content-type-link-short">
                  <div className="link-preview-image-short">
                    <img src="http://validbook.org/cdn/stories-images/657/168.jpg" alt="" />
                  </div>
                  <div className="wrap-link-preview-short">
                    <div className="link-preview-title">Photo by Alberto Restifo | Unsplash</div>
                    <div className="link-preview-description">A free high-resolution photo of snow, mountain, cold, frozen and blue by Alberto Restifo, taken with an Sony DSLR-A900</div>
                    <div className="link-preview-url">unsplash.com</div>
                  </div>
                </div>
              </a>
            </div>

            <div className="post-content-type-gallery">
              <div className="content-gallery-image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/AEI66HEQ25.jpg" alt/>
              </div>
              <div className="content-gallery-image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/280h/TXHI5TTAYX.jpg" alt/>
              </div>
              <div className="content-gallery-image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/280h/P84KG21CDH.jpg" alt/>
              </div>
              <div className="content-gallery-image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/280h/DYNEU4SJQ5.jpg" alt/>
              </div>
              <div className="content-gallery-image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/280h/FYZBN8FDKT.jpg" alt/>
              </div>
            </div>*/}
          </div>
        </div>

        {/* ===========
            Post Footer
            =========== */}

        <PostFooter
          authorizedUser={this.props.authorizedUser}
          likes={this.props.likes}
          id={this.props.id}
          comments={this.props.comments}
          paginationComment={this.props.paginationComment}
          counts={this.props.counts}
          post={this.props.post}
          likeFunc={this.props.likeFunc}
          showMoreCommentsFunc={this.props.showMoreCommentsFunc}
        />

      </div>
    );
  }
}

Post.propTypes = {
  authorizedUser: PropTypes.object,           //user
  user: PropTypes.object,
  likes: PropTypes.object,
  post: PropTypes.string,
  date: PropTypes.object,
  id: PropTypes.number,
  images: PropTypes.array,
  books: PropTypes.array,
  comments: PropTypes.array,
  loudness: PropTypes.object,
  visibility: PropTypes.object,
  createComment: PropTypes.func,
  likeFunc: PropTypes.func,
  paginationComment: PropTypes.number,
  counts: PropTypes.object,
  showMoreCommentsFunc: PropTypes.func,
};
