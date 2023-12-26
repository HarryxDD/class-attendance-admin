import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";

import app from "../../config/firebaseConfig";
import { Button, Loader } from "../../components";
import { useParams } from "react-router-dom";
import { CheckIn } from "../../actions/employeeActions";
import { HOST_API } from "../../constants/Api";
import { getDatabase, ref, onValue, off, set } from "firebase/database";

const database = getDatabase(app);
const databaseRef = ref(database, "messages");

const today = new Date();
const currentMonth = (today.getMonth() + 1).toString();
const currentYear = today.getFullYear().toString();

const Employee = () => {
  const dispatch = useDispatch();
  const [month, setMonth] = useState(currentMonth);
  const { username } = useParams();
  const profile = useSelector((state) => state.authReducer.authData);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [employeeData, setEmployeeData] = useState({});
  const [loading, setLoading] = useState(false);
  var message = "Unknown";
  var month_filter = [];

  for (let i = 1; i <= currentMonth; i++) {
    month_filter.push(i);
  }

  useEffect(() => {
    axios
      .get(
        `${HOST_API}/staff/attendance/${username}/statistical?month=${month}&year=${currentYear}`
      )
      .then((response) => {
        console.log(response.data);
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    if (profile?.username && profile?.username === username) {
      setIsCurrentUser(true);
    }
    const onDataChange = async (snapshot) => {
      // Get the message value from the snapshot
      message = snapshot.val();

      // Check if the message is different from the known value
      if (message === username) {
        setLoading(true);
        dispatch(CheckIn(message));
        await set(databaseRef, "Unknown");
        axios
          .get(
            `${HOST_API}/staff/attendance/${username}/statistical?month=${month}&year=2023`
          )
          .then((response) => {
            console.log(response.data);
            setEmployeeData(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        setLoading(false);
      }
    };

    // Attach the listener
    onValue(databaseRef, onDataChange);

    // Clean up the listener on component unmount
    return () => {
      off(databaseRef, "value", onDataChange);
    };
  }, [dispatch, month, username, profile?.username, message]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 m-4 bg-white rounded-md shadow-md"
    >
      {loading && <Loader />}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-medium">Thông tin cá nhân</h2>
        {isCurrentUser && (
          <Button primary to="#">
            Sửa thông tin
          </Button>
        )}
      </div>
      <motion.div className="w-full space-y-8 p-8 px-16 bg-white rounded-lg">
        <img
          src={HOST_API.concat(employeeData.img)}
          alt="Avatar"
          className="mx-auto object-cover w-32 h-32 rounded-full shadow-lg"
        />
        <div className="mt-2 mx-auto p-4 min-w-fit text-center">
          <h2 className="font-semibold text-2xl">
            {employeeData.last_name} {employeeData.first_name}
          </h2>
          <p className="text-base text-textColor">{employeeData.position}</p>
          <p className="font-light text-sm">Earth</p>
          {!isCurrentUser && (
            <div className="flex items-center justify-center gap-4 mt-3">
              <Button primary>Contact</Button>
              <Button primary>Messagge</Button>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col 2xl:w-1/3">
          <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
            <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
            <ul className="mt-2 text-gray-700">
              <li className="flex border-y py-2">
                <span className="font-bold w-24">Full name:</span>
                <span className="text-gray-700">
                  {employeeData.last_name} {employeeData.first_name}
                </span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Birthday:</span>
                <span className="text-gray-700">24 Jul, 1991</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Joined:</span>
                <span className="text-gray-700">10 Jan 2022 (25 days ago)</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Mobile:</span>
                <span className="text-gray-700">{employeeData.phone}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Email:</span>
                <span className="text-gray-700">amandaross@example.com</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Age:</span>
                <span className="text-gray-700">{employeeData.age}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Languages:</span>
                <span className="text-gray-700">English, Spanish</span>
              </li>
            </ul>
          </div>
          <div className="relative flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
            <div className="absolute top-1 right-1 bg-slate-50 p-2 round-sm shadow-md border">
              <select
                value={month}
                name="month"
                id="month"
                onChange={(e) => setMonth(e.target.value)}
              >
                {month_filter.map((item, i) => (
                  <option value={item} key={i}>
                    Tháng {item}
                  </option>
                ))}
              </select>
            </div>
            <h4 className="text-xl text-gray-900 font-bold">Activity log</h4>
            <div className="relative px-4">
              <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
              {employeeData?.activity_log ? (
                employeeData?.activity_log.reverse().map((day, i) => {
                  return (
                    <div key={i}>
                      {day.time_out && (
                        <div className="flex items-center w-full my-6 -ml-1.5">
                          <div className="w-1/12 z-10">
                            <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                          </div>
                          <div className="w-11/12 bg-orange-300 rounded-md overflow-hidden p-2">
                            <p className="text-sm">
                              Check out at {day.time_out.slice(0, 5)}.
                            </p>
                            <p className="text-xs text-gray-500">{day.date}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center w-full my-6 -ml-1.5">
                        <div className="w-1/12 z-10">
                          <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                        </div>
                        <div className="w-11/12 bg-green-300 rounded-md overflow-hidden p-2">
                          <p className="text-sm">
                            Check in at {day.time_in.slice(0, 5)}.
                          </p>
                          <p className="text-xs text-gray-500">{day.date}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>There no activities</p>
              )}
            </div>
          </div>
        </div>
        {/* Break*/}
        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
          <h4 className="text-xl text-gray-900 font-bold">Statistics</h4>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
            <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-indigo-600">
                  Total Salary
                </span>
                <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">
                  Worked Hours:{" "}
                  {employeeData ? employeeData?.total_hours?.slice(0, 1) : 0}
                </span>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <svg
                    className="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-end">
                    <span className="text-2xl 2xl:text-3xl font-bold">
                      {employeeData?.total_hours
                        ? 200 * parseInt(employeeData.total_hours?.slice(0, 1))
                        : 0}{" "}
                      $
                    </span>
                    <div className="flex items-center ml-2 mb-1">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        ></path>
                      </svg>
                      <span className="font-bold text-sm text-gray-500 ml-0.5">
                        3%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-green-600">
                  New Orders
                </span>
                <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">
                  7 days
                </span>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <svg
                    className="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-end">
                    <span className="text-2xl 2xl:text-3xl font-bold">217</span>
                    <div className="flex items-center ml-2 mb-1">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        ></path>
                      </svg>
                      <span className="font-bold text-sm text-gray-500 ml-0.5">
                        5%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-blue-600">
                  New Connections
                </span>
                <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">
                  7 days
                </span>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <svg
                    className="w-12 h-12 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-end">
                    <span className="text-2xl 2xl:text-3xl font-bold">54</span>
                    <div className="flex items-center ml-2 mb-1">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        ></path>
                      </svg>
                      <span className="font-bold text-sm text-gray-500 ml-0.5">
                        7%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Employee;
