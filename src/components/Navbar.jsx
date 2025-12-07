import { NavLink } from "react-router";
import Logo from "./Logo";
import Button from "./Button";
import { CiLogin, CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/dflkdj">All Issues</NavLink>
      </li>
      <li>
        <NavLink to="/dflkdj">Blog</NavLink>
      </li>
      <li>
        <NavLink to="/dflkdj">Contact</NavLink>
      </li>
    </>
  );
  return (
    <div className="sticky top-0 left-0 w-full">
      <nav className="container mx-auto flex items-center justify-between h-16 px-2">
        {/* logo area  */}
        <span>
          <Logo></Logo>
        </span>
        {/* menu area  */}
        <div className=" hidden md:block">
          <ul className="flex items-center gap-4 text-sm tracking-wider text-text">
            {links}
          </ul>
        </div>
        {/* button area  */}
        <div className="hidden md:block">
          <Button text="Login ">
            {/* <GoArrowUpRight className="text-xl transition-transform duration-300 group-hover:rotate-45" /> */}
            <CiLogin className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
        {/* Mobile button area  */}

        <div className="z-40 md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <AiOutlineClose className="text-xl cursor-pointer" />
            ) : (
              <CiMenuFries className="text-xl cursor-pointer" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu  */}

      <div
        className={`md:hidden absolute top-0 right-0 min-h-screen w-full bg-bg1 z-10 transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center gap-4 text-sm tracking-wider text-text py-20">
          <li>
            <NavLink onClick={() => setMenuOpen(!menuOpen)} to={"/"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => setMenuOpen(!menuOpen)} to={"/dsfds"}>
              All Issues
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => setMenuOpen(!menuOpen)} to={"/adsfads"}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => setMenuOpen(!menuOpen)} to={"/asfddas"}>
              Contact
            </NavLink>
          </li>
          <div className="">
            <Button text="Login ">
              {/* <GoArrowUpRight className="text-xl transition-transform duration-300 group-hover:rotate-45" /> */}
              <CiLogin className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
