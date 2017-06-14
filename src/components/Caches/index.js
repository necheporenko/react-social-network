import React, { Component } from 'react';
import { connect } from 'react-redux';
import TokensMenu from './TokensMenu';
import AddToken from './AddToken';
import './index.scss';

let savePositionTop;

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
}), {})

export default class Tokens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: null
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.saveScroll = this.saveScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.saveScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    const scrollTop = e.srcElement.body.scrollTop;
    savePositionTop = scrollTop;
    this.setState({ scrollTop });
  }

  saveScroll() {
    // console.log(`saveScroll:${savePositionTop}`);
    this.setState({ scrollTop: savePositionTop });
  }
  render() {
    const { scrollTop } = this.state;

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
      const result = { posTop: Nav, sidebar };
      return result;
    };

    const navigation = chooseNav();
    return (
      <div className={navigation.posTop}>
        <TokensMenu
          sidebar={navigation.sidebar}
        />

        <div className="common-lists tokens-lists">

          <AddToken
            authorizedUser={this.props.authorizedUser}
          />

          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
          <div className="token">
            <a href=""><i></i></a>
          </div>
        </div>
      </div>
    );
  }
}
