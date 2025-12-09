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
import useAuth from "../../../hooks/useAuth";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user, signUpNewUser, signUpWithGoogle } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const watchPassword = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const handlesignupform = (data) => {
    console.log(data);

    signUpNewUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("sign up successfully");
      })
      .catch((err) => {
        if (err?.code === "auth/email-already-in-use") {
          toast.error("Email already exists. Try another one!");
          return;
        }
      });
  };

  const handleGoogleSignUp = () => {
    signUpWithGoogle()
      .then((result) => {
        toast.success("sign up successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 p-4 pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      {/* Main Form Card */}
      <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
        {/* Decorative Corners */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-blue-500 rounded-tl-lg"></div>
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-emerald-500 rounded-tr-lg"></div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-cyan-500 rounded-bl-lg"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-blue-500 rounded-br-lg"></div>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FaUser className="text-white text-3xl" />
          </div>

          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-600 mt-3">Join our community today!</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(handlesignupform)}>
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-2">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="w-full h-full flex items-center justify-center">
                  <FaUser className="text-gray-400 text-5xl" />
                </div>
              </div>

              <div className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-emerald-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <FaCamera className="text-white text-xl" />
              </div>

              <input
                type="file"
                accept="image/*"
                {...register("photo")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
            </div>
            <div className="mt-4 flex items-center space-x-2 text-blue-600">
              <FaUpload className="text-sm" />
              <span className="text-sm font-medium">
                Upload Profile Picture
              </span>
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your name"
              />
            </div>
            {/* Error messages for name field */}
            <div className="min-h-[10px]">
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  Name is required field
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                  maxLength: {
                    value: 100,
                    message: "Email should not exceed 100 characters",
                  },
                })}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200 bg-red-50"
                    : "border-gray-300 focus:border-green-500"
                }`}
              />
            </div>
            {/* Error message for email field */}
            <div className="min-h-[10px]">
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password (min. 8 characters)"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Password should not exceed 50 characters",
                  },
                  validate: {
                    hasUpperCase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Password must contain at least one uppercase letter",
                    hasLowerCase: (value) =>
                      /[a-z]/.test(value) ||
                      "Password must contain at least one lowercase letter",
                    hasNumber: (value) =>
                      /\d/.test(value) ||
                      "Password must contain at least one number",
                    hasSpecialChar: (value) =>
                      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) ||
                      "Password must contain at least one special character",
                    noCommonPatterns: (value) => {
                      const commonPatterns = [
                        "password",
                        "12345678",
                        "qwerty123",
                        "admin123",
                        "welcome123",
                      ];
                      if (
                        commonPatterns.some((pattern) =>
                          value.toLowerCase().includes(pattern)
                        )
                      ) {
                        return "Password is too common. Please choose a stronger password";
                      }
                      return true;
                    },
                  },
                })}
                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200 bg-red-50"
                    : "border-gray-300 focus:border-green-500"
                }`}
              />

              {/* Toggle Password - inside the same relative container */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-xl" />
                ) : (
                  <FaEye className="text-xl" />
                )}
              </button>
            </div>

            {/* Error message for password field */}
            <div className="min-h-[10px]">
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">
                Password must contain:
              </p>
              <ul className="text-xs flex flex-wrap col-gap-2 text-gray-600 space-y-0.5">
                <li
                  className={`flex items-center gap-1 ${
                    /^.{8,}$/.test(watchPassword || "") ? "text-green-600" : ""
                  }`}
                >
                  {/^.{8,}$/.test(watchPassword || "") ? "✓" : "○"} At least 8
                  characters
                </li>
                <li
                  className={`flex items-center gap-1 ${
                    /[A-Z]/.test(watchPassword || "") ? "text-green-600" : ""
                  }`}
                >
                  {/[A-Z]/.test(watchPassword || "") ? "✓" : "○"} One uppercase
                  letter
                </li>
                <li
                  className={`flex items-center gap-1 ${
                    /[a-z]/.test(watchPassword || "") ? "text-green-600" : ""
                  }`}
                >
                  {/[a-z]/.test(watchPassword || "") ? "✓" : "○"} One lowercase
                  letter
                </li>
                <li
                  className={`flex items-center gap-1 ${
                    /\d/.test(watchPassword || "") ? "text-green-600" : ""
                  }`}
                >
                  {/\d/.test(watchPassword || "") ? "✓" : "○"} One number
                </li>
                <li
                  className={`flex items-center gap-1 ${
                    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                      watchPassword || ""
                    )
                      ? "text-green-600"
                      : ""
                  }`}
                >
                  {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                    watchPassword || ""
                  )
                    ? "✓"
                    : "○"}{" "}
                  One special character
                </li>
              </ul>
            </div>
          </div>

          {/* Sign Up Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-5 px-6 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-emerald-700 transition-all"
            >
              Create Account
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">Or sign up with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Button */}
          <div>
            <button
              onClick={handleGoogleSignUp}
              type="button"
              className="w-full py-4 px-6 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:border-red-400 hover:bg-red-50 flex items-center justify-center space-x-3"
            >
              <FaGoogle className="text-red-500 text-xl" />
              <span>Sign up with Google</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center pt-8 border-t border-gray-100">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-bold inline-flex items-center"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>

        {/* Terms */}
        <p className="text-center text-gray-500 text-xs mt-8">
          By creating an account, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
