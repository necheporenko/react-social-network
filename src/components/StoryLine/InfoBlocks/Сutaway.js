import React, {PropTypes} from 'react';
import {Link} from 'react-router';

function work(occupation, company) {
  if (occupation && company) {
    return `${occupation} at ${company}`;
  } else if (!occupation && company) {
    return `Works at ${company}`;
  } else {
    return occupation;
  }
}

const Cutaway = ({requestedUserProfile}) => {
  const {
    first_name,
    last_name,
    bio,
    occupation,
    company,
    country_id,
    location,
    birthDay,
    birthMonth,
    birthYear,
    phone,
    website,
    facebook,
    twitter,
    linkedin,
    skype,
  } = requestedUserProfile;

  return (
    requestedUserProfile.first_name ?
      <div className="infoblocks-cutaway">
        <div>
          <div className="title-infoblocks">
            <span className="cutaway-icon"/>
            {/*{`${first_name} ${last_name}`}*/}
            Info
            <Link to="/settings" className="settings-edit"><i/></Link>
          </div>

          <div className="wrapper">
            {bio &&
            <div className="bio">{bio}</div>
            }

            {/*{occupation &&*/}
            {/*<div className="occupation">*/}
            {/*<b>Occupation:</b>*/}
            {/*<p>{occupation}</p>*/}
            {/*</div>*/}
            {/*}*/}

            {(company || occupation) &&
            <div className="company">
              <i/>
              <p>{work(occupation, company)}</p>
            </div>
            }

            {/*<div className="country">*/}
            {/*<b>Country:</b>*/}
            {/*<p>United States</p>*/}
            {/*</div>*/}

            {location &&
            <div className="location">
              <i/>
              <p>{`Lives in ${location}`}</p>
            </div>
            }

            {birthYear &&
            <div className="birthday">
              <i/>
              <p>January 18, {`${birthYear}`}</p>
            </div>
            }

            {phone &&
            <div className="phone">
              <i/>
              <p>{phone}</p>
            </div>
            }

            {website &&
            <div className="websites">
              <i/>
              <p><Link to={website}>{website}</Link></p>
            </div>
            }

            <div className="social-network">
              {facebook && <a href={facebook} className="facebook"/>}
              {twitter && <a href={twitter} className="twitter"/>}
              {linkedin && <a href={linkedin} className="linkedin"/>}
              {skype && <a href={skype} className="skype"/>}
            </div>
          </div>

        </div>
      </div>
      :
      null
  );
};

Cutaway.propTypes = {
  requestedUserProfile: PropTypes.object
};

export default Cutaway;
