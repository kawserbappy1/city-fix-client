const IssueCardSkeleton = () => {
  return (
    // Mimics the main issue card container
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      {/* Image Placeholder */}
      <div className="h-48 bg-gray-200 animate-pulse relative">
        {/* Priority Badge Placeholder */}
        <div className="absolute top-3 left-3 w-20 h-5 bg-gray-300 rounded-full"></div>
        {/* Status Badge Placeholder */}
        <div className="absolute top-3 right-3 w-16 h-5 bg-gray-300 rounded-full"></div>
      </div>

      {/* Content Placeholder */}
      <div className="p-5">
        {/* Category Placeholder */}
        <div className="mb-3">
          <div className="inline-block w-24 h-6 bg-blue-100 rounded-full animate-pulse"></div>
        </div>

        {/* Title Placeholder (Line 1) */}
        <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
        {/* Title Placeholder (Line 2) */}
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse"></div>

        {/* Description Placeholder (Line 1) */}
        <div className="h-3 bg-gray-100 rounded w-full mb-1 animate-pulse"></div>
        {/* Description Placeholder (Line 2) */}
        <div className="h-3 bg-gray-100 rounded w-4/5 mb-4 animate-pulse"></div>

        {/* Meta Info Placeholder (Location/Votes) */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-3 bg-blue-100 rounded-full w-16 animate-pulse"></div>
        </div>

        {/* Meta Info Placeholder (Posted By/Time) */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="h-3 bg-gray-200 rounded w-28 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>

        {/* Action Bar Placeholder */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Upvotes Button Placeholder */}
          <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
          {/* View Details Button Placeholder */}
          <div className="h-10 w-28 bg-blue-600/50 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default IssueCardSkeleton;
