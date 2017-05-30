import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getQuery } from '../../redux/modules/search';

@connect((state) => ({
}), {
  getQuery
})

export default class SearchField extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      this.props.getQuery(event.target.value);
      browserHistory.push('/search/people');
    }
  }

  render() {
    return (
      <div className="search-field">
        <input type="text" placeholder="Search" onKeyPress={this.handleChange}/>
        <span></span>
      </div>
    );
  }
}
