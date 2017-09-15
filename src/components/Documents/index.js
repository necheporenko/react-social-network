import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import ReactMarkdown from 'react-markdown';
import {getUser} from '../../redux/modules/user';
import {getBox} from '../../redux/modules/document';
import DocumentsMenu from './DocumentsMenu';
import SignHumanCard from '../Popup/SignHumanCard';
import './index.scss';

let savePositionTop;
const doc = [1, 2, 3, 4, 5, 6, 7, 8, 9];

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
  path: state.routing.locationBeforeTransitions.pathname,
  box: state.document.box,
}), {
  getUser,
  getBox
})

export default class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: null,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.saveScroll = this.saveScroll.bind(this);
    this.httpGet = this.httpGet.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.saveScroll();
    const {path} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));
    const boxSlug = path.indexOf('/documents/') === -1 ? 'board' : path.substring(path.indexOf('/documents/') + 11);
    // this.props.getUser(findSlug)
    //   .then(this.props.getBox(boxSlug));
    this.props.getBox(boxSlug);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    const scrollTop = e.srcElement.body.scrollTop;
    savePositionTop = scrollTop;
    this.setState({scrollTop});
  }

  saveScroll() {
    // console.log(`saveScroll:${savePositionTop}`);
    this.setState({scrollTop: savePositionTop});
  }

  httpGet() {
    // const theUrl = 'https://s3-us-west-2.amazonaws.com/dev.validbook/documents/2017/09/13/53/4CEA4106.html';
    const theUrl = 'https://s3-us-west-2.amazonaws.com/dev.validbook/human_card/2017/09/14/1/hc_Jimbo_Fry.md';
    // const theUrl = 'http://localhost:3000/darth.vader/documents/board';
    // const theUrl = 'http://api.validbook.org';
    // const theUrl = 'https://api.github.com';

    // const myHeaders = new Headers();
    //
    const myInit = {
      method: 'GET',
      headers: new Headers(),
      mode: 'cors',
      cache: 'default'
    };

    // fetch(theUrl, myInit)
    //   .then((response) => {
    //     console.log(response);
    //     return response.text();
    //   }).then((body) => {
    //     console.log(body, 'hey');
    //   }).catch(error => {
    //     console.log('error', error);
    //   });

    const result = fetch(theUrl, myInit);
    console.log(result);
    result.then((response) => {
      console.log('response', response);
      console.log('header', response.headers.get('Content-Type'));
      return response.text();
    }).then((text) => {
      console.log('got text', text);
    }).catch((ex) => {
      console.log('failed', ex);
    });

    const XHR = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    const xhr = new XHR();
// (2) запрос на другой домен :)
    xhr.open('GET', theUrl, true);
    xhr.onload = function () {
      alert(this.responseText);
    };
    xhr.onerror = function () {
      alert(`Ошибка ${this.status}`);
    };
    xhr.send();

    // let xmlhttp;
    //
    // if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    //   xmlhttp = new XMLHttpRequest();
    // } else { // code for IE6, IE5
    //   xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    // }
    // xmlhttp.onreadystatechange = function () {
    //   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //     console.log('hey', xmlhttp.responseText);
    //   }
    // };
    // xmlhttp.open('GET', theUrl, false);
    // xmlhttp.send();
  }

  render() {
    const {scrollTop} = this.state;
    const {box} = this.props;
    const {slug} = this.props.requestedUser;

    const chooseNav = () => {
      let Nav;
      let sidebar;
      if (scrollTop <= 275 || !scrollTop) {
        Nav = 'tokens contents';
        sidebar = 'sidebar-default';
      } else {
        Nav = 'tokens contents contents-fixed';
        sidebar = 'sidebar-fixed';
      }
      const result = {posTop: Nav, sidebar};
      return result;
    };

    const navigation = chooseNav();
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
      <div className={navigation.posTop}>
        <DocumentsMenu
          sidebar={navigation.sidebar}
        />
        <div>
          <div style={{display: 'flex'}}>
            <div className="human-card human-card-preview">
              <h1>Human card</h1>
              <hr/>
              <p>
                <strong>Public Address:</strong>
                <input
                  type="text" placeholder="Paste your public address here"
                  style={{width: '406px', height: '34px', marginLeft: '5px'}}
                />
              </p>
              <p>This public address has been established for:</p>
              <h2>
                <input type="text" placeholder="Paste your name here" defaultValue="FirstName LastName" />
              </h2>
              <p>Digital Signature: <span style={{color: '#8F8F8F'}}>Here will be your signature</span></p>

              {/*<ReactMarkdown source={input}/>*/}
            </div>
            <div className="human-card-btn">
              <button className="btn-brand">Save</button>
              <SignHumanCard/>
            </div>
          </div>

          <div className="common-lists tokens-lists">
            {/*<button onClick={() => this.httpGet()}>CLICK</button>*/}
            {box.id && box.documents && box.documents.map(document => (
              <div key={document.id} className="document">
                <Link to={`/${slug}/documents/${box.key}/${document.id}`}>
                  <div>
                    <i className="doc-icon"/>
                    {/*<div className="doc-sign">*/}
                    {/*<i/>*/}
                    {/*</div>*/}
                    <p>{document.title}</p>
                  </div>
                </Link>
              </div>
            ))}

            {/*{doc.map((document, index) => (*/}
            {/*<div key={index} className="document">*/}
            {/*<a href="">*/}
            {/*<div>*/}
            {/*<i className="doc-icon"/>*/}
            {/*/!*<div className="doc-sign">*!/*/}
            {/*/!*<i/>*!/*/}
            {/*/!*</div>*!/*/}
            {/*<p>Document 1</p>*/}
            {/*</div>*/}
            {/*</a>*/}
            {/*</div>*/}
            {/*))}*/}

            {/*<AddToken*/}
            {/*authorizedUser={this.props.authorizedUser}*/}
            {/*/>*/}

          </div>
        </div>
      </div>
    );
  }
}

Box.propTypes = {
  getUser: PropTypes.func,
  authorizedUser: PropTypes.object,
  requestedUser: PropTypes.object,
  path: PropTypes.string,
  getBox: PropTypes.func,
  box: PropTypes.object,
};
