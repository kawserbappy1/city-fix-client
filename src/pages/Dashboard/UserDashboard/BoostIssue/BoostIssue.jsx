// components/BoostIssue.jsx
import { useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiZap,
  FiArrowUp,
} from "react-icons/fi";
import { MdOutlinePriorityHigh, MdOutlineTimer } from "react-icons/md";
import { GiRapidshareArrow } from "react-icons/gi";
import { TbBrandSpeedtest } from "react-icons/tb";

const BoostIssue = () => {
  // ============ STATE ============
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [isBoosting, setIsBoosting] = useState(false);

  // ============ DEMO DATA ============
  const demoIssues = [
    {
      id: 1,
      issueName: "Major Pothole on Main Road",
      issueImage:
        "https://images.unsplash.com/photo-1558980395-2f4bb8a6b4bc?w=400&h=300&fit=crop",
      priority: "Medium",
      approvedAt: "2024-01-15T10:30:00Z",
      status: "approved",
      category: "Road Repair",
      district: "Dhaka",
      upvotes: 42,
      workflow: "waiting",
      boostAvailable: true,
    },
    {
      id: 2,
      issueName: "Broken Street Light - Night Safety Issue",
      issueImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      priority: "High",
      approvedAt: "2024-01-14T14:20:00Z",
      status: "approved",
      category: "Electrical",
      district: "Chittagong",
      upvotes: 78,
      workflow: "in-progress",
      boostAvailable: true,
    },
    {
      id: 3,
      issueName: "Garbage Accumulation in Public Park",
      issueImage:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w-400&h=300&fit=crop",
      priority: "Low",
      approvedAt: "2024-01-13T09:15:00Z",
      status: "approved",
      category: "Sanitation",
      district: "Sylhet",
      upvotes: 25,
      workflow: "waiting",
      boostAvailable: true,
    },
    {
      id: 4,
      issueName: "Water Pipeline Leak in Residential Area",
      issueImage:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      priority: "Critical",
      approvedAt: "2024-01-12T11:45:00Z",
      status: "approved",
      category: "Water Supply",
      district: "Rajshahi",
      upvotes: 96,
      workflow: "working",
      boostAvailable: false, // Already boosted
    },
    {
      id: 5,
      issueName: "Damaged Playground Equipment",
      issueImage:
        "https://images.unsplash.com/photo-1533237264987-ae43347c5c8b?w=400&h=300&fit=crop",
      priority: "Medium",
      approvedAt: "2024-01-11T16:30:00Z",
      status: "approved",
      category: "Public Facilities",
      district: "Khulna",
      upvotes: 31,
      workflow: "waiting",
      boostAvailable: true,
    },
    {
      id: 6,
      issueName: "Illegal Parking Blocking Ambulance Route",
      issueImage:
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&fit=crop",
      priority: "High",
      approvedAt: "2024-01-10T13:10:00Z",
      status: "approved",
      category: "Traffic",
      district: "Dhaka",
      upvotes: 112,
      workflow: "in-progress",
      boostAvailable: true,
    },
  ];

  // ============ FORMAT DATE ============
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ============ GET STATUS COLOR ============
  const getStatusColor = (workflow) => {
    switch (workflow?.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-800 border border-green-200";
      case "working":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "in-progress":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      case "waiting":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // ============ GET STATUS TEXT ============
  const getStatusText = (workflow) => {
    switch (workflow?.toLowerCase()) {
      case "resolved":
        return "Resolved";
      case "working":
        return "In Progress";
      case "in-progress":
        return "Assigned";
      case "waiting":
        return "Waiting";
      default:
        return "Pending";
    }
  };

  // ============ GET PRIORITY COLOR ============
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // ============ HANDLE BOOST CLICK ============
  const handleBoostClick = (issue) => {
    setSelectedIssue(issue);
    setShowBoostModal(true);
  };

  // ============ HANDLE BOOST CONFIRMATION ============
  const handleBoostConfirm = () => {
    if (!selectedIssue) return;

    setIsBoosting(true);

    // Simulate API call
    setTimeout(() => {
      setIsBoosting(false);
      setShowBoostModal(false);
      setSelectedIssue(null);

      // Show success message
      alert(
        `Issue "${selectedIssue.issueName}" has been boosted successfully! It will now be prioritized.`
      );

      // Update the issue's boost status in demo data
      // In real app, you would update the database
    }, 1500);
  };

  // ============ STATS CALCULATION ============
  const stats = {
    totalIssues: demoIssues.length,
    boostableIssues: demoIssues.filter((issue) => issue.boostAvailable).length,
    boostedIssues: demoIssues.filter((issue) => !issue.boostAvailable).length,
    avgResolutionTime: "3.2 days",
  };

  return (
    <div className="p-4 md:p-6">
      {/* ============ HEADER ============ */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <FiZap className="text-yellow-500" />
              Boost Issue
            </h1>
            <p className="text-gray-600">
              Prioritize your issues for faster resolution
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-semibold">
            <TbBrandSpeedtest className="w-5 h-5" />
            <span>Fast Track Service</span>
          </div>
        </div>

        {/* ============ PROMO CARD ============ */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <GiRapidshareArrow className="w-6 h-6" />
                Boost Your Issue - Get High Priority!
              </h2>
              <p className="text-blue-100 mb-4">
                Give your issue priority attention and get it solved within 3
                days
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <MdOutlinePriorityHigh className="w-5 h-5" />
                  <span className="font-semibold">High Priority</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineTimer className="w-5 h-5" />
                  <span className="font-semibold">3-Day Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiDollarSign className="w-5 h-5" />
                  <span className="font-semibold">Only 100 Taka</span>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">100৳</div>
              <div className="text-sm">per boost</div>
              <div className="text-xs mt-2 text-blue-100">One-time payment</div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ STATS CARDS ============ */}
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
              <FiAlertCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Boost Available</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.boostableIssues}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <FiZap className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Already Boosted</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.boostedIssues}
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
              <p className="text-sm text-gray-600">Avg. Resolution</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.avgResolutionTime}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <FiClock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* ============ BENEFITS SECTION ============ */}
      <div className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FiArrowUp className="text-green-600" />
          Why Boost Your Issue?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-800">Top Priority</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Your issue moves to the top of the queue and gets immediate
              attention
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-800">3-Day Guarantee</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Get your issue resolved within 3 working days or get your money
              back
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-800">Dedicated Support</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Receive regular updates and priority support from our best
              technicians
            </p>
          </div>
        </div>
      </div>

      {/* ============ ISSUES TABLE ============ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Your Approved Issues
          </h3>
          <p className="text-gray-600">
            Select an issue to boost for faster resolution
          </p>
        </div>

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
                  Approved At
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Upvotes
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {demoIssues.map((issue, index) => (
                <tr
                  key={issue.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-gray-700 font-medium">
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-16 h-12 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={issue.issueImage}
                        alt={issue.issueName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {issue.issueName}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
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
                    <div className="text-gray-700 text-sm">
                      {formatDate(issue.approvedAt)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        issue.workflow
                      )}`}
                    >
                      {getStatusText(issue.workflow)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-gray-700">
                      <FiArrowUp className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{issue.upvotes}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleBoostClick(issue)}
                      disabled={!issue.boostAvailable}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                        issue.boostAvailable
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow hover:shadow-md"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <FiZap className="w-4 h-4" />
                      {issue.boostAvailable ? "Boost Now" : "Already Boosted"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {demoIssues.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Issues Available for Boosting
            </h3>
            <p className="text-gray-600">
              You don't have any approved issues to boost at the moment
            </p>
          </div>
        )}
      </div>

      {/* ============ BOOST CONFIRMATION MODAL ============ */}
      {showBoostModal && selectedIssue && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowBoostModal(false)}
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FiZap className="text-yellow-500" />
                    Boost This Issue
                  </h3>
                  <button
                    onClick={() => setShowBoostModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Issue Preview */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-12 rounded overflow-hidden">
                      <img
                        src={selectedIssue.issueImage}
                        alt={selectedIssue.issueName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {selectedIssue.issueName}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedIssue.category} • {selectedIssue.district}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    What you'll get:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span>High priority in the queue</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span>Guaranteed resolution within 3 days</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span>Dedicated support team</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span>Regular progress updates</span>
                    </li>
                  </ul>
                </div>

                {/* Price */}
                <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Boost Fee</p>
                      <p className="text-2xl font-bold text-gray-800">
                        100৳{" "}
                        <span className="text-sm font-normal text-gray-500">
                          (One-time)
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Savings</p>
                      <p className="text-lg font-bold text-green-600">
                        50% off regular priority
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowBoostModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                    disabled={isBoosting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBoostConfirm}
                    disabled={isBoosting}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isBoosting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiDollarSign className="w-5 h-5" />
                        Pay 100৳ & Boost
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-3">
                  By boosting, you agree to our terms of service
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ============ FOOTER INFO ============ */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          How Boosting Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold text-xl">1</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Select Issue</h4>
            <p className="text-gray-600 text-sm">
              Choose an approved issue from your list that needs priority
              attention
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 font-bold text-xl">2</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Make Payment</h4>
            <p className="text-gray-600 text-sm">
              Pay 100 Taka through our secure payment gateway
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 font-bold text-xl">3</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Get Priority</h4>
            <p className="text-gray-600 text-sm">
              Your issue gets prioritized and will be resolved within 3 working
              days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostIssue;
