import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

const API_URL ='http://localhost:3090';

const createAuthAction = (route, errMsg) => (
  ({ email, password }) => dispatch => (
  axios.post(`${API_URL}/${route}`, { email, password })
    .then(res => {
      dispatch({ type: AUTH_USER });
      window.localStorage.setItem('token', res.data.token);
    })
    .catch(res => {
      errMsg = (res.data && res.data.error) || errMsg;
      dispatch(authError(errMsg));
      throw new Error(errMsg);
    })
  )
);

export const authError = error => ({
  type: AUTH_ERROR,
  payload: error
});

export const signinUser = createAuthAction('signin', 'Bad Login Info');
export const signupUser = createAuthAction('signup');

export const signoutUser = () => {
  window.localStorage.removeItem('token');

  return { type: UNAUTH_USER };
};
