// components/TrackIssue.jsx
import { useState, useMemo } from "react";
import {
  FiEye,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiPackage,
  FiHome,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { MdPendingActions, MdOutlineTaskAlt } from "react-icons/md";
import { GiDeliveryDrone } from "react-icons/gi";
import { FaRegHandshake } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { formatExactDate } from "../../../../Utilities/formatDate";

const TrackIssue = () => {
  // ============ STATE FOR MODAL ============
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ============ FETCH USER'S ISSUES ============
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["issues", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/track-issue?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ============ CONDITIONAL TIMELINE GENERATOR ============
  const generateTimeline = (issue) => {
    if (!issue) return [];

    const timeline = [];

    // Helper function to format time
    const formatTime = (dateString) => {
      if (!dateString) return "Pending";
      const date = new Date(dateString);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    // 1. Issue Reported (always exists)
    timeline.push({
      id: 1,
      title: "Issue Reported",
      description: "You reported this issue",
      date: formatExactDate(issue.createdAt),
      time: formatTime(issue.createdAt),
      status: "completed",
      icon: <FiAlertCircle className="text-blue-500" />,
    });

    // 2. Issue Approved/Rejected (if processed)
    if (issue.status === "approved" || issue.status === "rejected") {
      timeline.push({
        id: 2,
        title:
          issue.status === "approved" ? "Issue Approved" : "Issue Rejected",
        description:
          issue.status === "approved"
            ? "Admin approved your issue"
            : "Admin rejected your issue",
        date: issue.approvedAt
          ? formatExactDate(issue.approvedAt)
          : "Processing",
        time: issue.approvedAt ? formatTime(issue.approvedAt) : "Pending",
        status: issue.status === "approved" ? "completed" : "cancelled",
        icon:
          issue.status === "approved" ? (
            <FiCheckCircle className="text-green-500" />
          ) : (
            <FiX className="text-red-500" />
          ),
      });
    }

    // 3. Assigned to Staff (if assigned)
    if (issue.assign === "assigned" && issue.assignedStaff) {
      timeline.push({
        id: 3,
        title: "Assigned to Staff",
        description: `Issue assigned to ${
          issue.assignedStaff.name || "a technician"
        }`,
        date: issue.assignAt
          ? formatExactDate(issue.assignAt)
          : "Waiting assignment",
        time: issue.assignAt ? formatTime(issue.assignAt) : "Pending",
        status: "completed",
        icon: <FiUser className="text-purple-500" />,
      });
    }

    // 4. Staff Accepted (if workflow is working)
    if (issue.workflow === "working" || issue.workflow === "resolved") {
      timeline.push({
        id: 4,
        title: "Work Started",
        description: "Staff accepted your issue",
        date: issue.acceptedAt
          ? formatExactDate(issue.acceptedAt)
          : "In progress",
        time: issue.acceptedAt ? formatTime(issue.acceptedAt) : "Ongoing",
        status: "completed",
        icon: <MdPendingActions className="text-yellow-500" />,
      });
    }

    // 5. Work Completed (if resolved)
    if (issue.workflow === "resolved") {
      timeline.push({
        id: 5,
        title: "Work Completed",
        description: "Staff has completed your issue",
        date: issue.resolveAt ? formatExactDate(issue.resolveAt) : "Recently",
        time: issue.resolveAt ? formatTime(issue.resolveAt) : "Just now",
        status: "completed",
        icon: <MdOutlineTaskAlt className="text-green-500" />,
      });
    } else if (issue.workflow === "working") {
      // If still working, show in progress
      timeline.push({
        id: 5,
        title: "Work in Progress",
        description: "Staff is currently working on your issue",
        date: "Currently",
        time: "Ongoing",
        status: "in-progress",
        icon: <GiDeliveryDrone className="text-yellow-500" />,
      });
    }

    // 6. Future steps if not completed
    if (issue.workflow !== "resolved" && issue.status !== "rejected") {
      // Only show future steps if not rejected
      timeline.push({
        id: timeline.length + 1,
        title: "Quality Check",
        description: "Pending quality inspection",
        date: "Upcoming",
        time: "Pending",
        status: "pending",
        icon: <FiClock className="text-gray-400" />,
      });

      timeline.push({
        id: timeline.length + 1,
        title: "Completion",
        description: "Issue will be marked as resolved",
        date: "Estimated",
        time: "Pending",
        status: "pending",
        icon: <FaRegHandshake className="text-gray-400" />,
      });
    }

    return timeline;
  };

  // ============ CALCULATE PROGRESS PERCENTAGE ============
  const calculateProgress = (issue) => {
    if (!issue) return 0;

    const totalSteps = 5; // Reported, Approved, Assigned, Working, Resolved
    let completedSteps = 1; // Always have "Reported" completed

    if (issue.status === "approved") completedSteps++;
    if (issue.assign === "assigned") completedSteps++;
    if (issue.workflow === "working") completedSteps++;
    if (issue.workflow === "resolved") completedSteps++;

    return Math.round((completedSteps / totalSteps) * 100);
  };

  // ============ GET ESTIMATED COMPLETION ============
  const getEstimatedCompletion = (issue) => {
    if (!issue) return "Not available";

    if (issue.workflow === "resolved") {
      return `Completed on ${formatExactDate(issue.resolveAt)}`;
    }

    if (issue.status === "rejected") {
      return "Issue Rejected";
    }

    const startDate = new Date(issue.createdAt);
    let estimatedDate = new Date(startDate);

    // Add estimated days based on current status
    if (issue.status === "pending") {
      estimatedDate.setDate(startDate.getDate() + 2); // 2 days for approval
    } else if (issue.assign !== "assigned") {
      estimatedDate.setDate(startDate.getDate() + 3); // 3 days for assignment
    } else if (issue.workflow === "waiting") {
      estimatedDate.setDate(startDate.getDate() + 2); // 2 days for acceptance
    } else if (issue.workflow === "working") {
      estimatedDate.setDate(startDate.getDate() + 5); // 5 days for completion
    } else {
      estimatedDate.setDate(startDate.getDate() + 7); // 7 days total
    }

    return formatExactDate(estimatedDate);
  };

  // ============ GET REMAINING DAYS ============
  const getRemainingDays = (issue) => {
    if (!issue || issue.workflow === "resolved" || issue.status === "rejected")
      return 0;

    const createdDate = new Date(issue.createdAt);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (issue.status === "pending") return Math.max(0, 2 - diffDays);
    if (issue.assign !== "assigned") return Math.max(0, 3 - diffDays);
    if (issue.workflow === "waiting") return Math.max(0, 2 - diffDays);
    if (issue.workflow === "working") return Math.max(0, 5 - diffDays);

    return Math.max(0, 7 - diffDays);
  };

  // ============ STATS CALCULATIONS ============
  const stats = useMemo(() => {
    const totalIssues = issues.length;
    const inProgress = issues.filter(
      (issue) =>
        issue.workflow === "working" || issue.workflow === "in-progress"
    ).length;
    const completed = issues.filter(
      (issue) => issue.workflow === "resolved"
    ).length;
    const pending = issues.filter((issue) => issue.status === "pending").length;

    // Calculate average resolution time
    const resolvedIssues = issues.filter(
      (issue) => issue.workflow === "resolved" && issue.resolveAt
    );
    let avgResolutionTime = 0;

    if (resolvedIssues.length > 0) {
      const totalDays = resolvedIssues.reduce((sum, issue) => {
        const created = new Date(issue.createdAt);
        const resolved = new Date(issue.resolveAt);
        const diffTime = Math.abs(resolved - created);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return sum + diffDays;
      }, 0);

      avgResolutionTime = (totalDays / resolvedIssues.length).toFixed(1);
    }

    return {
      totalIssues,
      inProgress,
      completed,
      pending,
      avgResolutionTime: avgResolutionTime > 0 ? avgResolutionTime : "0.0",
    };
  }, [issues]);

  // ============ GET PRIORITY BADGE COLOR ============
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800 border border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // ============ GET STATUS BADGE COLOR ============
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-800 border border-green-200";
      case "in progress":
      case "working":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "assigned":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // ============ GET WORKFLOW DISPLAY TEXT ============
  const getWorkflowDisplay = (workflow, assign) => {
    if (workflow === "resolved") return "Resolved";
    if (workflow === "working") return "In Progress";
    if (workflow === "in-progress") return "Assigned";
    if (workflow === "waiting")
      return assign === "assigned" ? "Assigned" : "Waiting";
    if (workflow === "in-queue") return "Pending Approval";
    return "Processing";
  };

  // ============ HANDLE TRACK BUTTON CLICK ============
  const handleTrackIssue = (issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  // ============ CLOSE MODAL ============
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
  };

  // ============ FORMAT APPROVED DATE ============
  const formatApprovedDate = (approvedAt) => {
    if (!approvedAt) return "Not approved yet";
    return formatExactDate(approvedAt);
  };

  // Generate timeline and progress for selected issue
  const issueTimeline = selectedIssue ? generateTimeline(selectedIssue) : [];
  const progressPercentage = selectedIssue
    ? calculateProgress(selectedIssue)
    : 0;
  const estimatedCompletion = selectedIssue
    ? getEstimatedCompletion(selectedIssue)
    : "";
  const remainingDays = selectedIssue ? getRemainingDays(selectedIssue) : 0;

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* ============ HEADER ============ */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Track Issues
        </h1>
        <p className="text-gray-600">
          Monitor your reported issues and track their progress
        </p>
      </div>

      {/* ============ STATS OVERVIEW ============ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Issues</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalIssues}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FiPackage className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.inProgress}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <MdPendingActions className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.completed}
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
              <p className="text-sm text-gray-600">Avg. Resolution Time</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.avgResolutionTime} days
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <FiClock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* ============ ISSUES TABLE ============ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {issues.length === 0 ? (
          <div className="py-16 text-center">
            <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Issues Found
            </h3>
            <p className="text-gray-600">
              You haven't reported any issues yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    S.L
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Issue Name
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Priority
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Approved At
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Status
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
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {issue?.issueName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {issue?.category}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          issue?.priority
                        )}`}
                      >
                        {issue?.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <FiCalendar className="w-4 h-4 text-gray-400" />
                        {formatApprovedDate(issue?.approvedAt)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          issue?.status
                        )}`}
                      >
                        {getWorkflowDisplay(issue?.workflow, issue?.assign)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleTrackIssue(issue)}
                        className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                          issue.status === "rejected" ||
                          issue.workflow === "resolved"
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                        disabled={
                          issue.status === "rejected" ||
                          issue.workflow === "resolved"
                        }
                      >
                        <FiEye className="w-4 h-4" />
                        {issue.status === "rejected"
                          ? "Rejected"
                          : issue.workflow === "resolved"
                          ? "Resolved"
                          : "Track Issue"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ============ TRACKING MODAL ============ */}
      {isModalOpen && selectedIssue && (
        <>
          {/* Modal Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Tracking Issue: {selectedIssue.issueName}
                  </h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                        selectedIssue.priority
                      )}`}
                    >
                      {selectedIssue.priority} Priority
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        selectedIssue.status
                      )}`}
                    >
                      {getWorkflowDisplay(
                        selectedIssue.workflow,
                        selectedIssue.assign
                      )}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Modal Body - Two Column Layout */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Staff Information */}
                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-0">
                      <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center gap-2">
                        <FiUser className="text-blue-600" />
                        {selectedIssue.assign === "assigned" &&
                        selectedIssue.assignedStaff
                          ? "Assigned Staff"
                          : "Staff Assignment"}
                      </h3>

                      {selectedIssue.assign === "assigned" &&
                      selectedIssue.assignedStaff ? (
                        <>
                          {/* Staff Photo & Basic Info */}
                          <div className="text-center mb-6">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 mx-auto mb-4">
                              <img
                                src={
                                  selectedIssue.assignedStaff?.photo ||
                                  "https://i.ibb.co/2kR5zq0/avatar.png"
                                }
                                alt={
                                  selectedIssue.assignedStaff?.name ||
                                  "Technician"
                                }
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h4 className="text-xl font-bold text-gray-800">
                              {selectedIssue.assignedStaff?.name ||
                                "Assigned Technician"}
                            </h4>
                            <p className="text-gray-600">Field Technician</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {selectedIssue.category}
                            </span>
                          </div>

                          {/* Contact Information */}
                          <div className="space-y-4">
                            {selectedIssue.assignedStaff?.email && (
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <FiMail className="w-5 h-5 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-600">Email</p>
                                  <p className="font-medium text-gray-800 truncate">
                                    {selectedIssue.assignedStaff.email}
                                  </p>
                                </div>
                              </div>
                            )}

                            {selectedIssue.assignedStaff?.phone && (
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <FiPhone className="w-5 h-5 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-600">Phone</p>
                                  <p className="font-medium text-gray-800">
                                    {selectedIssue.assignedStaff.phone}
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <FiCalendar className="w-5 h-5 text-gray-500" />
                              <div>
                                <p className="text-sm text-gray-600">
                                  Assigned On
                                </p>
                                <p className="font-medium text-gray-800">
                                  {selectedIssue.assignAt
                                    ? formatExactDate(selectedIssue.assignAt)
                                    : "Recently"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Performance Stats */}
                          <div className="mt-8 pt-6 border-t border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                              Issue Details
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-center p-3 bg-green-50 rounded-lg">
                                <p className="text-2xl font-bold text-green-700">
                                  {selectedIssue.priority}
                                </p>
                                <p className="text-xs text-green-600">
                                  Priority
                                </p>
                              </div>
                              <div className="text-center p-3 bg-blue-50 rounded-lg">
                                <p className="text-base font-bold text-blue-700">
                                  {selectedIssue.category}
                                </p>
                                <p className="text-xs text-blue-600">
                                  Category
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Contact Staff Button */}
                          <button className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            Contact Staff
                          </button>
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <FiUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <h4 className="text-lg font-semibold text-gray-700 mb-2">
                            Not Yet Assigned
                          </h4>
                          <p className="text-gray-600 mb-4">
                            Your issue is waiting to be assigned to a
                            technician.
                          </p>
                          <div className="p-4 bg-yellow-50 rounded-lg">
                            <p className="text-sm text-yellow-700">
                              Status:{" "}
                              {getWorkflowDisplay(
                                selectedIssue.workflow,
                                selectedIssue.assign
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Timeline */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center gap-2">
                        <FiClock className="text-blue-600" />
                        Tracking Timeline
                      </h3>

                      {/* Progress Bar */}
                      <div className="mb-8">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            Progress
                          </span>
                          <span className="text-sm font-bold text-blue-600">
                            {progressPercentage}% Complete
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                        {/* Timeline Items */}
                        <div className="space-y-8">
                          {issueTimeline.map((item) => (
                            <div
                              key={item.id}
                              className="relative flex items-start"
                            >
                              {/* Icon Circle */}
                              <div
                                className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                                  item.status === "completed"
                                    ? "bg-green-100 border-2 border-green-300"
                                    : item.status === "in-progress"
                                    ? "bg-yellow-100 border-2 border-yellow-300"
                                    : item.status === "cancelled"
                                    ? "bg-red-100 border-2 border-red-300"
                                    : "bg-gray-100 border-2 border-gray-300"
                                }`}
                              >
                                {item.icon}
                                {item.status === "completed" && (
                                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                    <FiCheck className="w-3 h-3 text-white" />
                                  </div>
                                )}
                                {item.status === "cancelled" && (
                                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                    <FiX className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </div>

                              {/* Content */}
                              <div className="ml-6 flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-semibold text-gray-800">
                                      {item.title}
                                    </h4>
                                    <p className="text-gray-600 mt-1">
                                      {item.description}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-gray-700">
                                      {item.date}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {item.time}
                                    </p>
                                  </div>
                                </div>

                                {/* Status Badge */}
                                <div className="mt-3">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      item.status === "completed"
                                        ? "bg-green-100 text-green-800"
                                        : item.status === "in-progress"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : item.status === "cancelled"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {item.status === "completed"
                                      ? "Completed"
                                      : item.status === "in-progress"
                                      ? "In Progress"
                                      : item.status === "cancelled"
                                      ? "Cancelled"
                                      : "Pending"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Estimated Completion */}
                      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {selectedIssue.workflow === "resolved"
                                ? "Completed"
                                : selectedIssue.status === "rejected"
                                ? "Issue Rejected"
                                : "Estimated Completion"}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {selectedIssue.workflow === "resolved"
                                ? "Issue has been resolved successfully"
                                : selectedIssue.status === "rejected"
                                ? "This issue was rejected by admin"
                                : "Based on current progress"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p
                              className={`text-xl font-bold ${
                                selectedIssue.workflow === "resolved"
                                  ? "text-green-700"
                                  : selectedIssue.status === "rejected"
                                  ? "text-red-700"
                                  : "text-blue-700"
                              }`}
                            >
                              {estimatedCompletion}
                            </p>
                            {selectedIssue.workflow !== "resolved" &&
                              selectedIssue.status !== "rejected" && (
                                <p className="text-sm text-gray-600">
                                  {remainingDays > 0
                                    ? `${remainingDays} days remaining`
                                    : "Due soon"}
                                </p>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium"
                >
                  Close
                </button>
                <div className="flex gap-3">
                  {selectedIssue.workflow === "resolved" && (
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                      Issue Resolved ✓
                    </button>
                  )}
                  {selectedIssue.status === "rejected" && (
                    <button className="px-6 py-2 bg-red-100 text-red-700 rounded-lg font-medium">
                      Issue Rejected
                    </button>
                  )}
                  {selectedIssue.status !== "rejected" &&
                    selectedIssue.workflow !== "resolved" && (
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                        Update Status
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TrackIssue;
