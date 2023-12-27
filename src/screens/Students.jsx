import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref } from "firebase/database";
import app from "../config/firebaseConfig";
import { textVariant, zoomIn } from "../utils/motion";
import { Loader } from "../components";
import { useNavigate } from "react-router-dom";
import { STUDENTS_DUMMY } from "../constants/students";
import { AddStudentModal } from ".";
import { fetchStudents } from "../actions/studentAction";

const database = getDatabase(app);
const databaseRef = ref(database, "messages");

const Students = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const today = new Date().toISOString().substr(0, 10);

  const [date, setDate] = useState(today);
  const employeeReducer = useSelector((state) => state.employeeReducer);
  const { attendance, employeeInfo, loading } = employeeReducer;
  const [studentData, setStudentData] = useState(STUDENTS_DUMMY);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleConfirm = () => {
    console.log("Add new Student");
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex flex-row items-center justify-between">
            <motion.h2
              variants={textVariant(0.5)}
              initial="hidden"
              animate="show"
              className="text-2xl font-semibold leading-tight"
            >
              Student Info
            </motion.h2>
          </div>

          {studentData?.length > 0 ? (
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="w-full flex flex-col">
                <button
                  className="transition ease-in-out self-end bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                  onClick={() => setIsModalOpen(true)}
                >
                  Register New Student
                </button>
              </div>
              <div className="container rounded-md py-5 px-1">
                <div className="grid grid-cols-4 gap-4">
                  {studentData.map((student, i) => (
                    <motion.a
                      key={i}
                      href={`/?studentId=${student.id}`}
                      variants={zoomIn(i * 0.05, 0.5)}
                      initial="hidden"
                      whileInView="show"
                      whileHover="whileHover"
                      className={`flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden`}
                    >
                      <img
                        src={student.img}
                        className="w-32 h-32 object-cover rounded-full mt-5"
                      />
                      <div className="p-4">
                        <h2 className="text-lg font-semibold text-slate-800 text-center ">
                          {student.name}
                        </h2>
                        <p className="text-slate-800 text-center my-2">
                          {student.id}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <h3>Chưa có dữ liệu</h3>
          )}
        </div>
        <AddStudentModal
          isOpen={isModalOpen}
          onConfirm={handleConfirm}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    );
  }
};

export default Students;
