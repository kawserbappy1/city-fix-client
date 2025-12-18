import React from "react";
import { FaEye } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const AssignedIssue = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["assigned-issues", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/issues/assigned/${user.email}`);
      return res.data;
    },
  });

  // State for modal
  const [selectedIssue, setSelectedIssue] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleView = (issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const handleAccept = (id) => {
    console.log(`Accept issue with id: ${id}`);
  };

  const handleComplete = (id) => {
    console.log(`Complete issue with id: ${id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Assigned Issues</h2>

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
                    {issue.issueName}
                  </div>
                  <div className="text-sm text-gray-500">{issue.category}</div>
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
                    {issue.status}
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
                      onClick={() => handleAccept(issue._id)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleComplete(issue._id)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200"
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

      {/* Modal for Viewing Issue Details */}
      {isModalOpen && selectedIssue && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={closeModal}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Issue Details
                      </h3>
                      <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <svg
                          className="h-6 w-6"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">
                            Issue Information
                          </h4>
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Issue Name
                              </p>
                              <p className="text-gray-900">
                                {selectedIssue.issueName}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Category
                              </p>
                              <p className="text-gray-900">
                                {selectedIssue.category}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Priority
                              </p>
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded ${
                                  selectedIssue.priority === "high"
                                    ? "bg-red-100 text-red-800"
                                    : selectedIssue.priority === "medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {selectedIssue.priority}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Description
                              </p>
                              <p className="text-gray-900">
                                {selectedIssue.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">
                            Location Information
                          </h4>
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Division
                              </p>
                              <p className="text-gray-900">
                                {selectedIssue.division}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                District
                              </p>
                              <p className="text-gray-900">
                                {selectedIssue.district}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Upazila
                              </p>
                              <p className="text-gray-900">
                                {selectedIssue.upazila}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Address
                              </p>
                              <p className="text-gray-900">
                                {selectedIssue.address}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">
                            User Information
                          </h4>
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Posted By
                              </p>
                              <p className="text-gray-900">
                                {selectedIssue.postedBy}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Email
                              </p>
                              <p className="text-gray-900">
                                {selectedIssue.email}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Phone Number
                              </p>
                              <p className="text-gray-900">
                                {selectedIssue.phoneNumber}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">
                            Status Information
                          </h4>
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Status
                              </p>
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded ${
                                  selectedIssue.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : selectedIssue.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {selectedIssue.status}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Workflow
                              </p>
                              <p className="text-gray-900">
                                {selectedIssue.workflow}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Assignment
                              </p>
                              <p className="text-gray-900">
                                {selectedIssue.assign}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Created At
                              </p>
                              <p className="text-gray-900">
                                {new Date(
                                  selectedIssue.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Approved At
                              </p>
                              <p className="text-gray-900">
                                {new Date(
                                  selectedIssue.approvedAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">
                            Issue Image
                          </h4>
                          <img
                            src={selectedIssue.issueImageURL}
                            alt={selectedIssue.issueName}
                            className="w-full h-auto rounded-lg shadow-md"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/400x300";
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
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

export default AssignedIssue;
