import React, {Component, PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
// import {default as Web3} from 'web3';
import './index.scss';

export default class SignHumanCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
  }

  Close() {
    this.setState({showModal: false});
  }

  Open() {
    this.setState({showModal: true});
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
                  <input type="radio" id="privateKey" value="File"/>
                  <label htmlFor="privateKey">Private Key</label>
                </div>
              </div>
              <div>
                <input type="file"/>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div style={{float: 'right'}}>
              <button className="btn-brand btn-cancel" onClick={this.Close}>Cancel</button>
              <button className="btn-brand" style={{marginLeft: '10px'}} type="submit" onClick={this.handleSave}>Unlock
                and Sign
              </button>
            </div>
          </Modal.Footer>


        </Modal>
      </div>
    );
  }
}

SignHumanCard.propTypes = {};
