import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AiOutlineUserAdd } from "react-icons/ai";
import validator from "validator";
import axios from "axios";

import defaultAvatar from "../../assets/images/default_avatar.png";
import InputForm from "./InputForm";
import { ValidateError } from "../../components";
import { Button } from "../../components";
import { updateEmployeeProfile } from "../../actions/employeeActions";
import { HOST_API } from "../../constants/Api";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({});
  const [formData, setFormData] = useState({});
  const [vadidErrors, setVadidErrors] = useState({});

  const [avatar, setAvatar] = useState({
    file: null,
    preview: defaultAvatar,
  });

  useEffect(() => {
    console.log(employeeData);
    axios
      .get(`${HOST_API}/staff/detail/${params.username}`)
      .then((response) => {
        setEmployeeData(response.data);
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params, dispatch]);

  const validate = (formData) => {
    // check each field for validity
    let errors = {};
    for (let i of Object.values(formData)) {
      if (typeof i === "string") {
        if (validator.isEmpty(i)) {
          errors.emptyError = "You must fill all form!";
          return errors;
        }
      }
    }
    // if (
    //   (!validator.isNumeric(formData.age) &&
    //     Number.parseInt(formData.age) > 120) ||
    //   Number.parseInt(formData.age) < 18
    // ) {
    //   errors.ageError = "Your age isn't valid";
    // }
    return errors;
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    const vadidErrors = validate(formData);
    if (Object.keys(vadidErrors).length === 0) {
      dispatch(
        updateEmployeeProfile(formData.employee_code, formData, navigate)
      );
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
        preview: HOST_API.concat(formData.img),
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
        <h2 className="text-3xl font-medium">Sửa thông tin nhân viên</h2>
        <AiOutlineUserAdd className="w-6 h-6 text-gray-400" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-start-2 flex items-center justify-center w-full border-b-2 border-slate-300 pb-4">
            <label htmlFor="avatar">
              <img
                src={
                  avatar.file ? avatar.preview : HOST_API.concat(formData.img)
                }
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
            name="first_name"
            Label="First Name"
            handleChange={handleChange}
            value={formData.first_name}
            colStart="col-start-1"
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
        <div className="w-full flex items-center justify-center">
          <Button type="submit" primary className="mt-4 w-2/5">
            Lưu
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditEmployee;
