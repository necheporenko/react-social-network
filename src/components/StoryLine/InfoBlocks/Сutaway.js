import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Cutaway = ({ userProfile }) => {
  const {
    first_name,
    last_name,
    bio,
    occupation,
    company,
    location,
    country,
    birthDay,
    birthMonth,
    birthYear,
    phone,
    website,
    facebook,
    twitter,
    linkedin,
    skype,
  } = userProfile;
  return (
    <div className="infoblocks-cutaway">
      <div className="title-infoblocks">
        <span className="cutaway-icon"></span>
        {`${first_name} ${last_name}`}
      </div>
      <div className="wrapper">
        { bio &&
          <div className="bio">{bio}</div>
        }
        <div className="occupation">
          <b>Occupation:</b>
          <p>{ occupation }</p>
        </div>
        <div className="company">
          <b>Company:</b>
          <p>{ company }</p>
        </div>
        <div className="country">
          <b>Country:</b>
          <p>United States</p>
        </div>
        <div className="location">
          <b>Location:</b>
          <p>{ location }</p>
        </div>
        <div className="birthday">
          <b>Birthday:</b>
          <p>January 18, {`${birthYear}`}</p>
        </div>

        { phone &&
          <div className="phone">
            <b>Phone:</b>
            <p>{phone}</p>
          </div>
        }

        { website &&
          <div className="websites">
            <b>Websites:</b>
            <p><Link to={website}>{website}</Link></p>
          </div>
        }

        <div className="social-network">
          { facebook && <Link to={facebook} className="facebook"></Link> }
          { twitter && <Link to={twitter} className="twitter"></Link> }
          { linkedin && <Link to={linkedin} className="linkedin"></Link> }
          { skype && <Link to={skype} className="skype"></Link> }
        </div>

      </div>
    </div>
  );
};

Cutaway.propTypes = {
  userProfile: PropTypes.object
};

export default Cutaway;
