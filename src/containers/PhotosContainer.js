import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../redux/modules/user';

@connect((state) => ({
  requestedUser: state.user.requestedUser,
  path: state.routing.locationBeforeTransitions.pathname,
}), {
  getUser,
})

export default class PhotosContainer extends Component {
  componentDidMount() {
    const {path, requestedUser} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));

    if (findSlug !== requestedUser.slug) {
      this.props.getUser(findSlug);
    }
  }

  render() {
    return this.props.children;
  }
}

PhotosContainer.propTypes = {
  children: PropTypes.element,
  requestedUser: PropTypes.object,
  getUser: PropTypes.func,
  path: PropTypes.string,
};
