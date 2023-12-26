import routesConfig from "../config/route";
import {
  AddEmployees,
  Attendance,
  Employees,
  Login,
  Register,
  Employee,
  EditEmployee,
  DetailInfor,
  Students,
  chart,
} from "../screens";

const publicRoutes = [
  { path: routesConfig.attendance, component: Attendance },
  { path: routesConfig.students, component: Students },
  { path: routesConfig.profile, component: Employee },
  { path: routesConfig.login, component: Login, layout: null },
  { path: routesConfig.chart, component: chart },
  { path: routesConfig.register, component: Register, layout: null },
  { path: routesConfig.detailInfor, component: DetailInfor, layout: null },
];
const privateRoutes = [
  { path: routesConfig.profile_edit, component: EditEmployee },
  { path: routesConfig.employees, component: Employees },
  { path: routesConfig.add_employee, component: AddEmployees },
];

export { publicRoutes, privateRoutes };
