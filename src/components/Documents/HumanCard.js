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
    const input = `
<?--- START HUMAN CARD ---?>  
# Human Card
------------------------------------------------------------
**Public Address** - e3954b59340b92a01a2258251c56098cc6c485cc

This public address has been established for:
## Jimbo Fry
Digital Signature: adfslivhao5932vhfo54rt89gvnw8574tyqw9384dry2wp9jf4t66gjd94kd94kf94kf94kk9f49
<?--- END HUMAN CARD ---?>
<?--- START SELF SIGNATURE ---?>
<?--- END SELF SIGNATURE ---?>
<?--- START LINKED DIGITAL PROPERTY 1 ---?>
<?--- END LINKED DIGITAL PROPERTY 1 ---?>
<?--- START VALIDATORS SIGNATURE 1  ---?>
<?--- END VALIDATORS SIGNATURE 1 ---?>`;
    return (
      <div>
        <div className="human-card">
          <ReactMarkdown source={input}/>
        </div>
      </div>
    );
  }
}

HumanCard.propTypes = {
  path: PropTypes.string,
  getHumanCard: PropTypes.func,
};
