import React from "react";

const Button = ({ text, children }) => {
  return (
    <>
      <button className="group bg-blue text-white flex items-center gap-1 px-2 py-2 rounded-md cursor-pointer text-sm hover:bg-blue-600">
        {text}
        {children}
      </button>
    </>
  );
};

export default Button;
