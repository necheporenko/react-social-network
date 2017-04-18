import React, { PropTypes } from 'react';

const Photos = ({photos}) => {
  return (
    <div className="infoBlocks_photos">
      <div className="title_infoBlocks">
        <span className="photosIcon"></span>
        <a href="#">Original Photos </a> |
        <a href="#">  Other photos</a>
      </div>

      <div className="photosImg">
        {photos.map((photo, index) => (
          <div key={index} className="photosImg_image">
            {photo.url.map((url) => {

                <a href="#"><img src={url} /></a>

            })}
          </div>
        ))}
      </div>

    </div>
  );
};

Photos.propTypes = {
  photos: PropTypes.array
};

export default Photos;
