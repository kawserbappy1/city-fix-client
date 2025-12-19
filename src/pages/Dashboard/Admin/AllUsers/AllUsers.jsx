import {
  FiUser,
  FiEdit2,
  FiTrash2,
  FiShield,
  FiStar,
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import { useMemo, useState } from "react"; // Added useMemo and useState
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ============ STATE FOR SEARCH AND FILTERS ============
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [membershipFilter, setMembershipFilter] = useState("");
  // ============ END STATE ============

  // Fetch all users from API
  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ["AllIssues"], // Consider changing to ["AllUsers"] for clarity
    queryFn: async () => {
      const res = await axiosSecure("/user");
      return res.data;
    },
  });

  // ============ FILTERED USERS CALCULATION ============
  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      // Search filter - search in name, email, and phone
      const matchesSearch =
        searchTerm === "" ||
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchTerm.toLowerCase());

      // Role filter
      const matchesRole =
        roleFilter === "" ||
        user.role?.toLowerCase() === roleFilter.toLowerCase();

      // Membership filter
      const matchesMembership =
        membershipFilter === "" ||
        user.membership?.toLowerCase() === membershipFilter.toLowerCase();

      return matchesSearch && matchesRole && matchesMembership;
    });
  }, [allUsers, searchTerm, roleFilter, membershipFilter]);
  // ============ END FILTERED USERS ============

  // ============ RESET FILTERS FUNCTION ============
  const resetFilters = () => {
    setSearchTerm("");
    setRoleFilter("");
    setMembershipFilter("");
  };
  // ============ END RESET FUNCTION ============

  // Count users by membership (using filtered data for accuracy)
  const freeUsers = filteredUsers.filter((user) => user.membership === "free");
  const standardUsers = filteredUsers.filter(
    (user) => user.membership === "standard"
  );
  const premiumUsers = filteredUsers.filter(
    (user) => user.membership === "premium"
  );
  const staffUsers = filteredUsers.filter((user) => user.role === "staff");

  // ============ DELETE USER MUTATION ============
  const deleteUserMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/user/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AllIssues"] });
      Swal.fire({
        title: "Deleted!",
        text: "User has been deleted successfully.",
        icon: "success",
      });
    },

    onError: (error) => {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete user.",
        icon: "error",
      });
    },
  });

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(id);
      }
    });
  };

  // ============ GET ROLE BADGE COLOR ============
  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "staff":
        return "bg-blue-100 text-blue-800";
      case "user":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // ============ GET MEMBERSHIP BADGE COLOR ============
  const getMembershipColor = (membership) => {
    switch (membership?.toLowerCase()) {
      case "premium":
        return "bg-purple-100 text-purple-800";
      case "standard":
        return "bg-blue-100 text-blue-800";
      case "free":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          All Users
        </h1>
        <p className="text-gray-600">
          Manage all registered users in the system
        </p>
      </div>

      {/* ============ STATS CARDS ============ */}
      <div className="flex flex-col md:flex-row gap-1 flex-wrap mb-6">
        <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">
                {filteredUsers.length} {/* Changed from allUsers.length */}
              </p>
              <p className="text-xs text-gray-400">
                of {allUsers.length} total
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FiUser className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Free Users</p>
              <p className="text-2xl font-bold text-purple-600">
                {freeUsers.length}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <FiStar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Standard Users</p>
              <p className="text-2xl font-bold text-purple-600">
                {standardUsers.length}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <FiStar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Premium Users</p>
              <p className="text-2xl font-bold text-red-600">
                {premiumUsers.length}
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <FiShield className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Staff</p>
              <p className="text-2xl font-bold text-green-600">
                {staffUsers.length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <FiUser className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
      {/* ============ END STATS CARDS ============ */}

      {/* ============ SEARCH AND FILTER SECTION ============ */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <FiFilter /> Search & Filter Users
            </h3>
            <p className="text-sm text-gray-500">
              Showing {filteredUsers.length} of {allUsers.length} users
            </p>
          </div>

          {/* Reset Filters Button */}
          <button onClick={resetFilters} className="btn btn-outline btn-sm">
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Role Filter */}
          <select
            className="select select-bordered w-full"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="user">User</option>
          </select>

          {/* Membership Filter */}
          <select
            className="select select-bordered w-full"
            value={membershipFilter}
            onChange={(e) => setMembershipFilter(e.target.value)}
          >
            <option value="">All Memberships</option>
            <option value="free">Free</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        {/* Active Filters Indicator */}
        {(searchTerm || roleFilter || membershipFilter) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Active Filters:</p>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  Search: "{searchTerm}"
                </span>
              )}
              {roleFilter && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Role: {roleFilter}
                </span>
              )}
              {membershipFilter && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                  Membership: {membershipFilter}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      {/* ============ END SEARCH AND FILTER SECTION ============ */}

      {/* ============ USERS TABLE ============ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  S.L
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Photo
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Name & Contact
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Membership
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FiUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        {allUsers.length === 0
                          ? "No Users Found"
                          : "No Matching Users"}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {allUsers.length === 0
                          ? "There are no registered users yet."
                          : "Try adjusting your search or filters"}
                      </p>
                      {allUsers.length > 0 && (
                        <button
                          onClick={resetFilters}
                          className="btn btn-sm btn-outline"
                        >
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <span className="text-gray-700 font-medium">
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <FiUser className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {user.displayName}
                        </h3>
                        <p className="text-sm text-gray-500 truncate max-w-[200px]">
                          {user.email}
                        </p>
                        {user.phone && (
                          <p className="text-sm text-gray-500">{user.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getMembershipColor(
                          user.membership
                        )}`}
                      >
                        {user.membership || "N/A"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                          title="Edit User"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          title="Delete User"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* ============ END USERS TABLE ============ */}
    </div>
  );
};

export default AllUsers;
