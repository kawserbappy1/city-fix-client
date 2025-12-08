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
      <li className="link-hover">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="link-hover">
        <NavLink to="/dflkdj">All Issues</NavLink>
      </li>
      <li className="link-hover">
        <NavLink to="/dflkdj">Blog</NavLink>
      </li>
      <li className="link-hover">
        <NavLink to="/dflkdj">Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <nav className="container mx-auto flex items-center justify-between h-16 px-2 shadow ">
        {/* logo area  */}
        <span>
          <Logo></Logo>
        </span>
        {/* menu area  */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-4 text-xs tracking-wider text-white">
            {links}
          </ul>
        </div>
        {/* button area  */}
        <div className="hidden md:block">
          <Button
            text="Login"
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
          >
            <CiLogin className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
        {/* Mobile button area  */}
        <div className="z-50 md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? (
              <AiOutlineClose className="text-2xl cursor-pointer" />
            ) : (
              <CiMenuFries className="text-2xl cursor-pointer" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu  */}
      <div
        className={`md:hidden fixed top-0 left-0 min-h-screen w-full bg-black/90 z-40 transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 text-sm tracking-wider text-white py-20">
          <li>
            <NavLink
              onClick={() => setMenuOpen(!menuOpen)}
              to={"/"}
              className="hover:text-blue-400 transition-colors"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setMenuOpen(!menuOpen)}
              to={"/dsfds"}
              className="hover:text-blue-400 transition-colors"
            >
              All Issues
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setMenuOpen(!menuOpen)}
              to={"/adsfads"}
              className="hover:text-blue-400 transition-colors"
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setMenuOpen(!menuOpen)}
              to={"/asfddas"}
              className="hover:text-blue-400 transition-colors"
            >
              Contact
            </NavLink>
          </li>
          <div className="mt-6">
            <Button
              text="Login"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
            >
              <CiLogin className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
