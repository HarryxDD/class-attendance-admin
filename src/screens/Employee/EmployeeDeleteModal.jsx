import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const EmployeeDeleteModal = ({ employeeID, isOpen, onClose, onConfirm }) => {
  const handleClose = () => {
    onClose();
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
            <h2 className="text-xl font-medium mb-3">
              Are you sure you want to delete this employee?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-gray-200 hover:bg-gray-300 rounded-lg px-3 py-1 mr-3"
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 rounded-lg px-3 py-1 text-white"
                onClick={() => onConfirm(employeeID)}
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmployeeDeleteModal;
