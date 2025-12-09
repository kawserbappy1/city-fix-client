import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 pt-30">
      <div className="max-w-md w-full">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 -left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
          <div className="absolute -top-3 -right-3 w-8 h-8 border-2 border-orange-400 rounded-full"></div>
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-2 border-green-400 rounded-full"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <FaLock className="text-white text-2xl" />
            </motion.div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-600 mt-2">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors">
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors">
                <FaLock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-12 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </motion.div>

            {/* Forgot Password Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-right"
            >
              <Link
                to="/forgot-password"
                className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors inline-flex items-center"
              >
                <span className="border-b border-transparent hover:border-purple-600 transition-all">
                  Forgot your password?
                </span>
              </Link>
            </motion.div>

            {/* Login Button */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-emerald-700 transition-all duration-500 transform group"
              >
                Log In
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="relative flex items-center py-4"
            >
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </motion.div>

            {/* Google Login Button */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="button"
                className="w-full py-3 px-6 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl shadow-sm hover:shadow-md hover:border-red-300 hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <FaGoogle className="text-red-500 text-xl" />
                <span>Sign in with Google</span>
              </button>
            </motion.div>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center pt-6 border-t border-gray-100"
            >
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-purple-600 hover:text-purple-800 font-semibold transition-colors inline-flex items-center"
                >
                  Sign up now
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          By signing in, you agree to our Terms of Service and Privacy Policy
        </motion.p>
      </div>
    </div>
  );
};

export default LoginForm;
