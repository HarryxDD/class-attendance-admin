import React from "react";

const ValidateError = ({ text }) => {
  return (
    <div className="p-2 mt-3 rounded-md shadow-md bg-red-400 flex items-center justify-center">
      <span className="text-base text-white font-semibold">{text}</span>
    </div>
  );
};

export default ValidateError;
