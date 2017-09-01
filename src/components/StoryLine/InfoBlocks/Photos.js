import React from 'react';
import {Link} from 'react-router';

const Photos = ({loaded, requestedUser}) => {
  return (
    loaded.loadedPeopleBlock &&
    <div className="infoblocks-photos">
      <div className="title-infoblocks">
        <span className="photos-icon"/>
        <Link to={`/${requestedUser.slug}/photos`}>Photos</Link>
      </div>

      <div className="photos-gallery">
        <div className="photos-image">
          <a href="#"><img src="//unsplash.it/800/600?image=20" /></a>
        </div>
        <div className="photos-image">
          <a href="#"><img src="//unsplash.it/800/600?image=42" /></a>
        </div>
        <div className="photos-image">
          <a href="#"><img src="//unsplash.it/800/600?image=48" /></a>
        </div>
        <div className="photos-image">
          <a href="#"><img src="//unsplash.it/800/600?image=60" /></a>
        </div>
        <div className="photos-image">
          <a href="#"><img src="//unsplash.it/800/600?image=7" /></a>
        </div>
        <div className="photos-image">
          <a href="#"><img src="//unsplash.it/800/600?image=180" /></a>
        </div>
        {/* <div className="photos-image">
          <a href="#"><img src="//unsplash.it/800/600?image=24" /></a>
        </div> */}
      </div>
    </div>
  );
};

export default Photos;
