import React from "react";
import { useForm } from "react-hook-form";

const CreateIssue = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };

  const categories = [
    "Road or Potholes",
    "Streetlights or Electricity",
    "Water Supply & Leakage",
    "Drainage & Sewerage",
    "Garbage & Waste Management",
    "Footpaths or Pedestrian Issues",
    "Public Toilets & Cleaning",
    "Parks & Green Spaces",
    "Traffic & Signals",
  ];

  const priorities = ["Low", "Medium", "High", "Urgent"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-25 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Report an Issue
        </h1>
        <p className="text-gray-600">
          Help us improve your community by reporting issues. Fill in the
          details below.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Issue Image */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Issue Image <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="issueImage"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                  >
                    <span>Upload a file</span>
                    <input
                      id="issueImage"
                      type="file"
                      accept="image/*"
                      {...register("issueImage", {
                        required: "Issue image is required",
                      })}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            {errors.issueImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.issueImage.message}
              </p>
            )}
          </div>

          {/* Issue Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Issue Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Describe the issue briefly"
              {...register("issueName", {
                required: "Issue name is required",
                minLength: {
                  value: 5,
                  message: "Minimum 5 characters required",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.issueName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.issueName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.issueName.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Two Column Layout for smaller fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Posted By */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Posted By <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Your full name"
                {...register("postedBy", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only letters and spaces allowed",
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.postedBy ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.postedBy && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.postedBy.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* District - Select Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                District <span className="text-red-500">*</span>
              </label>
              <select
                {...register("district", { required: "District is required" })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.district ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select district</option>
                {/* District options will be loaded from API */}
              </select>
              {errors.district && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.district.message}
                </p>
              )}
            </div>

            {/* Upazila - Select Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Upazila <span className="text-red-500">*</span>
              </label>
              <select
                {...register("upazila", { required: "Upazila is required" })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.upazila ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select upazila</option>
                {/* Upazila options will be loaded from API */}
              </select>
              {errors.upazila && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.upazila.message}
                </p>
              )}
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                {...register("priority", { required: "Priority is required" })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.priority ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select priority</option>
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
              {errors.priority && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.priority.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^01[3-9]\d{8}$/,
                    message: "Enter a valid Bangladeshi phone number",
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Full address with road/house number"
              rows="3"
              {...register("address", {
                required: "Address is required",
                minLength: {
                  value: 10,
                  message: "Minimum 10 characters required",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Description (formerly Additional Notes) */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Detailed description of the issue..."
              rows="4"
              {...register("description")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
            >
              Submit Issue
            </button>
          </div>
        </form>
      </div>

      {/* Footer Note */}
      <div className="max-w-4xl mx-auto mt-6 text-center text-sm text-gray-500">
        <p>
          <span className="text-red-500">*</span> indicates required field. Your
          report will be reviewed by our team.
        </p>
      </div>
    </div>
  );
};

export default CreateIssue;
