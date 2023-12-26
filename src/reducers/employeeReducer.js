import * as actionType from "../constants/employeeConstants";

const initialState = {
  employees: [],
  attendance: [],
  employeeInfo: null,
  currentPage: 1,
  numberOfPage: 1,
  loading: false,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.START_LOADING:
      return { ...state, loading: true };
    case actionType.EMPLOYEE_DETAILS_SUCCESS:
      return { ...state, loading: false, employeeInfo: action.payload };
    case actionType.EMPLOYEE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: state.employees.filter(
          (employee) => employee.employee_code !== action.payload
        ),
      };
    case actionType.EMPLOYEE_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: [...employees, action.payload],
      };
    case actionType.EMPLOYEE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload.paginatedData,
        currentPage: action.payload.page,
        numberOfPage: action.payload.numberOfPages,
      };
    case actionType.ATTANDANCE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        attendance: action.payload,
      };
    case actionType.EMPLOYEE_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: state.employees.map((att) =>
          att.id === action.payload.id ? att : action.payload
        ),
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
    case actionType.EMPLOYEE_DETAILS_FAIL:
    case actionType.EMPLOYEE_LIST_FAIL:
    case actionType.EMPLOYEE_DELETE_FAIL:
    case actionType.EMPLOYEE_UPDATE_PROFILE_FAIL:
    case actionType.ATTANDANCE_LIST_FAIL:
    case actionType.CHECK_IN_FAIL:
    case actionType.EMPLOYEE_ADD_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default employeeReducer;
