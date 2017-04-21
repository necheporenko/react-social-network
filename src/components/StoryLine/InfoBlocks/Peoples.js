import React from 'react';

const defaultAvatar = require('../../../img/Peoples/100x100.jpg');

const Peoples = () => {
  return (
    <div className="infoblocks-peoples">
      <div className="title-infoblocks">
        <a href="#"><span className="peoples-icon"></span> People · <span>10</span></a>
      </div>
      <div className="people-gallery">
        <div className="people-avatar">
          <a href="#">
            {/*<img src="../../../img/Peoples/100x100.jpg" />*/}
            <img src={defaultAvatar} alt=""/>
            <div className="people-avatar-user-name">Name Surname</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Peoples;
