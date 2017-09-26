import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import ReactMarkdown from 'react-markdown';
import {getUser} from '../../redux/modules/user';
import {getHumanCard} from '../../redux/modules/document';
import './index.scss';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
  path: state.routing.locationBeforeTransitions.pathname,
  box: state.document.box,
  humanCard: state.document.humanCard,
}), {
  getUser,
  getHumanCard
})

export default class HumanCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const {path} = this.props;
    const humanCardSlug = path.substring(path.indexOf('/human-card/') + 12);
    this.props.getHumanCard(humanCardSlug);
  }

  render() {
    const {humanCard} = this.props;
    const test = `<?--- START HUMAN CARD ---?>

# HUMAN CARD

0xB7871a6C2E51b9E3Fb6C867B7E902EA7De6F9e12

------------------------------------------------------------
This public address has been established for: 

## Darth Vader
------------------------------------------------------------

Digital Signature: 

<?--- END HUMAN CARD ---?>`;
    return (
      <div>
        <div className="human-card markdown-human-card">
          <ReactMarkdown source={humanCard.markdown}/>
          {/*<ReactMarkdown source={test}/>*/}
        </div>
      </div>
    );
  }
}

HumanCard.propTypes = {
  path: PropTypes.string,
  getHumanCard: PropTypes.func,
  humanCard: PropTypes.object,
};
