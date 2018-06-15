/* jshint esversion: 6 */

import {combineReducers} from 'redux';

import auth from './auth';
import flashMessage from './flashMessage';

export default combineReducers({
    auth,
    flashMessage
});