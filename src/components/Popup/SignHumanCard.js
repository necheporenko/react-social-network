import React, {Component, PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import Web3 from 'web3';
import './index.scss';

export default class SignHumanCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      file: null
    };
    this.Close = this.Close.bind(this);
    this.Open = this.Open.bind(this);
    this.test = this.test.bind(this);
    this.readKeystore = this.readKeystore.bind(this);
  }

  Close() {
    this.setState({showModal: false});
  }

  Open() {
    this.setState({showModal: true});
  }

  test() {
    let web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546');
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    console.log(JSON.parse(this.state.file.toLowerCase()));
    console.log(x, 2);
    console.log(web3.eth.accounts.decrypt(JSON.parse(this.state.file.toLowerCase()), '1234567890'));
    // console.log(web3.eth.accounts.decrypt(x, 'test!'));
  }

  readKeystore(e) {
    let web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546');
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: reader.result,
      });
      console.log(web3.eth.accounts.decrypt(JSON.parse(this.state.file.toLowerCase()), '1234567890'));
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
                  <input type="radio" id="privateKey" value="File"/>
                  <label htmlFor="privateKey">Private Key</label>
                </div>
              </div>
              <div>
                <input type="file" onChange={(e) => this.readKeystore(e)} ref={el => this.inputKeystore = el}/>
                <button onClick={() => this.test()}>click</button>
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
