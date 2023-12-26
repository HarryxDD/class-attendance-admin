import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  AiFillBell,
  AiFillCaretDown,
  AiFillMessage,
  AiOutlineArrowDown,
  AiOutlineMenu,
  AiOutlineNotification,
  AiOutlineWechat,
} from "react-icons/ai";

import { useStateContext } from "../context/ContextProvider";
import { fadeIn } from "../utils/motion";
import { useSelector } from "react-redux";
import { HOST_API } from "../constants/Api";
import { Link } from "react-router-dom";

const NavButton = ({ title, customFunc, icon, dotColor }) => (
  <button
    type="button"
    onClick={customFunc}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2 "
    />
    {icon}
  </button>
);

const Navbar = () => {
  const employeeInfo = useSelector(
    (state) => state.employeeReducer.employeeInfo
  );

  const {
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setIsClicked,
    screenSize,
    setScreenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  return (
    <motion.div
      variants={fadeIn("down", "spring", 0.3, 1)}
      initial="hidden"
      animate="show"
      className="flex justify-between p-2 md:mx-6 relative"
    >
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        icon={<AiOutlineMenu />}
      ></NavButton>

      {employeeInfo && (
        <div className="flex">
          {/* <NavButton
            title="Chat"
            dotColor="#03C9D7"
            customFunc={() => {
              handleClick("chat");
            }}
            icon={<AiOutlineWechat />}
          />
          <NavButton
            title="Notification"
            dotColor="#03C9D7"
            customFunc={() => {
              handleClick("notification");
            }}
            icon={<AiOutlineNotification />}
          /> */}
          <div>
            <Link
              className="flex items-center gap-2 cursor-pointer p-1
          hover:bg-light-gray rounded-lg block"
            to={`/employees/${employeeInfo.employee_code}`}
            >
              <img
                className="rounded-full w-8 h-8"
                src={HOST_API.concat(employeeInfo.img)}
                alt="Avatar"
              ></img>
              <p>
                <span className="text-gray-400 text-14">Hi, </span>{" "}
                <span className="text-gray-400 text-14 font-bold ml-1">
                  {employeeInfo.first_name}
                </span>
              </p>
              <AiOutlineArrowDown className="text-gray-400 text-14" />
            </Link>
          </div>
          {/* {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />} */}
          {/* {isClicked.userProfile && <UserProfile />} */}
        </div>
      )}
    </motion.div>
  );
};

export default Navbar;
