/* jshint esversion: 6 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
class SignupForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			errors: {},
			isLoading: false,
			invalid: false
		};
	}

	static contextTypes = {
		router: PropTypes.object
	}

	static propTypes = {
		userSignupRequest: PropTypes.func.isRequired,
		addFlashMessage: PropTypes.func.isRequired,
		isUserExists: PropTypes.func.isRequired,
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.setState({errors: {}, isLoading: true})
		console.log(this.props);
		this.props.userSignupRequest(this.state).then(
			() => {
				this.props.addFlashMessage({
					type: "success",
					text: "You signed up successfully. welcome"
				})
				this.context.router.history.push('/');
			},
			({response}) => {
				this.setState({ errors: response.data, isLoading: false })
				console.log(response.data);
			}
		)
	};

	checkUserExists = (e) => {
		console.log('onblur')
		const field = e.target.name
		const val = e.target.value
		let invalid
		if (val !== '') {
			this.props.isUserExists(val).then( res => {
				console.log(res);
				let errors = this.state.errors
				if (res.data.user) {
					errors[field] = "There is user with such " + field
					invalid = true
				} else {
					errors[field] = '';
					invalid = false
				}

				this.setState({ errors, invalid })
			})

		}
	}

	render() {
		const { errors } = this.state
		return (
			<form onSubmit={this.onSubmit}>
				<h2>join our community</h2>
				<div className="form-group">
					<label className="control-label" htmlFor="">
						Username
					</label>
					<input
						type="text"
						name="username"
						onChange={this.onChange}
						value={this.state.username}
						onBlur={this.checkUserExists}
						className={ classnames('form-control', { 'is-invalid': errors.username }) }
					/>
					{ errors.username && <span className='form-text text-muted'>{ errors.username }</span> }
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="">
						Email
					</label>
					<input
						type="email"
						name="email"
						onChange={this.onChange}
						value={this.state.email}
						onBlur={this.checkUserExists}
						className={ classnames('form-control', { 'is-invalid': errors.email }) }
					/>
					{ errors.email && <span className='form-text text-muted'>{ errors.email }</span> }
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="">
						Password
					</label>
					<input
						type="password"
						name="password"
						onChange={this.onChange}
						value={this.state.password}
						className={ classnames('form-control', { 'is-invalid': errors.password }) }
					/>
					{ errors.password && <span className='form-text text-muted'>{ errors.password }</span> }
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="">
						PasswordConfirmation
					</label>
					<input
						type="password"
						name="passwordConfirmation"
						onChange={this.onChange}
						value={this.state.passwordConfirmation}
						className={ classnames('form-control', { 'is-invalid': errors.passwordConfirmation }) }
					/>
					{ errors.passwordConfirmation && <span className='form-text text-muted'>{ errors.passwordConfirmation }</span> }
				</div>
				<button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">Sign Up</button>
			</form>
		);
	}
}

export default SignupForm;
