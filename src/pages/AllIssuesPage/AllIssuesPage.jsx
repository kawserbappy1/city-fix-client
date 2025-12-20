import {
  FiFilter,
  FiThumbsUp,
  FiAlertCircle,
  FiChevronDown,
} from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatRelativeTime } from "../../Utilities/formatDate";
import { Link } from "react-router";
import IssueCardSkeleton from "../../components/IssueCardSkeleton";
import { useState } from "react"; // Add useState import

const AllIssuesPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Add state for filters
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/approve-issues`);
      return res.data;
    },
  });

  const handleUpvote = async (id) => {
    await axiosSecure.patch(`/issues/upvote/${id}`);
    queryClient.invalidateQueries(["issues"]);
  };

  // Extract unique categories from issues
  const categories = ["All", ...new Set(issues.map((issue) => issue.category))];

  // Filter and sort issues
  const filteredIssues = issues
    .filter((issue) => {
      // Filter by category
      const matchesCategory =
        selectedCategory === "All" || issue.category === selectedCategory;

      // Filter by priority
      const matchesPriority =
        selectedPriority === "All" || issue.priority === selectedPriority;

      return matchesCategory && matchesPriority;
    })
    .sort((a, b) => {
      // Sort logic
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "upvotes") {
        return (b.upvotes || 0) - (a.upvotes || 0);
      } else if (sortBy === "priority") {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return (
          (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
        );
      }
      return 0;
    });

  // Show skeleton loader while loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        {/* Banner Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative h-48 md:h-56 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                All Issues
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                Browse through community-reported issues and contribute to
                making our city better
              </p>
            </div>
          </div>
        </div>

        {/* Stats and Filter Section Skeleton */}
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Total Issues Skeleton */}
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FiAlertCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="h-7 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <p className="text-gray-600 mt-1">Total Issues Reported</p>
                </div>
              </div>

              {/* Filters Skeleton */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-48 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-48 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Main Content - Two Column Layout Skeleton */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Categories Skeleton */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-6 w-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Issue Cards Skeleton Grid */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Show 6 skeleton cards */}
                {Array.from({ length: 6 }).map((_, index) => (
                  <IssueCardSkeleton key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      {/* Banner Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative h-48 md:h-56 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              All Issues
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Browse through community-reported issues and contribute to making
              our city better
            </p>
          </div>
        </div>
      </div>

      {/* Stats and Filter Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Total Issues */}
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiAlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {filteredIssues.length}
                </h3>
                <p className="text-gray-600">Total Issues Reported</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Priority Filter */}
              <div className="relative">
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full sm:w-48 appearance-none bg-gray-50 border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All Priorities</option>
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-48 appearance-none bg-gray-50 border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="upvotes">Most Upvoted</option>
                  <option value="priority">Priority Level</option>
                </select>
                <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedPriority("All");
                  setSortBy("newest");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <FiFilter className="w-5 h-5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Categories */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Categories</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Filter issues by category
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                {/* All Categories Option */}
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    selectedCategory === "All"
                      ? "bg-blue-50 border-l-4 border-l-blue-500"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FiAlertCircle className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">
                        All Issues
                      </span>
                      <p className="text-sm text-gray-500">
                        View all categories
                      </p>
                    </div>
                  </div>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {issues.length}
                  </span>
                </button>

                {/* Dynamic Category Options */}
                {categories
                  .filter((category) => category !== "All")
                  .map((category, index) => {
                    const categoryCount = issues.filter(
                      (issue) => issue.category === category
                    ).length;

                    // Get category icon (you can customize this based on your categories)
                    const getCategoryIcon = (cat) => {
                      switch (cat?.toLowerCase()) {
                        case "road":
                        case "transportation":
                          return "🚧";
                        case "electricity":
                        case "power":
                          return "⚡";
                        case "water":
                        case "sanitation":
                          return "💧";
                        case "health":
                        case "medical":
                          return "🏥";
                        case "education":
                          return "📚";
                        case "environment":
                          return "🌳";
                        default:
                          return "📍";
                      }
                    };

                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                          selectedCategory === category
                            ? "bg-blue-50 border-l-4 border-l-blue-500"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
                            {getCategoryIcon(category)}
                          </div>
                          <div>
                            <span className="font-medium text-gray-800">
                              {category}
                            </span>
                            <p className="text-sm text-gray-500">
                              {categoryCount} issue
                              {categoryCount !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedCategory === category
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {categoryCount}
                        </span>
                      </button>
                    );
                  })}
              </div>

              {/* Selected Filters Info */}
              {(selectedCategory !== "All" || selectedPriority !== "All") && (
                <div className="p-4 border-t border-gray-200 bg-blue-50">
                  <h3 className="font-medium text-gray-800 mb-2">
                    Active Filters:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== "All" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        Category: {selectedCategory}
                        <button
                          onClick={() => setSelectedCategory("All")}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {selectedPriority !== "All" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        Priority: {selectedPriority}
                        <button
                          onClick={() => setSelectedPriority("All")}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Content - Issue Cards */}
          <div className="lg:w-3/4">
            {/* Filter Info */}
            {(selectedCategory !== "All" ||
              selectedPriority !== "All" ||
              sortBy !== "newest") && (
              <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Showing {filteredIssues.length} issue
                      {filteredIssues.length !== 1 ? "s" : ""}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory !== "All" && (
                        <span className="text-sm text-blue-700 bg-blue-100 px-2 py-1 rounded">
                          Category: {selectedCategory}
                        </span>
                      )}
                      {selectedPriority !== "All" && (
                        <span className="text-sm text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                          Priority: {selectedPriority}
                        </span>
                      )}
                      {sortBy !== "newest" && (
                        <span className="text-sm text-purple-700 bg-purple-100 px-2 py-1 rounded">
                          Sorted by: {sortBy}
                        </span>
                      )}
                    </div>
                  </div>
                  {filteredIssues.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600">
                        {Math.round(
                          (filteredIssues.length / issues.length) * 100
                        )}
                        %
                      </span>{" "}
                      of total issues
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Issue Cards Grid */}
            {filteredIssues.length === 0 ? (
              <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
                <FiAlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Issues Found
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedCategory !== "All" || selectedPriority !== "All"
                    ? "Try changing your filter criteria"
                    : "No issues have been reported yet"}
                </p>
                {(selectedCategory !== "All" || selectedPriority !== "All") && (
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedPriority("All");
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue._id}
                    className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Issue Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={issue.issueImageURL}
                        alt={issue.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {/* Priority Badge */}
                      <div
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                          issue.priority === "High"
                            ? "bg-red-600"
                            : issue.priority === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-600"
                        }`}
                      >
                        {issue.priority} Priority
                      </div>
                      {/* Status Badge */}
                      <div
                        className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                          issue.status === "Resolved"
                            ? "bg-green-100 text-green-800"
                            : issue.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {issue.workflow}
                      </div>
                    </div>

                    {/* Issue Content */}
                    <div className="p-5">
                      {/* Category */}
                      <div className="mb-3 flex justify-between items-center">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {issue.category}
                        </span>
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {issue.boostStatus}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                        {issue.issueName}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {issue.description}
                      </p>

                      {/* Meta Info */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-500 gap-2">
                          <div className="flex items-center gap-2">
                            <LuMapPin />
                            {issue.district}
                          </div>
                          <div className="bg-blue-100 text-blue-700 rounded-full text-xs p-1">
                            <span>{issue.upvotes || 0} votes</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-2">
                            <FaUserTie />
                            {issue.postedBy}
                          </div>
                          <div>{formatRelativeTime(issue.createdAt)}</div>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        {/* Upvotes */}
                        <button
                          onClick={() => handleUpvote(issue._id)}
                          className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <FiThumbsUp className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-gray-800">
                            {issue.upvotes || 0}
                          </span>
                          <span className="text-gray-600">Upvotes</span>
                        </button>

                        {/* View Details */}
                        <Link
                          to={`/issue-details/${issue._id}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllIssuesPage;
