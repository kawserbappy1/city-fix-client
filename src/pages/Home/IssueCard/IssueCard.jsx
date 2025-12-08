import { FaThumbsUp } from "react-icons/fa";
import issue from "../../../assets/issue1.jpg";
import { MdOutlineEditLocationAlt } from "react-icons/md";
import { BiUpvote } from "react-icons/bi";
const IssueCard = () => {
  return (
    <div className="card bg-bg4 shadow-md transition-all duration-300 ">
      {/* Image */}
      <figure className="h-48 overflow-hidden">
        <img
          src={issue}
          alt="Issue Preview"
          className="w-full object-cover transition-all duration-500 hover:scale-110"
        />
      </figure>

      <div className="card-body space-y-2">
        {/* Title */}
        <h2 className="card-title text-lg  text-text2 font-nunito font-bold">
          Broken Streetlight on Main Road
        </h2>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="badge bg-bg10 rounded-full text-text1 text-sm">
            Streetlights
          </span>
          <span className="badge bg-warning rounded-full">Pending</span>
          <span className="badge badge-outline rounded-full">Normal</span>
        </div>

        {/* Location */}
        <p className="flex gap-2 items-center text-sm text-gray-600">
          <MdOutlineEditLocationAlt size={20} />{" "}
          <span className="font-medium">Central Avenue, Dhaka</span>
        </p>

        {/* Upvotes + Posted Info */}
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-1 text-accent">
            {/* <FaThumbsUp /> 12 */}
            <BiUpvote /> 12
          </span>

          <p className="text-xs text-gray-500 text-end">
            Posted by: <span className="font-semibold">Reza</span> • 5 days ago
          </p>
        </div>

        {/* View button */}
        <button className="btn btn-sm btn-accent mt-3 text-text">
          View Details
        </button>
      </div>
    </div>
  );
};

export default IssueCard;
