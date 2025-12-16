import React from "react";
import {
  FiUser,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCalendar,
  FiMessageSquare,
  FiFlag,
  FiClock,
} from "react-icons/fi";

const IssueDetails = () => {
  // Sample data - replace with your actual data from API
  const issue = {
    issueName: "Kasper Cook with culbart area",
    category: "Parks & Green Spaces",
    postedBy: "Md. Kawser Hamid",
    email: "bappydu2015@gmail.com",
    division: "Chattogram",
    district: "Cumilla",
    upazila: "Laksam",
    priority: "High",
    phoneNumber: "01520090603",
    address: "245.surjasen hall, university of Dhaka",
    description:
      "Self-Healing Pavements: These materials contain microcapsules filled with asphalt-repair agents. When cracks form, the capsules break open, releasing the healing agents that fill and seal the cracks automatically.",
    issueImageURL: "https://i.ibb.co/CLYx6Lh/blog2.jpg",
    status: "approved",
    createdAt: "2025-12-15T20:26:38.060+00:00",
    approvedAt: "2025-12-15T21:34:19.765+00:00",
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get priority badge color
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>Home</li>
            <li className="text-gray-400">›</li>
            <li>Issues</li>
            <li className="text-gray-400">›</li>
            <li className="text-blue-600 font-medium">{issue.issueName}</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:w-2/3">
            {/* Issue Image */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              <div className="relative h-64 sm:h-80 md:h-96">
                <img
                  src={issue.issueImageURL}
                  alt={issue.issueName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${getPriorityColor(
                      issue.priority
                    )}`}
                  >
                    {issue.priority} Priority
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold border border-blue-100">
                    {issue.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Issue Description Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {issue.issueName}
                </h1>
                <span className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm font-semibold border border-green-100">
                  {issue.status}
                </span>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {issue.description}
                </p>
              </div>

              {/* Location Details */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiMapPin className="text-blue-500" />
                  Location Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Division</p>
                    <p className="font-medium text-gray-800">
                      {issue.division}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">District</p>
                    <p className="font-medium text-gray-800">
                      {issue.district}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Upazila</p>
                    <p className="font-medium text-gray-800">{issue.upazila}</p>
                  </div>
                </div>
                {issue.address && (
                  <div className="mt-4 bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">
                      Complete Address
                    </p>
                    <p className="font-medium text-gray-800">{issue.address}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FiMessageSquare className="text-blue-500" />
                  Comments & Discussions
                </h2>
                <span className="text-sm text-gray-500">24 comments</span>
              </div>

              {/* Add Comment */}
              <div className="mb-8">
                <textarea
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="4"
                  placeholder="Add your comment or suggestion..."
                ></textarea>
                <div className="flex justify-end mt-3">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Post Comment
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {/* Sample Comment 1 */}
                <div className="border border-gray-100 rounded-xl p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-blue-600">JS</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-800">
                          John Smith
                        </h4>
                        <span className="text-sm text-gray-500">
                          2 hours ago
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">
                        This is a great initiative! The location is perfect for
                        such development.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sample Comment 2 */}
                <div className="border border-gray-100 rounded-xl p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-green-600">ES</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-800">
                          Emma Stone
                        </h4>
                        <span className="text-sm text-gray-500">1 day ago</span>
                      </div>
                      <p className="text-gray-600 mt-2">
                        I've seen similar issues in my area. Would love to
                        collaborate on this project.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:w-1/3">
            {/* Posted By Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiUser className="text-blue-500" />
                Posted By
              </h3>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {issue.postedBy
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    {issue.postedBy}
                  </h4>
                  <p className="text-gray-600 text-sm">Issue Reporter</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FiMail className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">{issue.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <FiPhone className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-800">
                      {issue.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FiClock className="text-blue-500" />
                Timeline
              </h3>

              <div className="space-y-6">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-3 h-3 bg-green-500 rounded-full border-4 border-white"></div>
                  <p className="text-sm text-gray-500">Issue Created</p>
                  <p className="font-medium text-gray-800">
                    {formatDate(issue.createdAt)}
                  </p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-3 h-3 bg-blue-500 rounded-full border-4 border-white"></div>
                  <p className="text-sm text-gray-500">Approved</p>
                  <p className="font-medium text-gray-800">
                    {formatDate(issue.approvedAt)}
                  </p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-3 h-3 bg-yellow-500 rounded-full border-4 border-white"></div>
                  <p className="text-sm text-gray-500">Estimated Resolution</p>
                  <p className="font-medium text-gray-800">Within 7-10 days</p>
                </div>
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FiFlag className="text-blue-500" />
                Quick Actions
              </h3>

              <div className="space-y-3">
                <button className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                  Upvote Issue
                </button>
                <button className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium">
                  Share Issue
                </button>
                <button className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                  Report Issue
                </button>
                <button className="w-full py-3 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-colors font-medium">
                  Volunteer Help
                </button>
              </div>

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-xl">
                    <p className="text-2xl font-bold text-blue-600">245</p>
                    <p className="text-sm text-gray-600">Upvotes</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-xl">
                    <p className="text-2xl font-bold text-green-600">12</p>
                    <p className="text-sm text-gray-600">Volunteers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
