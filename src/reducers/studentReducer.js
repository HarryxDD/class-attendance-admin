import * as actionType from "../constants/employeeConstants";

const initialState = {
  students: [],
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.START_LOADING:
      return { ...state, loading: true };
    case actionType.STUDENT_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        students: [...students, action.payload],
      };
    case actionType.STUDENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload.data,
      };
    case actionType.ATTANDANCE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        attendance: action.payload,
      };
    case actionType.CHECK_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        attendance: state.attendance.map((employee) =>
          employee.employee_code !== action.payload.employee_code
            ? employee
            : action.payload
        ),
      };
    case actionType.ATTANDANCE_LIST_FAIL:
    case actionType.CHECK_IN_FAIL:
    case actionType.EMPLOYEE_ADD_FAIL:
    case actionType.STUDENT_ADD_FAIL:
    case actionType.STUDENT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default employeeReducer;
