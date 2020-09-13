import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "./auth.types";

const initialState = {
  isAuthenticated: null,
  loading: true,
  user: null,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTRATION_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
        errors: null,
      };

    case REGISTRATION_FAILED:
    case LOGOUT:
    case AUTH_ERROR:
    case LOGIN_FAILED:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        errors: payload,
      };

    default:
      return state;
  }
}
