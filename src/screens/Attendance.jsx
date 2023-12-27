import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, onValue, off, set } from "firebase/database";
import {
  AiOutlineCheck,
  AiOutlineOrderedList,
  AiOutlinePicLeft,
  AiOutlineSearch,
} from "react-icons/ai";

import app from "../config/firebaseConfig";
import { textVariant, zoomIn } from "../utils/motion";
import { CheckIn } from "../actions/employeeActions";
import { HOST_API } from "../constants/Api";
import { Loader } from "../components";
import { useNavigate } from "react-router-dom";
import { ATTENDANCE_DUMMY } from "../constants/attendance";

const database = getDatabase(app);
const databaseRef = ref(database, "messages");

const Attendance = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const today = new Date().toISOString().substr(0, 10);

  const [date, setDate] = useState(today);
  const [searchTerm, setSearchTerm] = useState("");
  const employeeReducer = useSelector((state) => state.employeeReducer);
  const authData = useSelector((state) => state.authReducer.authData);
  const { attendance, employeeInfo, loading } = employeeReducer;

  // const [attendanceData, setAttendanceData] = useState(attendance);
  const [attendanceData, setAttendanceData] = useState(ATTENDANCE_DUMMY);

  useEffect(() => {
    const year = date.split("-")[0];
    const month = date.split("-")[1];
    const day = date.split("-")[2];
    const dateParams = { day, month, year };
    // dispatch(fetchAttandance(dateParams));
    // Event listener for value changes
    const onDataChange = async (snapshot) => {
      ``;
      // Get the message value from the snapshot
      const newMessage = snapshot.val();

      // Check if the message is different from the known value
      if (newMessage !== "Unknown") {
        console.log(newMessage);
        dispatch(CheckIn(newMessage));
        await set(databaseRef, "Unknown");
      }
    };

    // Attach the listener
    onValue(databaseRef, onDataChange);

    // Clean up the listener on component unmount
    return () => {
      off(databaseRef, "value", onDataChange);
    };
  }, [date, dispatch]);

  // useEffect(() => {
  //   if (searchTerm !== "") {
  //     const filterData = attendance.filter((att) => {
  //       return (
  //         att.first_name.includes(searchTerm) ||
  //         att.last_name.includes(searchTerm)
  //       );
  //     });
  //     setAttendanceData(filterData);
  //   } else {
  //     setAttendanceData(attendance);
  //   }
  //   if (attendanceData) {
  //     console.log(attendanceData);
  //     const EM = attendanceData.find((att) => att.id == authData.id);
  //     console.log(EM);
  //     if (EM && EM.id !== 1) {
  //       navigate(`/employees/${EM.employee_code}`);
  //     }
  //   }
  // }, [searchTerm, attendance]);

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  const handleCheckIn = (employeeInfo) => {
    if (employeeInfo.time_out) return "bg-orange-300";
    if (employeeInfo.time_in) return "bg-green-300";
    return "bg-red-300";
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="container mx-auto px-4 sm:px-8 border border-slate-200 rounded-xl">
        <div className="py-8">
          <div className="flex flex-row items-center justify-between">
            <motion.h2
              variants={textVariant(0.5)}
              initial="hidden"
              animate="show"
              className="text-2xl font-semibold leading-tight"
            >
              Attendance List
            </motion.h2>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-2 bg-white text-lg outline-none"
                />
                <span className="text-2xl p-2">
                  <AiOutlineSearch />
                </span>
              </div>
              <div className="p-2 block items-center bg-white">
                <input
                  className="outline-none text-base font-light from-neutral-400 "
                  placeholder="halo"
                  type="date"
                  value={date}
                  onChange={(e) => handleChangeDate(e)}
                />
              </div>
            </motion.div>
          </div>
          {attendanceData?.length > 0 ? (
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Student Id
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Checked In At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((student, i) => (
                      <motion.tr
                        variants={zoomIn(i * 0.03, 0.5)}
                        initial="hidden"
                        whileInView="show"
                        whileHover="whileHover"
                        key={i}
                      >
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {student.name}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {student.personId}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {student.timestamp}
                          </p>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h3>Chưa có dữ liệu</h3>
          )}
        </div>
      </div>
    );
  }
};

export default Attendance;
