import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const CreateIssue = () => {
  const areas = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    control,
    reset,
  } = useForm();

  // Watch the division and district fields
  const selectedDivision = useWatch({
    control,
    name: "division",
    defaultValue: "",
  });

  const selectedDistrict = useWatch({
    control,
    name: "district",
    defaultValue: "",
  });

  // Get unique divisions
  const areasDuplicate = areas.map((area) => area.region);
  const divisions = [...new Set(areasDuplicate)];

  // Get districts for the selected division
  const districtsByDivision = (division) => {
    if (!division) return [];
    const regionDistricts = areas.filter((area) => area.region === division);
    const districts = regionDistricts.map((d) => d.district);
    // Remove duplicate districts
    return [...new Set(districts)];
  };

  // Get upazilas for the selected district
  const upazilasByDistrict = (district) => {
    if (!district || !selectedDivision) return [];
    const areaData = areas.find(
      (area) => area.region === selectedDivision && area.district === district
    );
    return areaData ? areaData.covered_area : [];
  };

  // Get current districts based on selected division
  const currentDistricts = districtsByDivision(selectedDivision);

  // Get current upazilas based on selected district
  const currentUpazilas = upazilasByDistrict(selectedDistrict);

  const onSubmit = async (data) => {
    const issueCoverImage = data.issueImage;
    const formData = new FormData();
    formData.append("image", issueCoverImage);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`,
        formData
      );
      console.log("✅ Upload successful:", response.data);
      const issueImageURL = response.data.data.url;
      const issueInfo = { ...data, issueImageURL };
      Swal.fire({
        title: "Confirm the Issue",
        text: `Are you sure to post this issue`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I'm sure!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .post("/issues", issueInfo)
            .then((res) => {
              reset();
              if (res.data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title:
                    "Your Issue Successfully Added. You will be notified when admin approve your post.",
                  showConfirmButton: false,
                  timer: 2500,
                });
              }
            })
            .catch((error) => console.log(error));
        }
      });
    } catch (error) {
      console.error("❌ Upload failed:", error.response?.data || error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (JPEG, PNG, GIF)");
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }

      setValue("issueImage", file);
      trigger("issueImage");

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("issueImage", null);
    trigger("issueImage");
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

  const priorities = ["Low", "Medium", "High"];

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

            {imagePreview ? (
              // Preview Mode
              <div className="relative">
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  title="Remove image"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Click the X button to change image
                </p>
              </div>
            ) : (
              // Upload Mode
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
                  <div className="flex text-sm text-gray-600 justify-center">
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
                        onChange={handleImageChange}
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
            )}

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
                Posted By
              </label>
              <input
                type="text"
                placeholder="Your full name"
                defaultValue={user.displayName}
                readOnly
                {...register("postedBy")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                defaultValue={user.email}
                readOnly
                placeholder="your.email@example.com"
                {...register("email")}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition `}
              />
            </div>

            {/* Division - Select Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Division <span className="text-red-500">*</span>
              </label>
              <select
                {...register("division", {
                  required: "Division is required",
                  onChange: (e) => {
                    // Reset district and upazila when division changes
                    setValue("district", "");
                    setValue("upazila", "");
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.division ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select division</option>
                {divisions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
              {errors.division && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.division.message}
                </p>
              )}
            </div>

            {/* District - Select Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                District <span className="text-red-500">*</span>
              </label>
              <select
                {...register("district", {
                  required: "District is required",
                  disabled: !selectedDivision, // Disable if no division selected
                  onChange: (e) => {
                    // Reset upazila when district changes
                    setValue("upazila", "");
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.district ? "border-red-500" : "border-gray-300"
                } ${!selectedDivision ? "bg-gray-100 cursor-not-allowed" : ""}`}
              >
                <option value="">
                  {selectedDivision
                    ? "Select district"
                    : "Please select division first"}
                </option>
                {currentDistricts.map((district, i) => (
                  <option key={i} value={district}>
                    {district}
                  </option>
                ))}
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
                {...register("upazila", {
                  required: "Upazila is required",
                  disabled: !selectedDistrict, // Disable if no district selected
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.upazila ? "border-red-500" : "border-gray-300"
                } ${!selectedDistrict ? "bg-gray-100 cursor-not-allowed" : ""}`}
              >
                <option value="">
                  {selectedDistrict
                    ? "Select upazila"
                    : "Please select district first"}
                </option>
                {currentUpazilas.map((upazila, i) => (
                  <option key={i} value={upazila}>
                    {upazila}
                  </option>
                ))}
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
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Detailed description of the issue..."
              rows="4"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Minimum 10 characters required",
                },
              })}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
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
