import React from "react";
import IssueCard from "./IssueCard";

const IssueContainer = () => {
  return (
    <div className="container mx-auto pt-16 px-4">
      {/* Header with Gradient */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary font-nunito">
            Resolve Issues
          </span>
        </h1>
        <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
          Help improve your community by addressing reported problems
        </p>
      </div>
    </div>
  );
};

export default IssueContainer;
