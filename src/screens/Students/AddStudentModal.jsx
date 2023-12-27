import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addStudent } from "../../actions/studentAction";
import { useDispatch } from "react-redux";

const AppStudentModal = ({ isOpen, onClose, onConfirm }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [postParams, setPostParams] = useState({ name: "", personId: "" });

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClose = () => {
    onClose();
  };

  const handleUpload = async () => {
    if (!postParams.personId || !postParams.name || !selectedFile) {
      return;
    }

    const { name, personId } = postParams;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("personId", personId);
    formData.append("file", selectedFile);
    await dispatch(addStudent(formData));

    onConfirm?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-white rounded-lg p-5">
            <div className="font-semibold text-2xl">Register New Student</div>
            <form>
              <div className="min-w-[300px] w-[40vw] flex flex-col gap-6 my-8">
                <div>
                  <label className="dark:text-gray-200" htmlFor="username">
                    Username
                  </label>
                  <input
                    value={postParams.name}
                    onChange={(e) =>
                      setPostParams({ ...postParams, name: e.target.value })
                    }
                    id="username"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label className="dark:text-gray-200" htmlFor="studentId">
                    Student Id
                  </label>
                  <input
                    value={postParams.personId}
                    onChange={(e) =>
                      setPostParams({ ...postParams, personId: e.target.value })
                    }
                    id="studentId"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          {selectedFile && <p>Selected: {selectedFile.name}</p>}
                          <span className="">Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </div>
                      <p className="text-xs">PNG, JPG, GIF</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-600 rounded-lg px-3 py-1 text-white"
                onClick={handleUpload}
              >
                Confirm
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 rounded-lg px-3 py-1 ml-3"
                onClick={() => handleClose()}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppStudentModal;
