import {
  FaMapMarkerAlt,
  FaComment,
  FaShareAlt,
  FaExclamationTriangle,
  FaUserTie,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatRelativeTime } from "../../../Utilities/formatDate";
import { LuMapPin } from "react-icons/lu";
import { FiThumbsUp } from "react-icons/fi";
import { Link } from "react-router";

const IssueCard = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/resolved-issue`);
      return res.data;
    },
  });
  const handleUpvote = async (id) => {
    await axiosSecure.patch(`/issues/upvote/${id}`);
    queryClient.invalidateQueries(["issues"]);
  };
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {issues.map((issue) => (
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
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {issue.category}
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
  );
};

export default IssueCard;
