import React from "react";

const Overview = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">$54,230</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Active Users</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">2,430</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">New Orders</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">145</h3>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm h-64 flex items-center justify-center border border-gray-100">
        <span className="text-gray-400">Chart Component Would Go Here</span>
      </div>
    </div>
  );
};

export default Overview;
