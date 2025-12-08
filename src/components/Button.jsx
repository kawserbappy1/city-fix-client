import React from "react";

const Button = ({ text, children }) => {
  return (
    <>
      <button className="group bg-accent text-white flex items-center gap-1 px-2 py-2 rounded-md cursor-pointer text-sm transition-all duration-500 hover:bg-accent/80">
        {text}
        {children}
      </button>
    </>
  );
};

export default Button;
