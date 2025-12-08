import React from "react";
import {
  FaUser,
  FaUsers,
  FaHandshake,
  FaQuoteLeft,
  FaStar,
  FaArrowRight,
  FaBuilding,
  FaCogs,
  FaRocket,
  FaCode,
  FaShareAlt,
  FaLightbulb,
} from "react-icons/fa";

// ========== CENTRAL DIAGRAM COMPONENT ==========
const CentralDiagram = () => {
  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
      {/* Background Dotted Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        viewBox="0 0 400 400"
      >
        <pattern
          id="dot-pattern"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="2"
            cy="2"
            r="2"
            className="text-gray-600"
            fill="currentColor"
          />
        </pattern>
        <circle cx="200" cy="200" r="150" fill="url(#dot-pattern)" />
      </svg>

      {/* Crosshairs */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-full h-[1px] bg-gray-500 absolute"></div>
        <div className="h-full w-[1px] bg-gray-500 absolute"></div>
      </div>

      {/* Main Flow Lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrow"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L6,3 L0,6" fill="currentColor" />
          </marker>
        </defs>

        {/* Flow paths */}
        <path
          d="M 60 200 A 140 140 0 0 1 200 60"
          markerEnd="url(#arrow)"
          strokeDasharray="5, 0"
          className="opacity-90 text-accent"
        />
        <path
          d="M 210 60 A 140 140 0 0 1 340 190"
          markerEnd="url(#arrow)"
          className="text-accent"
        />
        <path
          d="M 330 220 A 40 40 0 1 1 300 250"
          markerEnd="url(#arrow)"
          strokeWidth="1.5"
          className="opacity-80 text-accent"
        />
        <path d="M 335 210 A 140 140 0 0 1 210 340" className="text-accent" />
        <path
          d="M 190 340 A 140 140 0 0 1 60 210"
          markerEnd="url(#arrow)"
          className="text-accent"
        />

        {/* Dashed connection lines */}
        <line
          x1="120"
          y1="120"
          x2="100"
          y2="100"
          strokeWidth="1"
          strokeDasharray="4 2"
          className="text-blue-300"
        />
        <path
          d="M 260 80 Q 280 80 300 100"
          strokeWidth="1"
          strokeDasharray="4 2"
          fill="none"
          className="text-blue-300"
        />
      </svg>

      {/* ========== DIAGRAM LABELS & ICONS ========== */}

      {/* Left: CDS Technologists */}
      <div className="absolute top-[22%] left-[12%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2 border-2 border-blue-300">
          <FaUser className="w-6 h-6 text-accent" />
        </div>
        <span className="text-[10px] uppercase font-semibold tracking-wider text-center max-w-[100px] leading-tight text-gray-700">
          CDS
          <br />
          Technologists{" "}
          <FaArrowRight className="inline-block ml-1 text-accent w-3 h-3" />
        </span>
      </div>

      {/* Top Right: Congressional Members */}
      <div className="absolute top-[18%] right-[8%] transform translate-x-1/4 -translate-y-1/2 flex flex-col items-start space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-right w-24 leading-tight text-gray-700">
            Congressional
            <br />
            Members & Staff
          </span>
          <FaArrowRight className="text-blue-500 w-3 h-3" />
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-300">
            <FaUsers className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div className="flex items-center space-x-2 translate-x-4">
          <div className="flex flex-col items-end">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-300 mb-1">
              <FaHandshake className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-center leading-tight text-gray-700">
              Collaborators
              <br />& Partners{" "}
              <FaArrowRight className="inline-block ml-1 text-blue-500 w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Middle Right: Problem */}
      <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <span className="text-[10px] uppercase font-bold tracking-wider mb-1 text-gray-600">
          Problem
        </span>
        <div className="bg-red-500 p-3 rounded-full border-2 border-white shadow-md">
          <FaQuoteLeft className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Bottom Right: Iteration */}
      <div className="absolute bottom-[20%] right-[20%] text-center flex flex-col items-center">
        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-600 mb-1">
          Iteration
        </span>
        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-yellow-300">
          <FaCogs className="w-4 h-4 text-yellow-600" />
        </div>
      </div>

      {/* Bottom Center: Solution */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex flex-col items-center z-10">
        <div className="bg-green-500 p-3 rounded-full border-2 border-white shadow-md mb-1">
          <FaStar className="w-8 h-8 text-white" />
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-600">
          Solution
        </span>
      </div>

      {/* Bottom Left: Congress */}
      <div className="absolute bottom-[25%] left-[18%] transform -translate-x-1/2 flex items-center">
        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center border-2 border-purple-300 mr-2">
          <FaBuilding className="w-4 h-4 text-purple-600" />
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-600">
          Congress
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          className="text-gray-500 opacity-70 ml-1"
        >
          <path d="M10 0V20M0 10H20" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
      </div>
    </div>
  );
};

