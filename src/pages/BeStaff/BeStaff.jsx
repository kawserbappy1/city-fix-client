import React from "react";
import useAuth from "./../../hooks/useAuth";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";

const BeStaff = () => {
  const { user } = useAuth();
  const areas = useLoaderData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
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

  const handlestaffregistration = (data) => {
    console.log(data);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Join Our Team
          </h1>
          <p className="text-gray-600">
            Apply to become a staff member and help improve our community
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(handlestaffregistration)}
          >
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-100">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    defaultValue={user?.displayName}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    defaultValue={user?.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register("phone", { required: true })}
                    placeholder="+880-----------"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="min-h-[10px]">
                    {errors.phone?.type === "required" && (
                      <p className="text-red-500 text-xs">
                        Mobile Phome Number is Required
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-100">
                Location Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Division */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Division
                  </label>
                  <select
                    {...register("division", {
                      required: "Division is required",
                      onChange: (e) => {
                        setValue("district", "");
                        setValue("upazila", "");
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      errors.division ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Division</option>
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

                {/* District */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    District
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
                    } ${
                      !selectedDivision ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
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

                {/* Upazila */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Upazila
                  </label>
                  <select
                    {...register("upazila", {
                      required: "Upazila is required",
                      disabled: !selectedDistrict, // Disable if no district selected
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      errors.upazila ? "border-red-500" : "border-gray-300"
                    } ${
                      !selectedDistrict ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
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
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-100">
                Professional Information
              </h2>

              {/* Expert Area */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Expert Area
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
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
                <div className="min-h-[10px]">
                  {errors.category?.type === "required" && (
                    <p className="text-red-500 text-xs">category is Required</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Experience */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* NID */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    National ID Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter NID number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Education */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Education Qualification
                </label>
                <input
                  type="text"
                  placeholder="e.g., BSc in Civil Engineering"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Certificate */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Professional Certificates
                </label>
                <input
                  type="text"
                  placeholder="e.g., PMP, PEng, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-100">
                Availability
              </h2>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Work Availability
                </label>
                <select
                  {...register("availability", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Availability</option>
                  <option value="full_time">Full Time</option>
                  <option value="part_time">Part Time</option>
                  <option value="contractual">Contractual</option>
                  <option value="not_available">Not Available</option>
                </select>
                <div className="min-h-[10px]">
                  {errors.availability?.type === "required" && (
                    <p className="text-red-500 text-xs">
                      availability is Required
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Submit Application
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                By submitting, you agree to our terms and conditions
              </p>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Our team will review your application and contact you within 3-5
            business days
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeStaff;
