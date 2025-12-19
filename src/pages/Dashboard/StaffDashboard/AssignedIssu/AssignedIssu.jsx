import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FiAlertCircle } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AssignedIssue = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["assigned-issues", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/issues/assigned/${user.email}`);
      return res.data;
    },
  });
  const completedCount = issues.filter(
    (i) => i.workflow === "resolved" && i.assignedStaff.email
  );

  const handleView = (issue) => {
    console.log("Viewing issue:", issue);
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const acceptMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/accept-issu/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assigned-issues"] });
      Swal.fire({
        icon: "success",
        title: "Accepted",
        text: "Issue has been accepeted successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not assign staff",
      });
    },
  });

  const handleAcceptIssue = (id) => {
    Swal.fire({
      title: "Accept Issue?",
      text: `you are accepted to issue`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, assign",
      confirmButtonColor: "#2563eb",
    }).then((result) => {
      if (result.isConfirmed) {
        acceptMutation.mutate(id);
      }
    });
  };
  const resolvedMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/resolved-issu/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assigned-issues"] });
      Swal.fire({
        icon: "success",
        title: "Resolved",
        text: "Issue has been resolved successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not assign staff",
      });
    },
  });

  const handleresolvedIssue = (id) => {
    Swal.fire({
      title: "resolved Issue?",
      text: `you are resolved to issue`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, assign",
      confirmButtonColor: "#2563eb",
    }).then((result) => {
      if (result.isConfirmed) {
        resolvedMutation.mutate(id);
      }
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
  };

  // Debug: Check if data is loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4">Loading issues...</p>
      </div>
    );
  }

  // Debug: Check if data is empty
  if (!issues || issues.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Assigned Issues
        </h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800">No assigned issues found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Assigned Issues</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Issues</p>
              <p className="text-2xl font-bold text-gray-800">
                {issues.length}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FiAlertCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-yellow-600">
                {completedCount.length}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <AiOutlineLoading3Quarters className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issue Name
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
            {issues.map((issue, index) => (
              <tr key={issue._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {issue.issueName || "No Name"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {issue.category || "No Category"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      issue.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : issue.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : issue.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {issue.status || "Unknown"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(issue)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                    >
                      <FaEye className="mr-1" /> View
                    </button>

                    <button
                      onClick={() => handleAcceptIssue(issue._id)}
                      disabled={
                        issue?.workflow === "Working" ||
                        issue?.workflow === "resolved"
                      }
                      className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md transition-colors
                        ${
                          issue?.workflow === "Working" ||
                          issue?.workflow === "resolved"
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "text-green-700 bg-green-100 hover:bg-green-200 hover:shadow-sm"
                        }`}
                      title={
                        issue?.workflow === "working"
                          ? "Issue already accepted and in progress"
                          : "Accept this issue"
                      }
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleresolvedIssue(issue._id)}
                      disabled={issue?.workflow === "resolved"}
                      className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md 
                        ${
                          issue?.workflow === "resolved"
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "text-purple-700 bg-purple-100 hover:bg-purple-200 hover:shadow-sm"
                        }
                        `}
                      title={
                        issue?.workflow === "resolved"
                          ? "Issue already compeled and resolved"
                          : "complete this issue"
                      }
                    >
                      Complete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - Fixed positioning */}
      {isModalOpen && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Issue Details: {selectedIssue.issueName || "No Name"}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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

              {/* Issue Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Basic Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Issue Name
                        </p>
                        <p className="text-gray-900">
                          {selectedIssue.issueName || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Category
                        </p>
                        <p className="text-gray-900">
                          {selectedIssue.category || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Priority
                        </p>
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${
                            selectedIssue.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : selectedIssue.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {selectedIssue.priority || "N/A"}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Description
                        </p>
                        <p className="text-gray-900">
                          {selectedIssue.description || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Location Details
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Division
                        </p>
                        <p className="text-gray-900">
                          {selectedIssue.division || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          District
                        </p>
                        <p className="text-gray-900">
                          {selectedIssue.district || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Upazila
                        </p>
                        <p className="text-gray-900">
                          {selectedIssue.upazila || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Address
                        </p>
                        <p className="text-gray-900">
                          {selectedIssue.address || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      User Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Posted By
                        </p>
                        <p className="text-gray-900">
                          {selectedIssue.postedBy || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Email
                        </p>
                        <p className="text-gray-900">
                          {selectedIssue.email || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Phone Number
                        </p>
                        <p className="text-gray-900">
                          {selectedIssue.phoneNumber || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Status Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Status
                        </p>
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${
                            selectedIssue.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : selectedIssue.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedIssue.status || "N/A"}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Workflow
                        </p>
                        <p className="text-gray-900">
                          {selectedIssue.workflow || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Assignment
                        </p>
                        <p className="text-gray-900">
                          {selectedIssue.assign || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Created At
                        </p>
                        <p className="text-gray-900">
                          {selectedIssue.createdAt
                            ? new Date(
                                selectedIssue.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Approved At
                        </p>
                        <p className="text-gray-900">
                          {selectedIssue.approvedAt
                            ? new Date(
                                selectedIssue.approvedAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Issue Image
                    </h4>
                    <img
                      src={
                        selectedIssue.issueImageURL ||
                        "https://via.placeholder.com/400x300"
                      }
                      alt={selectedIssue.issueName || "Issue Image"}
                      className="w-full h-auto rounded-lg shadow-md"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300";
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedIssue;
