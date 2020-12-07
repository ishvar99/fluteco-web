import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  SET_AUTH_LOADING,
  LOGIN_FAIL,
  REGISTER_FAIL,
  USER_LOADED,
  FORGOT_PASSWORD_ERROR,
  LOGOUT,
  AUTH_ERROR,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
  CLEAR_ERROR,
  CLEAR_MESSAGE,
} from "../actions/types"
const initialState = {
  authLoading: false,
  error: null,
  isAuthenticated: false,
  message: null,
  user: null,
}
export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      return {
        ...state,
        authLoading: false,
        isAuthenticated: true,
        error: null,
      }
    }
    case SET_AUTH_LOADING: {
      return {
        ...state,
        authLoading: action.payload,
      }
    }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR: {
      return {
        ...state,
        error: action.payload || "Server Error",
        authLoading: false,
        user: null,
      }
    }
    case USER_LOADED: {
      return {
        ...state,
        user: action.payload.data,
        authLoading: false,
        isAuthenticated: true,
        error: null,
      }
    }
    case LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        authLoading: false,
        user: null,
      }
    }
    case FORGOT_PASSWORD:
    case RESET_PASSWORD: {
      console.log(action.payload)
      return {
        ...state,
        authLoading: false,
        message: action.payload,
      }
    }

    case FORGOT_PASSWORD_ERROR:
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        authLoading: false,
        message: action.payload,
      }
    }
    case CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      }
    }
    case CLEAR_MESSAGE: {
      return {
        ...state,
        message: null,
      }
    }
    default:
      return state
  }
}
