import React from "react";

const InputForm = ({
  value,
  name,
  colStart = "",
  colSpan = "",
  type = "text",
  handleChange,
  Label,
  className,
  error,
}) => {
  return (
    <div className={`${colStart} ${colSpan} ${className}`}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-600"
      >
        {Label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputForm;
