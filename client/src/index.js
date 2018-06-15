/* jshint esversion: 6 */
/* jshint -E058 */

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import jwtDecode from 'jwt-decode';
import NavigationBar from './components/NavigationBar';
import FlashMessageList from './components/flash/FlashMessageList';
import setAuthorizationToken from './utils/setAuthorizationToken';
import {setCurrentUser} from './actions/loginActions';

import {BrowserRouter as Router} from 'react-router-dom';
import routes from './routers';

import {createStore, applyMiddleware} from 'redux';

import rootReducer from './reducers';
import {Provider} from 'react-redux';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken)
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
}

console.log(localStorage.jwtToken)

ReactDOM.render(
	<Provider store={store}>
		<Router routes={routes}>
			<div>
				<NavigationBar/>
				<FlashMessageList/>
				{routes}
			</div>
		</Router>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
