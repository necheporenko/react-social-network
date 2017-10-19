import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import ReactMarkdown from 'react-markdown';
import HumanCard from '../../HumanCardPage/HumanCard';
import '../../HumanCardPage/human-card.scss'; 

function work(occupation, company) {
  if (occupation && company) {
    return `${occupation} at ${company}`;
  } else if (!occupation && company) {
    return `Works at ${company}`;
  }
  
  return occupation;
}

const onHoverOutHumanCard = () => {
  const el = document.querySelector('.infoblock-human-card .review-proofs a');
  el.style.textDecoration = 'none';
};

const onHoverLinkHumanCard = () => {
  const el = document.querySelector('.infoblock-human-card .review-proofs a');
  el.style.textDecoration = 'underline';
};

const Cutaway = ({requestedUserProfile, requestedUser, authorizedUser}) => {
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
    human_card,
    draft_human_card
  } = requestedUserProfile;

  const socialNetwork = () => {
    if (facebook || twitter || linkedin || skype) {
      return (
        <div className="social-network-container">
          <span className="social-network-icon"/>
          {facebook && <a href={facebook} className="facebook"/>}
          {twitter && <a href={twitter} className="twitter"/>}
          {linkedin && <a href={linkedin} className="linkedin"/>}
          {skype && <a href={skype} className="skype"/>}
        </div>
      );
    }
  };
  
  const linkToHumanCard = () => {
    if (human_card && human_card.public_address) {
      return human_card.public_address;
    } else if (draft_human_card && draft_human_card.id) {
      return draft_human_card.id;
    }

    return null;
  };

  return (
    first_name ?
      <div className="infoblocks-cutaway">
        <div className="title-infoblocks">
          <span className="cutaway-icon"/>
          {/*{`${first_name} ${last_name}`}*/}
          Info
          <Link to="/settings" className="settings-edit"><i/></Link>
        </div>

        <div className="wrapper">
          {bio &&
          <div className="bio">
            {bio}
            <hr />
          </div>
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

          {birthYear !== 0 && birthYear &&
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

          {socialNetwork()}
        </div>

        <hr className="above-human-card"/>

        <div className="infoblock-human-card ">
          {/*<hr style={{margin: '0 15px 20px 15px'}} />*/}
          <HumanCard
            humanCard={human_card}
            draftHumanCard={draft_human_card}
            requestedUser={requestedUser}
            authorizedUser={authorizedUser}
          />
          <div className="buttons-container">
            {human_card && authorizedUser.id !== requestedUser.id &&
              <div className="validate-button">
                <button className="btn-sign btn-brand">Validate</button>
              </div>
            }
            <div className="review-proofs">
              {linkToHumanCard() 
                ? <Link
                  onMouseMove={onHoverLinkHumanCard}
                  onMouseOut={onHoverOutHumanCard}
                  to={`/${requestedUser.slug}/documents/human-card/${linkToHumanCard()}`}>Review Proofs</Link>
                : <Link
                  onMouseMove={onHoverLinkHumanCard}
                  onMouseOut={onHoverOutHumanCard}
                  to={`/${requestedUser.slug}/documents/human-card`}>Review Proofs</Link>
              }
            </div>
          </div>
        </div>
        <div style={{height: 1}}/>
        <hr className="below-human-card"/>
      </div>
      :
      null
  );
};

Cutaway.propTypes = {
  authorizedUser: PropTypes.object,
  requestedUserProfile: PropTypes.object,
  requestedUser: PropTypes.object
};

export default Cutaway;


//<div
//  onMouseOut={onHoverOutHumanCard}
//   onMouseMove={onHoverHumanCard} 
//   className="human-card markdown-human-card" 
//   onClick={(e) => fnHumanCard(humanCard.public_address, slug, e)}>
//   {/*<Link to={`/${slug}/documents/human-card/${humanCard.public_address}`}>*/}
//   <ReactMarkdown source={humanCard.markdown}/>
//   {/*</Link>*/}
// </div>