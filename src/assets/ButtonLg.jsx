import React from "react";
import { Link } from "react-router";

const ButtonLg = ({ text, to, children }) => {
  return (
    <Link
      to={to}
      className="flex gap-2 text-sm px-4 py-2 sm:py-4 bg-transparent border border-white group hover:bg-accent/80 text-accent font-semibold rounded-lg transition-all duration-300 transform hover:border-accent hover:text-white"
    >
      {text} {children}
    </Link>
  );
};

export default ButtonLg;
