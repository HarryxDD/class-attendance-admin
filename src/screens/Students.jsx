import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref } from "firebase/database";
import app from "../config/firebaseConfig";
import { textVariant, zoomIn } from "../utils/motion";
import { Loader } from "../components";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/images/default_avatar.png";
import { AddStudentModal } from ".";
import { deleteStudent, fetchStudents } from "../actions/studentAction";

const database = getDatabase(app);
const databaseRef = ref(database, "messages");

const Students = () => {
  const dispatch = useDispatch();
  const today = new Date().toISOString().substr(0, 10);

  const [date, setDate] = useState(today);
  const studentReducer = useSelector((state) => state.studentReducer);
  const { students, loading } = studentReducer;
  const [studentData, setStudentData] = useState(students);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    setStudentData(students);
  }, [students]);

  const handleConfirm = async () => {
    await dispatch(fetchStudents());
    setIsModalOpen(false);
  };

  const handleDeleteStudent = async (event, student) => {
    await dispatch(
      deleteStudent({ name: student.name, personId: student.personId })
    );

    dispatch(fetchStudents());
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
                    <motion.div
                      key={i}
                      // href={`/?studentId=${student.personId}`}
                      variants={zoomIn(i * 0.05, 0.5)}
                      initial="hidden"
                      whileInView="show"
                      whileHover="whileHover"
                      className={`flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden min-h-350 py-5`}
                    >
                      <img
                        placeholder={defaultAvatar}
                        // src={defaultAvatar}
                        src={student.url}
                        className="w-32 h-32 object-cover rounded-full mt-5"
                        alt=""
                      />
                      <div className="p-4">
                        <h2 className="text-lg font-semibold text-slate-800 text-center ">
                          {student.name}
                        </h2>
                        <p className="text-slate-800 text-center my-2">
                          {student.personId}
                        </p>
                      </div>
                      <button
                        className="transition w-[80%] m-auto ease-in-out self-end bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                        onClick={(event) => handleDeleteStudent(event, student)}
                      >
                        Delete
                      </button>
                    </motion.div>
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
