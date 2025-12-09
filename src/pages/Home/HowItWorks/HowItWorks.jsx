import React from "react";
import { motion } from "framer-motion";
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
    <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] aspect-square mx-auto flex items-center justify-center">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/5 to-secondary/10 rounded-full blur-xl sm:blur-2xl animate-pulse"></div>

      {/* Background Dotted Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
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
            className="text-accent"
            fill="currentColor"
          />
        </pattern>
        <circle cx="200" cy="200" r="150" fill="url(#dot-pattern)" />
      </svg>

      {/* Animated Ring */}
      <div className="absolute inset-0 border-2 border-accent/30 rounded-full animate-spin-slow"></div>

      {/* Main Flow Lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
            <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
          </marker>
        </defs>

        {/* Animated Flow paths */}
        <motion.path
          d="M 60 200 A 140 140 0 0 1 200 60"
          markerEnd="url(#arrow)"
          strokeDasharray="4, 0"
          className="text-accent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <path
          d="M 210 60 A 140 140 0 0 1 340 190"
          markerEnd="url(#arrow)"
          className="text-primary"
        />
        <motion.path
          d="M 330 220 A 40 40 0 1 1 300 250"
          markerEnd="url(#arrow)"
          strokeWidth="1.2"
          className="text-secondary"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <path d="M 335 210 A 140 140 0 0 1 210 340" className="text-accent" />
        <path
          d="M 190 340 A 140 140 0 0 1 60 210"
          markerEnd="url(#arrow)"
          className="text-primary"
        />

        {/* Dashed connection lines */}
        <line
          x1="120"
          y1="120"
          x2="100"
          y2="100"
          strokeWidth="0.8"
          strokeDasharray="3 2"
          className="text-accent/50"
        />
        <path
          d="M 260 80 Q 280 80 300 100"
          strokeWidth="0.8"
          strokeDasharray="3 2"
          fill="none"
          className="text-primary/50"
        />
      </svg>

      {/* ========== DIAGRAM LABELS & ICONS ========== */}

      {/* Left: CDS Technologists */}
      <motion.div
        className="absolute top-[22%] left-[12%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        whileHover={{ scale: 1.1 }}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-2 sm:mb-3 border-2 sm:border-3 md:border-4 border-white shadow-md sm:shadow-lg">
          <FaUser className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
        </div>
        <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-center max-w-[80px] sm:max-w-[100px] leading-tight text-base-content">
          CDS
          <br />
          Technologists{" "}
          <FaArrowRight className="inline-block ml-1 text-accent w-2 h-2 sm:w-3 sm:h-3" />
        </span>
      </motion.div>

      {/* Top Right: Congressional Members */}
      <div className="absolute top-[18%] right-[8%] transform translate-x-1/4 -translate-y-1/2 flex flex-col items-start space-y-3 sm:space-y-4">
        <motion.div
          className="flex items-center space-x-1 sm:space-x-2"
          whileHover={{ x: 5 }}
        >
          <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-right w-20 sm:w-24 leading-tight text-base-content">
            City
            <br />
            Administrators
          </span>
          <FaArrowRight className="text-primary w-2 h-2 sm:w-3 sm:h-3" />
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center border border-accent/30 sm:border-2 shadow-sm sm:shadow-md">
            <FaUsers className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent" />
          </div>
        </motion.div>
        <motion.div
          className="flex items-center space-x-1 sm:space-x-2 translate-x-3 sm:translate-x-4"
          whileHover={{ x: 5 }}
        >
          <div className="flex flex-col items-end">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30 sm:border-2 shadow-sm sm:shadow-md mb-1 sm:mb-2">
              <FaHandshake className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-center leading-tight text-base-content max-w-[80px]">
              Community
              <br />
              Partners{" "}
              <FaArrowRight className="inline-block ml-1 text-primary w-2 h-2 sm:w-3 sm:h-3" />
            </span>
          </div>
        </motion.div>
      </div>

      {/* Middle Right: Problem */}
      <motion.div
        className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-base-content mb-1 sm:mb-2 bg-red-500/10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-red-200">
          Problem
        </span>
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 sm:p-3 md:p-4 rounded-full border-2 sm:border-3 md:border-4 border-white shadow-lg sm:shadow-xl">
          <FaQuoteLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
        </div>
      </motion.div>

      {/* Bottom Right: Iteration */}
      <motion.div
        className="absolute bottom-[20%] right-[20%] text-center flex flex-col items-center"
        whileHover={{ rotate: 15 }}
      >
        <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-base-content mb-1 sm:mb-2 bg-accent/10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-accent/20">
          Iteration
        </span>
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center border border-accent/30 sm:border-2 shadow-md sm:shadow-lg">
          <FaCogs className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent" />
        </div>
      </motion.div>

      {/* Bottom Center: Solution */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex flex-col items-center z-10"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
      >
        <div className="bg-gradient-to-br from-primary to-primary/80 p-2 sm:p-3 md:p-4 rounded-full border-2 sm:border-3 md:border-4 border-white shadow-xl sm:shadow-2xl mb-1 sm:mb-2">
          <FaStar className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
        </div>
        <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-base-content bg-primary/10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-primary/20">
          Solution
        </span>
      </motion.div>

      {/* Bottom Left: Government */}
      <motion.div
        className="absolute bottom-[25%] left-[18%] transform -translate-x-1/2 flex items-center"
        whileHover={{ scale: 1.05 }}
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-secondary/20 to-purple-600/20 flex items-center justify-center border border-secondary/30 sm:border-2 shadow-sm sm:shadow-md mr-2 sm:mr-3">
          <FaBuilding className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-secondary" />
        </div>
        <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-base-content">
          Government
        </span>
      </motion.div>
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
    <motion.div
      className={`
        flex flex-col 
        ${
          alignment === "right"
            ? "md:items-end md:text-right"
            : "md:items-start md:text-left"
        } 
        text-center items-center 
        ${className}
      `}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative mb-4 sm:mb-6">
        {/* Icon and Number */}
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <div className="relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center border-2 border-accent/20 shadow-lg sm:shadow-xl group-hover:border-accent/40 transition-all duration-300">
              {icon}
            </div>
            <span className="absolute -top-2 -right-2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-accent to-primary text-white flex items-center justify-center text-sm sm:text-base md:text-lg font-bold border-2 sm:border-3 md:border-4 border-base-100 shadow-md sm:shadow-lg">
              {number}
            </span>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-base-content uppercase tracking-wide mb-2 sm:mb-3 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
          {title}
        </h3>
      </div>
      <h4 className="text-base sm:text-lg font-semibold text-base-content mb-3 sm:mb-5 max-w-xs leading-relaxed">
        {subtitle}
      </h4>
      <p className="text-base-content/80 leading-relaxed max-w-xs text-sm sm:text-base">
        {description}
      </p>
    </motion.div>
  );
};

