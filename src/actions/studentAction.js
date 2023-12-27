import * as api from "../api/index";
import * as actionType from "../constants/employeeConstants";

export const fetchStudents = (page) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.START_LOADING,
    });

    const { data } = await api.fetchStudents();
    // const numberOfPages = parseInt(data.length / 10) + 1; // 10 is number of items per page
    // const startIndex = (page - 1) * 10;
    // const endIndex = startIndex + 10;
    // const paginatedData = data.slice(startIndex, endIndex);

    dispatch({
      type: actionType.STUDENT_LIST_SUCCESS,
      payload: { data },
    });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch({
      type: actionType.STUDENT_LIST_FAIL,
      payload: message,
    });
  }
};

export const addStudent = (formData) => async (dispatch) => {
  try {
    dispatch({ type: actionType.START_LOADING });

    console.log("formDataAddStudent", formData);
    const { data: studentData } = await api.addNewStudent(formData);

    dispatch({ type: actionType.STUDENT_ADD_SUCCESS, payload: studentData });
    alert("Successfully added new student");
  } catch (error) {
    console.log("error", error);
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch({
      type: actionType.STUDENT_ADD_FAIL,
      payload: message,
    });
  }
};