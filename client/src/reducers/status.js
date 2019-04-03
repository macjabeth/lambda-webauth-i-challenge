import {
  LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE,
  SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, loggingIn: true }
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
      return { ...state, loggingIn: false }
    case SIGNUP_START:
      return { ...state, signingUp: true }
    case SIGNUP_SUCCESS:
    case SIGNUP_FAILURE:
      return { ...state, signingUp: false }
    case FETCH_USERS_START:
      return { ...state, fetchingUsers: true }
    case FETCH_USERS_SUCCESS:
    case FETCH_USERS_FAILURE:
      return { ...state, fetchingUsers: false }
    default:
      return state;
  }
}