// ========== MAIN COMPONENT ==========
const HowItWorks = () => {
  // Customize your steps here
  const leftSteps = [
    {
      number: "1",
      title: "Report",
      subtitle: "Citizens report public issues instantly",
      description:
        "Residents can easily report broken streetlights, potholes, garbage overflow, or any public issue through our mobile app or website in just a few clicks.",
      icon: (
        <FaRocket className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-accent" />
      ),
    },
    {
      number: "4",
      title: "Resolve",
      subtitle: "Track and verify issue resolution",
      description:
        "Citizens receive notifications when their reported issues are resolved. Government staff can close tickets and provide completion details with photos.",
      icon: (
        <FaShareAlt className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-accent" />
      ),
    },
  ];

  const rightSteps = [
    {
      number: "2",
      title: "Assign",
      subtitle: "Smart routing to responsible departments",
      description:
        "Our AI-powered system automatically routes issues to the appropriate municipal department based on location and issue type for quick resolution.",
      icon: (
        <FaUsers className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />
      ),
    },
    {
      number: "3",
      title: "Track",
      subtitle: "Real-time progress monitoring",
      description:
        "Both citizens and government officials can track issue status in real-time. Automated updates keep everyone informed throughout the resolution process.",
      icon: (
        <FaCode className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-secondary" />
      ),
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-base-100 to-base-200 overflow-hidden">
      {/* Background Elements */}
      <div className="hidden sm:block absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-accent blur-xl sm:blur-2xl md:blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-primary blur-xl sm:blur-2xl md:blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Title */}
        <motion.div
          className="text-center mb-10 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-accent/10 border border-accent/20">
            <FaLightbulb className="text-accent text-lg sm:text-xl md:text-2xl" />
            <span className="text-accent font-bold text-sm sm:text-base md:text-lg">
              Our Process
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              CityFix
            </span>{" "}
            Works
          </h2>

          <p className="text-base-content/70 max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 lg:mb-10 px-2">
            A seamless four-step process that connects citizens with their local
            government to resolve public issues efficiently
          </p>

          <div className="flex justify-center">
            <div className="w-24 sm:w-28 md:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-accent via-primary to-secondary rounded-full"></div>
          </div>
        </motion.div>

        {/* Mobile/Tablet Layout */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Steps 1 & 2 */}
            <div className="space-y-8 sm:space-y-12">
              <TextBlock
                number="1"
                title="Report"
                subtitle="Citizens report public issues instantly"
                description="Residents can easily report broken streetlights, potholes, garbage overflow, or any public issue through our mobile app or website in just a few clicks."
                alignment="left"
                icon={
                  <FaRocket className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-accent" />
                }
              />
              <TextBlock
                number="2"
                title="Assign"
                subtitle="Smart routing to responsible departments"
                description="Our AI-powered system automatically routes issues to the appropriate municipal department based on location and issue type for quick resolution."
                alignment="left"
                icon={
                  <FaUsers className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />
                }
              />
            </div>

            {/* Diagram in Middle on Tablet */}
            <div className="order-first md:order-none flex items-center justify-center my-6 md:my-0">
              <CentralDiagram />
            </div>

            {/* Steps 3 & 4 */}
            <div className="md:col-span-2 lg:col-span-1 space-y-8 sm:space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              <TextBlock
                number="3"
                title="Track"
                subtitle="Real-time progress monitoring"
                description="Both citizens and government officials can track issue status in real-time. Automated updates keep everyone informed throughout the resolution process."
                alignment="right"
                icon={
                  <FaCode className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-secondary" />
                }
              />
              <TextBlock
                number="4"
                title="Resolve"
                subtitle="Track and verify issue resolution"
                description="Citizens receive notifications when their reported issues are resolved. Government staff can close tickets and provide completion details with photos."
                alignment="right"
                icon={
                  <FaShareAlt className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-accent" />
                }
              />
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 relative">
          {/* Left Column - Steps 1 & 4 */}
          <motion.div
            className="lg:col-span-4 flex flex-col justify-center space-y-16 lg:space-y-20 xl:space-y-32"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {leftSteps.map((step, index) => (
              <TextBlock
                key={index}
                number={step.number}
                title={step.title}
                subtitle={step.subtitle}
                description={step.description}
                alignment="left"
                icon={step.icon}
              />
            ))}
          </motion.div>

          {/* Center Column - Diagram */}
          <motion.div
            className="lg:col-span-4 flex items-center justify-center my-8 lg:my-0"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <CentralDiagram />
          </motion.div>

          {/* Right Column - Steps 2 & 3 */}
          <motion.div
            className="lg:col-span-4 flex flex-col justify-center space-y-16 lg:space-y-20 xl:space-y-32"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {rightSteps.map((step, index) => (
              <TextBlock
                key={index}
                number={step.number}
                title={step.title}
                subtitle={step.subtitle}
                description={step.description}
                alignment="right"
                icon={step.icon}
              />
            ))}
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          className="mt-12 sm:mt-16 lg:mt-20 xl:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {[
            { value: "24h", label: "Avg. Response Time", icon: "⚡" },
            { value: "95%", label: "Resolution Rate", icon: "✅" },
            { value: "10K+", label: "Issues Resolved", icon: "🏙️" },
            { value: "4.8★", label: "User Rating", icon: "⭐" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-2 rounded-xl sm:rounded-2xl bg-base-100/50 backdrop-blur-sm border border-base-300 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-1 sm:mb-2">
                {stat.value}
              </div>
              <p className="text-base-content/70 text-xs sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
