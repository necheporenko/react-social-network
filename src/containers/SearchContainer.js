import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import NavigationSearch from '../components/Navigation/NavigationSearch';

class SearchContainer extends Component {
  render() {
    return (
      <div>
        <Helmet title="Search"/>
        <NavigationSearch />
        {this.props.children}
      </div>
    );
  }
}

SearchContainer.propTypes = {
  children: PropTypes.element
};

export default connect(null, null)(SearchContainer);
