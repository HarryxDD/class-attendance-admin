import {
  AUTH,
  AUTH_FAIL,
  LOGOUT,
  START_LOADING,
} from "../constants/employeeConstants";

const initialState = {
  authData: JSON.parse(localStorage.getItem("profile")) || null,
  loading: false,
  serverErrors: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        loading: false,
        serverErrors: null,
      };
    case AUTH_FAIL:
      return { ...state, loading: false, serverErrors: action.payload };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, serverErrors: null };
    default:
      return state;
  }
};

export default authReducer;
