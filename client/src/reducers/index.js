import { combineReducers } from 'redux';

import error from './error';
import status from './status';

export default combineReducers({
  error,
  status
});
