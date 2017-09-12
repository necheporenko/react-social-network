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

        <div className="wrapper-document-lists">
          {slug === this.props.authorizedUser.slug &&
          <Link
            to={`/${this.props.authorizedUser.slug}/documents/document`}
            style={{marginLeft: '20px', marginBottom: '20px', display: 'block'}}
          >
            <button className="btn-brand">New document</button>
          </Link>
          }

          <div className="common-lists tokens-lists">
            {box.id && box.children && box.children.map(document => (
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
