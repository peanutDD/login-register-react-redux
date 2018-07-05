import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {addFlashMessage} from '../actions/flashMessage'

export default (ComposedComponent) => {
  class Authenticate extends Component {

    componentWillMount() {
      if (!this.props.isAuthorization) {
        this.props.addFlashMessage({
          type: 'danger',
          text: 'You need to login to access this page first'
        })
        this.context.router.history.push('/')
      }
    }

    componentWillUpdate(nextProps, nextState) {
      if (!nextProps.isAuthorization) {
        this.context.router.history.push('/')
      }
    }
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthorization: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  }

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  }

  const mapStateToProps = (state, ownProps) => {
    console.log(state.auth);
    return {
      isAuthorization: state.auth.isAuthorization
    }
  }


  return connect(mapStateToProps, {addFlashMessage})(Authenticate);


}
