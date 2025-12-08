import React from "react";

const Header = ({ text, title }) => {
  return (
    <div className="container mx-auto py-10 px-2">
      <h2 className="text-center text-5xl font-nunito text-text2 font-semibold">
        {title}
      </h2>
      <div className="w-[100px] h-[2px] bg-accent mx-auto my-1"></div>
      <p className="text-center ">{text}</p>
    </div>
  );
};

export default Header;
