
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {logout} from '../actions/loginActions';


class NavigationBar extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  logout = (e) => {
    e.preventDefault()
    this.props.logout()
  }
  render() {

    const { isAuthorization } = this.props.auth
    console.log(isAuthorization);
    const userLinks = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <button className="btn btn-secondary" onClick={this.logout} >logout</button>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="/signup">sign up</Link>
        </li>
        <li>
          <Link className="nav-link" to="/login">login</Link>
        </li>
      </ul>
    )
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light mb-3">
        <div className="container">
          <Link className="navbar-brand" to="/">ReuxLogin</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsExample03">
            { isAuthorization? userLinks: guestLinks }
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state.auth)
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {logout})(NavigationBar)
