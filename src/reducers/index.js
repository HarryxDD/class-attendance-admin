import { combineReducers } from "redux";

import authReducer from "./authReducer";
import employeeReducer from "./employeeReducer";
import studentReducer from "./studentReducer";

export const reducers = combineReducers({
  employeeReducer,
  studentReducer,
  authReducer,
});
