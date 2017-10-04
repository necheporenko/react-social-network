import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {
  getUser,
  // getUserSlug
} from '../redux/modules/user';
// import Navigation from '../components/Navigation';
// import SubHeader from '../components/StoryLine/SubHeader';

@connect((state) => ({
  requestedUser: state.user.requestedUser,
  path: state.routing.locationBeforeTransitions.pathname,
}), {
  getUser,
  // getUserSlug,
})

export default class PeopleContainer extends Component {
  componentDidMount() {
    const {path, requestedUser} = this.props;
    const findSlug = path.substring(1, ((path.substring(1).indexOf('/') + 1) || path.lenght));

    if (findSlug !== requestedUser.slug) {
      this.props.getUser(findSlug);
    }
  }

  render() {
    const {requestedUser, fixedBlocks} = this.props;
    return (
      <div>
        <Helmet
          title={`${requestedUser.first_name} ${requestedUser.last_name} - People`}
        />
        {React.cloneElement(this.props.children, {fixedBlocks})}
      </div>
    );
  }
}

PeopleContainer.propTypes = {
  children: PropTypes.element,
  requestedUser: PropTypes.object,
  getUser: PropTypes.func,
  path: PropTypes.string,
};