// ========== TEXT BLOCK COMPONENT ==========
const TextBlock = ({
  number,
  title,
  subtitle,
  description,
  alignment,
  icon,
  className,
}) => {
  return (
    <div
      className={`
        flex flex-col 
        ${
          alignment === "right"
            ? "lg:items-end lg:text-right"
            : "lg:items-start lg:text-left"
        } 
        text-center items-center 
        ${className}
      `}
    >
      <div className="relative mb-4">
        {/* Icon and Number */}
        <div className="flex items-center justify-center mb-3">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent-100 to-accent-50 flex items-center justify-center border-2 border-blue-200 shadow-sm">
              {icon}
            </div>
            <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-text1 text-white flex items-center justify-center text-sm font-bold border-2 border-white">
              {number}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide mb-2">
          {title}
        </h3>
      </div>
      <h4 className="text-base font-semibold text-gray-700 mb-4 max-w-xs leading-relaxed">
        {subtitle}
      </h4>
      <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
        {description}
      </p>
    </div>
  );
};

// ========== MAIN COMPONENT ==========
const HowItWorks = () => {
  // Customize your steps here
  const leftSteps = [
    {
      number: "1",
      title: "Launch",
      subtitle: "We're here to rebuild congress",
      description:
        "The tech systems used in Congress are outdated and make staffers' jobs more difficult for no reason. We launched the Congressional Digital Service to start fixing these systems, one by one.",
      icon: <FaRocket className="w-8 h-8 text-accent" />,
    },
    {
      number: "4",
      title: "Distribute",
      subtitle: "Free and available for everyone to use",
      description:
        "We make our solutions available to everyone of Congress. Because we believe sharing open source solutions make things better for everyone.",
      icon: <FaShareAlt className="w-8 h-8 text-accent" />,
    },
  ];

  const rightSteps = [
    {
      number: "2",
      title: "Assembly",
      subtitle: "Expert teams for frustrating problems",
      description:
        "We pull together the best and brightest on the Hill and in tech to figure out what barriers – bureaucratic, technical, or otherwise – we need to address to solve the problem.",
      icon: <FaUsers className="w-8 h-8 text-accent" />,
    },
    {
      number: "3",
      title: "Build",
      subtitle: "Test, and refine a software solution",
      description:
        "Our technologists build new software that fixes the underlying system and makes the solution more usable. We make refinements along the way to ensure our solution is the best it can be.",
      icon: <FaCode className="w-8 h-8 text-accent" />,
    },
  ];

  return (
    <div className="bg-bg4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24 ">
        {/* Section Title */}
        <div className="text-center mb-12 lg:mb-20">
          <div className="inline-flex items-center justify-center mb-4">
            <FaLightbulb className="w-10 h-10 text-warning mr-3" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text uppercase tracking-tight font-nunito">
              How It Works
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our step-by-step process to transform government technology
          </p>
          <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
          {/* Left Column - Steps 1 & 4 */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-16 lg:space-y-32 lg:py-8">
            {leftSteps.map((step, index) => (
              <TextBlock
                key={index}
                number={step.number}
                title={step.title}
                subtitle={step.subtitle}
                description={step.description}
                alignment="left"
                icon={step.icon}
                className={index === 0 ? "lg:mt-8" : ""}
              />
            ))}
          </div>

          {/* Center Column - Diagram */}
          <div className="w-[80%] mx-auto lg:col-span-4 flex items-center justify-center my-8 lg:my-0">
            <CentralDiagram />
          </div>

          {/* Right Column - Steps 2 & 3 */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-16 lg:space-y-32 lg:py-8">
            {rightSteps.map((step, index) => (
              <TextBlock
                key={index}
                number={step.number}
                title={step.title}
                subtitle={step.subtitle}
                description={step.description}
                alignment="right"
                icon={step.icon}
                className={index === 0 ? "lg:mt-8" : ""}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
