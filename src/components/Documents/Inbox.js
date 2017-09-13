import React, {Component} from 'react';
// import {default as Web3} from 'web3';
import DocumentsMenu from './DocumentsMenu';
import './index.scss';

class TokensExchange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signature: null,
    };
    this.test = this.test.bind(this);
  }

  test() {
    // const privateKey = '6015d764ec8d2f209e335ed2b83f23aa4919a8594a37e5173e441848ec872a1e';
    // let web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546');
    //
    // if (typeof web3 !== 'undefined') {
    //   web3 = new Web3(web3.currentProvider);
    // } else {
    //   web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    // }

    // this.setState({signature: web3.eth.accounts.sign(this.msg.value, this.key.value)});
    // console.log(web3.eth.accounts.sign(data, privateKey));
    // web3.eth.personal.sign(web3.utils.utf8ToHex("Hello world"), "0x46897638b09B3a3ac21Da64B8FA81aD7d07B143F", "12345678")
    //   .then(console.log);

    // web3.eth.sign("Hello world", "0x46897638b09B3a3ac21Da64B8FA81aD7d07B143F")
    //   .then(console.log);
  }

  render() {
    const {signature} = this.state;
    return (
      <div className="tokens contents">
        <DocumentsMenu/>

        <div className="common-lists tokens-lists exchange">
          <div>
            <textarea
              ref={c => this.msg = c} name="eth" id="" cols="30" rows="5" placeholder="Message..."
              style={{width: '500px'}}
            />
            <br/>
            <input ref={c => this.key = c} type="text" placeholder="Key..." style={{width: '500px'}}/>
            <br/>
            {/*<button onClick={() => this.test()}>Sign</button>*/}
            <br/>
            {signature &&
            <div>
              Result:
              <ul>
                <li>{`message: ${signature.message}`}</li>
                <li>{`messageHash: ${signature.messageHash}`}</li>
                <li>{`r: ${signature.r}`}</li>
                <li>{`s: ${signature.s}`}</li>
                <li>{`signature: ${signature.signature}`}</li>
              </ul>
            </div>
            }
          </div>

          {/*<div className="input">*/}
          {/*<div className="wrapper">*/}
          {/*<h3>Incoming Tokens</h3>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*<div className="output">*/}
          {/*<div className="wrapper">*/}
          {/*<h3>Outcoming Tokens</h3>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*</div>*/}

        </div>
      </div>
    );
  }
}

export default TokensExchange;
