import React from "react";
import IssueCard from "./IssueCard";

const IssueContainer = () => {
  return (
    <div className="container mx-auto px-4 py-8">
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

      {/* Issues Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-15">
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
      </div>
    </div>
  );
};

export default IssueContainer;
