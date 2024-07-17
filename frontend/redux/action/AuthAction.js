// actions/AuthAction.js
import axios from 'axios';

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
} from "./types"

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const registerRequest = () => ({ type: REGISTER_REQUEST });
export const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
export const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });


// Helper function to get CSRF token from cookies

export const login = (credentials) => async dispatch => {
  try {
    const response = await axios.post(
      '/api/user_login/',
      credentials,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response ? error.response.data.error : 'Login failed',
    });
  }
};

export const register = (userInfo) => async dispatch => {
  try {
    const response = await axios.post(
      '/api/user_register/',
      userInfo,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response ? error.response.data : 'Registration failed',
    });
  }
};


// Action to handle logout
export const logout = (token) => dispatch => {
  try {
    const response = axios.get('/api/user_logout/',
      {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }); // Call logout endpoint
    console.log(response);
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};

export const updateDisclaimer = (data) => {
  return {
    type: 'UPDATE_DISCLAIMER',
    payload: data.user
  };
};


export const updateUserProfileSettings = (data) => {
  return {
    type: 'UPDATE_USERPROFILE',
    payload: data.user
  };
};
