import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { SignInUser, signUpWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handlesignupform = (data) => {
    console.log(data);
    SignInUser(data.email, data.password)
      .then((result) => {
        toast.success("Login succefully");
        navigate(location.state?.from?.pathname || "/", {
          replace: true,
        });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          toast.error("Email or password is incorrect");
        } else if (error.code === "auth/user-not-found") {
          toast.error("No account found with this email");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Wrong password. Try again!");
        } else {
          toast.error(error.message);
        }
      });
  };
  const handleGoogleSignUp = () => {
    signUpWithGoogle()
      .then((result) => {
        toast.success("sign up successfully");
        navigate(location.state?.from?.pathname || "/", {
          replace: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 pt-30">
      <div className="max-w-md w-full">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 -left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main Card */}
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Decorations */}
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
          <div className="absolute -top-3 -right-3 w-8 h-8 border-2 border-orange-400 rounded-full"></div>
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-2 border-green-400 rounded-full"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaLock className="text-white text-2xl" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-600 mt-2">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit(handlesignupform)}>
            {/* Email Field with Fixed Icon Position */}
            <div className="space-y-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all shadow-sm hover:shadow-md"
                />
              </div>
              {/* Error Message Container with Fixed Height */}
              <div className="min-h-[20px]">
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>
            </div>

            {/* Password Field with Fixed Icon Position */}
            <div className="space-y-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                  className="w-full pl-10 pr-12 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all shadow-sm hover:shadow-md"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Error Message Container with Fixed Height */}
              <div className="min-h-[20px]">
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    Password is required
                  </p>
                )}
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right pt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all"
              >
                Log In
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Button */}
            <div>
              <button
                onClick={handleGoogleSignUp}
                type="button"
                className="w-full py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl shadow-sm hover:shadow-md hover:border-red-300 hover:bg-red-50 transition-all flex items-center justify-center gap-3"
              >
                <FaGoogle className="text-red-500 text-xl" />
                Sign in with Google
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-purple-600 hover:text-purple-800 font-semibold"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
