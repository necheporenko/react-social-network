import React, { Component, PropTypes } from 'react';
import Sbox from './Sbox'; 
import Post from './Post';
import './index.scss';

class Stream extends Component {
  render() {
    return (
      <div className="stream">
          <Sbox placeholder={'Write something...'}/>
          <Post />
          <Post />
        {this.props.children}
      </div>
    );
  }
}

Stream.propTypes = {
  children: PropTypes.element
};

export default Stream;
