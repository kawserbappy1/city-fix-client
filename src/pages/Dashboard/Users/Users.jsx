import React from "react";

const Users = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Jane Cooper</td>
              <td className="px-6 py-4 whitespace-nowrap">Admin</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full">
                  Active
                </span>
              </td>
            </tr>
            {/* Add more rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
