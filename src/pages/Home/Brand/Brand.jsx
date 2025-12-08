import React from "react";
import Marquee from "react-fast-marquee";
import b1 from "../../../assets/b1.png";
import b2 from "../../../assets/b2.png";
import b3 from "../../../assets/b3.png";
import b4 from "../../../assets/b4.png";
import b5 from "../../../assets/b5.png";
import b6 from "../../../assets/b6.png";
import b7 from "../../../assets/b7.png";

import b9 from "../../../assets/b9.png";
import b10 from "../../../assets/b10.png";
import b11 from "../../../assets/b11.png";

import b13 from "../../../assets/b13.png";
import b14 from "../../../assets/b14.png";
import b15 from "../../../assets/b15.png";
import b16 from "../../../assets/b16.png";

const Brand = () => {
  return (
    <div>
      <Marquee className="bg-accent mb-16">
        <img src={b1} alt="" className="w-40 mx-4" />
        <img src={b2} alt="" className="w-40 mx-4" />
        <img src={b3} alt="" className="w-40 mx-4" />
        <img src={b4} alt="" className="w-40 mx-4" />
        <img src={b5} alt="" className="w-40 mx-4" />
        <img src={b6} alt="" className="w-40 mx-4" />
        <img src={b7} alt="" className="w-40 mx-4" />

        <img src={b9} alt="" className="w-40 mx-4" />
        <img src={b10} alt="" className="w-40 mx-4" />
        <img src={b11} alt="" className="w-40 mx-4" />

        <img src={b13} alt="" className="w-40 mx-4" />
        <img src={b14} alt="" className="w-40 mx-4" />
        <img src={b15} alt="" className="w-40 mx-4" />
        <img src={b16} alt="" className="w-40 mx-4" />
      </Marquee>
    </div>
  );
};

export default Brand;
