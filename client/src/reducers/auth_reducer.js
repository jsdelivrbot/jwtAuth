import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from '../actions/types';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: null, authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
  }
};
