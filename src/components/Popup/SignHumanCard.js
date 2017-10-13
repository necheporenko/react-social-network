import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import Web3 from 'web3';
import {sendMessageForSign, verifyHumanCard} from '../../redux/modules/document';
import signTemplate from '../../constants/signTemplate';
import './index.scss';

const web3 = new Web3(Web3.givenProvider);

@connect((state) => ({
  requestedUserProfile: state.user.requestedUserProfile,
  humanPageDraftHumanCard: state.document.draftHumanCard
}), {
  sendMessageForSign,
  verifyHumanCard
})

export default class SignHumanCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      file: null
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.readKeystore = this.readKeystore.bind(this);
    this.sign = this.sign.bind(this);
  }

  Close() {
    this.setState({showModal: false});
  }

  Open() {
    this.setState({showModal: true});
  }

  sign(keystore, password) {
    const {fullName, publicAddress, humanPageDraftHumanCard, requestedUserProfile, sendMessageForSign, verifyHumanCard} = this.props;

    let draftHumanCardId;

    if (humanPageDraftHumanCard && humanPageDraftHumanCard.id) {
      draftHumanCardId = humanPageDraftHumanCard.id;
    } else if (requestedUserProfile.draft_human_card && requestedUserProfile.draft_human_card.id) {
      draftHumanCardId = requestedUserProfile.draft_human_card.id;
    }

    const msg = signTemplate(fullName, publicAddress);
    const decrypt = web3.eth.accounts.decrypt(JSON.parse(keystore.toLowerCase()), password);

    sendMessageForSign(draftHumanCardId, msg)
      .then((response) => {
        const resultOfSigning = web3.eth.accounts.sign(response.data.message, decrypt.privateKey);
        verifyHumanCard(draftHumanCardId, publicAddress, resultOfSigning.signature);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  readKeystore(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: reader.result,
      });
    };
    reader.readAsText(file);
  }


  render() {
    return (
      <div onClick={this.Open}>
        <button className="btn-brand btn-sign">Sign</button>
        <Modal show={this.state.showModal} onHide={this.Close}>
          <Modal.Body>
            <div style={{display: 'flex'}}>
              <div className="sign-access-type">
                <h4>How would you like to access your wallet?</h4>
                <div>
                  <input type="radio" id="keystoreKey" value="File"/>
                  <label htmlFor="keystoreKey">Keystore File (UTC / JSON)</label>
                  <br/>
                  {/*<input type="radio" id="privateKey" value="File"/>*/}
                  {/*<label htmlFor="privateKey">Private Key</label>*/}
                </div>
              </div>
              <div>
                <div className="keystore-file">
                  <input type="file" name="keystore" id="keystore" onChange={(e) => this.readKeystore(e)}/>
                  <label htmlFor="keystore">Choose a file</label>
                </div>
                {/*<input type="file" onChange={(e) => this.readKeystore(e)} ref={el => this.inputKeystore = el}/>*/}
                {this.state.file &&
                <div>
                  <p>Please enter your password</p>
                  <input type="text" ref={el => this.inputKeystorePassword = el}/>
                  <br/>
                </div>
                }
                <button onClick={() => this.sign(this.state.file, this.inputKeystorePassword.value)}>Sign</button>
                {/*<button onClick={() => this.sign()}>Sign</button>*/}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div style={{float: 'right'}}>
              <button className="btn-brand btn-cancel" onClick={this.Close}>Cancel</button>
              <button className="btn-brand" style={{marginLeft: '10px'}}>Unlock and Sign</button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

SignHumanCard.propTypes = {
  sendMessageForSign: PropTypes.func,
  verifyHumanCard: PropTypes.func,
  fullName: PropTypes.string,
  publicAddress: PropTypes.string,
};
