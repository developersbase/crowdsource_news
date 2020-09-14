import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
} from "./auth.types";

import { setAlert } from "../alert/alert.actions";

//Sign up action function
export const signup = ({ username, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify({ username, email, password });

  try {
    const response = await axios.post(`/api/users/signup`, body, config);

    dispatch({
      type: REGISTRATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.message, "danger", "times-circle"))
      );
    }
    dispatch({
      type: REGISTRATION_FAILED,
    });
  }
};

//Login action function
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post(`/api/users/login`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.message, "danger", "times-circle"))
      );
    }
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

//Logout action function
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
