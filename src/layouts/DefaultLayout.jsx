import React from "react";
import { motion } from "framer-motion";

import { Sidebar, Navbar } from "../components";
import { useStateContext } from "../context/ContextProvider";

const DefaultLayout = ({ children }) => {
  const { activeMenu } = useStateContext();
  return (
    <div className="flex relative dark:bg-main-dark-bg">
      {activeMenu ? (
        <motion.div
          layoutId="sidebar"
          transition={{ layout: { duration: 1, type: "spring" } }}
          className="w-72 fixed sidebar
            dark:bg-secondary-dark-bg
            bg-white"
        >
          <Sidebar />
        </motion.div>
      ) : (
        <motion.div
          layoutId="sidebar"
          className="w-0 dark:bg-secondary-dark-bg"
        >
          <Sidebar />
        </motion.div>
      )}
      <motion.div
        layout
        transition={{ layout: { duration: 1, type: "spring" } }}
        className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
          activeMenu ? "md:ml-72" : "flex-2"
        }`}
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg nav-bar w-full">
          <Navbar />
        </div>
        <div>{children}</div>
      </motion.div>
    </div>
  );
};

export default DefaultLayout;
