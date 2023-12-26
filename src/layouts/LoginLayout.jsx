import React from "react";

const LoginLayout = ({ children }) => {
  return (
    <div className="container flex items-center justify-center bg-blue-300">
      {children}
    </div>
  );
};

export default LoginLayout;
