import {
  AUTH_FAIL,
  AUTH,
  START_LOADING,
  LOGOUT,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_DETAILS_FAIL,
} from "../constants/employeeConstants";

import * as api from "../api/index";

export const login = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.login(formData);
    const { data: employeeInfo } = await api.fetchEmployee(data.id);

    dispatch({ type: AUTH, data });
    dispatch({ type: EMPLOYEE_DETAILS_SUCCESS, payload: employeeInfo });

    router("/");
  } catch (error) {
    console.log(error);
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch({
      type: AUTH_FAIL,
      payload: message,
    });
  }
};

export const register = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    console.log(data);

    dispatch({ type: AUTH, data });

    router("/detail_infor");
  } catch (errors) {
    const message =
      errors.response && errors.response.data
        ? errors.response.data
        : errors.message;
    console.log(errors);
    dispatch({
      type: AUTH_FAIL,
      payload: message,
    });
  }
};

export const logout = (router) => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT });

    router("/login");
  } catch (error) {
    console.error(error);
  }
};
