import { useState } from "react";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllStaff = () => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: staffs = [] } = useQuery({
    queryKey: ["all-staff"],
    queryFn: async () => {
      const res = await axiosSecure("/staff");
      return res.data;
    },
  });

  const handleView = (staff) => {
    console.log("Opening modal for:", staff?.name);
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const approveMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/staff-approve/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-staff"] });
      Swal.fire({
        icon: "success",
        title: "Approved!",
        text: "Staff has been approved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to approve staff.",
      });
      console.error(err);
    },
  });

  const handleApproveMutation = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this staff member?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(id);
      }
    });
  };

  const deleteStaffMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/staff/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-staff"] });
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Staff has been deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to approve staff.",
      });
      console.error(err);
    },
  });

  const handleDeleteStaff = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this staff member?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStaffMutation.mutate(id);
      }
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
  };

  // Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        All Staff Members
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staffs.map((staff, index) => (
              <tr
                key={staff._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={staff.staffPhoto}
                    alt={staff.name}
                    className="h-10 w-10 rounded-full object-cover border border-gray-300"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {staff.name}
                  </div>
                  <div className="text-sm text-gray-500">{staff.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      staff.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : staff.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {staff.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(staff)}
                      className="inline-flex items-center px-3 py-2 gap-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaEye />
                      View
                    </button>
                    <button
                      onClick={() => handleApproveMutation(staff._id)}
                      disabled={staff.status === "approved"}
                      className={`inline-flex gap-1 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${
                        staff.status === "approved"
                          ? "cursor-not-allowed bg-gray-200 text-gray-500"
                          : "text-green-700 bg-green-100 hover:bg-green-200 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      }`}
                    >
                      <FcApproval />
                      {staff.status === "approved" ? "Approved" : "Approve"}
                    </button>
                    <button
                      onClick={() => handleDeleteStaff(staff._id)}
                      className="inline-flex gap-1 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <FaRegTrashAlt />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - Add optional chaining to handle undefined */}
      {isModalOpen && selectedStaff && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleOutsideClick}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      selectedStaff?.staffPhoto ||
                      "https://via.placeholder.com/64"
                    }
                    alt={selectedStaff?.name}
                    className="h-16 w-16 rounded-full object-cover border-2 border-gray-300"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedStaff?.name}
                    </h3>
                    <p className="text-gray-600">{selectedStaff?.email}</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Personal Information */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-gray-900">
                      {selectedStaff?.phone || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">NID</p>
                    <p className="text-gray-900">
                      {selectedStaff?.nid || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Education
                    </p>
                    <p className="text-gray-900">
                      {selectedStaff?.education || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Expert Area
                    </p>
                    <p className="text-gray-900">
                      {selectedStaff?.category || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Experience
                    </p>
                    <p className="text-gray-900">
                      {selectedStaff?.experience || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Activity
                    </p>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        selectedStaff?.activity === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedStaff?.activity || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Location Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Division
                    </p>
                    <p className="text-gray-900">
                      {selectedStaff?.division || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      District
                    </p>
                    <p className="text-gray-900">
                      {selectedStaff?.district || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Upazila</p>
                    <p className="text-gray-900">
                      {selectedStaff?.upazila || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Certifications
                </h4>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Certificate
                  </p>
                  <p className="text-gray-900">
                    {selectedStaff?.certificate || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllStaff;
