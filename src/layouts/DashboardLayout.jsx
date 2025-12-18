import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router";
import useAuth from "./../hooks/useAuth";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiMenu,
  FiSearch,
  FiBell,
  FiLogOut,
} from "react-icons/fi";
import {
  FaBoxTissue,
  FaPencilRuler,
  FaRegEdit,
  FaUserCog,
} from "react-icons/fa";
import { RiEditBoxLine, RiUserCommunityLine } from "react-icons/ri";
import { GiPayMoney } from "react-icons/gi";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  // Define your menu items here
  const menuItems = [
    { path: "/dashboard", label: "Overview", icon: <FiHome />, end: true },

    {
      path: "/dashboard/my-issues",
      label: "My-Issues",
      icon: <FaPencilRuler />,
      end: true,
    },
    {
      path: "/dashboard/create-issue",
      label: "Create Issue",
      icon: <FaRegEdit />,
      end: true,
    },
    {
      path: "/dashboard/all-issues",
      label: "All Issues",
      icon: <FaBoxTissue />,
      end: true,
    },
    { path: "/dashboard/all-users", label: "All Users", icon: <FiUsers /> },
    {
      path: "/dashboard/all-staff",
      label: "All Staff",
      icon: <RiUserCommunityLine />,
    },
    {
      path: "/dashboard/staff-profile",
      label: "Staff profile",
      icon: <FaUserCog />,
    },
    { path: "/dashboard/settings", label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 ">
      {/* --- Mobile Sidebar Overlay --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* --- Sidebar --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-center h-20 border-b border-gray-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <Link to={"/"}>MyDashboard</Link>
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile click
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 shadow-sm border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Action */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100 ">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-12 h-12">
              <img
                src={user.photoURL}
                alt=""
                className="w-12 h-12 rounded-full "
              />
            </div>
            <div>
              <p className=" font-bold capitalize">{user.displayName}</p>
            </div>
          </div>
          <div className="my-2">
            <Link to={"/"} className=" text-sm flex items-center gap-2">
              <GiPayMoney />
              Upgrade you plan
            </Link>{" "}
          </div>
          <div className="my-2">
            <Link
              to={"/dashboard/view-edit"}
              className="text-sm flex items-center gap-2"
            >
              <RiEditBoxLine />
              View & edit Profile
            </Link>{" "}
          </div>
          <button className="flex items-center justify-center px-4 py-2 text-red-500 transition-colors rounded-lg hover:bg-red-50">
            <FiLogOut className="mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* --- Main Content Wrapper --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-600 rounded-lg lg:hidden hover:bg-gray-100"
          >
            <FiMenu size={24} />
          </button>

          {/* Search Bar (Hidden on small mobile) */}
          <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 bg-transparent outline-none text-sm w-full"
            />
          </div>
          <div className="hidden md:flex">
            <p className="text-red-500 font-poppins font-bold">
              You are a free User
            </p>
          </div>
          {/* Right Header Icons */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-blue-600">
              <FiBell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white shadow-sm">
              <div className="w-10 h-10 ">
                <img
                  src={user.photoURL}
                  alt=""
                  className=" rounded-full w-10 h-10 "
                />
              </div>
            </div>
          </div>
        </header>

        {/* --- DYNAMIC CONTENT AREA --- */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {/* This <Outlet /> is where the children routes will render */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
