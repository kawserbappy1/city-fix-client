import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react"; // Added useMemo
import {
  FiEye,
  FiTrash2,
  FiX,
  FiInfo,
  FiUser,
  FiCheck,
  FiAlertCircle,
  FiCheckCircle,
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import { FcApproval, FcCancel } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import {
  formatExactDate,
  formatRelativeTime,
} from "../../../../Utilities/formatDate";
import Loader from "../../../../components/Loader";
import { MdDownloadDone } from "react-icons/md";
import { IoIosGitNetwork } from "react-icons/io";
import { TbProgress } from "react-icons/tb";

const AllIssues = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [issueToAssign, setIssueToAssign] = useState(null);
  const queryClient = useQueryClient();

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [workflowFilter, setWorkflowFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [assignFilter, setAssignFilter] = useState("");

  // Fetch all issues
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues`);
      return res.data;
    },
  });

  // Fetch all staff members
  const { data: staffs = [] } = useQuery({
    queryKey: ["staff"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/approve-staff`);
      return res.data;
    },
  });

  // Get unique districts for filter dropdown using useMemo
  const uniqueDistricts = useMemo(() => {
    return [...new Set(issues.map((issue) => issue.district))].filter(Boolean);
  }, [issues]);

  // Filtered issues calculation using useMemo for better performance
  const filteredIssues = useMemo(() => {
    let filtered = [...issues];

    // Search filter (case insensitive)
    if (searchTerm) {
      filtered = filtered.filter(
        (issue) =>
          issue.issueName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.district?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.postedBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(
        (issue) => issue.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Priority filter
    if (priorityFilter) {
      filtered = filtered.filter(
        (issue) =>
          issue.priority?.toLowerCase() === priorityFilter.toLowerCase()
      );
    }

    // Workflow filter
    if (workflowFilter) {
      filtered = filtered.filter(
        (issue) =>
          issue.workflow?.toLowerCase() === workflowFilter.toLowerCase()
      );
    }

    // District filter
    if (districtFilter) {
      filtered = filtered.filter(
        (issue) =>
          issue.district?.toLowerCase() === districtFilter.toLowerCase()
      );
    }

    // Assign filter
    if (assignFilter === "assigned") {
      filtered = filtered.filter((issue) => issue.assign === "assigned");
    } else if (assignFilter === "unassigned") {
      filtered = filtered.filter(
        (issue) => !issue.assign || issue.assign === "waiting"
      );
    }

    return filtered;
  }, [
    issues,
    searchTerm,
    statusFilter,
    priorityFilter,
    workflowFilter,
    districtFilter,
    assignFilter,
  ]);

  // Count calculations based on filtered issues
  const pendignCount = filteredIssues.filter((s) => s.status === "pending");
  const approvedCount = filteredIssues.filter((s) => s.status === "approved");
  const inProgressCount = filteredIssues.filter(
    (s) => s.workflow === "in-progress"
  );
  const workingCount = filteredIssues.filter((s) => s.workflow === "Working");
  const resolvedCount = filteredIssues.filter((s) => s.workflow === "resolved");
  const assignCount = filteredIssues.filter((s) => s.assign === "assigned");
  const unassignCount = filteredIssues.filter((s) => s.assign === "waiting");

  // Reset Filters Function
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setPriorityFilter("");
    setWorkflowFilter("");
    setDistrictFilter("");
    setAssignFilter("");
  };

  // Rest of your functions...
  const handleViewIssue = (issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const handleAssignClick = (issue) => {
    setIssueToAssign(issue);
    setIsAssignModalOpen(true);
  };

  const assignIssueMutation = useMutation({
    mutationFn: ({ issueId, staffId }) =>
      axiosSecure.patch(`/issues/assign/${issueId}`, {
        staffId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      Swal.fire({
        icon: "success",
        title: "Assigned!",
        text: "Issue has been assigned successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      setIsAssignModalOpen(false);
      setIssueToAssign(null);
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

  const handleAssignToPerson = (staff) => {
    if (!issueToAssign?._id) return;
    Swal.fire({
      title: "Assign Issue?",
      text: `Assign this issue to ${staff.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, assign",
      confirmButtonColor: "#2563eb",
    }).then((result) => {
      if (result.isConfirmed) {
        assignIssueMutation.mutate({
          issueId: issueToAssign._id,
          staffId: staff._id,
        });
      }
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
  };

  const closeAssignModal = () => {
    setIsAssignModalOpen(false);
    setIssueToAssign(null);
  };

  const deleteIssueMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/issues/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
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

  const handleDeleteIssue = (id) => {
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
        deleteIssueMutation.mutate(id);
      }
    });
  };

  const approveMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/issues/approve/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      Swal.fire({
        icon: "success",
        title: "Approved!",
        timer: 2000,
        showConfirmButton: false,
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/issues/reject/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      Swal.fire({
        title: "Rejected!",
        text: "Issue has been rejected successfully.",
        icon: "success",
      });
    },
  });

  const handleRejectedIssu = (id) => {
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
        rejectMutation.mutate(id);
      }
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "badge-error text-white";
      case "medium":
        return "badge-warning text-white";
      case "low":
        return "badge-success text-white";
      default:
        return "badge-info text-white";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return "badge-success text-white";
      case "in progress":
      case "in-progress":
        return "badge-info text-white";
      case "pending":
        return "badge-warning text-white";
      case "working":
        return "badge-secondary text-white";
      default:
        return "badge-neutral";
    }
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="p-4 md:p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-2 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Issues</p>
              <p className="text-2xl font-bold text-gray-800">
                {filteredIssues.length}
              </p>
              <p className="text-xs text-gray-400">of {issues.length} total</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FiAlertCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {pendignCount.length}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <AiOutlineLoading3Quarters className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {approvedCount.length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <FiCheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">in-progress</p>
              <p className="text-2xl font-bold text-purple-600">
                {inProgressCount.length}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <TbProgress className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Working</p>
              <p className="text-2xl font-bold text-purple-600">
                {workingCount.length}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <IoIosGitNetwork className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-purple-600">
                {resolvedCount.length}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <MdDownloadDone className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Assign </p>
              <p className="text-2xl font-bold text-purple-600">
                {assignCount.length}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <MdDownloadDone className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Un Assign</p>
              <p className="text-2xl font-bold text-purple-600">
                {unassignCount.length}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <MdDownloadDone className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <FiFilter /> Filters & Search
            </h3>
            <p className="text-sm text-gray-500">
              Showing {filteredIssues.length} of {issues.length} issues
            </p>
          </div>

          {/* Reset Filters Button */}
          <button onClick={resetFilters} className="btn btn-outline btn-sm">
            Reset Filters
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search issues..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <select
            className="select select-bordered w-full"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Priority Filter */}
          <select
            className="select select-bordered w-full"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Workflow Filter */}
          <select
            className="select select-bordered w-full"
            value={workflowFilter}
            onChange={(e) => setWorkflowFilter(e.target.value)}
          >
            <option value="">All Workflow</option>
            <option value="in-progress">In Progress</option>
            <option value="working">Working</option>
            <option value="resolved">Resolved</option>
          </select>

          {/* District Filter */}
          <select
            className="select select-bordered w-full"
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
          >
            <option value="">All Districts</option>
            {uniqueDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>

          {/* Assign Filter */}
          <select
            className="select select-bordered w-full"
            value={assignFilter}
            onChange={(e) => setAssignFilter(e.target.value)}
          >
            <option value="">All Assignments</option>
            <option value="assigned">Assigned</option>
            <option value="unassigned">Unassigned</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="font-semibold text-gray-700">S.L</th>
                <th className="font-semibold text-gray-700">Issue Name</th>
                <th className="font-semibold text-gray-700">Time</th>
                <th className="font-semibold text-gray-700">Priority</th>
                <th className="font-semibold text-gray-700">Assign To</th>
                <th className="font-semibold text-gray-700">Status</th>
                <th className="font-semibold text-gray-700">WorkFlow</th>
                <th className="font-semibold text-gray-700 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <FiInfo className="w-12 h-12 mb-4 text-gray-400" />
                      <p className="text-lg font-medium mb-2">
                        {issues.length === 0
                          ? "No Issues Found"
                          : "No Matching Issues"}
                      </p>
                      <p className="text-sm">
                        {issues.length === 0
                          ? "Create your first issue to get started"
                          : "Try adjusting your search or filters"}
                      </p>
                      {issues.length > 0 && (
                        <button
                          onClick={resetFilters}
                          className="mt-4 btn btn-sm btn-outline"
                        >
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredIssues.map((issue, index) => (
                  <tr key={issue._id || index} className="hover:bg-gray-50">
                    <td className="font-medium">{index + 1}</td>
                    <td>
                      <div
                        className="font-semibold text-gray-800 max-w-[180px] truncate"
                        title={issue?.issueName}
                      >
                        {issue?.issueName}
                      </div>
                      <div
                        className="text-xs text-gray-500 truncate max-w-[180px]"
                        title={issue?.category}
                      >
                        {issue?.category} • {issue?.district}
                      </div>
                    </td>
                    <td>
                      <div className="group relative inline-block">
                        <span className="text-sm text-gray-600 cursor-help">
                          {formatRelativeTime(issue?.createdAt)}
                        </span>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                          {formatExactDate(issue?.createdAt)}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${getPriorityColor(issue?.priority)}`}
                      >
                        {issue?.priority}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-600 overflow-hidden">
                          <img
                            src={issue.assignedStaff?.photo}
                            alt={issue.assignedStaff?.name || "Unassigned"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span
                            className="text-sm truncate max-w-[100px]"
                            title={issue.assignedStaff?.name || "Unassigned"}
                          >
                            {issue.assignedStaff?.name || "Unassigned"}
                          </span>
                          <span
                            className="text-sm truncate max-w-[100px]"
                            title={issue.assignedStaff?.email || "Unassigned"}
                          >
                            {issue.assignedStaff?.email || "Unassigned"}
                          </span>
                          <span
                            className="text-sm truncate max-w-[100px]"
                            title={issue.assignedStaff?.phone || "Unassigned"}
                          >
                            {issue.assignedStaff?.phone || "Unassigned"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${getStatusColor(issue?.status)}`}
                      >
                        {issue?.status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${getStatusColor(issue?.workflow)}`}
                      >
                        {issue?.workflow}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleViewIssue(issue)}
                          className="btn btn-xs btn-outline btn-info"
                          title="View Details"
                        >
                          <FiEye className="text-sm" />
                        </button>
                        {issue?.status === "pending" ? (
                          <button
                            onClick={() => approveMutation.mutate(issue._id)}
                            className="btn btn-xs btn-outline btn-success"
                            title="Approve"
                          >
                            <FcApproval className="text-sm" />
                          </button>
                        ) : (
                          <button
                            disabled
                            className="btn btn-xs btn-success cursor-not-allowed"
                            title="Approved"
                          >
                            <FcApproval className="text-sm" />
                          </button>
                        )}

                        <button
                          onClick={() => handleAssignClick(issue)}
                          className="btn btn-xs btn-outline btn-primary"
                          title="Assign Issue"
                        >
                          <FiUser className="text-sm" />
                        </button>

                        <button
                          onClick={() => handleRejectedIssu(issue._id)}
                          className="btn btn-xs btn-outline btn-error"
                          title="Reject Issue"
                        >
                          <FcCancel className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDeleteIssue(issue._id)}
                          className="btn btn-xs btn-outline btn-error"
                          title="Delete Issue"
                        >
                          <FiTrash2 className="text-sm" />
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

      {/* View Issue Modal */}
      {isModalOpen && selectedIssue && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={closeModal}
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Issue Details
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Complete information about the issue
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Issue Image Section */}
                <div className="mb-6">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Issue Images
                  </label>
                  <div className="max-w-2xl w-full mx-auto">
                    <img
                      src={selectedIssue?.issueImageURL}
                      alt="Issue"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                        Basic Information
                      </label>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Issue Name</p>
                          <p className="font-medium text-gray-900 mt-1">
                            {selectedIssue?.issueName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Category & Location
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                              {selectedIssue?.category}
                            </span>
                            <span className="text-gray-700">•</span>
                            <span className="text-gray-700">
                              {selectedIssue?.district}
                            </span>
                            {selectedIssue?.area && (
                              <>
                                <span className="text-gray-700">•</span>
                                <span className="text-gray-700">
                                  {selectedIssue?.area}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Posted By</p>
                          <p className="font-medium text-gray-900 mt-1">
                            {selectedIssue?.postedBy}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                        Contact Information
                      </label>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Phone Number</p>
                          <p className="font-medium text-gray-900 mt-1">
                            {selectedIssue?.phoneNumber}
                          </p>
                        </div>
                        {selectedIssue?.email && (
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium text-gray-900 mt-1">
                              {selectedIssue?.email}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                        Status & Priority
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 mb-2">Priority</p>
                          <div
                            className={`badge ${getPriorityColor(
                              selectedIssue?.priority
                            )} badge-lg font-semibold`}
                          >
                            {selectedIssue?.priority}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 mb-2">Status</p>
                          <div
                            className={`badge ${getStatusColor(
                              selectedIssue?.status
                            )} badge-lg font-semibold`}
                          >
                            {selectedIssue?.status}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                        Assignment & Timeline
                      </label>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Assigned To</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600 overflow-hidden">
                              <img
                                src={selectedIssue.assignedStaff?.photo}
                                alt={
                                  selectedIssue.assignedStaff?.name ||
                                  "Unassigned"
                                }
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {selectedIssue?.assignedStaff?.name ||
                                  "Not assigned"}
                              </p>
                              {selectedIssue?.assignedStaff?.name && (
                                <p className="text-xs text-gray-500">
                                  Click "Assign" to change
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Created</p>
                          <p className="font-medium text-gray-900 mt-1">
                            {formatExactDate(selectedIssue?.createdAt)}
                          </p>
                        </div>
                        {selectedIssue?.assignedDate && (
                          <div>
                            <p className="text-sm text-gray-600">Assigned On</p>
                            <p className="font-medium text-gray-900 mt-1">
                              {formatExactDate(selectedIssue?.assignedDate)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                {selectedIssue?.description && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                      Description
                    </label>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-line">
                        {selectedIssue?.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Additional Details */}
                {selectedIssue?.landmark && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                      Location Details
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">District</p>
                        <p className="font-medium text-gray-900 mt-1">
                          {selectedIssue?.district}
                        </p>
                      </div>
                      {selectedIssue?.landmark && (
                        <div>
                          <p className="text-sm text-gray-600">Landmark</p>
                          <p className="font-medium text-gray-900 mt-1">
                            {selectedIssue?.landmark}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200 rounded-b-lg flex justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">ID:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {selectedIssue._id?.slice(-8) || "N/A"}
                  </code>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      closeModal();
                      handleAssignClick(selectedIssue);
                    }}
                    className="btn btn-outline btn-primary btn-sm"
                  >
                    Assign to Someone
                  </button>
                  <button className="btn btn-primary btn-sm">Edit Issue</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Assign Issue Modal */}
      {isAssignModalOpen && issueToAssign && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={closeAssignModal}
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Assign Issue
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Assign "{issueToAssign.issueName}" to a team member
                  </p>
                </div>
                <button
                  onClick={closeAssignModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Issue Info Summary */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {issueToAssign.issueName}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-600">
                          {issueToAssign.category}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">
                          {issueToAssign.district}
                        </span>
                        <span
                          className={`badge ${getPriorityColor(
                            issueToAssign.priority
                          )} ml-2`}
                        >
                          {issueToAssign.priority}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Created: {formatRelativeTime(issueToAssign.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Assignees Table */}
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="table w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="font-semibold text-gray-700">Person</th>
                        <th className="font-semibold text-gray-700">Contact</th>
                        <th className="font-semibold text-gray-700">Role</th>
                        <th className="font-semibold text-gray-700 text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffs.map((staff) => (
                        <tr key={staff._id} className="hover:bg-gray-50">
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600 overflow-hidden">
                                <img
                                  src={staff.staffPhoto}
                                  alt={staff.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {staff.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {staff.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-gray-700">{staff.phone}</p>
                          </td>
                          <td className="flex flex-col gap-1">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                              {staff.division}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                              {staff.district}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                              {staff.upazila}
                            </span>
                          </td>
                          <td className="text-center">
                            <button
                              onClick={() => handleAssignToPerson(staff)}
                              className="btn btn-xs btn-outline btn-primary"
                              title="Assign to this person"
                            >
                              <FiCheck className="mr-1" />
                              Assign
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg flex justify-between">
                <button
                  onClick={closeAssignModal}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                >
                  Cancel
                </button>
                <div className="flex gap-3">
                  <button className="btn btn-outline btn-sm">
                    Custom Assignment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllIssues;
