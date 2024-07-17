// reducers/auth.js

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGOUT,

  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,

  UPDATE_DISCLAIMER,

} from '../action/types';

const initialState = {
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('user') : false,
  user: typeof window !== 'undefined' ? localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null : null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') ? localStorage.getItem('token') : null : null,
  loading: false,
  error: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user)); // Store token in localStorage
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload)); // Store token in localStorage
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case UPDATE_DISCLAIMER:
      localStorage.setItem('user', JSON.stringify(action.payload)); // Store token in localStorage
      return {
        ...state,
        user: action.payload
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};
