import React, { Component } from 'react';
import { PEOPLES_FOLLOWERS } from '../../constants/peoples';

import './index.scss';

class SearchPeople extends Component {
  render() {
    return (
      <div className="people page-bg">
        <div className="people-lists">
          <div className="wrapper">

            {PEOPLES_FOLLOWERS.map((people, index) => (
              <div key={index} className="people-card">
                <a href={people.link}>
                  <img src={people.img_url} />
                  <div>{people.name}</div>
                </a>
                <div className="btn-following">Following <span></span></div>
              </div>
            ))}

          </div>
        </div>
      </div>
    );
  }
}

export default SearchPeople;
