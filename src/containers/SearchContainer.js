import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NavigationSearch from '../components/Navigation/NavigationSearch';

class SearchContainer extends Component {
  render() {
    return (
      <div>
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
