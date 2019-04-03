import axios from 'axios';

import {
  LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE,
  SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILURE
} from './types';

export const serverHandshake = (auth) => {
  const options = {
    baseURL: 'http://penguin.linux.test:3000/api'
  }

  if (auth) {
    options.headers = {
      username: 'Harber.Grayson',
      password: '8Hazel98'
    }
  }

  return axios.create(options);
}

export const authLogin = creds => async dispatch => {
  dispatch({ type: LOGIN_START });
  try {
    const success = await serverHandshake().post('/login', creds);
    dispatch({ type: LOGIN_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
    return error;
  }
}

export const authSignup = creds => async dispatch => {
  dispatch({ type: SIGNUP_START });
  try {
    const success = await serverHandshake().post('/register', creds);
    dispatch({ type: SIGNUP_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error });
    return error;
  }
}
