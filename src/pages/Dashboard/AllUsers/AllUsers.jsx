import { FiUser, FiEdit2, FiTrash2, FiShield, FiStar } from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { id } = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ["AllIssues"],
    queryFn: async () => {
      const res = await axiosSecure("/user");
      return res.data;
    },
  });

  const freeUsers = allUsers.filter((user) => user.isPremium === "free");
  const standardUsers = allUsers.filter(
    (user) => user.isPremium === "standard"
  );
  const premiumUsers = allUsers.filter((user) => user.isPremium === "premium");
  const staffUsers = allUsers.filter((user) => user.role === "staff");

  const deleteUserMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/user/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AllIssues"] });
      Swal.fire({
        title: "Deleted!",
        text: "Issue has been deleted successfully.",
        icon: "success",
      });
    },

    onError: (error) => {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete issue.",
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
  // Get role badge color
  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "moderator":
        return "bg-blue-100 text-blue-800";
      case "user":
        return "bg-green-100 text-green-800";
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

      {/* Stats Cards */}
      <div className="flex flex-col md:flex-row gap-1 flex-wrap">
        <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">
                {allUsers.length}
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
              <p className="text-sm text-gray-600">taff</p>
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

      {/* Search and Filter */}
      <div className="my-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="premium">Premium</option>
            <option value="standard">Standard</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
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
                  Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Premium
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allUsers.map((user, index) => (
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
                    <div className="flex items-center gap-2">
                      {user.isPremium}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {allUsers.length === 0 && (
          <div className="py-16 text-center">
            <FiUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Users Found
            </h3>
            <p className="text-gray-600">There are no registered users yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
