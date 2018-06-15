import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types'

import validateInput from '../../utils/validations/login'
import { connect } from 'react-redux'
import {login} from '../../actions/loginActions'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    }
  }

  static propsTypes = {
    login: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  onChange = (e) => {
  this.setState({
      [e.target.name]: e.target.value
    });
  };

  isValid = ( ) => {
    const {errors, isValid} =  validateInput(this.state)

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid;
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({errors: {}, isLoading: true})
      this.props.login(this.state).then(
        (res) => this.context.router.history.push('/'),
        (err) => {
          console.log(err.response);
          this.setState({errors: err.response.data.errors, isLoading: false})

        }
      )
    }
  }
  render() {
    const { identifier, password, errors, isLoading } = this.state

    return (
      <form onSubmit= {this.onSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert alert-danger">{ errors.form }</div> }

        <div className="form-group">
					<label className="control-label" htmlFor="">
						Username / Email
					</label>
					<input
						type="text"
						name = "identifier"
            value={identifier}
						onChange={this.onChange}
						className={ classnames('form-control', { 'is-invalid': errors.identifier }) }
					/>
					{ errors.identifier && <span className='form-text text-muted'>{ errors.identifier }</span> }
				</div>
        <div className="form-group">
					<label className="control-label" htmlFor="">
						Password
					</label>
					<input
						type="password"
						name = "password"
            value={password}
						onChange={this.onChange}
						className={ classnames('form-control', { 'is-invalid': errors.password }) }
					/>
					{ errors.password && <span className='form-text text-muted'>{ errors.password }</span> }
				</div>
        <button disabled={ isLoading } className="btn btn-primary btn-lg">Login</button>
      </form>
    );
  }
}

export default connect(null, {login})(LoginForm)