/* jshint esversion: 6 */

import React, { Component } from 'react';
import SingForm from './SignupForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessage';
import { isUserExists } from '../../actions/isUserExists';

class SignupPage extends Component {
	static propTypes = {
		userSignupRequest: PropTypes.func.isRequired,
		addFlashMessage: PropTypes.func.isRequired,
		isUserExists: PropTypes.func.isRequired
	};
	render() {
		const {userSignupRequest, addFlashMessage, isUserExists} = this.props;
		return (
			<div className="row">
				<div className="col-md-3" />
				<div className="col-md-6">
					{ /* 路由跳转的方法：第一种 这里的history是只有路由中才有的属性，未定义路由可以从被定义的路由中传下去 history={ this.props.history } */ }
					<SingForm userSignupRequest={userSignupRequest} addFlashMessage= {addFlashMessage} isUserExists={isUserExists}  />
				</div>
				<div className="col-md-3" />
			</div>
		);
	}
}

export default connect(null, { userSignupRequest, addFlashMessage, isUserExists })(SignupPage);
