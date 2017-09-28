import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Cutaway from './Сutaway';
import BooksTreeContainer from '../../../containers/BooksTreeContainer';
import './index.scss';

let documentHeight;

@connect((state) => ({
  loaded: state.follow.loaded,
}), {})

class InfoBloks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      height: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // this.setState({height: this.infoBlock.clientHeight});
    documentHeight = document.documentElement.clientHeight;
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.height !== this.infoBlock.clientHeight) {
    //   this.setState({height: this.infoBlock.clientHeight});
    // }
    // console.log(prevProps, prevState);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    const scrollTop = document.documentElement.scrollTop || (e.target || e.srcElement).body.scrollTop;
    // console.log(scrollTop);
    this.setState({ scrollTop: scrollTop });
  }

  render() {
    const { scrollTop } = this.state;
    const scroll = () => {
      let booksTreeTop;
      // let infoBlocksTop;

      if (scrollTop <= 275) {
        booksTreeTop = 'wrapper';
      } else {
        booksTreeTop = 'wrapper wrapper-fixed';
      }

      // if (scrollTop < 276) {
      //   infoBlocksTop = 354 - scrollTop;
      //   // console.log('<!---result:', infoBlocksTop, scrollTop, 'clientHeight:', documentHeight, this.state.height, this.state.height - (documentHeight - 350));
      // } else if (documentHeight - this.state.height > 110) {
      //   infoBlocksTop = 115;
      //   // console.log('<!---result2:', infoBlocksTop, scrollTop, 'clientHeight:', documentHeight, this.state.height, this.state.height - (documentHeight - 350));
      // } else if (this.state.height - (documentHeight - 350)) {
      //   infoBlocksTop = (this.state.height - documentHeight) - ((this.state.height - documentHeight) * 1.75);
      //   // console.log('<!---result3:', infoBlocksTop, scrollTop, 'clientHeight:', documentHeight, this.state.height, this.state.height - (documentHeight - 350));
      // }

      const result = {booksTree: booksTreeTop};
      return result;
    };
    const chooseScroll = scroll();

    return (
      <div className="infobloks">
        <Cutaway
          requestedUserProfile={this.props.requestedUserProfile}
        />

        <BooksTreeContainer
          booksTreeTop={chooseScroll.booksTree}
          requestedUser={this.props.requestedUser}
          bookTreeArr={this.props.bookTreeArr}
        />
      </div>
    );
  }
}

InfoBloks.propTypes = {
  requestedUser: PropTypes.object,
  requestedUserProfile: PropTypes.object,
  followers: PropTypes.shape({
    users: PropTypes.array
  }),
  following: PropTypes.shape({
    users: PropTypes.array
  }),
  people: PropTypes.array
};

export default InfoBloks;
