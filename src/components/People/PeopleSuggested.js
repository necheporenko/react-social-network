import React, { Component } from 'react';
import { PEOPLES_SUGGESTED } from '../../constants/peoples';
import PeopleMenu from './PeopleMenu';
import './index.scss';

class PeopleSuggested extends Component {
  render() {
    return (
      <div className="people contents">

        <PeopleMenu />

        <div className="common-lists people-lists">
          <div className="wrapper">

            {PEOPLES_SUGGESTED.map((people, index) => (
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

export default PeopleSuggested;
