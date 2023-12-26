import React, { useState, useEffect, useRef } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const DropdownFilter = ({
  options,
  label,
  type = "checkbox",
  position = "left",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center rounded-md justify-between w-full p-3 text-textColor bg-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:shadow-outline`}
        onClick={toggleDropdown}
      >
        <span className="text-sm font-medium">
          {selectedOptions.length ? selectedOptions.join(", ") : label}
        </span>
        <span className="text-sm font-medium text-gray-500 ml-1">
          {isOpen ? <BsChevronUp /> : <BsChevronDown />}
        </span>
      </button>
      {isOpen && (
        <ul
          className={`absolute z-10 py-2 mt-2 ${position}-0 min-w-max bg-white border border-gray-300 rounded-md shadow-lg`}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type={type}
                className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionSelect(option)}
              />
              <span className="ml-3 text-sm text-textColor">{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownFilter;
