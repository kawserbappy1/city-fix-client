import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center z-50">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Loader Container */}
      <div className="relative z-10">
        {/* Orbital Rings */}
        <div className="relative w-64 h-64">
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-blue-400 border-r-purple-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Middle Ring */}
          <motion.div
            className="absolute inset-8 border-4 border-transparent border-t-pink-400 border-b-cyan-400 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner Ring */}
          <motion.div
            className="absolute inset-16 border-4 border-transparent border-l-yellow-400 border-r-emerald-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating Bubbles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400"
              style={{
                left: `${50 + 40 * Math.cos((i * Math.PI) / 3)}%`,
                top: `${50 + 40 * Math.sin((i * Math.PI) / 3)}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}

          {/* Center Sphere */}
          <motion.div
            className="absolute inset-24 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(34, 211, 238, 0.5)",
                "0 0 40px rgba(168, 85, 247, 0.7)",
                "0 0 20px rgba(34, 211, 238, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <motion.div
              className="w-12 h-12 bg-white/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        {/* Loading Text with Typing Effect */}
        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
          >
            Loading
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ...
            </motion.span>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Subtext */}
          <motion.p
            className="text-gray-300 mt-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.3 }}
          >
            Preparing your experience
          </motion.p>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-purple-500/10" />
    </div>
  );
};

export default Loader;
