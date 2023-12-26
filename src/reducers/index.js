import { combineReducers } from "redux";

import authReducer from "./authReducer";
import employeeReducer from "./employeeReducer";

export const reducers = combineReducers({
  employeeReducer,
  authReducer,
});
