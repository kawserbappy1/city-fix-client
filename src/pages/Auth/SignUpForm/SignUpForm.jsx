import React, { useState } from "react";
import {
  FaUser,
  FaCamera,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaUpload,
} from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 p-4 pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
      >
        {/* Decorative Corner Elements */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-blue-500 rounded-tl-lg"></div>
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-emerald-500 rounded-tr-lg"></div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-cyan-500 rounded-bl-lg"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-blue-500 rounded-br-lg"></div>

        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <FaUser className="text-white text-3xl" />
          </motion.div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-600 mt-3">Join our community today!</p>
        </div>

        {/* Form */}
        <form className="space-y-8">
          {/* Profile Image Upload */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="w-full h-full flex items-center justify-center">
                  <FaUser className="text-gray-400 text-5xl" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-emerald-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <FaCamera className="text-white text-xl" />
              </div>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
            </div>
            <div className="mt-4 flex items-center space-x-2 text-blue-600">
              <FaUpload className="text-sm" />
              <span className="text-sm font-medium">
                Upload Profile Picture
              </span>
            </div>
          </motion.div>

          {/* Name Field */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <FaUser />
            </div>
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md placeholder-gray-400"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full opacity-60"></div>
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative group"
          >
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <FaEnvelope />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md placeholder-gray-400"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <motion.div
                whileHover={{ rotate: 180 }}
                className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative group"
          >
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <FaLock />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              required
              className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              {showPassword ? (
                <FaEyeSlash className="text-xl" />
              ) : (
                <FaEye className="text-xl" />
              )}
            </button>
          </motion.div>

          {/* Sign Up Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              type="submit"
              className="w-full py-5 px-6 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-emerald-700 transition-all duration-500 transform group"
            >
              <span className="flex items-center justify-center">
                Create Account
                <motion.svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </span>
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="relative flex items-center py-6"
          >
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">
              Or sign up with
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </motion.div>

          {/* Google Sign In Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              type="button"
              className="w-full py-4 px-6 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:border-red-400 hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-3 group"
            >
              <FaGoogle className="text-red-500 text-xl group-hover:scale-110 transition-transform" />
              <span>Sign up with Google</span>
            </button>
          </motion.div>

          {/* Login Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center pt-8 border-t border-gray-100"
          >
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-bold transition-colors inline-flex items-center group"
              >
                Sign in here
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </p>
          </motion.div>
        </form>

        {/* Terms and Conditions */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center text-gray-500 text-xs mt-8"
        >
          By creating an account, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </motion.p>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-20 left-10 w-6 h-6 bg-blue-400 rounded-full opacity-20"
      />
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
        className="absolute bottom-20 right-10 w-8 h-8 bg-emerald-400 rounded-full opacity-15"
      />
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, delay: 0.8 }}
        className="absolute top-40 right-20 w-4 h-4 bg-cyan-400 rounded-full opacity-25"
      />
    </div>
  );
};

export default SignUpForm;
