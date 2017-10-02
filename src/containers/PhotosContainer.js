import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
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
    const {requestedUser} = this.props;
    return (
      <div>
        <Helmet
          title={`${requestedUser.first_name} ${requestedUser.last_name} - Photos`}
        />
        {this.props.children}
      </div>
    );
  }
}

PhotosContainer.propTypes = {
  children: PropTypes.element,
  requestedUser: PropTypes.object,
  getUser: PropTypes.func,
  path: PropTypes.string,
};
