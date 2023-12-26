import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import validator from "validator";
import { AiOutlineUserAdd } from "react-icons/ai";

import defaultAvatar from "../../assets/images/default_avatar.png";
import InputForm from "../Employee/InputForm";
import { Button, ValidateError } from "../../components";
import { addEmployeeInfo } from "../../actions/employeeActions";
import { useNavigate } from "react-router-dom";

const DetailInfor = () => {
  const dispatch = useDispatch();
  const employeeReducer = useSelector((state) => state.employeeReducer);
  const { error } = employeeReducer;
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState({
    file: null,
    preview: defaultAvatar,
  });

  const [formData, setFormData] = useState({
    employee_code: "",
    first_name: "",
    last_name: "",
    phone: "",
    department: "",
    position: "",
    age: "",
    img: null,
  });
  const clear = () => {
    setFormData({
      employee_code: "",
      first_name: "",
      last_name: "",
      phone: "",
      department: "",
      position: "",
      age: "",
      img: null,
    });
  };

  const [vadidErrors, setVadidErrors] = useState({});

  useEffect(() => {
    if (error) {
      vadidErrors.serverError = error;
      setVadidErrors(vadidErrors);
    }
  }, [dispatch, vadidErrors]);

  const validate = (formData) => {
    // check each field for validity
    let errors = {};
    if (
      (!validator.isNumeric(formData.age) &&
        Number.parseInt(formData.age) > 120) ||
      Number.parseInt(formData.age) < 18
    ) {
      errors.ageError = "Your age isn't valid";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    const vadidErrors = validate(formData);
    if (Object.keys(vadidErrors).length === 0) {
      dispatch(addEmployeeInfo(formData));
    } else {
      setVadidErrors(vadidErrors);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar({ file, preview: reader.result });
        setFormData({ ...formData, img: file });
      };
      reader.readAsDataURL(file);
    } else {
      setAvatar({
        file: null,
        preview: defaultAvatar,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 m-4 bg-white rounded-md shadow-md"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-medium">Thêm nhân viên</h2>
        <AiOutlineUserAdd className="w-6 h-6 text-gray-400" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-start-2 flex items-center justify-center w-full border-b-2 border-slate-300 pb-4">
            <label htmlFor="avatar">
              <img
                src={avatar.preview}
                alt="Avatar"
                className="w-32 h-32 object-cover rounded-full overflow-hidden shadow-md"
              />
            </label>
            <input
              type="file"
              id="avatar"
              name="img"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <InputForm
            name="employee_code"
            Label="Employee ID"
            handleChange={handleChange}
            value={formData.employee_code}
            colStart="col-start-1"
          />
          <InputForm
            name="first_name"
            Label="First Name"
            handleChange={handleChange}
            value={formData.first_name}
          />
          <InputForm
            name="last_name"
            Label="Last Name"
            handleChange={handleChange}
            value={formData.last_name}
          />
          <InputForm
            name="position"
            Label="Position"
            handleChange={handleChange}
            value={formData.position}
            colStart="col-start-1"
          />
          <InputForm
            name="department"
            Label="Department"
            handleChange={handleChange}
            value={formData.department}
          />

          <InputForm
            name="age"
            Label="Age"
            handleChange={handleChange}
            value={formData.age}
            error={vadidErrors.ageError}
          />
          <InputForm
            name="phone"
            Label="Phone"
            handleChange={handleChange}
            value={formData.phone}
          />
          {Object.values(vadidErrors).map((error) => (
            <ValidateError key={error} text={error} />
          ))}
        </div>
        <Button type="submit" primary className="mt-4 w-1/4">
          Lưu
        </Button>
      </form>
    </motion.div>
  );
};

export default DetailInfor;
