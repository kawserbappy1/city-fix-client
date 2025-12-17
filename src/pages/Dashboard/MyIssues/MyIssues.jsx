import { useState } from "react";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiFilter,
  FiMapPin,
  FiUser,
  FiMail,
  FiPhone,
  FiThumbsUp,
} from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { formatExactDate } from "../../../Utilities/formatDate";

const MyIssues = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: issues = [] } = useQuery({
    queryKey: ["my-issues", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues?email=${user.email}`);
      return res.data;
    },
  });

  const pendingIssue = issues.filter((issue) => issue.status === "pending");
  const approvalIssue = issues.filter((issue) => issue.status === "approved");
  const resolvedIssue = issues.filter((issue) => issue.status === "resolved");

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getWorkflowColor = (workflow) => {
    switch (workflow?.toLowerCase()) {
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "assigned":
        return "bg-purple-100 text-purple-800";
      case "under review":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleView = (issue) => {
    setSelectedIssue(issue);
    setViewModalOpen(true);
  };

  const handleEdit = (issue) => {
    if (issue.status !== "Approved") {
      setSelectedIssue(issue);
      setEditModalOpen(true);
    }
  };

  const handleDelete = (issue) => {
    if (issue.status !== "Approved") {
      setSelectedIssue(issue);
      setDeleteModalOpen(true);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              My Reported Issues
            </h1>
            <p className="text-gray-600 mt-2">
              Track and manage all your reported issues in one place
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Filter by Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
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

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {pendingIssue.length}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <MdOutlinePendingActions className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {approvalIssue.length}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-purple-600">
                  {resolvedIssue.length}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <FiCheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  S.L
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Issue Image
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Issue Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Time
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Workflow
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {issues.map((issue, index) => (
                <tr
                  key={issue._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-gray-700 font-medium">
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={issue.issueImageURL}
                        alt={issue.issueName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 line-clamp-1">
                        {issue.issueName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            issue.priority
                          )}`}
                        >
                          {issue.priority}
                        </span>
                        <span className="text-xs text-gray-500">
                          {issue.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <FiClock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {formatExactDate(issue.createdAt)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        issue.status
                      )}`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getWorkflowColor(
                        issue.workflow
                      )}`}
                    >
                      {issue.workflow}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {/* View Button */}
                      <button
                        onClick={() => handleView(issue)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>

                      {/* Edit Button - Disabled for Approved issues */}
                      <button
                        onClick={() => handleEdit(issue)}
                        disabled={issue.status === "approved"}
                        className={`p-2 rounded-lg transition-colors ${
                          issue.status === "approved"
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                        title={
                          issue.status === "approved"
                            ? "Cannot edit approved issues"
                            : "Edit Issue"
                        }
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>

                      {/* Delete Button - Disabled for Approved issues */}
                      <button
                        onClick={() => handleDelete(issue)}
                        disabled={issue.status === "approved"}
                        className={`p-2 rounded-lg transition-colors ${
                          issue.status === "approved"
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-red-50 text-red-600 hover:bg-red-100"
                        }`}
                        title={
                          issue.status === "approved"
                            ? "Cannot delete approved issues"
                            : "Delete Issue"
                        }
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
        {issues.length === 0 && (
          <div className="py-16 text-center">
            <FiAlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Issues Found
            </h3>
            <p className="text-gray-600">
              You haven't reported any issues yet.
            </p>
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewModalOpen && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header with Image */}
              <div className="flex flex-col lg:flex-row gap-6 mb-8">
                <div className="lg:w-2/3">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Issue Details
                      </h2>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                            selectedIssue.status === "approved"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200"
                          }`}
                        >
                          {selectedIssue.status.charAt(0).toUpperCase() +
                            selectedIssue.status.slice(1)}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            selectedIssue.priority === "High"
                              ? "bg-red-100 text-red-700"
                              : selectedIssue.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {selectedIssue.priority} Priority
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setViewModalOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <FiXCircle className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {selectedIssue.issueName}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedIssue.description}
                  </p>
                </div>

                <div className="lg:w-1/3">
                  <div className="aspect-video rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={selectedIssue.issueImageURL}
                      alt={selectedIssue.issueName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Issue Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Category & Basic Info */}
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Issue Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Category</p>
                        <div className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                          {selectedIssue.category}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Division</p>
                        <p className="font-medium text-gray-800">
                          {selectedIssue.division}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FiMapPin className="text-blue-500" />
                      Location Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Division</p>
                        <p className="font-medium text-gray-800">
                          {selectedIssue.division}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">District</p>
                        <p className="font-medium text-gray-800">
                          {selectedIssue.district}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Upazila</p>
                        <p className="font-medium text-gray-800">
                          {selectedIssue.upazila}
                        </p>
                      </div>
                    </div>
                    {selectedIssue.address && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Complete Address
                        </p>
                        <p className="font-medium text-gray-800 whitespace-pre-line">
                          {selectedIssue.address}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Timeline */}
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FiClock className="text-blue-500" />
                      Timeline
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Reported On</p>
                          <p className="font-medium text-gray-800">
                            {selectedIssue.createdAt
                              ? formatExactDate(selectedIssue.createdAt)
                              : "N/A"}
                          </p>
                        </div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Approved On</p>
                          <p className="font-medium text-gray-800">
                            {selectedIssue.approvedAt
                              ? formatExactDate(selectedIssue.approvedAt)
                              : "Not approved yet"}
                          </p>
                        </div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Contact & Actions */}
                <div className="space-y-6">
                  {/* Posted By Card */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FiUser className="text-blue-500" />
                      Posted By
                    </h4>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {selectedIssue.postedBy
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "U"}
                        </span>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-800">
                          {selectedIssue.postedBy}
                        </h5>
                        <p className="text-sm text-gray-500">Issue Reporter</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <FiMail className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-gray-800 truncate">
                            {selectedIssue.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                          <FiPhone className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium text-gray-800">
                            {selectedIssue.phoneNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Quick Actions
                    </h4>
                    <div className="space-y-3">
                      <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
                        <FiThumbsUp className="w-4 h-4" />
                        Upvote Issue
                      </button>
                      <button className="w-full py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                        Share Issue
                      </button>
                      {selectedIssue.status === "approved" && (
                        <button className="w-full py-2.5 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium">
                          View Progress
                        </button>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-around">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-800">
                            156
                          </p>
                          <p className="text-xs text-gray-500">Upvotes</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-800">24</p>
                          <p className="text-xs text-gray-500">Comments</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-800">3</p>
                          <p className="text-xs text-gray-500">Shares</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Issue ID:{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {selectedIssue._id?.slice(-8) || "N/A"}
                  </code>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setViewModalOpen(false)}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                  >
                    Close
                  </button>
                  {selectedIssue.status !== "approved" && (
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      Edit Issue
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - Basic Structure */}
      {editModalOpen && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Edit Issue
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Update your issue details. Fields marked with * are
                    required.
                  </p>
                </div>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FiXCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Basic Information */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Basic Information
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Issue Name *
                        </label>
                        <input
                          type="text"
                          defaultValue={selectedIssue.issueName}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter issue title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category *
                        </label>
                        <select
                          defaultValue={selectedIssue.category}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Category</option>
                          <option value="Road or Potholes">
                            Road or Potholes
                          </option>
                          <option value="Sanitation">Sanitation</option>
                          <option value="Water Supply">Water Supply</option>
                          <option value="Electricity">Electricity</option>
                          <option value="Public Safety">Public Safety</option>
                          <option value="Parks & Green Spaces">
                            Parks & Green Spaces
                          </option>
                          <option value="Infrastructure">Infrastructure</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Education">Education</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority *
                        </label>
                        <select
                          defaultValue={selectedIssue.priority}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Issue Image URL
                        </label>
                        <input
                          type="url"
                          defaultValue={selectedIssue.issueImageURL}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://example.com/image.jpg"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Enter a direct image URL
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <FiMapPin className="text-blue-500" />
                      Location Information
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Division *
                        </label>
                        <select
                          defaultValue={selectedIssue.division}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Division</option>
                          <option value="Dhaka">Dhaka</option>
                          <option value="Chattogram">Chattogram</option>
                          <option value="Rajshahi">Rajshahi</option>
                          <option value="Khulna">Khulna</option>
                          <option value="Barishal">Barishal</option>
                          <option value="Sylhet">Sylhet</option>
                          <option value="Rangpur">Rangpur</option>
                          <option value="Mymensingh">Mymensingh</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            District *
                          </label>
                          <input
                            type="text"
                            defaultValue={selectedIssue.district}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter district"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upazila *
                          </label>
                          <input
                            type="text"
                            defaultValue={selectedIssue.upazila}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter upazila"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Complete Address
                        </label>
                        <textarea
                          defaultValue={selectedIssue.address}
                          rows="3"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter full address with details"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Description & Contact */}
                <div className="space-y-4">
                  {/* Description */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Description *
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Detailed Description
                      </label>
                      <textarea
                        defaultValue={selectedIssue.description}
                        rows="8"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Provide detailed description of the issue..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Include specific details, impact, and any relevant
                        information
                      </p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <FiUser className="text-blue-500" />
                      Contact Information
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          defaultValue={selectedIssue.postedBy}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          defaultValue={selectedIssue.email}
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          defaultValue={selectedIssue.phoneNumber}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Image Preview */}
                  {selectedIssue.issueImageURL && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Image Preview
                      </h3>
                      <div className="aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                        <img
                          src={selectedIssue.issueImageURL}
                          alt="Current issue image"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23999' d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Current uploaded image
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Validation & Status */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-3">
                  <FiAlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">
                      Note: Once an issue is approved, it cannot be edited.
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      Current Status:{" "}
                      <span
                        className={`font-semibold ${
                          selectedIssue.status === "approved"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {selectedIssue.status.charAt(0).toUpperCase() +
                          selectedIssue.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Issue ID:{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {selectedIssue._id?.slice(-8) || "N/A"}
                  </code>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditModalOpen(false)}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
                    <FiEdit2 className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTrash2 className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Delete Issue
                </h2>
                <p className="text-gray-600">
                  Are you sure you want to delete "
                  <span className="font-medium">{selectedIssue.issueName}</span>
                  "? This action cannot be undone.
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                  Delete Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIssues;
