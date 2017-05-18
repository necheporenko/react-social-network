import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { ButtonToolbar, DropdownButton } from 'react-bootstrap';

class Post extends Component {
  render() {
    const { fullName, slug } = this.props.user;
    const created = this.props.created;
    const post = this.props.post;
    return (
      <div className="post">

        {/* ===========
            Post Header
            =========== */}
        <div className="post-header">

          <div className="wrap-post-user-avatar">
            <Link to={`/${slug}`}><img className="post_user_avatar" src="http://devianmbanks.validbook.org/cdn/460/avatar/32x32.jpg?t=1486723970" /></Link>
          </div>

          <div className="wrap-post-user-info">
            <div className="post-user-name">
              <Link to={`/${slug}`}>{fullName}</Link>
            </div>
            <div className="post-details">
              <div className="post-details-date">{created}</div>
              <div className="post-delimiter"><span> · </span></div>
              <div className="post-details-loud-icon"><span></span></div>
              <div className="post-delimiter"><span> · </span></div>
              <div className="post-details-visibility">
                <div className="post-details-visibility-icon">
                  <span></span>
                </div>
                <div className="post-details-visibility-menu">
                  {/* <i className="caret"></i> */}
                  <ButtonToolbar>
                    <DropdownButton className="profileMenu-btn" title={''} id={3} pullRight>
                      <Link>Public</Link>
                      <Link>Only me</Link>
                      <Link>Custom</Link>
                      <Link>Reset as per visibility of books</Link>
                      <span className="divider"></span>
                      <Link>History of Story Visibility</Link>
                    </DropdownButton>
                  </ButtonToolbar>
                </div>
              </div>


              <div className="post-delimiter"><span> · </span></div>
              <div className="post-details-location">Wallbook</div>
            </div>
          </div>

          <div className="wrap-post-story-dropdown">
            <ButtonToolbar>
              <DropdownButton className="profileMenu-btn" title={''} id={4} noCaret pullRight >
                <Link>Pin story</Link>
                <Link>Story Details</Link>
                <Link>Delete Story</Link>
              </DropdownButton>
            </ButtonToolbar>
          </div>
        </div>

        {/* ===========
            Post Content
            =========== */}
        <div className="post_content">
          <div className="wrap_post_content">

            <div
              className="post_content_type_text"
              dangerouslySetInnerHTML={{__html: post}}
            />


            {/*<div className="post_content_type_text">
              <p>Математический горизонт, в первом приближении, вызывает перигей. Движение, несмотря на внешние воздействия, последовательно. В связи с этим нужно подчеркнуть, что высота вращает первоначальный популяционный индекс. Это можно записать следующим образом: V = 29.8 * sqrt(2/r – 1/a) км/сек, где юлианская дата многопланово колеблет ионный хвост. Конечно, нельзя не принять во внимание тот факт, что натуральный логарифм прекрасно притягивает межпланетный Южный Треугольник.</p>
              <p>Космогоническая гипотеза Шмидта позволяет достаточно просто объяснить эту нестыковку, однако соединение выслеживает вращательный большой круг небесной сферы. Часовой угол иллюстрирует натуральный логарифм, при этом плотность Вселенной в 3 * 10 в 18-й степени раз меньше, с учетом некоторой неизвестной добавки скрытой массы. Звезда оценивает далекий Млечный Путь, а время ожидания ответа составило бы 80 миллиардов лет.</p>
            </div>

            <div className="post_content_type_image">
              <img src="http://devianmbanks.validbook.org/cdn/stories_images/710/498.jpg" />
            </div>

            <div className="post_content_type_link">
              <a href="#">
                <div className="link_preview_image">
                  <img src="http://devianmbanks.validbook.org/cdn/stories_images/706/498.jpg" alt="" />
                </div>
                <div className="wrap_link_preview">
                  <div className="link_preview_title">Photo by Alberto Restifo | Unsplash</div>
                  <div className="link_preview_description">A free high-resolution photo of snow, mountain, cold, frozen and blue by Alberto Restifo, taken with an Sony DSLR-A900</div>
                  <div className="link_preview_url">unsplash.com</div>
                </div>
              </a>
            </div>

            <div className="post_content_type_link_short">
              <a href="#">
                <div className="wrap_content_type_link_short">
                  <div className="link_preview_image_short">
                    <img src="http://validbook.org/cdn/stories_images/657/168.jpg" alt="" />
                  </div>
                  <div className="wrap_link_preview_short">
                    <div className="link_preview_title">Photo by Alberto Restifo | Unsplash</div>
                    <div className="link_preview_description">A free high-resolution photo of snow, mountain, cold, frozen and blue by Alberto Restifo, taken with an Sony DSLR-A900</div>
                    <div className="link_preview_url">unsplash.com</div>
                  </div>
                </div>
              </a>
            </div>

            <div className="post_content_type_gallery">
              <div className="content_gallery_image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/AEI66HEQ25.jpg" alt/>
              </div>
              <div className="content_gallery_image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/280h/TXHI5TTAYX.jpg" alt/>
              </div>
              <div className="content_gallery_image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/280h/P84KG21CDH.jpg" alt/>
              </div>
              <div className="content_gallery_image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/280h/DYNEU4SJQ5.jpg" alt/>
              </div>
              <div className="content_gallery_image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/280h/FYZBN8FDKT.jpg" alt/>
              </div>
            </div>*/}

          </div>
        </div>

        {/* ===========
            Post Footer
            =========== */}
        <div className="post_footer">
          <div className="post_like">
            <a href="">
              <i className="post_action_icon"></i>
              <span>Kudos</span>
            </a>
          </div>
          <div className="post_comment">
            <a href="">
              <i className="post_action_icon"></i>
              <span>Comment</span>
            </a>
          </div>
          <div className="post_log">
            <a href="#">
              <i className="post_action_icon"></i>
              <span>Log</span>
            </a>
          </div>
          <div className="post_share">
            <a href="">
              <i className="post_action_icon"></i>
              <span>Share</span>
            </a>
          </div>

        </div>
      </div>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object,
  post: PropTypes.string,
  created: PropTypes.string,
};

export default Post;
