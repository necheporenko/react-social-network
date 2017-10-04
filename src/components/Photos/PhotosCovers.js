import React, { Component } from 'react';
import { PHOTOS } from '../../constants/photos';
import PhotosMenu from './PhotosMenu';
import './index.scss';

class PhotosCovers extends Component {
  render() {
    const {fixedBlocks} = this.props;
    return (
      <div className="photos contents">

        <PhotosMenu 
          fixedBlocks={fixedBlocks}
        />

        <div 
          className="common-lists photos-lists"
          style={{marginLeft: fixedBlocks ? 240 : null}}
        >
          <div className="wrapper">

            {PHOTOS.map((photo, index) => (
              <div key={index} className="photos-img">
                <img src={photo.url} />
              </div>
            ))}

          </div>
          <h1>covers</h1>
        </div>
      </div>
    );
  }
}

export default PhotosCovers;
