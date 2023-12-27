import * as actionType from "../constants/employeeConstants";

const initialState = {
  students: [],
  attendance: [],
  loading: false,
};

const studentReducer = (state = initialState, action) => {
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
        students: action.payload.data,
      };
    case actionType.ATTENDANCE_LIST_SUCCESS:
      console.log('action.payload', action.payload)
      return {
        ...state,
        loading: false,
        attendance: action.payload,
      };
    case actionType.STUDENT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        students: state.employees.filter(
          (student) => student.personId !== action.payload
        ),
      };
    case actionType.ATTENDANCE_LIST_FAIL:
    case actionType.STUDENT_ADD_FAIL:
    case actionType.STUDENT_DELETE_FAIL:
    case actionType.STUDENT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default studentReducer;
