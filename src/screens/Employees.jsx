import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import { textVariant, zoomIn } from "../utils/motion";
import { EmployeeDeleteModal } from "./";
import { deleteEmployee, fetchEmployees } from "../actions/employeeActions";
import { Button, Loader } from "../components";
import { HOST_API } from "../constants/Api";

const Employees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const employeeReducer = useSelector((state) => state.employeeReducer);
  const { employees, currentPage, numberOfPage, loading } = employeeReducer;

  const [employeesState, setEmployeesState] = useState(employees);

  const userInfo = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    console.log(userInfo);
    if (userInfo?.id == 1) {
      dispatch(fetchEmployees(currentPage));
    } else {
      navigate("/login");
    }
  }, [dispatch, employeesState]);

  const handlePageChange = (pageNumber) => {
    dispatch(fetchEmployees(pageNumber));
  };
  const handleDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    console.log("Deleting...", selectedId);
    dispatch(deleteEmployee(selectedId));
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 border border-slate-200 rounded-xl">
      {loading && <Loader />}
      <div className="py-8">
        <div>
          <motion.h2
            variants={textVariant(0.5)}
            initial="hidden"
            animate="show"
            className="text-2xl font-semibold leading-tight"
          >
            Quản lý nhân viên
          </motion.h2>
        </div>
        <div className="my-2 flex sm:flex-row flex-col justify-between items-center">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 1,
              bounce: 0.1,
            }}
            className="flex flex-row mb-1 sm:mb-0 sm:flex-row border border-slate-500 rounded-md overflow-hidden"
          >
            <div className="flex items-center justify-center border ">
              <input
                placeholder="Search"
                className="p-2 bg-white text-lg outline-none"
              />
              <span className="text-2xl p-2">
                <AiOutlineSearch />
              </span>
            </div>
          </motion.div>
          <div>
            <Button to="/add_employee" className="w-full ml-auto" primary>
              Thêm nhân viên
            </Button>
          </div>
        </div>
        {employees.length == 0 ? (
          <div>Chưa có nhân viên nào</div>
        ) : (
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Nhân Viên
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Chức Vụ
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Phòng Ban
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tuổi
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Hành Động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, i) => (
                    <motion.tr
                      variants={zoomIn(i * 0.03, 0.5)}
                      initial="hidden"
                      whileInView="show"
                      whileHover="whileHover"
                      key={i}
                    >
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <a
                          className="flex items-center"
                          href={`/employees/${employee.employee_code}`}
                        >
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={HOST_API.concat(employee.img)}
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {employee.first_name}
                            </p>
                          </div>
                        </a>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {employee.position}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {employee.department}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">{employee.age}</span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Button
                          className="mr-2 bg-yellow-500 rounded-md text-textColor shadow-md"
                          href={`/employees/${employee.employee_code}/edit`}
                        >
                          Edit
                        </Button>
                        <Button
                          className=" bg-red-300 rounded-md text-textColor shadow-md"
                          onClick={() => handleDelete(employee.employee_code)}
                        >
                          Delete
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* pagination */}
            <div className="mt-10">
              <ul className="inline-flex justify-center w-full -space-x-px mx-auto">
                <li>
                  <button
                    disabled={currentPage == 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Prev
                  </button>
                </li>
                {Array.from({ length: numberOfPage }).map((_, i) => (
                  <li>
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    disabled={currentPage === numberOfPage}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <EmployeeDeleteModal
        isOpen={isModalOpen}
        employeeId={selectedId}
        onConfirm={handleConfirm}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Employees;
