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
  render() {
    const {authorizedUser} = this.props;
    const {text, images, id, user, date, likes, books, loudness, visibility, comments, paginationComment, counts} = this.props.story;

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
          authorizedUser={authorizedUser}
          user={user}
          date={date}
          visibility={visibility}
          loudness={loudness}
          id={id}
          books={books}
        />

        {/* ===========
            Post Content
            =========== */}

        <div className="post-content">
          <div className="wrap-post-content">
            <div
              className="post-content-type-text"
              dangerouslySetInnerHTML={{__html: text}}
            />

            {/*<div className="post-content-type-text">
              <p>Математический горизонт, в первом приближении, вызывает перигей. Движение, несмотря на внешние воздействия, последовательно. В связи с этим нужно подчеркнуть, что высота вращает первоначальный популяционный индекс. Это можно записать следующим образом: V = 29.8 * sqrt(2/r – 1/a) км/сек, где юлианская дата многопланово колеблет ионный хвост. Конечно, нельзя не принять во внимание тот факт, что натуральный логарифм прекрасно притягивает межпланетный Южный Треугольник.</p>
              <p>Космогоническая гипотеза Шмидта позволяет достаточно просто объяснить эту нестыковку, однако соединение выслеживает вращательный большой круг небесной сферы. Часовой угол иллюстрирует натуральный логарифм, при этом плотность Вселенной в 3 * 10 в 18-й степени раз меньше, с учетом некоторой неизвестной добавки скрытой массы. Звезда оценивает далекий Млечный Путь, а время ожидания ответа составило бы 80 миллиардов лет.</p>
            </div> */}
            {/*{ images && images.map}*/}

            {/*{images &&*/}
            {/*<div className="post-content-type-image">*/}
            {/*<img src={images[0]}/>*/}
            {/*</div>*/}
            {/*}*/}

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
            </div>*/}

            {images &&
            <div className="post-content-type-gallery">
              {images.map((image, index) => (
                <div key={index} className="content-gallery-image">
                  <img src={image}/>
                </div>
              ))}
            </div>
            }

          </div>
        </div>

        {/* ===========
            Post Footer
            =========== */}
        <PostFooter
          authorizedUser={authorizedUser}
          likes={likes}
          id={id}
          comments={comments}
          paginationComment={paginationComment}
          counts={counts}
          post={text}
          likeFunc={this.props.likeFunc}
          showMoreCommentsFunc={this.props.showMoreCommentsFunc}
          createCommentFunc={this.props.createCommentFunc}
          showReplyFunc={this.props.showReplyFunc}
        />
      </div>
    );
  }
}

Post.propTypes = {
  authorizedUser: PropTypes.object,           //user
  story: PropTypes.object,
  // createComment: PropTypes.func,
  likeFunc: PropTypes.func,
  showMoreCommentsFunc: PropTypes.func,
};
