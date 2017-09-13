import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getUser} from '../../redux/modules/user';
import {getBox} from '../../redux/modules/document';
import DocumentsMenu from './DocumentsMenu';
import AddToken from './AddToken';
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
    // const theUrl = 'https://s3-us-west-2.amazonaws.com/dev.validbook/documents/2017/09/13/53/6bq42106.html';
    // const theUrl = 'http://localhost:3000/darth.vader/documents/board';
    const theUrl = 'https://sinoptik.ua/';
    // const theUrl = 'http://api.github.com';

    // const myHeaders = new Headers();
    //
    const myInit = {
      method: 'GET',
      headers: new Headers(),
      mode: 'no-cors',
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
    result.then((response) => {
      console.log('response', response);
      console.log('header', response.headers.get('Content-Type'));
      return response.text();
    }).then((text) => {
      console.log('got text', text);
    }).catch((ex) => {
      console.log('failed', ex);
    });


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
    return (
      <div className={navigation.posTop}>
        <DocumentsMenu
          sidebar={navigation.sidebar}
        />

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
