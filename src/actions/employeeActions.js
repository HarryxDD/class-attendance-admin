import axios from "axios";
import * as api from "../api/index";
import * as actionType from "../constants/employeeConstants";
import { HOST_API } from "../constants/Api";

export const addEmployee =
  (formData, formAuth, navigate) => async (dispatch) => {
    try {
      dispatch({ type: actionType.START_LOADING });
      const { data: authData } = await api.register(formAuth);

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Token ".concat(authData.token),
        },
      };

      const { data: newEmployee } = await axios.post(
        HOST_API.concat("/staff/create"),
        formData,
        config
      );

      dispatch({ type: actionType.EMPLOYEE_ADD_SUCCESS, payload: newEmployee });
      alert("Thêm nhân viên thành công");
      navigate("/employees");
    } catch (error) {
      console.log(error);
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: actionType.EMPLOYEE_ADD_FAIL,
        payload: message,
      });
    }
  };
export const addEmployeeInfo = (formData) => async (dispatch) => {
  try {
    dispatch({ type: actionType.START_LOADING });

    console.log("----");
    console.log(formData);
    const { data: employeeData } = await api.addEmployee(formData);

    dispatch({ type: actionType.EMPLOYEE_ADD_SUCCESS, payload: employeeData });
    alert("Thêm nhân viên thành công");
  } catch (error) {
    console.log(error);
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch({
      type: actionType.EMPLOYEE_ADD_FAIL,
      payload: message,
    });
  }
};

export const getEmployeeDetails = (username) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.START_LOADING,
    });

    const { data } = await api.fetchEmployee(username);

    dispatch({
      type: actionType.EMPLOYEE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: actionType.EMPLOYEE_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateEmployeeProfile =
  (id, employee, navigate) => async (dispatch) => {
    try {
      dispatch({
        type: actionType.START_LOADING,
      });

      const { data } = await api.updateEmployee(id, employee);

      dispatch({
        type: actionType.EMPLOYEE_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });

      navigate("/employees");

      localStorage.setItem("employeeInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({
        type: actionType.EMPLOYEE_UPDATE_PROFILE_FAIL,
        payload: message,
      });
    }
  };

export const fetchAttandance = (date) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.START_LOADING,
    });

    const { data: AttData } = await api.fetchAttandance(date);
    const { data: EmData } = await api.fetchEmployees();

    var data = [];
    if (AttData && Array.isArray(AttData) && AttData.length > 0) {
      const mergedList = EmData.map((employee) => {
        const employeeAttendance = AttData.find(
          (a) => a.employee_code === employee.employee_code
        );
        return {
          ...employee,
          ...employeeAttendance,
        };
      });

      const sortedList = mergedList.sort((a, b) => {
        if (a.time_in && b.time_in) {
          return b.time_in.localeCompare(a.time_in);
        } else if (a.time_in) {
          return -1;
        } else {
          return 1;
        }
      });
      dispatch({
        type: actionType.ATTANDANCE_LIST_SUCCESS,
        payload: (data = [...sortedList]),
      });
    } else {
      dispatch({
        type: actionType.ATTANDANCE_LIST_SUCCESS,
        payload: (data = [...EmData]),
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: actionType.ATTANDANCE_LIST_FAIL,
      payload: message,
    });
  }
};

export const fetchEmployees = (page) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.START_LOADING,
    });

    const { data } = await api.fetchEmployees();
    const numberOfPages = parseInt(data.length / 10) + 1; // 10 is number of items per page
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const paginatedData = data.slice(startIndex, endIndex);

    dispatch({
      type: actionType.EMPLOYEE_LIST_SUCCESS,
      payload: { paginatedData, page, numberOfPages },
    });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch({
      type: actionType.EMPLOYEE_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.START_LOADING,
    });

    await api.deleteEmployee(id);

    dispatch({ type: actionType.EMPLOYEE_DELETE_SUCCESS, payload: id });
  } catch (error) {
    console.log(error);
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch({
      type: actionType.EMPLOYEE_DELETE_FAIL,
      payload: message,
    });
  }
};

export const CheckIn = (employee_code) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.START_LOADING,
    });

    const { data } = await api.CheckIn(employee_code);
    console.log(data);
    dispatch({
      type: actionType.CHECK_IN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch({
      type: actionType.CHECK_IN_FAIL,
      payload: message,
    });
  }
};

export const fetchAttandanceChart = async (month, year) => {
  try {
    const { data } = await api.fetchAttandanceChart(month, year);
    return data;
  } catch (error) {
    console.log(error);
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    return message;
  }
};
