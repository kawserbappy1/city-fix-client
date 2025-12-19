import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

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
import { PiMoney } from "react-icons/pi";
import { LuTrainTrack } from "react-icons/lu";

import { RiEditBoxLine, RiUserCommunityLine } from "react-icons/ri";
import { GiPayMoney } from "react-icons/gi";
import UseMembership from "../hooks/UseMembership";

/* ================= ROLE BASED MENUS ================= */

const adminMenu = [
  { path: "/dashboard", label: "Overview", icon: <FiHome />, end: true },
  { path: "/dashboard/all-issues", label: "All Issues", icon: <FaBoxTissue /> },
  {
    path: "/dashboard/all-staff",
    label: "Manage Staffs",
    icon: <RiUserCommunityLine />,
  },

  { path: "/dashboard/all-users", label: "Manage Users", icon: <FiUsers /> },
  {
    path: "/dashboard/payment",
    label: "Manage Payment",
    icon: <PiMoney />,
  },
];

const staffMenu = [
  { path: "/dashboard", label: "Overview", icon: <FiHome />, end: true },
  {
    path: "/dashboard/staff-profile",
    label: "My Profile",
    icon: <FaUserCog />,
  },
  {
    path: "/dashboard/assign-issue",
    label: "Assigned Issues",
    icon: <FaPencilRuler />,
  },
];

const userMenu = [
  { path: "/dashboard", label: "Overview", icon: <FiHome />, end: true },
  {
    path: "/dashboard/create-issue",
    label: "Create Issue",
    icon: <FaRegEdit />,
  },
  {
    path: "/dashboard/be-staff",
    label: "Become Staff",
    icon: <RiUserCommunityLine />,
  },
  { path: "/dashboard/my-issues", label: "My Issues", icon: <FaPencilRuler /> },
  {
    path: "/dashboard/track-issue",
    label: "Track Issue",
    icon: <LuTrainTrack />,
  },
];

const commonMenu = [
  { path: "/dashboard/settings", label: "Settings", icon: <FiSettings /> },
];

/* ================= COMPONENT ================= */

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logOut } = useAuth();
  const { role, isLoading } = useRole();

  /* ===== Loading Role ===== */
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  /* ===== Select Menu By Role ===== */
  let roleMenu = [];

  if (role === "admin") roleMenu = adminMenu;
  else if (role === "staff") roleMenu = staffMenu;
  else roleMenu = userMenu;

  const menuItems = [...roleMenu, ...commonMenu];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ================= MOBILE OVERLAY ================= */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-20 border-b">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            CityFix
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL || "https://i.ibb.co/2kR5zq0/avatar.png"}
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-bold">{user?.displayName}</p>
              <p className="text-sm text-gray-500 capitalize">
                {role === "user" && <span className="mr-1">Free</span>}
                {role}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Link className="flex items-center gap-2 text-sm">
              <GiPayMoney /> Upgrade Plan
            </Link>
            <Link
              to="/dashboard/view-edit"
              className="flex items-center gap-2 text-sm"
            >
              <RiEditBoxLine /> View & Edit Profile
            </Link>
            <button
              onClick={logOut}
              className="flex items-center gap-2 text-red-500 text-sm mt-2"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
            <FiMenu size={24} />
          </button>

          <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg">
            <FiSearch />
            <input
              className="bg-transparent outline-none ml-2"
              placeholder="Search..."
            />
          </div>

          <div className="flex items-center gap-4">
            <FiBell size={20} />
            <img
              src={user?.photoURL}
              className="w-10 h-10 rounded-full"
              alt=""
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
