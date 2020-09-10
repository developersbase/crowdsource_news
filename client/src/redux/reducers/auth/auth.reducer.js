import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "./auth.types";

const initialState = {
  isAuthenticated: null,
  loading: true,
  user: null,
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
      };

    case REGISTRATION_FAILED:
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, user: null, isAuthenticated: false, loading: false };

    default:
      return state;
  }
}
