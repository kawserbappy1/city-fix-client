import {
  FaMapMarkerAlt,
  FaEye,
  FaComment,
  FaShareAlt,
  FaFire,
  FaUser,
  FaCalendarAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import { motion } from "framer-motion";

const IssueCard = () => {
  return (
    <motion.div
      className={`card  border shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden rounded-xl`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      viewport={{ once: true }}
    >
      {/* Image Container */}
      <figure className="relative h-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Broken Streetlight"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Priority Badge */}
        <div className="absolute top-3 left-3 z-20">
          <div className={`badge badge-sm font-bold gap-1`}>
            <FaExclamationTriangle className="text-xs" />
          </div>
        </div>
      </figure>

      {/* Content */}
      <div className="card-body p-4 space-y-3">
        {/* Title */}
        <h2 className="card-title text-base font-bold text-base-content">
          Broken Streetlight on Main Road
        </h2>

        {/* Description */}
        <p className="text-base-content/70 text-xs leading-relaxed line-clamp-2">
          Streetlight not working for past 3 days, causing safety concerns for
          pedestrians.
        </p>

        {/* Location */}
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-accent text-xs" />
          <span className="text-xs text-base-content/80">
            Central Avenue, Dhaka
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <BiUpvote className="text-primary text-xs" />
              </div>
              <span className="font-bold text-base-content">42</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center">
                <FaComment className="text-secondary text-xs" />
              </div>
              <span className="font-bold text-base-content">15</span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-base-content/60">Posted by</p>
            <p className="font-medium text-base-content text-xs">Reza Ahmed</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-base-content">Progress</span>
            <span className={`text-xs font-bold `}>65%</span>
          </div>
          <div className="w-full bg-base-300 rounded-full h-1">
            <motion.div
              className={`bg-gradient-to-r  h-1 rounded-full`}
              initial={{ width: 0 }}
              whileInView={{ width: "65%" }}
              transition={{ duration: 1 }}
            ></motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <motion.button
            className="btn btn-primary btn-xs flex-1 gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BiUpvote />
            Upvote
          </motion.button>

          <motion.button
            className="btn btn-outline btn-accent btn-xs flex-1 gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShareAlt />
            Share
          </motion.button>
        </div>

        <div className="">
          <button className="btn  bg-gradient-to-r from-blue-600 to-emerald-600 text-white w-full">
            View More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default IssueCard;
