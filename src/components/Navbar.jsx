import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import { CiLogin, CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

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
        <NavLink to="/blog">Blog</NavLink>
      </li>
      <li className="link-hover">
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-transparent px-2">
      <nav className="container mx-auto flex items-center justify-between h-16 px-2  shadow bg-black/70 rounded-full backdrop-blur-2xl z-50">
        {/* logo area  */}
        <span>
          <Logo></Logo>
        </span>
        {/* menu area  */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-4 text-sm tracking-wider text-white">
            {links}
          </ul>
        </div>
        {/* button area  */}
        <div className="hidden md:flex gap-2">
          <Link to={"/"} className="bg-accent px-2 py-2  text-white group ">
            Create Issue
          </Link>
          <Link
            to={"/login"}
            className="bg-accent px-4 py-2 text-white group rounded-full "
          >
            Login
          </Link>
        </div>
        {/* Mobile button area  */}
        <div className="z-[999] relative md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? (
              <AiOutlineClose className="text-2xl cursor-pointer" />
            ) : (
              <CiMenuFries className="text-2xl cursor-pointer " />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu  */}
      <div
        className={`md:hidden fixed top-0 left-0 min-h-screen w-[70%] bg-black/90 z-[60] transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 text-sm tracking-wider text-white py-30">
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
              to={"/blog"}
              className="hover:text-blue-400 transition-colors"
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setMenuOpen(!menuOpen)}
              to={"/contact"}
              className="hover:text-blue-400 transition-colors"
            >
              Contact
            </NavLink>
          </li>
          <div className="mt-3 space-y-3">
            <Link
              to={"/"}
              className="bg-accent px-2 py-2 flex items-center gap-2 text-white group "
            >
              Create Issue
            </Link>
            <Link
              to={"/login"}
              className="bg-accent px-4 py-2 text-white text-center w-full inline-block"
            >
              Login
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
