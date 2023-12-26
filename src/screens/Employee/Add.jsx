import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AiOutlineUserAdd } from "react-icons/ai";
import validator from "validator";

import defaultAvatar from "../../assets/images/default_avatar.png";
import InputForm from "./InputForm";
import { Loader, ValidateError } from "../../components";
import { Button } from "../../components";
import { addEmployee } from "../../actions/employeeActions";
import { register } from "../../actions/authAction";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employeeReducer = useSelector((state) => state.employeeReducer);
  const { loading, error } = employeeReducer;

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

  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  console.log(authData, formData);

  const [vadidErrors, setVadidErrors] = useState({});

  const validate = (formData) => {
    // check each field for validity
    let errors = {};
    if (formData.img === null) {
      errors.imgError = "Bạn chưa thêm ảnh";
    }
    for (let i of Object.values(formData)) {
      if (typeof i === "string") {
        if (i === "") {
          errors.emptyError = "You must fill all form!";
          return errors;
        }
      }
    }
    // if (!validator.isStrongPassword(authData.password)) {
    //   errors.passwordError = "Your password isn't strong enough!";
    // }
    if (!validator.isEmail(authData.email)) {
      errors.emailError = "Your email isn't valid";
    }
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
      console.log("Dispatch");
      dispatch(addEmployee(formData, authData, navigate));
    } else {
      setVadidErrors(vadidErrors);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setAuthData({
      ...authData,
      email: formData.first_name
        .concat(formData.last_name)
        .concat("@gmail.com"),
      username: formData.first_name.concat(formData.last_name),
      password: formData.first_name
        .concat(formData.last_name)
        .concat(formData.employee_code),
      password2: authData.password,
    });
  }, [formData]);

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
      {loading && <Loader />}
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
            Label="Employee Code"
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
            name="email"
            type="email"
            Label="Email"
            handleChange={(e) =>
              setAuthData({ ...authData, email: e.target.value })
            }
            value={authData.email}
            error={vadidErrors.emailError}
            colStart="col-start-1"
          />
          <InputForm
            name="username"
            Label="Username"
            type="text"
            handleChange={(e) =>
              setAuthData({ ...authData, username: e.target.value })
            }
            value={authData.username}
          />
          <InputForm
            name="password"
            Label="Password"
            type="password"
            handleChange={(e) =>
              setAuthData({ ...authData, password: e.target.value })
            }
            error={vadidErrors.passwordError}
            value={authData.password}
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
          {error && <ValidateError text={error} />}
        </div>
        <div className="w-full flex items-center justify-center">
          <Button type="submit" primary className="mt-4 w-2/5">
            Lưu
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddEmployee;
