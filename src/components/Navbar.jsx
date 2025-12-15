import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import { CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logOut } = useAuth();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            setDropdownOpen(false);
            setMenuOpen(false); // Close mobile menu on logout
            Swal.fire(
              "Logged Out!",
              "You have been successfully logged out.",
              "success"
            );
          })
          .catch((err) => {
            Swal.fire("Error!", err.message, "error");
          });
      }
    });
  };

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
      <nav className="container mx-auto flex items-center justify-between h-16 px-2 shadow bg-black/70 rounded-full backdrop-blur-2xl z-50">
        {/* logo area */}
        <span>
          <Logo></Logo>
        </span>
        {/* menu area */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-4 text-sm tracking-wider text-white">
            {links}
          </ul>
        </div>
        {/* button area with profile dropdown */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            to={"/create-issue"}
            className="bg-accent px-4 py-2 text-white rounded-full hover:bg-accent/80 transition"
          >
            Create Issue
          </Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Picture Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 hover:border-white/50 transition-all"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {user?.displayName?.charAt(0) || "U"}
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                  {/* User Info */}
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        {user?.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {user?.displayName?.charAt(0) || "U"}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {user?.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                      Dashboard
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Edit Profile
                    </Link>

                    <button
                      onClick={handleLogOut}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-gray-100"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to={"/login"}
              className="bg-accent px-4 py-2 text-white rounded-full hover:bg-accent/80 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile button area - Show user avatar on mobile when logged in */}
        <div className="flex items-center gap-2 md:hidden">
          {user && (
            <div className="flex items-center gap-2 mr-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/30">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                    {user?.displayName?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <span className="text-white text-sm font-medium hidden sm:block">
                {user?.displayName?.split(" ")[0] || "User"}
              </span>
            </div>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white z-[999] relative"
          >
            {menuOpen ? (
              <AiOutlineClose className="text-2xl cursor-pointer" />
            ) : (
              <CiMenuFries className="text-2xl cursor-pointer" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu - Updated with user profile section */}
      <div
        className={`md:hidden fixed top-0 left-0 min-h-screen w-[70%] bg-black/95 z-[60] transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* User Profile Section in Mobile Menu */}
        {user && (
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/30">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                    {user?.displayName?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg">
                  {user?.displayName || "User"}
                </h3>
                <p className="text-gray-300 text-sm truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>

            {/* Mobile User Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-3 rounded-lg transition-colors text-sm"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="bg-purple-600 hover:bg-purple-700 text-white text-center py-2 px-3 rounded-lg transition-colors text-sm"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <ul className="flex flex-col items-start gap-4 text-sm tracking-wider text-white p-6">
          <li className="w-full">
            <NavLink
              onClick={() => setMenuOpen(false)}
              to={"/"}
              className="block py-3 px-4 hover:bg-white/10 rounded-lg transition-colors"
            >
              Home
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              onClick={() => setMenuOpen(false)}
              to={"/dsfds"}
              className="block py-3 px-4 hover:bg-white/10 rounded-lg transition-colors"
            >
              All Issues
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              onClick={() => setMenuOpen(false)}
              to={"/blog"}
              className="block py-3 px-4 hover:bg-white/10 rounded-lg transition-colors"
            >
              Blog
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              onClick={() => setMenuOpen(false)}
              to={"/contact"}
              className="block py-3 px-4 hover:bg-white/10 rounded-lg transition-colors"
            >
              Contact
            </NavLink>
          </li>

          {/* Create Issue Button - Always visible */}
          <li className="w-full mt-4">
            <Link
              to={"/create-issue"}
              onClick={() => setMenuOpen(false)}
              className="block bg-accent text-white text-center py-3 px-4 rounded-lg hover:bg-accent/80 transition-colors"
            >
              Create Issue
            </Link>
          </li>

          {/* Login/Logout Section */}
          <li className="w-full mt-6">
            {user ? (
              <button
                onClick={() => {
                  handleLogOut();
                  setMenuOpen(false);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                onClick={() => setMenuOpen(false)}
                className="block bg-accent text-white text-center py-3 px-4 rounded-lg hover:bg-accent/80 transition-colors"
              >
                Login
              </Link>
            )}
          </li>
        </ul>

        {/* Footer for mobile menu */}
        {user && (
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
            <div className="text-center text-gray-400 text-xs">
              <p>Logged in as {user?.email?.split("@")[0] || "user"}</p>
              <p className="mt-1">Click logout to end session</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
