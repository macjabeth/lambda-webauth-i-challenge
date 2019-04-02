import {
  LOGIN_FAILURE,
  SIGNUP_FAILURE,
  FETCH_USERS_FAILURE
} from '../actions/types';

export default (state, action) => {
  switch (action.type) {
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
    case FETCH_USERS_FAILURE:
      return action.payload;
    default:
      return '';
  }
}
