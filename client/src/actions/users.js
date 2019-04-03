import { serverHandshake } from './auth';

import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from './types';

export const fetchUsers = () => async dispatch => {
  dispatch({ type: FETCH_USERS_START });
  try {
    const success = await serverHandshake(true).get('/users');
    dispatch({ type: FETCH_USERS_SUCCESS, payload: success.data });
    return success;
  } catch (error) {
    dispatch({ type: FETCH_USERS_FAILURE, payload: error });
    return error;
  }
}
