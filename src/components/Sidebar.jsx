import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { motion, sync } from "framer-motion";

import { useStateContext } from "../context/ContextProvider";
import { adminLinks, memberLinks } from "../constants/dummy";
import {
  AiFillShop,
  AiOutlineDoubleLeft,
  AiOutlineGroup,
  AiOutlineLogout,
} from "react-icons/ai";
import { staggerContainer } from "../utils/motion";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/authAction";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authData = useSelector((state) => state.authReducer.authData);
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  const nav_links = authData?.id == 1 ? adminLinks : memberLinks;

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const menuVariant = {
    hidden: {
      opacity: 0,
    },

    show: {
      opacity: 1,
      transition: {
        duration: 0.4,
        type: "tween",
      },
    },
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-gray-200 m-2";

  return (
    <motion.div
      className="ml-3 h-screen md:overflow-hidden overflow-auto
    md:hover:overflow-auto pb-10"
    >
      {activeMenu && (
        <>
          <div className="flex justify-between items-center p-2">
            <Link
              to="/"
              onClick={handleCloseSidebar}
              className="items-center
          gap-3 ml-3 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <AiOutlineGroup className="text-3xl" />{" "}
              <span>Class Attendance</span>
            </Link>
            <div>
              <button
                type="button"
                onClick={() => {
                  setActiveMenu(false);
                }}
                className="text-xl rounded-full
            p-3 hover:bg-light-gray block"
              >
                <AiOutlineDoubleLeft />
              </button>
            </div>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="mt-10"
          >
            {nav_links.map((item) => (
              <motion.div
                variants={menuVariant}
                initial="hidden"
                animate="show"
                key={item.title}
              >
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`${link.link}`}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "#ccc" : "",
                    })}
                    key={link.link}
                    onClick={handleCloseSidebar}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-auto cursor-pointer">
            <div onClick={handleLogout} className={normalLink}>
              <AiOutlineLogout />
              <span className="capitalize">Log out</span>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Sidebar;
