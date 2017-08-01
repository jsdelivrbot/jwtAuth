import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

const API_URL ='http://localhost:3090';

export const signinUser = ({ email, password }) => dispatch => (
  axios.post(`${API_URL}/signin`, { email, password })
    .then(res => {
      dispatch({ type: AUTH_USER });
      window.localStorage.setItem('token', res.data.token);
    })
    .catch(() => {
      dispatch(authError('Bad Login Info'));
      throw new Error('Bad Login Info');
    })
);

export const authError = error => ({
  type: AUTH_ERROR,
  payload: error
});
